import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav className="navbar">
            {isMobile ? (
                <div className="burger-menu">
                    <button className="burger-button">
                        &#9776; {/* Icono de menú hamburguesa */}
                    </button>
                    <div className="burger-content">
                        <Link to="/">Inicio</Link>
                        <Link to="/about">Acerca de</Link>
                        <Link to="/contact">Contacto</Link>
                    </div>
                </div>
            ) : (
                <div className="complete-menu">
                    <Link to="/">Inicio</Link>
                    <Link to="/about">Acerca de</Link>
                    <Link to="/contact">Contacto</Link>
                </div>
            )}
        </nav>
    );
};