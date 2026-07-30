import React from "react";
import styled from "styled-components";
import CalendarioDoctorSemana from "./Calendar";

const DashboardPage = styled.div`
    padding: 20px;
`;

const DashboardTitle = styled.h1`
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #5c0e6d;
    margin-bottom: 8px;
`;

const DashboardSubtitle = styled.p`
    text-align: center;
    color: #6b7280;
    font-size: 0.9rem;
    margin-bottom: 32px;
`;

const CalendarContainer = styled.div`
    max-width: 1100px;
    margin: 0 auto;
`;

const DoctorIndex = () => {
  return (
    <DashboardPage>
      <DashboardTitle>Panel del Doctor</DashboardTitle>
      <DashboardSubtitle>Gestioná los turnos de tus pacientes</DashboardSubtitle>
      <CalendarContainer>
        <CalendarioDoctorSemana rol={{rol: 'doctor'}} />
      </CalendarContainer>
    </DashboardPage>
  );
};

export default DoctorIndex;
