import { getAllSoumissions } from "../action";

export default async function Exploration() {
    const soumissions = await getAllSoumissions();

    return (
        <div className="h-screen  snap-y snap-mandatory">
            {soumissions.map((s, index) => (
                <div
                    key={s.id}
                    className="snap-start flex items-center justify-center relative px-1"
                >
                    {/* Container principal centré */}
                    <div className="relative max-w-md w-full">
                        {/* Vidéo Card */}
                        {s.demo && (
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <video
                                    
                                    preload="metadata"
                                    className="w-full aspect-[4/5] object-cover"
                                >
                                    <source src={s.demo} type="video/mp4" />
                                    Votre navigateur ne supporte pas la lecture de vidéos.
                                </video>

                                {/* Info en bas */}
                                {/* <div className="absolute bottom-0 left-0 right-0 p-4 ">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-2 ring-white">
                                            <i className="fas fa-user text-white text-sm"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-sm">
                                                @challenger_{s.id}
                                            </h3>
                                            <p className="text-gray-300 text-xs">
                                                <i className="fas fa-clock mr-1"></i>
                                                Il y a 2h
                                            </p>
                                        </div> 
                                        <button className="ml-auto px-4 py-1 bg-white text-black rounded-full text-xs font-bold hover:bg-gray-200 transition-colors">
                                            Suivre
                                        </button>
                                    </div>

                                    {s.commentaire_de_soumission && (
                                        <p className="text-white text-sm leading-relaxed line-clamp-2">
                                            {s.commentaire_de_soumission}
                                        </p>
                                    )}

                                    <div className="flex gap-2 mt-2 flex-wrap">
                                        <span className="text-blue-400 text-xs font-semibold">
                                            #challenge
                                        </span>
                                        <span className="text-blue-400 text-xs font-semibold">
                                            #dev
                                        </span>
                                        <span className="text-blue-400 text-xs font-semibold">
                                            #coding
                                        </span>
                                    </div>
                                </div>  */}
                            </div>
                        )}

                        {/* Icônes sur le côté droit */}
                        <div className="absolute -right-20 top-1/2 -translate-y-1/2 flex flex-col gap-5">
                            {/* Like */}
                            <button className="flex flex-col items-center gap-1 group">
                                <div className="w-14 h-14 rounded-full bg-gray-800/90 backdrop-blur-md flex items-center justify-center group-hover:bg-red-500 transition-all shadow-lg">
                                    <i className="fas fa-heart text-white text-2xl"></i>
                                </div>
                                <span className="text-white text-xs font-bold">234</span>
                            </button>

                            {/* Comment */}
                            <button className="flex flex-col items-center gap-1 group">
                                <div className="w-14 h-14 rounded-full bg-gray-800/90 backdrop-blur-md flex items-center justify-center group-hover:bg-blue-500 transition-all shadow-lg">
                                    <i className="fas fa-comment text-white text-2xl"></i>
                                </div>
                                <span className="text-white text-xs font-bold">12</span>
                            </button>

                            {/* Share */}
                            <button className="flex flex-col items-center gap-1 group">
                                <div className="w-14 h-14 rounded-full bg-gray-800/90 backdrop-blur-md flex items-center justify-center group-hover:bg-green-500 transition-all shadow-lg">
                                    <i className="fas fa-share text-white text-2xl"></i>
                                </div>
                                <span className="text-white text-xs font-bold">8</span>
                            </button>

                            {/* More */}
                            <button className="flex flex-col items-center gap-1 group">
                                <div className="w-14 h-14 rounded-full bg-gray-800/90 backdrop-blur-md flex items-center justify-center group-hover:bg-purple-500 transition-all shadow-lg">
                                    <i className="fas fa-ellipsis-h text-white text-2xl"></i>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Indicateurs de scroll sur le côté gauche */}
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                        {/* Indicateur de position */}
                        <div className="flex flex-col gap-2 items-center">
                            {soumissions.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 rounded-full transition-all ${
                                        i === index ? 'bg-white h-8' : 'bg-white/40 h-2'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}