"use client";
import { IoMdNotifications } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export function Header() {
  const [dataProfile, setDataProfile] = useState<any>([]);
  const router = useRouter();
  function handleLogout() {
    Cookies.remove("token");
    router.push("/");
  }

  async function getProfile() {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        "http://localhost:3333/profile-professionals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setDataProfile(data.professionals);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <header className="w-full h-16 bg-primary flex fixed text-white justify-between items-center px-8">
      <h1 className="font-bold">Painel de controle</h1>
      <div className="flex justify-center items-center gap-4">
        <button className="w-8 h-8 flex items-center justify-center">
          <IoMdNotifications />
        </button>
        <Popover>
          <PopoverTrigger className="flex items-center gap-2 justify-center">
            <p>{dataProfile?.name ?? "usuário"}</p>

            <IoIosArrowDown />
          </PopoverTrigger>
          <PopoverContent className=" flex flex-col gap-4">
            <Image
              src="/dtr-luana-logo.png"
              alt="logo"
              width={100}
              height={100}
            />
            <p>
              <span className="font-semibold text-primary mr-1">
                {dataProfile?.name}
              </span>
              Seja Bem vindo &#40;a&#41; ao painel de controle Dra Luana dourado
            </p>

            <Button onClick={handleLogout} variant="outline" className="w-full">
              Sair
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
