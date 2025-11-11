import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    //vérifier si l'utilisateur est connecté
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        redirect("/authentication/login");
    }
    return (
        <div>
            <button>Deconnexion</button>
            <main>{children}</main>
        </div>

    );
}