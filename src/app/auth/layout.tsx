import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link href="/">
            <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Naree Power Solutions
            </h1>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
