// toastify.tsx
import { createRoot } from "react-dom/client";
import { CheckCircle, MessageCircleWarning } from "lucide-react";

type toastType = "success" | "danger" | "warning";

function ToastElement({ msg, type }: { msg: string; type: toastType }) {
  let icon = <CheckCircle className="text-emerald-700" size={16} />;
  let color = "border-green-600 text-green-600";
  if (type === "danger") {
    icon = <MessageCircleWarning className="text-red-700" size={16} />;
    color = "border-red-600 text-red-600";
  }
  if (type === "warning") {
    icon = <CheckCircle className="text-amber-700" size={16} />;
    color = "border-amber-600 text-amber-600";
  }

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 bg-white border-2 ${color} rounded shadow mb-2`}
    >
      {icon}
      <p className="text-sm font-medium">{msg}</p>
    </div>
  );
}

export function toastify(msg: string, type: toastType = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className =
      "fixed top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-50";
    document.body.prepend(container);
  }

  const toastDiv = document.createElement("div");
  container.prepend(toastDiv);

  const root = createRoot(toastDiv);
  root.render(<ToastElement msg={msg} type={type} />);

  setTimeout(() => {
    root.unmount();
    toastDiv.remove();
  }, 5000);
}
