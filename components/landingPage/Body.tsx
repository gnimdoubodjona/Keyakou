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