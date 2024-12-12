import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  PieChart,
  Calendar,
  Settings,
  MessageSquare,
  Target,
  FileText,
} from 'lucide-react';
import { ptBR } from '../../config/i18n';

const navigation = [
  { name: ptBR.navigation.dashboard, icon: LayoutDashboard, path: '/' },
  { name: ptBR.navigation.leads, icon: Users, path: '/leads' },
  { name: ptBR.navigation.pipeline, icon: Target, path: '/pipeline' },
  { name: ptBR.navigation.tasks, icon: Calendar, path: '/tasks' },
  { name: ptBR.navigation.analytics, icon: PieChart, path: '/analytics' },
  { name: ptBR.navigation.documents, icon: FileText, path: '/documents' },
  { name: ptBR.navigation.messages, icon: MessageSquare, path: '/messages' },
  { name: ptBR.navigation.settings, icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  return (
    <nav className="mt-6">
      <div className="px-3 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}