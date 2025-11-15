// lib/swal-config.ts
import Swal from 'sweetalert2';

// Configuration globale pour le thème sombre
export const swalConfig = {
  background: '#1a1a1a',
  color: 'white',
  confirmButtonColor: '#3b82f6',
  cancelButtonColor: '#6b7280',
  customClass: {
    popup: 'border border-gray-700 rounded-2xl shadow-2xl',
    title: 'text-white font-bold text-xl',
    htmlContainer: 'text-gray-300',
    confirmButton: 'bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold transition-colors',
    cancelButton: 'bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors',
    actions: 'gap-3'
  }
};

// Helper pour les notifications de succès
export const showSuccess = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    ...swalConfig
  });
};

// Helper pour les erreurs
export const showError = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    ...swalConfig
  });
};

// Helper pour les chargements
export const showLoading = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    icon: 'info',
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
    ...swalConfig
  });
};