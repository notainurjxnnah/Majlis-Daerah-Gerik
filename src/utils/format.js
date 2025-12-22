import { format, parseISO } from 'date-fns';
import { ms } from 'date-fns/locale';

// Format date to Malaysian format
export const formatDate = (dateString, includeTime = false) => {
  if (!dateString) return '-';
  
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, includeTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy', { locale: ms });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Tarikh tidak sah';
  }
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Format number with thousands separator
export const formatNumber = (num) => {
  return new Intl.NumberFormat('ms-MY').format(num);
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};
