'use client';

import { useEffect } from "react";
import { Schedules }  from "./pages/schedules"
import { Pending }  from "./pages/pending"
import { useParams } from "next/navigation";



export function RouterComponent() {
    const params = useParams()
    const router = () => {
        if (params.id === "schedules") {
            return <Schedules />
        } else if (params.id === "pending") {
            return <Pending />
        }
    }
    console.log(params)
    return (
        <div className="w-full h-full overflow-y-scroll">
            {router()}
        </div>
    );
}
