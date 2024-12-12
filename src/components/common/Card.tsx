import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`bg-[rgb(var(--color-bg-primary))] border border-[rgb(var(--color-border))] rounded-lg ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-[rgb(var(--color-border))]">
          <h3 className="text-[rgb(var(--color-text-primary))] text-lg font-medium">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}