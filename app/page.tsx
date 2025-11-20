import { ModeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="flex min-h-screen font-sans">
      <main className="m-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
        <p className="mb-4">This is the main landing page of the application.</p>
        <ModeToggle />
      </main>
    </div>
  );
}
