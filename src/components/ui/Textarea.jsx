import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Textarea = forwardRef(
  (
    {
      label,
      error,
      required = false,
      className,
      id,
      rows = 4,
      maxLength,
      showCharCount = false,
      value = '',
      ...props
    },
    ref
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const currentLength = value?.length || 0;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          maxLength={maxLength}
          value={value}
          className={cn(
            'w-full px-4 py-3 rounded-lg border border-gray-300',
            'focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'transition-all duration-200',
            'placeholder:text-gray-400',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            'resize-y',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        <div className="flex justify-between items-center mt-2">
          {error ? (
            <p
              id={`${textareaId}-error`}
              className="text-sm text-red-600"
              role="alert"
            >
              {error}
            </p>
          ) : (
            <div />
          )}
          {showCharCount && maxLength && (
            <p
              className={cn(
                'text-sm',
                currentLength > maxLength * 0.9
                  ? 'text-red-600'
                  : 'text-gray-500'
              )}
            >
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;