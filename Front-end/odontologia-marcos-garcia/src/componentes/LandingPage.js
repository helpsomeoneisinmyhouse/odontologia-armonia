import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Home from "./Index";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import styled from "styled-components";

const PageWrapper = styled.main`
    padding-top: 70px; /* compensa el navbar fixed */
`;

const Section = styled.section`
    scroll-margin-top: 70px;
`;

const LandingPage = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.scrollTo) {
            const el = document.getElementById(location.state.scrollTo);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            }
            // Limpiamos el state para que no vuelva a scrollear en re-renders
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    return (
        <PageWrapper>
            <Section id="inicio">
                <Home />
            </Section>
            <Section id="nosotros">
                <About />
            </Section>
            <Section id="servicios">
                <Services />
            </Section>
            <Section id="contacto">
                <Contact />
            </Section>
        </PageWrapper>
    );
};

export default LandingPage;
