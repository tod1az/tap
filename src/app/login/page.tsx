import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, AlertCircle } from "lucide-react"
import LoginForm from "@/components/login-form"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect("/")
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-balance">Sistema de Gestión Empresarial</h1>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">Ingrese sus credenciales para acceder al sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        <Card className="bg-muted/50">
          <CardContent className="py-1">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Acceso Restringido</p>
                <p className="text-xs text-muted-foreground">
                  Solo usuarios autorizados por el administrador pueden acceder al sistema. Si necesita una cuenta,
                  contacte al departamento de TI.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Sistema de Gestión Empresarial </p>
        </div>
      </div>
    </div>
  )
}
