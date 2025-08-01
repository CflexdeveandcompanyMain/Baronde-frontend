export default function Marq() {
  return (
    <div className="w-full bg-yellow-600 backdrop-blur-lg p-2">
      <div className="overflow-hidden">
        <div
          id="scrollingText"
          className="inline-block whitespace-nowrap text-sm font-medium text-white animate-scroll"
        >
          Get 20% off all products this {months[new Date().getMonth()]} with
          code {months[new Date().getMonth()].toUpperCase()} 20—offer ends{" "}
          {months[new Date().getMonth()]} 31st.
        </div>
      </div>
    </div>
  );
}

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
