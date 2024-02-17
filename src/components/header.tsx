import { IoMdNotifications } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image";




export function Header() {
    return (
        <header className="w-full h-16 bg-primary flex fixed text-white justify-between items-center px-8">
            <h1 className="font-bold">
                Painel de controle
            </h1>
            <div className="flex justify-center items-center gap-4">
                <button className="w-8 h-8 flex items-center justify-center">
                    <IoMdNotifications />
                </button>
                <Popover>
                    <PopoverTrigger className="flex items-center justify-center">
                        <p>
                            Usuário
                        </p>
                        <IoIosArrowDown />
                    </PopoverTrigger>
                    <PopoverContent className=" flex flex-col gap-4">
                        <Image src="/dtr-luana-logo.png" alt="logo" width={100} height={100} />
                        <p>
                            <span className="font-semibold text-primary mr-1">
                                Usuário
                            </span>
                            Seja Bem vindo &#40;a&#41; ao painel de controle Dra Luana dourado
                        </p>

                        <Button variant="outline" className="w-full">
                            Sair
                        </Button>
                    </PopoverContent>

                </Popover>
            </div>
        </header>
    )
}