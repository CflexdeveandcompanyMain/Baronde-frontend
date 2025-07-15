import { useState } from "react";
import MainPageNavbar from "../mainpage/navbar/navbar";
import { Bell, Fingerprint, LogOut, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserSetting() {
  const [settings, setSettings] = useState<any>({
    notification: true,
    product: false,
    login: true,
  });

  let navigate = useNavigate();

  const settingsConfig = [
    {
      key: "notification",
      label: "Email Notification",
      description: "Receive all notifications via email",
      icon: <Bell />,
      color: "text-purple-600",
    },
    {
      key: "product",
      label: "Products Updates",
      description: "Get the latest Updates on latest available Products",
      icon: <ShoppingBag />,
      color: "text-blue-600",
    },
    {
      key: "login",
      label: "Login Alerts",
      description: "Get notified of login attempt via email",
      icon: <Fingerprint />,
      color: "text-blue-600",
    },
  ];

  const toggleSetting = (key: string) => {
    setSettings((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <MainPageNavbar />
      <section className="w-full h-screen bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4">
        <div className="flex flex-col items-start w-[95%] gap-2 sm:h-auto sm:w-3/5 mx-auto mt-4 sm:mt-6">
          <p className="font-semibold text-lg text-start w-full">Settings</p>
          <section className="bg-white self-center w-full flex flex-col items-center gap-5 p-3">
            <p className="font-all text-sm w-full">
              We may send you important information regarding new products
              outside this website
            </p>
            <div className="flex flex-col w-full items-center gap-10">
              {settingsConfig.map((setting) => {
                const IconComponent = setting.icon;
                return (
                  <div
                    key={setting.key}
                    className="flex w-full items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div>{IconComponent}</div>
                      <div>
                        <div className="font-medium text-gray-900 text-base">
                          {setting.label}
                        </div>
                        <div className="text-sm text-gray-500 font-all">
                          {setting.description}
                        </div>
                      </div>
                    </div>
                    <Toggle
                      isOn={settings[setting.key]}
                      onToggle={() => toggleSetting(setting.key)}
                      color={
                        setting.key === "notification"
                          ? "bg-purple-500"
                          : setting.key === "product"
                          ? "bg-blue-500"
                          : setting.key === "login"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </section>
          <div
            onClick={() => {
              sessionStorage.setItem(
                "baron:user",
                JSON.stringify({ name: "", email: "", isVerified: false })
              );
              navigate("/");
            }}
            className="flex flex-row items-center gap-2 cursor-pointer"
          >
            <p className="font-medium text-lg text-start w-full text-red-600">
              Log out
            </p>
            <LogOut className="text-red-600" />
          </div>
        </div>
      </section>
    </>
  );
}

const Toggle = ({
  isOn,
  onToggle,
  color = "bg-blue-500",
}: {
  isOn: boolean;
  onToggle: () => void;
  color: string;
}) => (
  <button
    onClick={onToggle}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
      isOn ? color : "bg-gray-200"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        isOn ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);
