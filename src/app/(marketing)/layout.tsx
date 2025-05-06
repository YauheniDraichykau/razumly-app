import type React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Razumly - AI Document Simplification',
  description: 'Simplify complex documents with AI',
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full">{children}</div>;
}
