import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center animate-fadeIn">
      <div className="bg-red-500/10 backdrop-blur-md rounded-2xl p-8 border border-red-500/20">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
        <p className="text-white/70 mb-6">{message}</p>
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-xl transition-all duration-200 border border-red-500/30"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;