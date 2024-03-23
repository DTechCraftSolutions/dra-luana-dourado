import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center w-full h-full items-center">
      <Image
        className="mt-36 animate-pulse"
        src="/dtr-luana-logo.png"
        alt="loading"
        width={350}
        height={350}
      />
    </div>
  );
}
