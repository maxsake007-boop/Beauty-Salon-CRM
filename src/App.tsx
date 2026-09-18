import React, { useState, useEffect } from 'react';
import ClientApp from './client/App';
import AdminApp from './admin/App';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const isAdmin = currentPath.startsWith('/admin');

  return (
    <div className="min-h-screen">
      {isAdmin ? <AdminApp /> : <ClientApp />}
    </div>
  );
}
