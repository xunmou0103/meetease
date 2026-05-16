import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import AppFooter from './AppFooter';

export default function Layout() {
  return (
    <div className="app-layout">
      <div className="app-bg" aria-hidden />
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
