"use client"
import { Label } from "@radix-ui/react-label"
import { AlertCircle, User, Lock } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { redirect, useRouter } from "next/navigation"
import z from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, useSession } from "next-auth/react"


const loginSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty()
})

type LoginFields = z.infer<typeof loginSchema>

export default function LoginForm() {

  const router = useRouter()
  const { data: session } = useSession()
  if (session) router.push("/")


  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(loginSchema)
  })


  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    await signIn("credentials", data).then(() => router.push("/"))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errors.root && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <p className="text-sm text-destructive">{errors.root.message}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Correo Electrónico</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="usuario@empresa.com"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className="pl-10"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
      </Button>
    </form>

  )
}
