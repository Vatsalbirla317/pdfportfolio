import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  maxToasts = 5 
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>): string => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000
    };

    setToasts(prev => {
      const newToasts = [newToast, ...prev].slice(0, maxToasts);
      
      // Auto-remove after duration
      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, newToast.duration);
      }
      
      return newToasts;
    });

    return id;
  }, [maxToasts]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => {
      const toast = prev.find(t => t.id === id);
      if (toast?.onDismiss) {
        toast.onDismiss();
      }
      return prev.filter(t => t.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAll }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

const ToastContainer: React.FC = () => {
  const { toasts } = useToastContext();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map(toast => (
        <ToastComponent key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

interface ToastComponentProps {
  toast: Toast;
}

const ToastComponent: React.FC<ToastComponentProps> = ({ toast }) => {
  const { removeToast } = useToastContext();

  const variantStyles = {
    default: 'bg-background border-border',
    success: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/10 dark:border-green-800 dark:text-green-100',
    error: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-900/10 dark:border-red-800 dark:text-red-100',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/10 dark:border-yellow-800 dark:text-yellow-100',
    info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/10 dark:border-blue-800 dark:text-blue-100'
  };

  const variantIcons = {
    default: null,
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  };

  const Icon = variantIcons[toast.variant || 'default'];

  return (
    <div
      className={cn(
        'relative flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out',
        'animate-in slide-in-from-right-full',
        variantStyles[toast.variant || 'default']
      )}
      role="alert"
    >
      {Icon && (
        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      )}
      
      <div className="flex-1 min-w-0">
        {toast.title && (
          <div className="font-semibold text-sm mb-1">
            {toast.title}
          </div>
        )}
        
        {toast.description && (
          <div className="text-sm opacity-90">
            {toast.description}
          </div>
        )}
        
        {toast.action && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toast.action.onClick}
            className="mt-2 h-auto p-0 text-sm font-medium underline hover:no-underline"
          >
            {toast.action.label}
          </Button>
        )}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => removeToast(toast.id)}
        className="h-6 w-6 p-0 flex-shrink-0 opacity-70 hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Convenience hook for common toast patterns
export const useAdvancedToast = () => {
  const { addToast } = useToastContext();

  return {
    success: (title: string, description?: string, action?: Toast['action']) =>
      addToast({ title, description, variant: 'success', action }),
    
    error: (title: string, description?: string, action?: Toast['action']) =>
      addToast({ title, description, variant: 'error', action }),
    
    warning: (title: string, description?: string, action?: Toast['action']) =>
      addToast({ title, description, variant: 'warning', action }),
    
    info: (title: string, description?: string, action?: Toast['action']) =>
      addToast({ title, description, variant: 'info', action }),
    
    loading: (title: string, description?: string) =>
      addToast({ title, description, duration: 0 }), // Don't auto-dismiss
    
    promise: async <T,>(
      promise: Promise<T>,
      {
        loading,
        success,
        error
      }: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: any) => string);
      }
    ) => {
      const loadingId = addToast({
        title: loading,
        variant: 'info',
        duration: 0
      });

      try {
        const result = await promise;
        const successMessage = typeof success === 'function' ? success(result) : success;
        
        addToast({
          title: successMessage,
          variant: 'success'
        });
        
        return result;
      } catch (err) {
        const errorMessage = typeof error === 'function' ? error(err) : error;
        
        addToast({
          title: errorMessage,
          variant: 'error'
        });
        
        throw err;
      } finally {
        // Remove loading toast
        setTimeout(() => {
          // This would need to be implemented in the context
        }, 100);
      }
    }
  };
};