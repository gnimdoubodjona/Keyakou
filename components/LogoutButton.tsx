"use client";
import { authClient } from "@/lib/client";
import { useRouter } from "next/navigation";


export default function LogoutButton() {
    //logique pour se déconnecter
    const router = useRouter();
    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/authentication/login");
    }

    return (
        <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
            Se déconnecter
        </button>
    );
}