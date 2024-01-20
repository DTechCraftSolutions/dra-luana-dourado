import { Aside } from "@/components/aside";
import { Header } from "@/components/header";
import { RouterComponent } from "../routes/RouterComponent";

export default function Schedules() {
    return (
        <main className="w-screen h-screen bg-secondary">
            <Header />
            <div className="w-full flex h-full pl-1/5 ">
                <Aside />
                <div className="w-4/5 h-full pt-16">
                    <RouterComponent />
                </div>
            </div>
        </main>
    )
}