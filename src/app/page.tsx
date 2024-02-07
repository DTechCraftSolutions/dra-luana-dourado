"use client";
import Image from "next/image";
import { details } from "../../details";
import { RoundedInput } from "@/components/rounded-input";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface DataProps {
  email: string;
  password: string;
}
export default function Home() {
  const [data, setData] = useState<DataProps>({
    email: "",
    password: "",
  });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
  const router = useRouter();

  async function handleLogin(data: DataProps, event: React.FormEvent) {
    event.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/authenticate-professionals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      const { token } = responseData;
      if (token) {
        Cookies.set("token", token);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setData({
        email: "",
        password: "",
      });
      router.push("/dashboard/schedules");
    }
  }
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
      <div
        className="w-full md:w-[45%] h-full rounded-3xl rounded-b-none 
        md:rounded-b-3xl md:rounded-r-none shadow-2xl text-white bg-primary 
        flex flex-col justify-center items-center"
      >
        <h1 className="font-bold mb-5 text-2xl text-center">
          Painel de controle
        </h1>
        <div className="w-full md:w-[80%] md:h-[50%] p-8">
          <form
            onSubmit={(e) => handleLogin(data, e)}
            className="flex flex-col gap-3"
          >
            <label htmlFor="email">Email</label>
            <RoundedInput
              className="text-black px-4 outline-none"
              id="email"
              type="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <label htmlFor="password">Senha</label>
            <RoundedInput
              className="text-black px-4 outline-none"
              id="password"
              type="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <Link href={"/dashboard/schedules"}>
              <button
                onClick={(event) => handleLogin(data, event)}
                type="submit"
                className="w-full bg-white h-14 text-primary font-bold 
                shadow-md rounded-full mt-8 hover:opacity-70 transition-all duration-300"
              >
                Entrar
              </button>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}
