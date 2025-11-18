// app/auth/signin/page.tsx

"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { signInSchema } from "@/lib/validation"

export default function SignInPage() {
  const [error, setError] = useState("")

  const handleSubmit = async (formData: FormData) => {
    const result = signInSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    })

    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    const res = await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirect: false,  // Handle response manually
    })

    if (res?.error) {
      setError("Invalid credentials")
    } else {
      window.location.href = "/"  // Redirect on success
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form action={handleSubmit} className="w-full max-w-md p-8 border rounded">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input name="email" type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" required />
        <input name="password" type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" required />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Sign In</button>
      </form>
    </div>
  )
}