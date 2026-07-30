import React from "react";
import styled from "styled-components";

/* ===== PAGE ===== */
const PageSection = styled.div`
    min-height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(180deg, #faf5ff 0%, #ffffff 40%);
`;

const PageTitle = styled.h1`
    font-family: 'Dancing Script', cursive;
    font-size: 2.8rem;
    font-weight: 600;
    color: #5c0e6d;
    margin-bottom: 4px;
    text-align: center;
    padding-top: 60px;
`;

const PageSubtitle = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 0.95rem;
    color: #6b7280;
    margin-bottom: 48px;
    text-align: center;
`;

/* ===== LAYOUT: MAPA IZQUIERDA / INFO DERECHA ===== */
const ContentRow = styled.div`
    display: flex;
    gap: 40px;
    max-width: 1100px;
    width: 100%;
    padding: 0 24px;
    margin-bottom: 60px;

    @media (max-width: 800px) {
        flex-direction: column;
        gap: 32px;
    }
`;

const MapColumn = styled.div`
    flex: 1.2;
    min-width: 0;
`;

const MapWrapper = styled.div`
    width: 100%;
    height: 100%;
    min-height: 380px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid #f0f0f0;
`;

const InfoColumn = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
`;

/* ===== INFO CARDS ===== */
const InfoCard = styled.div`
    background: #ffffff;
    border-radius: 16px;
    padding: 20px 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid #f3f0ff;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
        transform: translateX(4px);
        box-shadow: 0 8px 24px rgba(92, 14, 109, 0.1);
    }
`;

const CardIconBox = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: #faf5ff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    flex-shrink: 0;
`;

const CardBody = styled.div`
    flex: 1;
    min-width: 0;
`;

const CardLabel = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    color: #9167f9;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin: 0 0 2px;
`;

const CardTitle = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0;
    line-height: 1.4;
`;

const CardLink = styled.a`
    font-family: 'Poppins', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: #5c0e6d;
    text-decoration: none;
    line-height: 1.6;
    transition: color 0.2s;

    &:hover {
        color: #7b1fa2;
    }
`;

/* ===== FOOTER ===== */
const Footer = styled.footer`
    width: 100%;
    background: #1a1a2e;
    padding: 32px 24px;
    margin-top: auto;
`;

const FooterContent = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
`;

const FooterLogo = styled.span`
    font-family: 'Dancing Script', cursive;
    font-size: 1.6rem;
    font-weight: 600;
    color: #ffffff;
`;

const FooterDivider = styled.hr`
    width: 60px;
    border: none;
    border-top: 2px solid rgba(157, 224, 62, 0.4);
    margin: 0;
`;

const FooterText = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
    line-height: 1.6;
`;

const FooterLinks = styled.div`
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    justify-content: center;
`;

const FooterLink = styled.span`
    font-family: 'Poppins', sans-serif;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    cursor: default;
    transition: color 0.2s;

    &:hover {
        color: #9de03e;
    }
`;

const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#5c0e6d">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
);

const Contact = () => {
    const year = new Date().getFullYear();

    return (
        <PageSection>
            <PageTitle>Contactanos</PageTitle>
            <PageSubtitle>Estamos acá para atenderte</PageSubtitle>

            <ContentRow>
                <MapColumn>
                    <MapWrapper>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.552235038035!2d-72.25380222581435!3d8.045011991982193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6661448c4b9ae3%3A0xc7e373437952adaf!2sArmonia..%20Odontologia%20y%20Estetica%20Facial!5e0!3m2!1ses!2sve!4v1784422611532!5m2!1ses!2sve"
                            width="100%"
                            height="100%"
                            style={{ border: 0, display: 'block', minHeight: '380px' }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Ubicación de Armonía Odontología"
                        ></iframe>
                    </MapWrapper>
                </MapColumn>

                <InfoColumn>
                    <InfoCard>
                        <CardIconBox>👩‍⚕️</CardIconBox>
                        <CardBody>
                            <CardLabel>Directora</CardLabel>
                            <CardTitle>Dra. Any Becerra</CardTitle>
                        </CardBody>
                    </InfoCard>

                    <InfoCard>
                        <CardIconBox>📍</CardIconBox>
                        <CardBody>
                            <CardLabel>Dirección</CardLabel>
                            <CardTitle>San Juan de Colón, Estado Táchira, Venezuela</CardTitle>
                        </CardBody>
                    </InfoCard>

                    <InfoCard>
                        <CardIconBox>📞</CardIconBox>
                        <CardBody>
                            <CardLabel>Teléfono</CardLabel>
                            <CardLink href="tel:+584143713971">0414-3713971</CardLink>
                            <br />
                            <CardLink href="tel:+584167751456">0416-7751456</CardLink>
                        </CardBody>
                    </InfoCard>

                    <InfoCard>
                        <CardIconBox><InstagramIcon /></CardIconBox>
                        <CardBody>
                            <CardLabel>Instagram</CardLabel>
                            <CardLink
                                href="https://www.instagram.com/armonia2505"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                @armonia2505
                            </CardLink>
                        </CardBody>
                    </InfoCard>

                    <InfoCard>
                        <CardIconBox>🕐</CardIconBox>
                        <CardBody>
                            <CardLabel>Horarios</CardLabel>
                            <CardTitle>Lun a Vie: 8:00 AM - 6:00 PM</CardTitle>
                            <CardTitle style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                                Sáb: 8:00 AM - 12:00 PM
                            </CardTitle>
                        </CardBody>
                    </InfoCard>
                </InfoColumn>
            </ContentRow>

            <Footer>
                <FooterContent>
                    <FooterLogo>Armonía</FooterLogo>
                    <FooterDivider />
                    <FooterText>
                        Odontología y Estética Facial — San Juan de Colón, Táchira
                    </FooterText>
                    <FooterLinks>
                        <FooterLink>Inicio</FooterLink>
                        <FooterLink>Nosotros</FooterLink>
                        <FooterLink>Servicios</FooterLink>
                        <FooterLink>Contacto</FooterLink>
                    </FooterLinks>
                    <FooterDivider />
                    <FooterText>
                        &copy; {year} Armonía Odontología y Estética Facial. Todos los derechos reservados.
                    </FooterText>
                </FooterContent>
            </Footer>
        </PageSection>
    );
};

export default Contact;
