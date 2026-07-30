import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav, ScrollLink, SignNavLink, NavMenu, LogoArea } from "../elementos/NavbarElements";

const Navbar = ({ isAuthenticated, onLogout }) => {
    const navigate = useNavigate();

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            navigate("/", { state: { scrollTo: id } });
        }
    };

    // Cuando el usuario está autenticado, la Navbar se oculta
    // porque el Dashboard tiene su propio TopBar con usuario y cerrar sesión
    if (isAuthenticated) return null;

    return (
        <>
            <Nav>
                <LogoArea onClick={() => scrollTo("inicio")}>
                    Armonía
                </LogoArea>
                <NavMenu>
                    <ScrollLink onClick={() => scrollTo("inicio")}>
                        Inicio
                    </ScrollLink>
                    <ScrollLink onClick={() => scrollTo("nosotros")}>
                        Nosotros
                    </ScrollLink>
                    <ScrollLink onClick={() => scrollTo("servicios")}>
                        Servicios
                    </ScrollLink>
                    <ScrollLink onClick={() => scrollTo("contacto")}>
                        Contacto
                    </ScrollLink>
                    <SignNavLink to="/sign-up">
                        Ingresar
                    </SignNavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
