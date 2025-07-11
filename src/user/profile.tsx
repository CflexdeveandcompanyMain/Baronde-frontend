import MainPageNavbar from "../mainpage/navbar/navbar";

export default function UserProfile() {
  return (
    <>
      <MainPageNavbar />
      <section className="w-full bg-white h-screen sm:bg-gray-200 flex flex-col items-center sm:gap-5 justify-start">
        <section className="w-full bg-white self-center sm:h-auto sm:w-3/5 mx-auto mt-20 rounded-sm flex flex-col items-center gap-5 p-3">
          <div className="flex flex-row items-center w-full justify-start gap-2">
            <p className="text-base font-all font-medium">Profile Details</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user-pen-icon lucide-user-pen text-emerald-700 cursor-pointer"
            >
              <path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
              <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
              <circle cx="10" cy="7" r="4" />
            </svg>
          </div>
          <div className="flex flex-col items-start w-full justify-start gap-4">
            <p className="font-all font-medium text-sm">Name</p>
            <p className="ml-5 font-all font-medium text-xs">Martins Olumide</p>
          </div>
          <div className="flex flex-col items-start w-full justify-start gap-4">
            <p className="font-all font-medium text-sm">Enter Email</p>
            <p className="ml-5 font-all font-medium text-xs">
              johndoe@gmail.com
            </p>
          </div>
          <div className="flex flex-col items-start w-full justify-start gap-4">
            <p className="font-all font-medium text-sm">Update password</p>
            <p className="ml-5 font-all font-medium text-xs">
              * * * * * * * * * * *
            </p>
          </div>
        </section>
        <section className="w-full bg-white self-center sm:h-auto sm:w-3/5 mx-auto rounded-sm flex flex-col items-center p-3">
          <div className="flex flex-col items-start w-full justify-start gap-3">
            <p className="font-all font-medium text-base">Address Details</p>
            <p className="ml-5 font-all font-medium text-xs">
              11, 9idiffu street, Abia state, Nigeria
            </p>
          </div>
        </section>
      </section>
    </>
  );
}
