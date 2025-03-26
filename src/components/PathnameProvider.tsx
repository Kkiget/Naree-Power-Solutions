'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PathnameProvider({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState('');
  const currentPathname = usePathname();

  useEffect(() => {
    setPathname(currentPathname || '');
  }, [currentPathname]);

  return <div data-pathname={pathname}>{children}</div>;
}
