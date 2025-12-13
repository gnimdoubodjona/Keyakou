import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faCheckCircle, faCode, faRocket, faTrophy, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Hero() {
    return (
        <div className="bg-black">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-40 px-4">
                {/* Grille Blueprint avec lignes en tirets */}
                <div className="absolute inset-0 opacity-20">
                    {/* Lignes verticales en tirets */}
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={`v-${i}`}
                            className="absolute top-0 bottom-0 w-px"
                            style={{
                                left: `${i * 10}%`,
                                background: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(255,255,255,0.4) 8px, rgba(255,255,255,0.4) 12px, transparent 12px, transparent 20px)'
                            }}
                        />
                    ))}
                    
                    {/* Lignes horizontales en tirets */}
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={`h-${i}`}
                            className="absolute left-0 right-0 h-px"
                            style={{
                                top: `${i * 12}%`,
                                background: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.4) 8px, rgba(255,255,255,0.4) 12px, transparent 12px, transparent 20px)'
                            }}
                        />
                    ))}
                    
                    {/* Croix aux intersections */}
                    {[...Array(12)].map((_, i) =>
                        [...Array(10)].map((_, j) => (
                            <div
                                key={`cross-${i}-${j}`}
                                className="absolute w-2 h-2"
                                style={{
                                    left: `${i * 10}%`,
                                    top: `${j * 12}%`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <div className="absolute inset-0 flex items-center justify-center text-white/50 text-[8px] font-bold">
                                    +
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Glow subtil blanc au centre (optionnel) */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Partie Gauche - Texte */}
                        <div className="space-y-8">
                            <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-bold text-black">
                                🚀 Plateforme de Challenges
                            </span>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                                Transformez vos idées
                                <br />
                                en <span className="underline decoration-wavy decoration-white/50">projets gagnants</span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                                Participez à des challenges de code, soumettez vos démos,
                                et montrez vos compétences à une communauté passionnée.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button className="group bg-white text-black px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-3">
                                    Commencer gratuitement
                                    <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <button className="group bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-white hover:text-black transition-all duration-300">
                                    Voir les challenges
                                </button>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-400 pt-4">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-white" />
                                <span>Connexion avec Google ou GitHub</span>
                            </div>
                        </div>

                        {/* Partie Droite - Floating Cards */}
                        <div className="relative min-h-[500px] lg:min-h-[600px] hidden lg:block">
                            {/* Floating Cards en noir et blanc */}
                            <div className="absolute inset-0">
                                <div className="absolute top-20 right-[25%] w-24 h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center transform rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300">
                                    <FontAwesomeIcon icon={faCode} className="text-4xl text-white" />
                                </div>
                                <div className="absolute top-40 right-[5%] w-24 h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center transform -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300">
                                    <FontAwesomeIcon icon={faGithub} className="text-4xl text-white" />
                                </div>
                                <div className="absolute top-1/2 right-[20%] w-28 h-28 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center transform -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-300">
                                    <FontAwesomeIcon icon={faRocket} className="text-5xl text-white" />
                                </div>
                                <div className="absolute bottom-32 right-[10%] w-24 h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-300">
                                    <FontAwesomeIcon icon={faTrophy} className="text-4xl text-white" />
                                </div>
                                <div className="absolute bottom-20 right-[35%] w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-300">
                                    <FontAwesomeIcon icon={faUsers} className="text-3xl text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}