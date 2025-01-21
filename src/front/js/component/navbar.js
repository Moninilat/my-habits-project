import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Styles.css";

export const Navbar = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
    const [isOpen, setIsOpen] = useState(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 800);
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
                <>
                <div className="burger-menu">
                    <button className="burger-button" onClick={() => setIsOpen(true)}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="burger-content-container" style={{ display: isOpen ? "block" : "none" }}>
                        <button className="close-button" onClick={() => setIsOpen(false)}>
                            <i class="fa-solid fa-x"></i>
                        </button>
                        <div className="burger-content" >
                           <ul>
                                <li>
                                    <i class="fa-solid fa-house"></i><Link to="/">Mis hábitos</Link>
                                </li>
                                <li>
                                    <i class="fa-solid fa-chart-column"></i><Link to="/about">Habit Tracker</Link>
                                </li>
                                <li>
                                    <i class="fa-regular fa-address-card"></i><Link to="/contact">Perfil</Link>
                                </li>
                           </ul>
                           
                            <div className="logout-menu">
                                    <Link to="/contact">Logout</Link><i class="fa-solid fa-arrow-right-from-bracket"></i>
                            </div>
                          
                        </div>
                    </div>
                </div>
                <div className="title" >
                    Proyecto Ninja
                </div>
                </>
                
            ) : (
                <div className="complete-menu">
                    <div className="logo">
                        <i class="fa-brands fa-google"></i><span className="complete-menu-title">Proyecto Ninja</span>
                    </div>
                    <div className="menu">
                        <Link to="/">Mis hábitos</Link>
                        <Link to="/about">Habit Tracker</Link>
                        <Link to="/contact">Perfil</Link>
                    </div>
                </div>
            
            )}
        </nav>
    );
};