import React from "react";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import BackgroundSlider from "./BackgroundSlider";

const fadeInUp = keyframes`
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
`;

const HeroSection = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 24px;
    text-align: center;
    position: relative;
    overflow: hidden;
`;

const Content = styled.div`
    position: relative;
    z-index: 2;
    max-width: 720px;
`;

const Logo = styled.h1`
    font-family: 'Dancing Script', cursive;
    font-size: 5.5rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 4px;
    line-height: 1.1;
    animation: ${fadeInUp} 0.8s ease-out;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);

    @media (max-width: 600px) {
        font-size: 3.5rem;
    }
`;

const Subtitle = styled.p`
    font-family: 'Dancing Script', cursive;
    font-size: 1.6rem;
    font-weight: 400;
    color: #b69efb;
    margin-bottom: 12px;
    letter-spacing: 1px;
    animation: ${fadeInUp} 0.8s ease-out 0.15s both;
    text-shadow: 0 1px 12px rgba(0, 0, 0, 0.3);

    @media (max-width: 600px) {
        font-size: 1.3rem;
    }
`;

const HeroDescription = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.75);
    margin-bottom: 40px;
    line-height: 1.7;
    animation: ${fadeInUp} 0.8s ease-out 0.25s both;

    @media (max-width: 600px) {
        font-size: 0.9rem;
    }
`;

const CTAButton = styled(NavLink)`
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #9de03e, #86c935);
    color: #1a1a2e;
    padding: 16px 44px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1.05rem;
    text-decoration: none;
    display: inline-block;
    box-shadow: 0 4px 24px rgba(157, 224, 62, 0.4);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    animation: ${fadeInUp} 0.8s ease-out 0.35s both;
    letter-spacing: 0.5px;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 32px rgba(157, 224, 62, 0.55);
    }

    &:active {
        transform: translateY(-1px) scale(0.97);
    }
`;

const Home = () => {
    return (
        <HeroSection>
            <BackgroundSlider />
            <Content>
                <Logo>Armonía</Logo>
                <Subtitle>Odontología y estética facial</Subtitle>
                <HeroDescription>
                    Profesionales comprometidos con tu salud bucal y bienestar integral.
                    Atención personalizada en un ambiente moderno y confiable.
                </HeroDescription>
                <CTAButton to="/sign-up">
                    Agendá tu turno
                </CTAButton>
            </Content>
        </HeroSection>
    );
};

export default Home;
