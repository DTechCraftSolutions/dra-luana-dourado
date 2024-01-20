import { IoMdNotifications } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";



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
                <button className="flex items-center justify-center">
                    <p>
                        Usuário
                    </p>
                    <IoIosArrowDown />
                </button>
            </div>
        </header>
    )
}