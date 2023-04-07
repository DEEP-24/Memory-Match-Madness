'use client';
import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{
      
      }} />
    </div>
  );
};
