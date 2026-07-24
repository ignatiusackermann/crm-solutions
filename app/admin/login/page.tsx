import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  COOKIE_NAME,
  adminEmail,
  createAdminSessionToken,
  validateAdminPassword,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ return_to?: string; error?: string }>;

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const returnTo =
    params.return_to && params.return_to.startsWith("/")
      ? params.return_to
      : "/admin/payments";

  async function login(formData: FormData) {
    "use server";
    const password = String(formData.get("password") || "");
    const nextPath = String(formData.get("return_to") || "/admin/payments");
    const ok = await validateAdminPassword(password);
    if (!ok) {
      redirect(
        `/admin/login?error=1&return_to=${encodeURIComponent(nextPath)}`,
      );
    }

    const token = await createAdminSessionToken(adminEmail());
    const jar = await cookies();
    jar.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    redirect(nextPath.startsWith("/") ? nextPath : "/admin/payments");
  }

  return (
    <main className="admin-page">
      <div className="admin-denied" style={{ minHeight: "100vh" }}>
        <div>
          <p className="eyebrow">Private administration</p>
          <h1>Admin sign-in</h1>
          <p>
            Enter the administrator password configured in Vercel as{" "}
            <code>ADMIN_PASSWORD</code>.
          </p>
          {params.error ? (
            <p style={{ color: "#c75c36" }}>Invalid password. Try again.</p>
          ) : null}
          <form action={login} style={{ marginTop: 24, display: "grid", gap: 12 }}>
            <input type="hidden" name="return_to" value={returnTo} />
            <label>
              Password
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                style={{ display: "block", width: "100%", marginTop: 8 }}
              />
            </label>
            <button type="submit" className="text-link">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
