import { createTransport } from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

interface EmailTemplate {
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const transporter = createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    secure: process.env.EMAIL_SERVER_SECURE === 'true',
  });

  await transporter.sendMail({
    from: options.from || process.env.EMAIL_FROM,
    ...options,
  });
}

export function getEmailTemplate(type: string, data: Record<string, unknown>): EmailTemplate {
  switch (type) {
    case 'welcome':
      return {
        subject: 'Welcome to our platform',
        html: `<p>Hello ${data.name},</p><p>Welcome to our platform!</p>`,
      };
    case 'reset-password':
      return {
        subject: 'Reset your password',
        html: `<p>Click <a href="${data.resetUrl}">here</a> to reset your password.</p>`,
      };
    default:
      throw new Error(`Unknown email template type: ${type}`);
  }
}
