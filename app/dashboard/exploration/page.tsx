import { getAllSoumissions } from "../action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHeart, 
  faComment, 
  faShare, 
  faEllipsisH,
  faChevronUp,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

export default async function Exploration() {
    const soumissions = await getAllSoumissions();

    return (
        <div className="h-screen snap-y snap-mandatory bg-black overflow-clip scrollbar-hide">
            {soumissions.map((s, index) => (
                <div
                    key={s.id}
                    className=" snap-start flex items-center justify-center relative px-1"
                >
                    {/* Container principal centré */}
                    <div className="relative max-w-96 w-full">
                        {/* Vidéo Card */}
                        {s.demo && (
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                {/* Effet de lueur autour de la vidéo */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30"></div>
                                
                                <div className="relative bg-black rounded-3xl overflow-hidden border-2 border-white/20">
                                    <video
                                        loop
                                        muted
                                        autoPlay
                                        playsInline
                                        preload="metadata"
                                        className="w-full aspect-[3/4] object-cover"
                                    >
                                        <source src={s.demo} type="video/mp4" />
                                        Votre navigateur ne supporte pas la lecture de vidéos.
                                    </video>
                                </div>
                            </div>
                        )}

                        {/* Icônes d'actions - côté droit */}
                        <div className="absolute -right-16 sm:-right-20 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                            {/* Like Button */}
                            <button className="flex flex-col items-center gap-1 group">
                                <div className="relative">
                                    {/* Effet de lueur au hover */}
                                    <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                                    
                                    {/* Bouton principal */}
                                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-900/90 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-pink-500 group-hover:border-white/30 transition-all shadow-lg transform group-hover:scale-110 duration-300">
                                        <FontAwesomeIcon icon={faHeart} className="text-white text-lg sm:text-xl" />
                                    </div>
                                </div>
                                <span className="text-white text-xs font-bold">234</span>
                            </button>

                            {/* Comment Button */}
                            <button className="flex flex-col items-center gap-1 group">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                                    
                                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-900/90 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-cyan-500 group-hover:border-white/30 transition-all shadow-lg transform group-hover:scale-110 duration-300">
                                        <FontAwesomeIcon icon={faComment} className="text-white text-lg sm:text-xl" />
                                    </div>
                                </div>
                                <span className="text-white text-xs font-bold">12</span>
                            </button>

                            {/* Share Button */}
                            <button className="flex flex-col items-center gap-1 group">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                                    
                                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-900/90 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-gradient-to-br group-hover:from-green-500 group-hover:to-emerald-500 group-hover:border-white/30 transition-all shadow-lg transform group-hover:scale-110 duration-300">
                                        <FontAwesomeIcon icon={faShare} className="text-white text-lg sm:text-xl" />
                                    </div>
                                </div>
                                <span className="text-white text-xs font-bold">8</span>
                            </button>

                            {/* More Options Button */}
                            <button className="flex flex-col items-center gap-1 group">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-purple-500 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                                    
                                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-900/90 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 group-hover:border-white/30 transition-all shadow-lg transform group-hover:scale-110 duration-300">
                                        <FontAwesomeIcon icon={faEllipsisH} className="text-white text-lg sm:text-xl" />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Navigation avec icônes - côté gauche */}
                    <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 items-center">
                        {/* Bouton Haut (Précédent) */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            
                            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gray-900/90 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:border-white/40 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-500 transition-all shadow-lg group-hover:scale-110 cursor-pointer duration-300">
                                <FontAwesomeIcon icon={faChevronUp} className="text-white text-lg sm:text-xl" />
                            </div>
                        </div>

                        {/* Indicateurs de position */}
                        <div className="flex flex-col gap-3 items-center py-4">
                            {soumissions.map((_, i) => (
                                <div
                                    key={i}
                                    className={`rounded-full transition-all duration-300 ${
                                        i === index 
                                            ? 'bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 w-1.5 h-10 shadow-lg shadow-purple-500/50' 
                                            : 'bg-white/30 w-1.5 h-2'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Bouton Bas (Suivant) */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            
                            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gray-900/90 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:border-white/40 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 transition-all shadow-lg group-hover:scale-110 cursor-pointer duration-300">
                                <FontAwesomeIcon icon={faChevronDown} className="text-white text-lg sm:text-xl" />
                            </div>
                        </div>
                    </div>

                    {/* Compteur de position en bas */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                        <p className="text-white text-sm font-semibold">
                            {index + 1} / {soumissions.length}
                        </p>
                    </div>
                </div>
            ))}

            {/* Message si aucune soumission */}
            {soumissions.length === 0 && (
                <div className="h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-6xl mb-4">🎥</div>
                        <h2 className="text-2xl font-bold text-white mb-2">Aucune soumission</h2>
                        <p className="text-gray-400">Soyez le premier à partager votre code !</p>
                    </div>
                </div>
            )}
        </div>
    );
}