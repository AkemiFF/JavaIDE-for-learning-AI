import React from 'react';
import MatrixRain from './MatrixRain';


const LoadingSpinner: React.FC<{ visible: boolean }> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <MatrixRain />
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
      <div className="relative z-10 text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <div className="w-20 h-20 border-4 border-green-500/60 border-t-transparent rounded-full animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="w-16 h-16 border-4 border-green-500/30 border-t-transparent rounded-full animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="text-3xl font-bold text-green-500 mb-4">
          Traitement en cours...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;



