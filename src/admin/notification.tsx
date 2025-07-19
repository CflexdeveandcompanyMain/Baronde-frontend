import { Bell, ChevronLeft } from "lucide-react";

let notificationData = [
  {
    title: "New Order Placed",
    description:
      "Order #A23019 has just been placed by David O. ₦210,500 total. Please review and confirm fulfillment.",
  },

  {
    title: "New Order Placed",
    description:
      "Order #A23019 has just been placed by David O. ₦210,500 total. Please review and confirm fulfillment.",
  },
  {
    title: "Product Review Submitted",
    description:
      "New review on Behringer Xenyx Mixer: 4.8 stars — 'Great for live sets, sound is clean!",
  },
];

export default function AdminNotification() {
  return (
    <section className="flex flex-col items-center w-full">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row items-center gap-2">
          <ChevronLeft
            size={16}
            className="text-green-600 self-center text-start"
          />
          <p className="font-all text-xl font-medium">Notification</p>
        </div>
        <div className="flex justify-center border border-green-300 bg-green-100 rounded p-1">
          <p className="text-sm font-medium text-green-700">Mark all as read</p>
        </div>
      </div>
      <div className="flex flex-col items-start w-full gap-2 mt-3">
        {notificationData.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-row items-center w-full gap-2 hover:bg-stone-300"
            >
              <Bell
                size={32}
                className="sm:hidden flex text-green-600 px-2 self-start"
              />
              <Bell
                size={36}
                className="sm:flex hidden text-green-600 px-2 self-start"
              />
              <div className="flex flex-col items-start w-full">
                <p className="font-all text-sm text-black sm:text-base font-medium text-start w-full">
                  {item.title}
                </p>
                <p className="font-all text-xs text-stone-500 font-medium text-start w-full">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
