"use client"

import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SiginInPage() {

    const { isLoaded, user } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (isLoaded && user) {
          router.push("/"); // Redirect to a protected page
      }
    }, [isLoaded, user, router]);

    if (!isLoaded) return <div>Loading...</div>;

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignIn />
    </main>
  );
}
