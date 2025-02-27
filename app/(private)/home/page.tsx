"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Page() {
  async function logout() {
    await signOut();
  }
  return (
    <div>
      <h1>Protected </h1>;<Button onClick={logout}>Logout</Button>
    </div>
  );
}
