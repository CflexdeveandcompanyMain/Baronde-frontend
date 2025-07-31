import { danger } from "..";

export default function CheckoutFailure() {
  return (
    <section className="w-full h-screen bg-red-200 flex justify-center">
      <div className="sm:w-[47%] flex flex-col justify-start w-[90%] mx-auto shadow-xl gap-4 self-center h-[350px] my-auto rounded-lg bg-white p-3">
        <img src={danger} className="sm:w-24 sm:h-24 w-15 h-15 object-cover" />
        <div className="flex flex-col items-start mx-auto w-[95%]">
          <p className="font-all text-xl w-full text-start font-semibold text-stone-800">
            Payment Failed!
          </p>
          <p className="text-sm font-all text-start w-full">
            Hey there, We're sorry, your payment could not be processed!
          </p>
          <div className="flex flex-col items-start w-full mt-3">
            <p className="font-all text-base font-medium w-full text-start">
              Possible reasons
            </p>
            <ul className="flex flex-col items-start w-full justify-start pl-7">
              <li className="font-all text-sm list-disc">
                Your card was declined by your bank.
              </li>
              <li className="font-all text-sm list-disc">
                You entered incorrect card details
              </li>
              <li className="font-all text-sm list-disc">
                There was a temporary issue with the payment gateway
              </li>
              <li className="font-all text-sm list-disc">
                Your account has insufficient funds.
              </li>
            </ul>
          </div>
          <button
            onClick={() => (window.location.href = "/signin")}
            className="bg-black p-2 text-sm my-3 rounded shadow text-white font-all"
          >
            Go back home
          </button>
        </div>
      </div>
    </section>
  );
}
