"use client"


import { signIn, signOut, useSession } from "next-auth/react"
export function Login() {

  const login = async (formData: FormData) => {
    const email = formData.get("email")
    const password = formData.get("password")
    await signIn("credentials", { email, password })
  }
  const { data: session } = useSession()
  return (
    <div>
      <p>
        {`client side session: ${session?.user?.email}, ${session?.user?.name}`}
      </p>
      <form
        className="grid gap-4"
        action={login}
      >
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <button className=" border border-white rounded-xl">
          Login
        </button>
      </form>
    </div >
  )
}

export function LogOut() {
  return (
    <button onClick={() => signOut()}>
      Logout
    </button>
  )
}
