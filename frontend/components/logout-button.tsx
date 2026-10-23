
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-6 rounded bg-red-600 px-4 py-2 text-white"
    >
      Log out
    </button>
  );
}
