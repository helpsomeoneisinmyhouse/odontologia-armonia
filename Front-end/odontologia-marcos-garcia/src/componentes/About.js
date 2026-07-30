import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const PageSection = styled.div`
    min-height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 40px;
    background: linear-gradient(180deg, #faf5ff 0%, #ffffff 40%);

    @media (max-width: 768px) {
        padding: 60px 24px;
    }
`;

const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: 56px;
    max-width: 700px;
`;

const SectionBadge = styled.span`
    display: inline-block;
    font-family: 'Poppins', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    color: #9167f9;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    margin-bottom: 12px;
    background: #f3e8ff;
    padding: 6px 20px;
    border-radius: 20px;
`;

const SectionTitle = styled.h2`
    font-family: 'Dancing Script', cursive;
    font-size: 3rem;
    font-weight: 600;
    color: #5c0e6d;
    line-height: 1.2;
`;

const SectionDescription = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    color: #6b7280;
    line-height: 1.7;
    margin-top: 14px;
`;

/* === Cards de Misión y Visión — MÁS ANCHO, MÁS IMPACTO === */
const CardsRow = styled.div`
    display: flex;
    gap: 32px;
    max-width: 1100px;
    width: 100%;
    margin-bottom: 48px;

    @media (max-width: 800px) {
        flex-direction: column;
        gap: 24px;
    }
`;

const MvCard = styled.div`
    flex: 1;
    background: ${props =>
        props.$accent === "vision"
            ? "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)"
            : "linear-gradient(135deg, #fafff5 0%, #f3ffe8 100%)"};
    border-radius: 24px;
    padding: 44px 40px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
    border: 1px solid ${props =>
        props.$accent === "vision" ? "#e9d5ff" : "#d9f5b5"};
    transition: transform 0.35s ease, box-shadow 0.35s ease;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: ${props =>
            props.$accent === "vision"
                ? "linear-gradient(90deg, #9167f9, #b69efb)"
                : "linear-gradient(90deg, #9de03e, #b5e87a)"};
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -30%;
        right: -20%;
        width: 250px;
        height: 250px;
        background: ${props =>
            props.$accent === "vision"
                ? "radial-gradient(circle, rgba(145, 103, 249, 0.06) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(157, 224, 62, 0.06) 0%, transparent 70%)"};
        border-radius: 50%;
        pointer-events: none;
    }

    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 48px rgba(92, 14, 109, 0.12);
    }
`;

const MvIconWrap = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    margin-bottom: 20px;
    background: ${props =>
        props.$accent === "vision"
            ? "linear-gradient(135deg, #f3e8ff, #e9d5ff)"
            : "linear-gradient(135deg, #f0fde7, #d9f5b5)"};
`;

const MvTitle = styled.h3`
    font-family: 'Poppins', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 14px;
`;

const MvText = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 0.95rem;
    color: #6b7280;
    line-height: 1.9;
    margin: 0;
`;

/* === Card destacada "Nuestra Clínica" === */
const HighlightCard = styled.div`
    max-width: 1100px;
    width: 100%;
    background: linear-gradient(135deg, #5c0e6d 0%, #7b1fa2 50%, #9167f9 100%);
    border-radius: 24px;
    padding: 52px 48px;
    margin-bottom: 48px;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -15%;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%);
        border-radius: 50%;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -30%;
        left: -10%;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(157,224,62,0.08) 0%, transparent 70%);
        border-radius: 50%;
    }

    @media (max-width: 768px) {
        padding: 36px 28px;
    }
`;

const HighlightTitle = styled.h3`
    font-family: 'Dancing Script', cursive;
    font-size: 2.2rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
`;

const HighlightText = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.9;
    margin: 0;
    max-width: 700px;
    position: relative;
    z-index: 1;
`;

/* === Stats row === */
const StatsRow = styled.div`
    display: flex;
    gap: 24px;
    max-width: 1100px;
    width: 100%;
    margin-bottom: 48px;
    flex-wrap: wrap;
    justify-content: center;
`;

const StatCard = styled.div`
    flex: 1;
    min-width: 180px;
    max-width: 240px;
    background: #ffffff;
    border-radius: 20px;
    padding: 32px 24px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid #f3f0ff;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-4px);
    }
`;

const StatNumber = styled.div`
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    color: #5c0e6d;
    margin-bottom: 4px;
`;

const StatLabel = styled.div`
    font-family: 'Poppins', sans-serif;
    font-size: 0.8rem;
    color: #6b7280;
    font-weight: 500;
`;

/* === CTA === */
const CTACard = styled.div`
    max-width: 1100px;
    width: 100%;
    background: #ffffff;
    border-radius: 24px;
    padding: 48px 40px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
    border: 1px solid #f3f0ff;
    text-align: center;
`;

const CTALabel = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 0.75rem;
    color: #9167f9;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 700;
    margin-bottom: 8px;
`;

const CTATitle = styled.h3`
    font-family: 'Dancing Script', cursive;
    font-size: 2.2rem;
    font-weight: 600;
    color: #1a1a2e;
    margin-bottom: 24px;
`;

const CTAButton = styled(NavLink)`
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #9de03e, #86c935);
    color: #1a1a2e;
    padding: 16px 44px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1rem;
    text-decoration: none;
    display: inline-block;
    box-shadow: 0 4px 24px rgba(157, 224, 62, 0.35);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    letter-spacing: 0.5px;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 32px rgba(157, 224, 62, 0.5);
    }

    &:active {
        transform: translateY(-1px) scale(0.97);
    }
`;

const About = () => {
    return (
        <PageSection>
            <SectionHeader>
                <SectionBadge>Sobre nosotros</SectionBadge>
                <SectionTitle>Conocé nuestra clínica</SectionTitle>
                <SectionDescription>
                    En Armonía combinamos excelencia profesional con calidez humana
                    para brindarte la mejor experiencia odontológica.
                </SectionDescription>
            </SectionHeader>

            <CardsRow>
                <MvCard $accent="mision">
                    <MvIconWrap $accent="mision">🎯</MvIconWrap>
                    <MvTitle>Nuestra Misión</MvTitle>
                    <MvText>
                        Brindar servicios odontológicos y de estética facial de alta calidad,
                        con un enfoque integral y humano, para mejorar la salud y bienestar
                        de nuestros pacientes en la comunidad de San Juan de Colón.
                    </MvText>
                </MvCard>

                <MvCard $accent="vision">
                    <MvIconWrap $accent="vision">🔭</MvIconWrap>
                    <MvTitle>Nuestra Visión</MvTitle>
                    <MvText>
                        Ser la clínica odontológica de referencia en la región, reconocida
                        por nuestra excelencia clínica, innovación tecnológica y el trato
                        cercano y personalizado que brindamos a cada paciente.
                    </MvText>
                </MvCard>
            </CardsRow>

            <StatsRow>
                <StatCard>
                    <StatNumber>+500</StatNumber>
                    <StatLabel>Pacientes atendidos</StatLabel>
                </StatCard>
                <StatCard>
                    <StatNumber>8</StatNumber>
                    <StatLabel>Años de experiencia</StatLabel>
                </StatCard>
                <StatCard>
                    <StatNumber>15+</StatNumber>
                    <StatLabel>Tratamientos disponibles</StatLabel>
                </StatCard>
                <StatCard>
                    <StatNumber>98%</StatNumber>
                    <StatLabel>Satisfacción</StatLabel>
                </StatCard>
            </StatsRow>

            <HighlightCard>
                <HighlightTitle>Nuestra Clínica</HighlightTitle>
                <HighlightText>
                    Armonía Odontología y Estética Facial, liderada por la Dra. Any Becerra,
                    cuenta con un equipo profesional comprometido con la salud bucal de cada
                    paciente. Ofrecemos tratamientos modernos en un ambiente seguro, confiable
                    y con la calidez que nos caracteriza.
                </HighlightText>
            </HighlightCard>

            <CTACard>
                <CTALabel>Dale el primer paso</CTALabel>
                <CTATitle>Agendá tu consulta</CTATitle>
                <CTAButton to="/sign-up">
                    Pedir turno online
                </CTAButton>
            </CTACard>
        </PageSection>
    );
};

export default About;
