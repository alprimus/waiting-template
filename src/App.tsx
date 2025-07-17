"use client";
import { useState, useEffect } from 'react';
import { Wrench, Clock, Rocket } from 'lucide-react';

export default function MaintenancePage() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(56);

  // Set your maintenance end date here
  useEffect(() => {
    const maintenanceEnd = new Date('2025-07-17T19:00:00').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = maintenanceEnd - now;
      
      if (distance <= 0) {
        clearInterval(interval);
        return;
      }
      
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });

      // Simulate progress increase
      if (progress < 100) {
        setProgress(prev => {
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
        <div className="bg-emerald-600 dark:bg-emerald-800 p-6 md:p-8 text-white">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full bg-white/20 ${isHovered ? 'animate-bounce' : 'animate-pulse'} hidden sm:inline`}>
              <Wrench className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Scheduled Maintenance</h1>
              <p className="text-white/90">We're making things even better</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Message */}
            <div className="md:w-2/3 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Our website is currently undergoing scheduled maintenance
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  We apologize for the inconvenience but we're performing some maintenance to improve your experience. 
                  We'll be back online shortly!
                </p>
              </div>

              {/* Countdown */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-3">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Estimated time remaining</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(countdown).map(([unit, value]) => (
                    <div 
                      key={unit} 
                      className="bg-emerald-50 dark:bg-gray-600 rounded-lg p-3 text-center transition-all hover:scale-105 duration-200 hover:bg-emerald-100 dark:hover:bg-gray-500"
                    >
                      <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {value.toString().padStart(2, '0')}
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
                  {progress < 70 ? "Implementing new features and performance improvements..." : "Finalizing updates and running tests..."}
                </p>
              </div>
            </div>

            {/* Updates Card */}
            <div className="md:w-1/3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-5 transition-all hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-500">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Rocket className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                What's New
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    title: "Performance upgrades",
                    desc: "Faster page loads",
                    color: "bg-emerald-500"
                  },
                  {
                    title: "New dashboard",
                    desc: "Improved user experience",
                    color: "bg-teal-500"
                  },
                  {
                    title: "Security updates",
                    desc: "Enhanced protection",
                    color: "bg-green-500"
                  }
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 group cursor-pointer">
                    <div className={`mt-1 h-2 w-2 rounded-full ${item.color} transition-all group-hover:scale-150`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Card */}
          {/* <div className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-5 transition-all hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Need immediate assistance?</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Contact our support team</p>
                </div>
              </div>
              <button className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors group">
                Contact Support 
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div> */}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; 2025 All rights reserved. AL Primus.
          </p>
        </div>
      </div>
    </div>
  );
}