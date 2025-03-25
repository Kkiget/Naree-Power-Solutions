import Link from 'next/link';
import Image from 'next/image';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image
                  src="/images/NAREE POWER 3B.png"
                  alt="Naree Power Solutions"
                  width={150}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
