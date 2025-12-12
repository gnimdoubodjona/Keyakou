import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGithub,
    faGoogle
} from "@fortawesome/free-brands-svg-icons";
import {
    faCode,
    faTrophy,
    faUsers,
    faRocket,
    faArrowRight,
    faFire,
    faChartLine,
    faLightbulb,
    faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

export default function Body() {
    const challenges = [
        {
            title: "Build a Real-Time Chat App",
            status: "En cours",
            participants: 42,
            endDate: "15 Jan 2025",
            color: "from-purple-500 to-pink-500"
        },
        {
            title: "API REST avec Node.js",
            status: "À venir",
            participants: 28,
            endDate: "20 Jan 2025",
            color: "from-blue-500 to-cyan-500"
        },
        {
            title: "Dashboard Analytics",
            status: "Terminé",
            participants: 67,
            endDate: "10 Déc 2024",
            color: "from-green-500 to-emerald-500"
        }
    ];

    const features = [
        {
            icon: faFire,
            title: "Challenges Passionnants",
            description: "Relevez des défis techniques variés et améliorez vos compétences"
        },
        {
            icon: faUsers,
            title: "Communauté Active",
            description: "Rejoignez une communauté de développeurs passionnés et talentueux"
        },
        {
            icon: faTrophy,
            title: "Récompenses & Reconnaissance",
            description: "Gagnez des prix et faites-vous remarquer par des recruteurs"
        },
        {
            icon: faChartLine,
            title: "Progression Visible",
            description: "Suivez votre évolution et comparez-vous aux autres participants"
        }
    ];

    const steps = [
        {
            number: "01",
            title: "Inscrivez-vous",
            description: "Créez votre compte en quelques secondes avec Google ou GitHub"
        },
        {
            number: "02",
            title: "Choisissez un Challenge",
            description: "Parcourez les challenges disponibles et trouvez celui qui vous inspire"
        },
        {
            number: "03",
            title: "Codez & Soumettez",
            description: "Développez votre projet et partagez votre démo avec la communauté"
        },
        {
            number: "04",
            title: "Gagnez & Évoluez",
            description: "Récoltez des votes, grimpez dans le classement et remportez des prix"
        }
    ];

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-40 px-4">
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

                {/* Gradient Glow */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-red-600/30 via-purple-600/20 to-transparent blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Partie Gauche - Texte */}
                        <div className="space-y-8">
                            <span className="inline-flex items-center rounded-full bg-gray-300 p-2 m-1 hover:bg-gray-200 text-xl font-bold text-black inset-ring inset-ring-red-400/20">
                                Badge
                            </span>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                                Transformez vos idées
                                <br />
                                en <span className="bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">projets gagnants</span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                                Participez à des challenges de code, soumettez vos démos,
                                et montrez vos compétences à une communauté passionnée.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button className="group bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-3 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 flex items-center justify-center gap-3">
                                    Commencer gratuitement
                                    <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <button className="group bg-transparent border-2 border-gray-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-white/5 transition-all duration-300">
                                    Voir les challenges
                                </button>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-400 pt-4">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-400" />
                                <span>Connexion avec Google ou GitHub</span>
                            </div>
                        </div>

                        {/* Partie Droite - Floating Cards */}
                        <div className="relative min-h-[500px] lg:min-h-[600px]">
                            <div className="grid absolute inset-0 pointer-events-none">
                                {/* Position modifiée pour être à droite */}
                                <div className="absolute top-20 right-[25%] w-20 h-20 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-300">
                                    <FontAwesomeIcon icon={faCode} className="text-3xl text-purple-400" />
                                </div>
                                <div className="absolute top-40 right-[5%] w-20 h-20 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                                    <FontAwesomeIcon icon={faGithub} className="text-3xl text-white" />
                                </div>
                                <div className="absolute top-1/2 right-[20%] w-24 h-24 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                                    <FontAwesomeIcon icon={faRocket} className="text-4xl text-blue-400" />
                                </div>
                                <div className="absolute bottom-32 right-[10%] w-20 h-20 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
                                    <FontAwesomeIcon icon={faTrophy} className="text-3xl text-yellow-400" />
                                </div>
                                {/* Optionnel : Ajouter un élément supplémentaire */}
                                <div className="absolute bottom-20 right-[30%] w-16 h-16 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <FontAwesomeIcon icon={faUsers} className="text-2xl text-green-400" />
                                </div>
                            </div>

                            {/* Conteneur pour centrer visuellement */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-64 h-64 bg-gradient-to-br from-red-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 bg-gray-800/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Développeurs", value: "1,200+", icon: faUsers },
                            { label: "Challenges", value: "50+", icon: faCode },
                            { label: "Projets Soumis", value: "3,500+", icon: faRocket },
                            { label: "Prix Distribués", value: "25k€", icon: faTrophy }
                        ].map((stat, i) => (
                            <div key={i} className="text-center space-y-2">
                                <FontAwesomeIcon icon={stat.icon} className="text-4xl text-purple-400 mb-3" />
                                <div className="text-4xl font-bold text-white">{stat.value}</div>
                                <div className="text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Pourquoi DevChallenge ?
                        </h2>
                        <p className="text-xl text-gray-400">
                            Tout ce dont vous avez besoin pour progresser en tant que développeur
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
                            >
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                                    <FontAwesomeIcon icon={feature.icon} className="text-2xl text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 px-4 bg-gray-800/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Comment ça marche ?
                        </h2>
                        <p className="text-xl text-gray-400">
                            4 étapes simples pour commencer votre aventure
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="relative">
                                <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 h-full">
                                    <div className="text-6xl font-bold text-purple-500/20 mb-4">{step.number}</div>
                                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                    <p className="text-gray-400">{step.description}</p>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                        <FontAwesomeIcon icon={faArrowRight} className="text-2xl text-purple-500" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent Challenges */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Challenges Populaires
                            </h2>
                            <p className="text-xl text-gray-400">
                                Découvrez les challenges du moment
                            </p>
                        </div>
                        <button className="hidden md:block bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors">
                            Voir tous les challenges
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {challenges.map((challenge, i) => (
                            <div
                                key={i}
                                className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
                            >
                                <div className={`h-32 bg-gradient-to-r ${challenge.color}`}></div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${challenge.status === "En cours" ? "bg-green-500/20 text-green-400" :
                                            challenge.status === "À venir" ? "bg-blue-500/20 text-blue-400" :
                                                "bg-gray-500/20 text-gray-400"
                                            }`}>
                                            {challenge.status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{challenge.title}</h3>
                                    <div className="flex items-center justify-between text-gray-400 text-sm">
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faUsers} />
                                            <span>{challenge.participants} participants</span>
                                        </div>
                                        <span>Fin: {challenge.endDate}</span>
                                    </div>
                                    <button className="w-full mt-4 bg-purple-500/10 text-purple-400 py-3 rounded-xl font-semibold hover:bg-purple-500/20 transition-colors">
                                        Voir le challenge
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Prêt à relever le défi ?
                            </h2>
                            <p className="text-xl text-white/90 mb-8">
                                Rejoignez des milliers de développeurs et commencez votre aventure dès aujourd'hui
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2">
                                    S'inscrire gratuitement
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300">
                                    Explorer les challenges
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}