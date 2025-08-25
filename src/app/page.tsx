import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="bg-[#333333] min-h-screen text-white">
        <div className="bg-[#0D0D0D] flex items-center justify-center gap-4 p-4 h-[200px]">
          <Image
            src="/rocket.svg"
            alt="Rocket"
            width={21.99}
            height={36.01}
            priority
          />
          <div className="font-sans font-black text-[40px] leading-[100%] tracking-[0%]">
            <span className="text-[#4EA8DE]">Todo</span>{" "}
            <span className="text-[#5E60CE]">App</span>
          </div>
        </div>
        <div>
          The rest of the page!
        </div>
      </main>
    </>
  );
}