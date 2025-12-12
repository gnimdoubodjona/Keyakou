import React from "react";

export default function Footer() {
    return (

        <footer className="py-12 px-4 bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto text-center">
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">DevChallenge</h3>
                    <p className="text-gray-400">La plateforme de challenges pour développeurs passionnés</p>
                </div>
                <div className="flex justify-center gap-6 mb-8">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">À propos</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Challenges</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Communauté</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                </div>
                <p className="text-gray-500">© 2024 DevChallenge. Tous droits réservés.</p>
            </div>
        </footer>

    );
}