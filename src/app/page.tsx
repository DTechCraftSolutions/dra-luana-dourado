"use client";
import { useEffect } from "react";
import Schedules from "./(dashboard)/[id]/page";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
      <Schedules />
    </>
  );
}
