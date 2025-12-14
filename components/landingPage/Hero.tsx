import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faCheckCircle, faCode, faRocket, faTrophy, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Hero() {
    return (
        <div className="bg-black">
            {/* Hero Section */}
            <section className="relative overflow-hidden p-10">
                {/* Glow subtil blanc au centre (optionnel) */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Partie Gauche - Texte */}
                        <div className="space-y-8">
                            <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-bold text-black">
                                🚀 Plateforme de Challenges
                            </span>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                                Apprenez tout en vous
                                <br />
                                <span className=" p-3 bg-gray-600 border rounded-lg ">cHallengEANT</span>
                                <br />
                                <span >maintenant.</span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                                Participez à des challenges de code, soumettez vos démos,
                                et montrez vos compétences à une communauté passionnée.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button className="group bg-white text-black px-8 py-3 rounded-xl font-bold text-lg hover:bg-white transition-all duration-300 flex items-center justify-center gap-3">
                                    Commencer gratuitement
                                    <FontAwesomeIcon
                                        icon={faRocket}
                                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                                    />
                                </button>

                                <button className="group bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold text-lg  transition-all duration-300">
                                    Voir les challenges
                                </button>
                            </div>

                            {/* <div className="flex items-center gap-2 text-sm text-gray-400 pt-4">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-white" />
                                <span>Connexion avec Google ou GitHub</span>
                            </div> */}
                        </div>

                        {/* Partie Droite - Floating Cards avec Grille */}
                        <div className="relative min-h-[500px] lg:min-h-[600px] hidden lg:block">
                            {/* Grille Blueprint - UNIQUEMENT côté droit */}
                            <div className="absolute inset-0 opacity-25">
                                {/* Lignes verticales en tirets */}
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={`v-${i}`}
                                        className="absolute top-0 bottom-0 w-px"
                                        style={{
                                            left: `${i * 20}%`,
                                            // right: `${(i*20)}%`,
                                            background: 'white 1px linear-gradient(0deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 15px, transparent 15px, transparent 25px)'
                                        }}
                                    />
                                ))}

                                {/* Lignes horizontales en tirets */}
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={`h-${i}`}
                                        className="absolute left-0 right-0 h-px"
                                        style={{
                                            top: `${i * 16.66}%`,
                                            // bottom: `${(i*16.66)}%`,
                                            background: 'white 1px linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 15px, transparent 15px, transparent 25px)'
                                        }}
                                    />
                                ))}

                                {/* Croix aux intersections */}
                                {[...Array(4)].map((_, i) =>
                                    [...Array(4)].map((_, j) => (
                                        <div
                                            key={`cross-${i}-${j}`}
                                            className="absolute"
                                            style={{
                                                left: `${i * 20}%`,
                                                top: `${j * 16.66}%`,
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                        >
                                            <div className="text-white text-2xl font-bold">+</div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Floating Cards alignées sur la grille */}
                            <div className="absolute inset-0">
                                {/* Card 1 - Intersection (4, 1) - faCode */}
                                <div
                                    className="absolute w-24 h-24 bg-white/10 backdrop-blur-sm border border-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300"
                                    style={{
                                        left: '60%',
                                        top: '16.66%',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCode} className="text-4xl text-white" />
                                </div>

                                {/* Card 2 - Intersection (5, 2) - faGithub */}
                                <div
                                    className="absolute w-24 h-24 bg-white/10 backdrop-blur-sm border border-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300"
                                    style={{
                                        left: '40%',
                                        top: '48.64%',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faGithub} className="text-4xl text-white" />
                                </div>



                                {/* Card 4 - Intersection (4, 5) - faTrophy */}
                                <div
                                    className="absolute w-24 h-24 bg-white/10 backdrop-blur-sm border border-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300"
                                    style={{
                                        left: '80%',
                                        top: '48.64%',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrophy} className="text-4xl text-white" />
                                </div>

                                {/* Card 5 - Intersection (2, 4) - faUsers */}
                                <div
                                    className="absolute w-24 h-24 bg-white/10 backdrop-blur-sm border border-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300"
                                    style={{
                                        left: '-10%',
                                        top: '48.64%',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                >
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