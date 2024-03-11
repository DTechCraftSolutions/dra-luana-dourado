import { Aside } from "@/components/aside";
import { Header } from "@/components/header";
import { RouterComponent } from "../../routes/router-component";

export default function Schedules() {
    return (
        <main className="w-screen h-screen bg-secondary">
            <Header />
            <div className="w-full flex h-full pl-1/5 ">
                <Aside />
                <div className="md:w-4/5 w-full h-full overflow-hidden pt-16">
                    <RouterComponent />
                </div>
            </div>
        </main>
    )
}