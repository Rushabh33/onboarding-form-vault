import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <Link className='pb-10' href='/onboarding'>
        start onboard process →
      </Link>
    </main>
  );
}
