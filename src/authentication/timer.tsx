import { useState, useEffect } from "react";

export default function CountdownTimer() {
  // Initialize with 1 hour (3600 seconds)
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    // Don't set up timer if time is already 0
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Timer finished
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup timer on unmount or when timeLeft changes
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Optional: Function to reset timer
  const resetTimer = () => {
    setTimeLeft(3600); // Reset to 1 hour
  };

  return (
    <div>
      <p className="font-all font-medium text-sm text-start w-full text-gray-400">
        Code resend in
        <span className="text-orange-500 text-[13px] ml-1">
          {timeLeft > 0 ? formatTime(timeLeft) : "0:00"}
        </span>
      </p>

      {/* Optional: Show message when timer expires */}
      {timeLeft === 0 && (
        <p className="font-all font-medium text-sm text-start w-full text-green-600 mt-2">
          You can now resend the code!
        </p>
      )}

      {/* Optional: Reset button for testing */}
      {timeLeft === 0 && (
        <button
          onClick={resetTimer}
          className="text-orange-500 text-sm underline mt-1"
        >
          Reset Timer
        </button>
      )}
    </div>
  );
}
