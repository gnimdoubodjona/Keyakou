"use client";

import { soumettreElement } from "@/app/dashboard/action";
import { useState } from "react";

export default function SoumissionModal({ participationId, challengeId }: any) {

    console.log("📌 SoumissionModal - participationId:", participationId);
    console.log("📌 SoumissionModal - challengeId:", challengeId);

    const [open, setOpen] = useState(false);


    return (
        <div>
            <button onClick={() => setOpen(true)}>Faire une soumission</button>

            {open && (
                <div className="">
                    <div >

                        <h2>Nouvelle Soumission</h2>

                        <form action={soumettreElement} >

                            <input type="hidden" name="participationId" value={participationId} />
                            <input type="hidden" name="id" value={challengeId} />

                            <label>URL GitHub</label>
                            <input name="url" className="border" />

                            <label>Snippet</label>
                            <textarea name="snippet"></textarea>

                            <label>URL Projet</label>
                            <input name="projet_url" />

                            <label>Vidéo demo</label>
                            <input type="file" name="video" accept="video/*" />

                            <label>Capture d'écran</label>
                            <input type="file" name="capture_ecran" accept="image/*" />

                            <button type="submit">Envoyer</button>
                        </form>

                        <button onClick={() => setOpen(false)}>Fermer</button>
                    </div>
                </div>
            )}
        </div>
    );
}
