import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

type RateLimitConfig = {
  interval: number; // in seconds
  limit: number;
};

export class RateLimit {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_URL!,
      token: process.env.UPSTASH_REDIS_TOKEN!,
    });
  }

  async isRateLimited(
    ip: string,
    endpoint: string,
    config: RateLimitConfig
  ): Promise<boolean> {
    const key = `rate-limit:${endpoint}:${ip}`;
    const requests = await this.redis.incr(key);

    if (requests === 1) {
      await this.redis.expire(key, config.interval);
    }

    return requests > config.limit;
  }
}

export async function withRateLimit(
  request: Request,
  config: RateLimitConfig = { interval: 60, limit: 5 }
) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = new RateLimit();
    const isLimited = await rateLimit.isRateLimited(
      ip,
      request.url,
      config
    );

    if (isLimited) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    return null;
  } catch (error) {
    console.error('Rate limit error:', error);
    return null;
  }
}
