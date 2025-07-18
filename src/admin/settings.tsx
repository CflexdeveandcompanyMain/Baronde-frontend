import { Search } from "lucide-react";

export default function AdminSettings() {
  return (
    <section className="w-full flex flex-col items-center">
      <section className="flex flex-row items-center w-full justify-between">
        <div className="flex flex-col items-center gap-2 justify-start w-3/4">
          <p className="font-all text-lg sm:text-2xl text-[#262626] font-medium text-start w-full">
            Settings
          </p>
          <p className="font-all text-sm text-stone-400 font-medium">
            Manage your stores backend preferences, notifications settings, and
            more all in one place
          </p>
        </div>
        <div className="flex justify-end w-1/4 self-center -mt-3">
          <Search size={16} />
        </div>
      </section>
      <div className="flex justify-start w-full py-5">
        <p className="font-all font-medium text-[#262626] text-base sm:text-xl">
          Notification Preference
        </p>
      </div>
      <section className="flex flex-col items-center w-full gap-3">
        <div className="flex flex-row items-center w-full gap-2">
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex flex-col items-start self-start">
            <p className="font-all text-lg font-semibold text-[#262626]">
              Email Notification
            </p>
            <p className="font-all text-xs text-start text-[#171717]">
              Check here to turn stop getting notifications on your email
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center w-full gap-2">
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex flex-col items-start self-start">
            <p className="font-all text-lg font-semibold text-[#262626]">
              Orders Notification
            </p>
            <p className="font-all text-xs text-start text-[#171717]">
              Stay updated with customer purchases and fufillment status
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center w-full gap-2">
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex flex-col items-start self-start">
            <p className="font-all text-lg font-semibold text-[#262626]">
              Payment Alerts
            </p>
            <p className="font-all text-xs text-start text-[#171717]">
              Track every payment transaction in real-time by getting alerts for
              Payment
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center w-full gap-2">
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex flex-col items-start self-start">
            <p className="font-all text-lg font-semibold text-[#262626]">
              Inventory Alerts
            </p>
            <p className="font-all text-xs text-start text-[#171717]">
              Monitor stock levels to avoid running out of popular products.
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center w-full gap-2">
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex flex-col items-start self-start">
            <p className="font-all text-lg font-semibold text-[#262626]">
              Customers & User activities
            </p>
            <p className="font-all text-xs text-start text-[#171717]">
              Notify me when a new user registers
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center w-full gap-2">
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex flex-col items-start self-start">
            <p className="font-all text-lg font-semibold text-[#262626]">
              System & Admin-level updates
            </p>
            <p className="font-all text-xs text-start text-[#171717]">
              Alert me on admin role changes or logins from new devices
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
