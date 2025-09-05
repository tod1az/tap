"use client"
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

async function handleLogout() {
  await signOut()
}

export default function LogOutButton() {
  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      Cerrar Sesión
    </Button>

  )
}

