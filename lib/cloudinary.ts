import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
    secure: true,
})


// Générer une signature pour l'upload direct
export async function generateCloudinarySignature(folder: string = "challenge_assets") {
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Créer la signature avec Cloudinary SDK
    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp,
            folder,
            // Vous pouvez ajouter d'autres paramètres de sécurité ici
        },
        process.env.CLOUDINARY_API_SECRET!
    );

    return {
        signature,
        timestamp,
        api_key: process.env.CLOUDINARY_API_KEY!,
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        folder
    };
}


export default cloudinary;