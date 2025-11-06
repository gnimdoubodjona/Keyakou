import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-regular-svg-icons";



export default function NavBar() {
    return (
        <nav className="p-4 ">
            <FontAwesomeIcon icon={faHome} className="text-xl" />
            <span>Hello Nav Here</span>
        </nav>
    );
}
