import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../styles/Styles.css";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Context } from "../store/appContext";
export const Navbar = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(store.token)
    console.log(token);
    
    const handleNavigate = (e) => {
        e.preventDefault();
        navigate("/")
    }

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 800);
    };
    const handleLogout = () => {
        actions.logout();
        setToken(null)
        setUser(null)
        navigate("/");
    };

    const getUser = async () => {
        if (!token) return;
        const response = await fetch(`${process.env.BACKEND_URL}/api/user/`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },

        })

        if (!response.ok) {
            // throw ("Error al obtener los datos del usuario")
            navigate("/");
        } else {
            const data = await response.json()
            console.log(data);
            setUser(data)
        }
    }

    useEffect(() => {

        getUser()

    }, [store.token])

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
                    {user &&
                        <div className="burger-menu">
                            <button className="burger-button" onClick={() => setIsOpen(true)}>
                                <MenuIcon />
                            </button>
                            <div className="burger-content-container" style={{ display: isOpen ? "block" : "none" }}>
                                <button className="close-button" onClick={() => setIsOpen(false)}>
                                    <CloseIcon />
                                </button>
                                <div className="burger-content" >
                                    <ul>
                                        <li>
                                            <InsertChartOutlinedIcon /><Link to="/ranking">Ranking</Link>
                                        </li>
                                        <li>
                                            <AccountCircleOutlinedIcon /><Link to="/perfil">Perfil</Link>
                                        </li>
                                    </ul>

                                    <div className="logout-menu">
                                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    }
                    <div className="s-title" >
                        Proyecto Ninja
                    </div>
                </>

            ) : (
                <div className="complete-menu">
                    <div className="logo">
                        <i class="fa-brands fa-google"
                            onClick={handleNavigate}
                            style={{ cursor: "pointer" }}
                        ></i><span className="complete-menu-title">Proyecto Ninja</span>
                    </div>
                    {user &&
                        <div className="menu">
                            <Link to="/ranking">Ranking</Link>
                            <Link to="/perfil">Perfil</Link>
                            <button className="logout-button" onClick={handleLogout}>Logout</button>
                        </div>
                    }
                </div>

            )}
        </nav>
    );
};