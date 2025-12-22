import React from 'react';
import { FiLoader } from 'react-icons/fi';

const LoadingSpinner = ({ message = 'Memuatkan...', size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        <FiLoader className="absolute inset-0 m-auto text-blue-500 animate-pulse" size={size === 'small' ? 16 : size === 'medium' ? 24 : 32} />
      </div>
      {message && (
        <p className="mt-4 text-gray-600 text-center">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
