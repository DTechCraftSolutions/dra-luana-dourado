'use client';

import { useEffect } from "react";
import { Schedules }  from "./pages/schedules"
import { Pending }  from "./pages/pending"
import { useParams } from "next/navigation";
import { Patients } from "./pages/patients";



export function RouterComponent() {
    const params = useParams()
    const router = () => {
        if (params.id === "schedules") {
            return <Schedules />
        } else if (params.id === "pending") {
            return <Pending />
        } else if (params.id === "patients") {
            return <Patients />
        }
    }
    console.log(params)
    return (
        <div className="w-full h-full overflow-y-scroll">
            {router()}
        </div>
    );
}
