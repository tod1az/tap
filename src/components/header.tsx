import { getServerSession } from "next-auth";
import LogOutButton from "./logout-button";
import { redirect } from "next/navigation";

export default async function Header() {

  const session = await getServerSession()
  if (!session) redirect("/login")

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Sistema de Gestión Empresarial</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Bienvenido, <span className="font-medium text-foreground">{session.user?.name}</span>
            </span>
            <LogOutButton />
          </div>
        </div>
      </div>
    </header>
  )
}


