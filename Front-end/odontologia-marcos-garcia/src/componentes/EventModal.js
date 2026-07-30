import React from "react";
import styled from "styled-components";
import '../styles/modal.css';

const API_BASE = 'http://localhost:3001/api';

const ModalOverlay = styled.div`
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
    background-color: #ffffff;
    padding: 28px;
    width: 85%;
    max-width: 800px;
    max-height: 85vh;
    overflow-y: auto;
    border-radius: 20px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
    border-top: 5px solid ${props => props.color || '#5c0e6d'};
    position: relative;
    animation: fadeInUp 0.25s ease-out;
`;

const CloseButton = styled.button`
    background: #f3f4f6;
    color: #6b7280;
    font-size: 1.2rem;
    font-weight: bold;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover {
        background: #e5e7eb;
        color: #1a1a2e;
        transform: rotate(90deg);
    }
`;

const ModalTitle = styled.h2`
    background: ${props => props.color || '#5c0e6d'};
    color: white;
    text-align: center;
    padding: 14px 20px;
    border-radius: 12px;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 20px;
`;

const ModalBody = styled.div`
    background: #f9fafb;
    padding: 20px;
    border-radius: 12px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
`;

const InfoColumn = styled.div`
    flex: ${props => props.flex || 1};
    min-width: 200px;
`;

const InfoLabel = styled.strong`
    display: block;
    font-size: 0.8rem;
    color: #9167f9;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
    margin-top: 12px;

    &:first-child {
        margin-top: 0;
    }
`;

const InfoText = styled.p`
    font-size: 0.95rem;
    color: #4b5563;
    margin: 0 0 8px 0;
    line-height: 1.5;
`;

const DateGroup = styled.div`
    background: #f3f4f6;
    border-radius: 10px;
    padding: 12px;
    margin-top: 8px;
`;

const DateRow = styled.div`
    display: flex;
    gap: 12px;
`;

const DateBadge = styled.div`
    flex: 1;
    padding: 8px 12px;
    border-radius: 8px;
    background: #ffffff;
    font-size: 0.85rem;
    color: #1a1a2e;
    text-align: center;
    border: 1px solid #e5e7eb;
`;

const StatusBadge = styled.div`
    background: ${props => props.color || '#868686'};
    color: white;
    border-radius: 10px;
    padding: 16px;
    margin-top: 12px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 12px;
`;

const ActionButton = styled.button`
    flex: 1;
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const CancelButton = styled(ActionButton)`
    background: #fef2f2;
    color: #dc2626;

    &:hover {
        background: #dc2626;
        color: #ffffff;
    }
`;

const ConfirmButton = styled(ActionButton)`
    background: #f0fdf4;
    color: #16a34a;

    &:hover {
        background: #9de03e;
        color: #1a1a2e;
    }
`;

const LogicButton = styled.button`
    background: #9de03e;
    border: none;
    border-radius: 8px;
    color: #1a1a2e;
    font-size: 0.9rem;
    font-weight: 700;
    padding: 10px 16px;
    width: 100%;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #86c935;
        transform: translateY(-1px);
    }
`;

const LogicSection = styled.div`
    background: #f0fdf4;
    border-radius: 10px;
    padding: 16px;
    margin-top: 12px;
`;

const EventModal = ({ isOpen, onClose, fetchCitas, info, trigger }) => {
    
    const handleOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose(); 
        }
    };

    if (!info && isOpen) {
       return null; 
    }

    async function confirmarCita(e) {
        e.preventDefault();
        const id = info?.extendedProps?.id;

        try {
            await fetch(`${API_BASE}/citaCompletaStatus/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    status_cita: "CONFIRMADA"
                })
            });
            fetchCitas(e);
            trigger();
            onClose();
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    }

    async function cancelarCita(e) {
        e.preventDefault();
        const id = info?.extendedProps?.id;

        try {
            await fetch(`${API_BASE}/citaCompletaStatus/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    status_cita: "CANCELADA"
                })
            });
            fetchCitas(e);
            trigger();
            onClose();
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    }

    async function logicCita(e) {
        e.preventDefault();

        if (window.confirm("¿Estás seguro?") === false) {
            return;
        }

        const id = info?.extendedProps?.id;

        try {
            await fetch(`${API_BASE}/citaCompletaLogic/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    logic_cita: 'I'
                })
            });
            fetchCitas(e);
            trigger();
            onClose();
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    }

    let color = '#868686';
    switch (info?.extendedProps?.estatus) {
        case "CONFIRMADA":
            color = '#69a017';
            break;
        case "CANCELADA":
            color = '#8A2BE2';
            break;
        case "PENDIENTE":
            color = '#868686';
            break;
        case "COMPLETADA":
            color = '#525a46';
            break;
        default:
            break;
    }

    let logic = "none";
    if (info?.extendedProps?.estatus === "COMPLETADA") {
        logic = "block"; 
    }
    let ilogical = "block";
    if (info?.extendedProps?.estatus === "COMPLETADA") {
        ilogical = "none"; 
    }

    function starter() {   
        let start = info?.extendedProps?.start;
        start = start.replace(":00.000Z", "");
        return start;
    }

    return (
        <ModalOverlay isOpen={isOpen} onClick={handleOutsideClick}>
            <ModalContent color={color}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                
                <ModalTitle color={color}>{info?.title}</ModalTitle>

                <ModalBody>
                    <InfoColumn flex={2}>
                        <InfoLabel>Descripción</InfoLabel>
                        <InfoText>{info?.extendedProps?.description}</InfoText>

                        <InfoLabel>Fecha y hora</InfoLabel>
                        <DateGroup>
                            <strong>Inicio</strong>
                            <DateRow>
                                <DateBadge>{info?.extendedProps?.start.replace(":00.000Z","").replace("T",", ")}</DateBadge>
                            </DateRow>
                            <strong style={{display: 'block', marginTop: '8px'}}>Fin</strong>
                            <DateRow>
                                <DateBadge>{info?.extendedProps?.end.replace(":00.000Z","").replace("T",", ")}</DateBadge>
                            </DateRow>
                        </DateGroup>
                    </InfoColumn>

                    <InfoColumn flex={1}>
                        <InfoLabel>Sexo</InfoLabel>
                        <InfoText>{info?.extendedProps?.sexo === 'M' ? 'Masculino' : 'Femenino'}</InfoText>

                        <InfoLabel>Fecha de nacimiento</InfoLabel>
                        <InfoText>{info?.extendedProps?.nacimiento.replace(":00.000Z","").replace("T",", ")}</InfoText>

                        <InfoLabel>Teléfono</InfoLabel>
                        <InfoText>{info?.extendedProps?.telefono || '—'}</InfoText>

                        <InfoLabel>Dirección</InfoLabel>
                        <InfoText>{info?.extendedProps?.direccion || '—'}</InfoText>

                        <StatusBadge color={color} style={{ display: ilogical }}>
                            <InfoText style={{color: 'white', margin: 0, fontWeight: 600}}>
                                Estado: {info?.extendedProps?.estatus}
                            </InfoText>
                            <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: '8px 0 0'}}>
                                ¿Confirmar la cita?
                            </p>
                            <ButtonGroup>
                                <CancelButton onClick={(e) => cancelarCita(e)}>Cancelar</CancelButton>
                                <ConfirmButton onClick={(e) => confirmarCita(e)}>Confirmar</ConfirmButton>
                            </ButtonGroup>
                        </StatusBadge>

                        <LogicSection style={{ display: logic }}>
                            <InfoLabel style={{color: '#16a34a'}}>Ocultar cita</InfoLabel>
                            <p style={{fontSize: '0.85rem', color: '#4b5563', margin: '4px 0 12px'}}>
                                Esta cita ya pasó. ¿Querés quitarla de la agenda?
                            </p>
                            <LogicButton onClick={(e) => logicCita(e)}>Ocultar cita</LogicButton>
                        </LogicSection>
                    </InfoColumn>
                </ModalBody>
            </ModalContent>
        </ModalOverlay>
    );
};

export default EventModal;
