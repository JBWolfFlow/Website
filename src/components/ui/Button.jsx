import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable Button component with multiple variants
 * Supports primary, secondary, and ghost styles
 * Fully accessible with proper ARIA attributes
 */
const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className,
      disabled = false,
      type = 'button',
      onClick,
      href,
      ...props
    },
    ref
  ) => {
    // Base styles for all buttons
    const baseStyles = cn(
      'inline-flex items-center justify-center',
      'font-semibold rounded-lg',
      'transition-all duration-300 ease-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'transform hover:scale-105 active:scale-95'
    );

    // Variant styles
    const variantStyles = {
      primary: cn(
        'bg-primary-600 text-white',
        'hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/50',
        'focus:ring-primary-500',
        'active:bg-primary-800'
      ),
      secondary: cn(
        'bg-white text-gray-900 border-2 border-gray-300',
        'hover:border-gray-400 hover:shadow-lg hover:bg-gray-50',
        'focus:ring-gray-400',
        'active:bg-gray-100'
      ),
      ghost: cn(
        'bg-transparent text-gray-700 border-2 border-transparent',
        'hover:bg-gray-100 hover:border-gray-200',
        'focus:ring-gray-300',
        'active:bg-gray-200'
      ),
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    // Combined classes
    const buttonClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    // If href is provided, render as link
    if (href) {
      return (
        <a
          ref={ref}
          href={href}
          className={buttonClasses}
          aria-disabled={disabled}
          {...props}
        >
          {children}
        </a>
      );
    }

    // Otherwise render as button
    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;