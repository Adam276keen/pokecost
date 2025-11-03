import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-poke-dark dark:text-gray-100">
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
