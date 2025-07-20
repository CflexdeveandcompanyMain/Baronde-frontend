import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  isDanger: boolean;
}

export default function Toast({ message, isDanger }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Slide in from right
    const slideInTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Auto-hide after 5 seconds
    const autoHideTimer = setTimeout(() => {
      setIsVisible(false);
      // Remove from DOM after animation completes
      setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }, 5000);

    return () => {
      clearTimeout(slideInTimer);
      clearTimeout(autoHideTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
    }, 300);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className={`flex items-center gap-3 min-w-80 max-w-md p-4 rounded-lg shadow-lg border-l-4 ${
          isDanger
            ? "bg-red-50 text-red-800 border-red-500"
            : "bg-green-50 text-green-800 border-green-500"
        }`}
      >
        {/* Icon */}
        <div className="flex-shrink-0">
          {isDanger ? (
            <AlertCircle size={20} className="text-red-600" />
          ) : (
            <CheckCircle size={20} className="text-green-600" />
          )}
        </div>

        {/* Message */}
        <div className="flex-1">
          <p className="font-medium text-sm">{message}</p>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className={`flex-shrink-0 hover:opacity-70 transition-opacity ${
            isDanger ? "text-red-600" : "text-green-600"
          }`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
