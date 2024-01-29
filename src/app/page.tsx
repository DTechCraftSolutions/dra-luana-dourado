import Image from "next/image";
import { details } from "../../details";
import { RoundedInput } from "@/components/rounded-input";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-[55%] h-[30%] md:h-full flex justify-center items-center overflow-hidden">
        <Image
          className="md:w-[300px] w-[200px]"
          src={details.image}
          alt="logo"
          quality={100}
          width={300}
          height={300}
          objectFit="cover"
        />
      </div>
      <div className="w-full md:w-[45%] h-full rounded-3xl rounded-b-none md:rounded-b-3xl md:rounded-r-none shadow-2xl text-white bg-primary flex flex-col justify-center items-center">
        <h1 className="font-bold mb-5 text-2xl text-center">
          Painel de controle
        </h1>
        <div className="w-full md:w-[80%] md:h-[50%] p-8">
          <form className="flex flex-col gap-3">
            <label htmlFor="email">Email</label>
            <RoundedInput
              className="text-black px-4 outline-none"
              id="email"
              type="email"
            />
            <label htmlFor="password">Senha</label>
            <RoundedInput
              className="text-black px-4 outline-none"
              id="password"
              type="password"
            />
            <Link href={"/dashboard/schedules"}>
              <button className="w-full bg-white h-14 text-primary font-bold shadow-md rounded-full mt-8">
                Entrar
              </button>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}
