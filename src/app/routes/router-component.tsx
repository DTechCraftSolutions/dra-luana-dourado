"use client";

import { useEffect } from "react";
import { Schedules } from "./pages/schedules";
import { Pending } from "./pages/pending";
import { useParams } from "next/navigation";
import { Patients } from "./pages/patients";
import { Professionals } from "./pages/professionals";
import { AvailabilityManagement } from "./pages/availability";
import { Procedures } from "./pages/procedures";

export function RouterComponent() {
  const params = useParams();
  const router = () => {
    if (!params.id) {
      return <Schedules />;
    } else if (params.id === "pending") {
      return <Pending />;
    } else if (params.id === "patients") {
      return <Patients />;
    } else if (params.id === "professionals") {
      return <Professionals />;
    } else if (params.id === "availability") {
      return <AvailabilityManagement />;
    } else if (params.id === "procedures") {
      return <Procedures />;
    }
  };
  console.log(params);
  return <div className="w-full h-full overflow-y-scroll">{router()}</div>;
}
