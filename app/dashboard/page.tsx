
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Dashboard() {

    const session = await auth.api.getSession({ headers: await headers() });

    return (
        <div>
            <h2>Bienvenu {session?.user.name} </h2>
            <p>Email :
                <strong> {session?.user.email} </strong>
            </p>
            <div className="space-y-2">
                <p>Email: {session?.user.email}</p>
                <p><strong>ID:</strong> {session?.user.id}</p>
                {session?.user.image && (
                    <img
                        src={session.user.image}
                        alt="Avatar"
                        className="w-16 h-16 rounded-full"
                    />
                )}
            </div>
        </div>
    );
}