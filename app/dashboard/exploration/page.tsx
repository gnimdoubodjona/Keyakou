import { getAllSoumissions } from "../action";


export default async function Exploration() {
    const soumissions = await getAllSoumissions();

    return (
        <div >
            <div >
                {soumissions.map((s, i) => (
                    <div
                        key={s.id}
                        className="justify-center items-center "
                    >
                        {/* SECTION VIDÉO - IMPORTANT: AFFICHAGE RÉEL DE LA VIDÉO */}
                        {s.demo && (
                            <div className="justify-center items-center">
                                <div className="">
                                    {/* CE CI EST LE LECTEUR VIDÉO RÉEL */}
                                    <video
                                        controls
                                        preload="metadata"
                                        className="m-2 p-36 rounded-lg border-2 border-black h-full w-full "
                                    >
                                        <source src={s.demo} type="video/mp4" />
                                        Votre navigateur ne supporte pas la lecture de vidéos.
                                    </video>
                                </div>
                            </div>
                        )}

                        {/* COMMENTAIRE */}
                        {s.commentaire_de_soumission && (
                            <div >
                                <h4 >
                                    Commentaire
                                </h4>
                                <p >
                                    {s.commentaire_de_soumission}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}