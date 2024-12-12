import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { ptBR } from '../../config/i18n';

export default function Header() {
  return (
    <div className="h-16 px-4 sm:px-6 lg:px-8 bg-[rgb(var(--bg-secondary))] border-b border-[rgb(var(--border-primary))]">
      <div className="flex items-center justify-between h-full">
        <div className="flex-1 min-w-0 max-w-xs">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-[rgb(var(--text-tertiary))]" />
            </div>
            <input
              type="search"
              className="block w-full rounded-md border border-[rgb(var(--border-primary))] bg-[rgb(var(--bg-primary))] pl-10 pr-3 py-1.5 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-tertiary))] focus:ring-2 focus:ring-[rgb(var(--brand-primary))] focus:border-transparent"
              placeholder={ptBR.common.search + "..."}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] relative">
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[rgb(var(--error))] flex items-center justify-center">
              <span className="text-xs text-white">3</span>
            </span>
            <Bell className="h-6 w-6" />
          </button>

          <div className="relative">
            <button className="flex items-center space-x-3 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--brand-primary))] p-1.5 rounded-full hover:bg-[rgb(var(--bg-tertiary))]">
              <div className="h-8 w-8 rounded-full bg-[rgb(var(--bg-tertiary))] flex items-center justify-center">
                <User className="h-5 w-5 text-[rgb(var(--text-secondary))]" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-[rgb(var(--text-primary))]">João Silva</p>
                <p className="text-xs text-[rgb(var(--text-secondary))]">Administrador</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}