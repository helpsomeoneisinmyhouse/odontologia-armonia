import React from 'react';
import styled from 'styled-components';
import { FiCheckCircle } from 'react-icons/fi';

const SuccessCard = styled.div`
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 720px;
  border: 1px solid #f0f0f0;
  overflow: hidden;
  text-align: center;
`;

const SuccessHeader = styled.div`
  background: linear-gradient(135deg, #16a34a, #22c55e);
  padding: 40px 36px 32px;
`;

const SuccessIcon = styled.div`
  font-size: 3.5rem;
  color: #ffffff;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
`;

const SuccessTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

const SuccessBody = styled.div`
  padding: 36px;
`;

const SuccessText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 24px;
`;

const StatusBox = styled.div`
  background: #f0fdf4;
  padding: 16px 24px;
  border-radius: 12px;
  border: 1px solid #bbf7d0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const StatusLabel = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #374151;
  font-weight: 500;
`;

const StatusValue = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #d97706;
  font-weight: 700;
`;

const Footnote = styled.p`
  font-family: 'Poppins', sans-serif;
  margin-top: 24px;
  font-size: 0.85rem;
  color: #9ca3af;
`;

const AppointmentSuccess = () => (
  <SuccessCard>
    <SuccessHeader>
      <SuccessIcon><FiCheckCircle /></SuccessIcon>
      <SuccessTitle>¡Cita registrada con éxito!</SuccessTitle>
    </SuccessHeader>
    <SuccessBody>
      <SuccessText>
        Tu solicitud ha sido enviada a la Clínica Armonía.<br />
        Te contactaremos para confirmar el turno.
      </SuccessText>
      <StatusBox>
        <StatusLabel>Estado de la cita:</StatusLabel>
        <StatusValue>Pendiente</StatusValue>
      </StatusBox>
      <Footnote>
        Vas a poder visualizar los detalles en tu perfil personal próximamente.
      </Footnote>
    </SuccessBody>
  </SuccessCard>
);

export default AppointmentSuccess;
