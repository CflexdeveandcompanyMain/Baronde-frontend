import { MainPageNavbar } from "..";
import Footer from "../footer/footer";

export default function ShippingPolicy() {
  return (
    <>
      <MainPageNavbar />
      <section className="w-full h-full py-3 bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4">
        <div className="flex flex-col items-start w-[95%] gap-4 sm:h-auto sm:w-3/5 mx-auto mt-4 sm:mt-6">
          <div className="flex flex-col items-center w-full">
            <p className="font-all text-lg text-center w-full font-semibold">
              Shipping Policy
            </p>
            <p className="font-all text-lg text-center w-full font-semibold">
              Last updated: 12 August 2025
            </p>
          </div>
          <div className="flex flex-col items-center w-full gap-2">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              delivery cost
            </p>
            <div className="flex flex-col items-center w-full justify-start">
              <ul className="flex flex-col items-center w-full pl-7 gap-2">
                <li className="font-all text-xs list-disc text-start w-full">
                  Delivery is free within Lagos, Abuja, Port Harcourt, and Kano
                  for orders of N500,000 or more and within 15km of the showroom
                  or warehouse. For orders below this amount, a delivery fee of
                  NGN 6,000 applies. If the delivery distance exceeds 15km, an
                  additional fee will apply, and our team will contact you with
                  the exact charge.
                </li>
                <li className="font-all text-xs list-disc text-start w-full">
                  For within all other State Capital delivery cost is based on
                  weight of product and prices charged by FEDEX
                </li>
                <li className="font-all text-xs list-disc text-start w-full">
                  For outside State Capital, around capital metropolis or state
                  remote areas an extra cost of N2500 applies by FEDEX If order
                  is below 100,000NGN.
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center w-full gap-2">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              the delivery time
            </p>
            <div className="flex flex-col items-center w-full justify-start">
              <ul className="flex flex-col items-center w-full pl-7">
                <li className="font-all text-xs list-disc text-start w-full">
                  For within Lagos, Abuja, Port-Harcourt and Kano delivery is
                  from 6 to 10 working days.
                </li>
                <li className="font-all text-xs list-disc text-start w-full">
                  For within all other State Capital delivery is up to 12
                  working days.
                </li>
                <li className="font-all text-xs list-disc text-start w-full">
                  For outside State Capital, around metropolis, and remote areas
                  delivery is up to 14 working days.
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              nationwide delivery commitment fee
            </p>
            <p className="font-all text-[12.5px] text-start">
              Barondemusical requires a commitment fee for all nationwide
              delivery orders, applicable to all Nigerian states with delivery
              managed by FedEx Nigeria, excluding Lagos, Rivers, Kano, and the
              FCT. This fee, equivalent to the FedEx delivery charge, must be
              paid in advance at the time of order confirmation and before the
              order is shipped. This policy is designed to ensure customer
              commitment and mitigate the risk of post-delivery cancellations.
              The fee is non-refundable once the order is dispatched.
            </p>
          </div>
          <div className="flex flex-col items-center w-full">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              special requirement:
            </p>
            <p className="font-all text-[12.5px] text-start">
              If customer request for special date & time of delivery,
              instructions should be sent prior delivery to info@jamarahome.com
              or call 09062959839. Barondemusical will ensure to respect those
              instructions but cannot fully guarantee accomplishment due to
              third party logistic provider.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
