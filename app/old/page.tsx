import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={50}
          priority
        />
        <div>
            <h1>Welcome to Ustat</h1>
        </div>
        <div className="relative">
          <div className="bg-[#e4e4e4] h-[45px] w-[36px] rounded-[5px] relative">
            <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] text-black text-center">
              Words
            </div>

            {/* Icon button - clickable area */}
            <button
              className="absolute bottom-1 left-1/2 -translate-x-1/2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              {/* Circle background */}
              <div 
                className="size-[24px] rounded-full backgroundColor: #fC5B1F"
              />
              
              {/* Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[16px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <mask height="16" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="0" y="0">
                    <rect fill="#D9D9D9" height="16" width="16" />
                  </mask>
                  <g>
                    <path fill="#1C1B1F" />
                  </g>
                </svg>
              </div>
            </button>
          </div>

          <div className="absolute left-0 top-0 h-[45px] w-[138px] z-10">
            <svg className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 138 45">
              <path d="M0 0H133C135.761 0 138 2.23858 138 5V40C138 42.7614 135.761 45 133 45H0V0Z" fill="#E4E4E4" />
            </svg>
            
            {/* Close button */}
            <button
              className="absolute left-[10px] top-[14.5px] size-[16px] cursor-pointer hover:opacity-70"
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <mask height="16" id="mask_close" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="0" y="0">
                  <rect fill="#D9D9D9" height="16" width="16" />
                </mask>
                <g mask="url(#mask_close)">
                </g>
              </svg>
            </button>

            {/* Assist button */}
            <button
              className="absolute left-[54px] top-[14.5px] size-[16px] cursor-pointer hover:opacity-70"
            >
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <mask height="16" id="mask_assist_slideout" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="0" y="0">
                    <rect fill="#D9D9D9" height="16" width="16" />
                  </mask>
                  <g mask="url(#mask_assist_slideout)">
                  </g>
                </svg>
            </button>

            {/* Goal button */}
            <button
              className="absolute left-[96px] top-[10.5px] size-[16px] cursor-pointer hover:opacity-70"
            >
                <svg className="size-[16px]" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <mask height="16" id="mask_goal_slideout" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="16" x="0" y="0">
                    <rect fill="#D9D9D9" height="16" width="16" />
                  </mask>
                  <g mask="url(#mask_goal_slideout)">
                  </g>
                </svg>
            </button>
          </div>
        </div>



        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
