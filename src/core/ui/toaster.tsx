'use client';

import { useToast } from '@core/hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@core/ui/toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variantStyle = 'info', ...props }) {
        const variantClass = {
          success: 'bg-green-500 text-white',
          error: 'bg-red-500 text-white',
          info: 'bg-blue-500 text-white',
        }[variantStyle];

        return (
          <Toast key={id} {...props} className={variantClass}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
