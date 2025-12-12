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
        <div className="h-screen  bg-black  scrollbar-hide">
            {soumissions.map((s, index) => (
                <div
                    key={s.id}
                    className=" flex items-center justify-center relative px-1"
                >
                    {/* Container principal centré */}
                    <div className="relative max-w-96 w-full">
                        {/* Vidéo Card */}
                        {s.demo && (
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white">
                                {/* Effet de lueur autour de la vidéo */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 border-2 border-white"></div>
                                
                                <div className="relative bg-black rounded-3xl  ">
                                    <video
                                        loop
                                        muted
                                        autoPlay
                                        playsInline
                                        preload="metadata"
                                        className="w-full aspect-[9/16] object-cover "
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

                 
                   
                </div>
            ))}

          
        </div>
    );
}