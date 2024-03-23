"use client";
import { Suspense, useEffect } from "react";
import Schedules from "./(dashboard)/[id]/page";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Loading from "./loading";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Schedules />
      </Suspense>
    </>
  );
}
