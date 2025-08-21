import toast from 'react-hot-toast';

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      duration: 2000,
      style: {
        background: '#1F2937',
        color: '#fff',
        borderRadius: '8px',
      },
    });
  },
  
  error: (message: string) => {
    toast.error(message, {
      duration: 2000,
      style: {
        background: '#1F2937',
        color: '#fff',
        borderRadius: '8px',
      },
    });
  }
}; 