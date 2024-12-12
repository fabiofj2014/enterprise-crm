import React from 'react';
import { LucideIcon } from 'lucide-react';
import Card from '../common/Card';

interface ChartCardProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export default function ChartCard({ title, icon: Icon, children, className = '' }: ChartCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </div>
      {children}
    </Card>
  );
}