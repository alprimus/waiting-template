"use client";
import { useState, useEffect } from "react";
import { Wrench, Clock } from "lucide-react";

// helper to format UTC date for display
const toUTCString = (d:string) =>
  new Date(d)
    .toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    })
    .replace(/, (\d)/, " at $1") + " UTC";

export default function MaintenancePage() {
  const maintenanceEndUTC = "2025-09-04T10:30:00Z"; 

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(56);

  useEffect(() => {
    const endTime = new Date(maintenanceEndUTC).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        clearInterval(interval);
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });

      // Simulate progress increase
      if (progress < 100) {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 0.2;
          return newProgress > 100 ? 100 : newProgress;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-900 flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div
        className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:shadow-2xl hover:-translate-y-1 duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header */}
        <div className="bg-emerald-600 dark:bg-emerald-800 p-6 md:p-8 text-white relative">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-full bg-white/20 ${
                isHovered ? "animate-bounce" : "animate-pulse"
              } hidden sm:inline`}
            >
              <Wrench className="h-8 w-8" />
            </div>
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Scheduled Maintenance
                </h1>
                <p className="text-white/90">We're making things even better</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Message */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Our website is currently undergoing scheduled maintenance
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  We apologize for the inconvenience but we're performing some
                  maintenance to improve your experience. We'll be back online
                  shortly! The maintenance is expected to complete by{" "}
                  {toUTCString(maintenanceEndUTC)}.
                </p>
              </div>

              {/* Countdown */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-all hover:shadow-md">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-3">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Estimated time remaining
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(countdown).map(([unit, value]) => (
                    <div
                      key={unit}
                      className="bg-emerald-50 dark:bg-gray-600 rounded-lg p-3 text-center transition-all hover:scale-105 duration-200 hover:bg-emerald-100 dark:hover:bg-gray-500"
                    >
                      <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {value.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                        {unit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Finalizing updates and preparing for launch...
                </p>
              </div>

              {/* Status Updates */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Current Status
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        progress > 20 ? "bg-emerald-500" : "bg-gray-300"
                      }`}
                    ></span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Backend services updated
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        progress > 80 ? "bg-emerald-500" : "bg-gray-300"
                      }`}
                    ></span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Frontend deployment in progress
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; 2025 All rights reserved. AL Primus.{" "}
            <span className="block sm:inline">
              Follow us for updates on{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                @alprimus
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
