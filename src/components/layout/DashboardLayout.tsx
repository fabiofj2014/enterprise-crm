import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))]">
      <div className="flex h-screen">
        <div className="w-64 bg-[rgb(var(--bg-secondary))] border-r border-[rgb(var(--border-primary))]">
          <div className="h-16 flex items-center px-6 border-b border-[rgb(var(--border-primary))]">
            <h1 className="text-xl font-bold text-gray-900">CRM Empresarial</h1>
          </div>
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="container mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}