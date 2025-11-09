
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) setMsg(data.error ?? "Failed");
    else {
      setMsg("Logged in! Redirecting...");
      setTimeout(() => router.push("/"), 500);
    }
  }
  return (
    <main className="mx-auto max-w-md">
      <div className="card">
        <h1 className="mb-6 text-2xl font-semibold">Log in</h1>
        <form onSubmit={submit} className="space-y-3">
          <input className="input" type="email" placeholder="Email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          <div className="relative">
            <input className="input pr-24" type={show ? "text" : "password"} placeholder="Password" required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
            <button type="button" className="absolute inset-y-0 right-2 my-1 rounded-lg px-3 text-sm text-gray-600 hover:bg-gray-100" onClick={() => setShow(s => !s)} aria-label="Toggle password visibility">
              {show ? "Hide" : "Show"}
            </button>
          </div>
          <button disabled={loading} className="btn" type="submit">{loading ? "Signing in..." : "Log in"}</button>
        </form>
        {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
        <p className="mt-6 text-sm text-gray-600">Need an account? <a className="text-indigo-600 hover:underline" href="/signup">Sign up</a></p>
      </div>
    </main>
  );
}
