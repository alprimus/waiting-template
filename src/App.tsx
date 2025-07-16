import { ChevronRight, Clock, Mail, Rocket, Wrench } from "lucide-react";
import { useEffect, useState } from "react";

export default function MaintenancePage() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set your maintenance end date here
  useEffect(() => {
    const maintenanceEnd = new Date("2025-07-15T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const distance = maintenanceEnd - now;

      if (distance <= 0) {
        clearInterval(interval);
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:shadow-2xl hover:-translate-y-1 duration-300">
        {/* Header */}
        <div className="bg-primary dark:bg-green-800 p-6 md:p-8 text-white">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-white/20 animate-pulse">
              <Wrench className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Scheduled Maintenance
              </h1>
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
                <p className="text-muted-foreground dark:text-gray-300">
                  We apologize for the inconvenience but we're performing some
                  maintenance to improve your experience. We'll be back online
                  shortly!
                </p>
              </div>

              {/* Countdown */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-3">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Estimated time remaining
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(countdown).map(([unit, value]) => (
                    <div
                      className="bg-primary/5 rounded-lg p-3 text-center transition-all hover:scale-105 duration-200"
                      key={unit}
                    >
                      <div className="text-2xl font-bold text-primary">
                        {value.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase">
                        {unit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Updates Card */}
            <div className="md:w-1/3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 p-5 transition-all hover:shadow-md">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Rocket className="h-4 w-4 text-primary" />
                What's New
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    title: "Performance upgrades",
                    desc: "Faster page loads",
                    color: "bg-orange-500",
                  },
                  {
                    title: "New dashboard",
                    desc: "Improved user experience",
                    color: "bg-yellow-500",
                  },
                  {
                    title: "Security updates",
                    desc: "Enhanced protection",
                    color: "bg-red-500",
                  },
                ].map((item) => (
                  <li className="flex items-start gap-2 group" key={item.title}>
                    <div
                      className={`mt-1 h-2 w-2 rounded-full ${item.color} transition-all group-hover:scale-150`}
                    />
                    <div>
                      <p className="text-sm font-medium text-secondary group-hover:text-primary transition-colors">
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
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-5 transition-all hover:shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-secondary">
                    Need immediate assistance?
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Contact our support team
                  </p>
                </div>
              </div>
              <button
                className="flex items-center gap-1 text-sm font-medium text-primary hover:text-secondary transition-colors group"
                type="button"
              >
                Contact Support
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
