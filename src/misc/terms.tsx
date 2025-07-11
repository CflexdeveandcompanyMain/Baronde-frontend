import { Globe, Mail } from "lucide-react";
import { MainPageNavbar } from "..";
import Footer from "../footer/footer";

export default function TermsOfService() {
  return (
    <>
      <MainPageNavbar />
      <section className="w-full h-full py-3 bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4">
        <div className="flex flex-col items-start w-[95%] gap-4 sm:h-auto sm:w-3/5 mx-auto mt-4 sm:mt-6">
          <div className="flex flex-col items-center w-full">
            <p className="font-all text-lg text-center w-full font-semibold">
              Terms of Use
            </p>
            <p className="font-all text-lg text-center w-full font-semibold">
              Last updated: 12 August 2025
            </p>
          </div>
          <div className="flex flex-col items-center w-full">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              introduction
            </p>
            <p className="font-all text-[12.5px] text-start">
              Welcome to Barondemusical. These Terms of Use ("Terms") govern
              your access to and use of our website{" "}
              <span className="underline">[www.barondemusical.com]</span>
              (the “Site”), including any content, functionality, and services
              offered through the Site. By accessing or using this Site, you
              agree to be bound by these Terms, our Privacy Policy, and any
              additional terms and conditions that may apply to specific
              sections of the Site. If you do not agree with these Terms, please
              do not use our services.
            </p>
          </div>
          <div className="flex flex-col items-center w-full gap-2">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              eligibility
            </p>
            <div className="flex flex-col items-center w-full justify-start">
              <p className="font-all text-xs text-start w-full">
                To use this site, you must:
              </p>
              <ul className="flex flex-col items-center w-full pl-7">
                <li className="font-all text-xs list-disc text-start w-full">
                  be at least 18 years old, or the age of majority in your
                </li>
                <li className="font-all text-xs list-disc text-start w-full">
                  jurisdiction Have legal capacity to enter a binding agreement
                </li>
                <li className="font-all text-xs list-disc text-start w-full">
                  Use this Site in compliance with applicable laws
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center w-full gap-2">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              account registration
            </p>
            <div className="flex flex-col items-center w-full justify-start">
              <p className="font-all text-xs text-start w-full">
                You may be required to register for an account to access certain
                features of the Site. By registering
              </p>
              <ul className="flex flex-col items-center w-full ml-3 pl-7">
                <li className="font-all text-xs text-start list-disc w-full">
                  You agree to provide accurate, complete, and updated
                  information
                </li>
                <li className="font-all text-xs text-start list-disc w-full">
                  You are responsible for maintaining the confidentiality of
                  your login credentials{" "}
                </li>
                <li className="font-all text-xs text-start list-disc w-full">
                  You agree to notify us of any unauthorized use of your account
                </li>
              </ul>
              <p className="font-all text-xs text-start w-full">
                We reserve the right to suspend or terminate accounts that
                violate these Terms or appear to be fraudulent
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              permitted use
            </p>
            <div className="flex flex-col items-center w-full justify-start gap-2">
              <p className="font-all text-xs text-start w-full">
                You agree to use this Site only for lawful purposes and in a way
                that does not infringe on the rights or restrict the use of the
                Site by others. You may not:
              </p>
              <ul className="flex flex-col items-center w-full pl-7">
                <li className="font-all text-xs text-start list-disc w-full">
                  Post or transmit any harmful, offensive, or unlawful content
                </li>
                <li className="font-all text-xs text-start list-disc w-full">
                  Access or collect user data without consent
                </li>
                <li className="font-all text-xs text-start list-disc w-full">
                  Attempt to interfere with or compromise the website's
                  integrity or security
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              product information and pricing
            </p>
            <p className="font-all text-[12.5px] text-start">
              We strive for accuracy but do not guarantee that all product
              descriptions, pricing, availability, or other information is
              error-free. We reserve the right to correct errors, change
              pricing, and update product information at any time.
              <br />
              All prices are listed in Naira (₦) unless stated otherwise.
            </p>
          </div>
          <div className="flex flex-col items-center w-full">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              orders and payment
            </p>
            <div className="flex flex-col items-center w-full justify-start">
              <p className="font-all text-xs text-start w-full">
                When you place order:
              </p>
              <ul className="flex flex-col items-center w-full pl-7">
                <li className="font-all text-xs text-start list-disc w-full">
                  You agree that all information provided is accurate and
                  complete
                </li>
                <li className="font-all text-xs text-start list-disc w-full">
                  We reserve the right to cancel or refuse any order at our
                  discretion
                </li>
                <li className="font-all text-xs text-start list-disc w-full">
                  Payment must be completed through accepted payment methods
                  before shipment
                </li>
              </ul>
              <p className="font-all text-sm text-start w-full">
                If your order is canceled after payment, a refund will be issued
                according to our [Refund & Return Policy].
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              intellectual property
            </p>
            <p className="font-all text-[12.5px] text-start">
              All content on this Site, including logos, images, product
              descriptions, and media, are the property of Barondemusical or its
              licensors and are protected by copyright, trademark, and other
              intellectual property laws. You may not reproduce, distribute, or
              use any content without prior written permission.
            </p>
          </div>
          <div className="flex flex-col items-center w-full">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              third-party links
            </p>
            <p className="font-all text-[12.5px] text-start">
              This Site may include links to third-party websites or services.
              These are provided for your convenience and do not signify our
              endorsement. We are not responsible for the content or services of
              third-party sites.
            </p>
          </div>
          <div className="flex flex-col items-center w-full">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              limitation of liability
            </p>
            <div className="flex flex-col items-center w-full justify-start">
              <p className="font-all text-xs text-start w-full">
                To the fullest extent permitted by law, Barondemusical and its
                officers, employees, or agents shall not be liable for any
                direct, indirect, incidental, or consequential damages resulting
                from:
              </p>
              <ul className="flex flex-col items-center w-full pl-7">
                <li className="font-all text-xs text-start w-full list-disc">
                  The use or inability to use the Site or services
                </li>
                <li className="font-all text-xs text-start w-full list-disc">
                  Errors or inaccuracies in the conten
                </li>
                <li className="font-all text-xs text-start w-full list-disc">
                  Unauthorized access to or alteration of your transmissions or
                  data
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              termination
            </p>
            <p className="font-all text-[12.5px] text-start">
              We reserve the right to terminate or suspend your access to the
              Site without notice if you violate these Terms. Upon termination,
              all provisions of these Terms which by their nature should survive
              shall remain in effect.
            </p>
          </div>
          <div className="flex flex-col items-center w-full">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              changes of the term
            </p>
            <p className="font-all text-[12.5px] text-start">
              We may update these Terms at any time. Changes will be posted to
              this page with an updated date. Continued use of the Site after
              such changes constitutes acceptance of the updated Terms.
            </p>
          </div>
          <div className="flex flex-col items-center w-full">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              governing law
            </p>
            <p className="font-all text-[12.5px] text-start">
              These Terms are governed by the laws of the Federal Republic of
              Nigeria, without regard to its conflict of laws principles.
            </p>
          </div>

          <div className="flex flex-col items-center w-full mt-2">
            <p className="font-all sm:text-lg text-sm text-start w-full uppercase font-semibold">
              contact us
            </p>
            <div className="flex flex-col items-start w-full">
              <p className="font-all text-sm text-start w-full">
                For any questions about these Terms, you can contact us at:
              </p>
              <p className="font-all text-sm text-start w-full">
                <Mail /> Email: info@barondemusical.com
              </p>
              <p className="font-all text-sm text-start w-full">
                <Globe /> Website:{" "}
                <a href="www.barondemusical.com" className="hover:underline">
                  www.barondemusical.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
