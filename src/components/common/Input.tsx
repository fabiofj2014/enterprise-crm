import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[rgb(var(--color-text-secondary))] text-sm font-medium mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-3 py-2
            bg-[rgb(var(--color-input))]
            border border-[rgb(var(--color-border))]
            text-[rgb(var(--color-text-primary))]
            rounded-md
            focus:ring-2 focus:ring-[rgb(var(--color-accent))]
            placeholder:text-[rgb(var(--color-text-secondary))]
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;