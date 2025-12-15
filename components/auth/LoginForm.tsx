"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faRocket, faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { authClient } from '@/lib/client';
import Swal from 'sweetalert2';

export default function LoginForm() {
    const signInWithGithub = async () => {
        try {
            // Notification de chargement - Style Blueprint
            Swal.fire({
                html: `
                    <div class="flex flex-col items-center gap-4 py-4">
                        <div class="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <h2 class="text-2xl font-bold text-white">Connexion en cours...</h2>
                        <p class="text-gray-400">Redirection vers GitHub</p>
                    </div>
                `,
                showConfirmButton: false,
                allowOutsideClick: false,
                background: 'rgba(0, 0, 0, 0.98)',
                backdrop: 'rgba(0, 0, 0, 0.85)',
                customClass: {
                    popup: 'border-2 border-gray-500/30 rounded-2xl backdrop-blur-lg'
                }
            });
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/dashboard",
            });
        } catch (error) {
            console.error("Erreur de connexion:", error);
            Swal.close();
            Swal.fire({
                html: `
                    <div class="flex flex-col items-center gap-4 py-4">
                        <div class="w-16 h-16 border-2 border-red-500/50 rounded-full flex items-center justify-center">
                            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </div>
                        <h2 class="text-2xl font-bold text-white">Erreur de connexion</h2>
                        <p class="text-gray-400">Impossible de se connecter avec GitHub</p>
                    </div>
                `,
                confirmButtonText: 'Réessayer',
                background: 'rgba(0, 0, 0, 0.98)',
                backdrop: 'rgba(0, 0, 0, 0.85)',
                customClass: {
                    popup: 'border-2 border-red-500/30 rounded-2xl backdrop-blur-lg',
                    confirmButton: 'bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold border border-white/20 hover:border-white/40 transition-all duration-300'
                },
                buttonsStyling: false
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            // Notification de chargement - Style Blueprint
            Swal.fire({
                html: `
                    <div class="flex flex-col items-center gap-4 py-4">
                        <div class="w-16 h-16 border-4 border-gray-100 border-t-white rounded-full animate-spin"></div>
                        <h2 class="text-2xl font-bold text-white">Connexion en cours...</h2>
                        <p class="text-gray-400">Redirection vers Google</p>
                    </div>
                `,
                showConfirmButton: false,
                allowOutsideClick: false,
                background: 'rgba(0, 0, 0, 0.98)',
                backdrop: 'rgba(0, 0, 0, 0.85)',
                customClass: {
                    popup: 'border-2 border-gray-500/30 rounded-2xl backdrop-blur-lg'
                }
            });
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
            });
        } catch (error) {
            console.error("Erreur de connexion:", error);
            Swal.close();
            Swal.fire({
                html: `
                    <div class="flex flex-col items-center gap-4 py-4">
                        <div class="w-16 h-16 border-2 border-red-500/50 rounded-full flex items-center justify-center">
                            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </div>
                        <h2 class="text-2xl font-bold text-white">Erreur de connexion</h2>
                        <p class="text-gray-400">Impossible de se connecter avec Google</p>
                    </div>
                `,
                confirmButtonText: 'Réessayer',
                background: 'rgba(0, 0, 0, 0.98)',
                backdrop: 'rgba(0, 0, 0, 0.85)',
                customClass: {
                    popup: 'border-2 border-red-500/30 rounded-2xl backdrop-blur-lg',
                    confirmButton: 'bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold border border-white/20 hover:border-white/40 transition-all duration-300'
                },
                buttonsStyling: false
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Glow fixe subtil */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
            </div>

            {/* Formulaire de connexion */}
            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl p-8 hover:border-white/30 transition-all duration-300">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 mb-4 animate-pulse">
                            <FontAwesomeIcon icon={faRocket} className="text-2xl text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Bienvenue
                        </h1>
                        <p className="text-gray-400">
                            Connectez-vous pour continuer
                        </p>
                    </div>

                    {/* Boutons de connexion */}
                    <div className="space-y-4">
                        {/* Bouton GitHub */}
                        <button
                            onClick={signInWithGithub}
                            className="group w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 text-white font-semibold py-4 px-4 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-white/20 hover:scale-105"
                        >
                            <FontAwesomeIcon 
                                icon={faGithub} 
                                className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
                            />
                            <span>Continuer avec GitHub</span>
                        </button>

                        {/* Séparateur */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-transparent text-gray-500">ou</span>
                            </div>
                        </div>

                        {/* Bouton Google */}
                        <button
                            onClick={handleGoogleLogin}
                            className="group w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-4 px-4 rounded-xl border border-white/20 hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-white/30 hover:scale-105"
                        >
                            <FontAwesomeIcon 
                                icon={faGoogle} 
                                className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
                            />
                            <span>Continuer avec Google</span>
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            En vous connectant, vous acceptez nos{' '}
                            <span className="text-white hover:underline cursor-pointer">
                                conditions d'utilisation
                            </span>
                        </p>
                    </div>
                </div>

                {/* Éléments décoratifs blueprint autour du formulaire */}
                <div className="absolute -top-12 -left-12 w-24 h-24 border border-white/20 rounded-full animate-spin opacity-50" style={{ animationDuration: '15s' }}></div>
                <div className="absolute -bottom-8 -right-8 w-16 h-16 border border-white/20 rounded-full animate-spin opacity-50" style={{ animationDuration: '20s' }}></div>
                <div className="absolute top-1/2 -right-16 w-12 h-12 border border-white/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 -left-16 w-8 h-8 border border-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
        </div>
    );
}