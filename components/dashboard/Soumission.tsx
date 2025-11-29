"use client";

import { url } from "inspector";

interface ModalSoumissionProps {
    participationId: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function ModalSoumission({
    participationId,
    isOpen,
    onClose,
    onSuccess,
}: ModalSoumissionProps) {
    const [formData, setFormData] = useState({
        url: "",
        snipet: "",
        demo_url: "",
        capture_ecran: "",
        demo: "",
    });
    })
}