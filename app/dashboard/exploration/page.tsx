import { getAllSoumissions } from "../action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHeart, 
  faComment, 
  faShare, 
  faEllipsisH
} from "@fortawesome/free-solid-svg-icons";

export default async function Exploration() {
    const soumissions = await getAllSoumissions();

    return (
        <div className="scrollbar-hide">
            {soumissions.map((s, index) => (
                <div
                    key={s.id}
                    className="flex items-center justify-center relative px-1 mb-8"
                >
                    {/* Container principal centré */}
                    <div className="relative max-w-96 w-full">
                        {/* Vidéo Card */}
                        {s.demo && (
                            <div className="relative rounded-2xl overflow-hidden border-2 border-white">
                                <video
                                    loop
                                    muted
                                    autoPlay
                                    playsInline
                                    preload="metadata"
                                    className="w-full aspect-[9/16] object-cover bg-black"
                                >
                                    <source src={s.demo} type="video/mp4" />
                                    Votre navigateur ne supporte pas la lecture de vidéos.
                                </video>
                            </div>
                        )}

                        {/* Icônes d'actions - côté droit */}
                        <div className="absolute -right-16 sm:-right-20 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                            {/* Like Button */}
                            <button className="flex flex-col items-center gap-1 group">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black border-2 border-white flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                                    <FontAwesomeIcon icon={faHeart} className="text-white text-lg sm:text-xl" />
                                </div>
                                <span className="text-white text-xs font-bold">234</span>
                            </button>

                            {/* Comment Button */}
                            <button className="flex flex-col items-center gap-1 group">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black border-2 border-white flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                                    <FontAwesomeIcon icon={faComment} className="text-white text-lg sm:text-xl" />
                                </div>
                                <span className="text-white text-xs font-bold">12</span>
                            </button>

                            {/* Share Button */}
                            <button className="flex flex-col items-center gap-1 group">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black border-2 border-white flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                                    <FontAwesomeIcon icon={faShare} className="text-white text-lg sm:text-xl" />
                                </div>
                                <span className="text-white text-xs font-bold">8</span>
                            </button>

                            {/* More Options Button */}
                            <button className="flex flex-col items-center gap-1 group">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black border-2 border-white flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                                    <FontAwesomeIcon icon={faEllipsisH} className="text-white text-lg sm:text-xl" />
                                </div>
                            </button>
                        </div>
                    </div>    
                </div>
            ))}
        </div>
    );
}