import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import DayGridPlugin from "@fullcalendar/daygrid";
import TimeGridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin from "@fullcalendar/interaction";
import EventModal from "./EventModal";
import styled from "styled-components";

const API_BASE = 'http://localhost:3001/api';

const CalendarWrapper = styled.div`
    padding: 24px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    border: 1px solid #f0f0f0;

    .fc {
        font-family: 'Poppins', sans-serif;
    }

    .fc-toolbar-title {
        font-size: 1.2rem !important;
        font-weight: 700 !important;
        color: #1a1a2e;
    }

    .fc-button {
        background: #5c0e6d !important;
        border: none !important;
        border-radius: 8px !important;
        font-weight: 600 !important;
        font-size: 0.85rem !important;
        padding: 6px 14px !important;
        transition: background 0.2s !important;

        &:hover {
            background: #4a0b5a !important;
        }
    }

    .fc-button-active {
        background: #7b1fa2 !important;
    }

    .fc-daygrid-day-number,
    .fc-col-header-cell-cushion {
        color: #1a1a2e;
        text-decoration: none;
    }

    .fc-event {
        border-radius: 6px !important;
        padding: 2px 6px !important;
        font-size: 0.8rem !important;
        font-weight: 500 !important;
        border: none !important;
        cursor: pointer;
    }

    .fc-timegrid-slot {
        height: 40px !important;
    }

    .fc-timegrid-axis {
        font-size: 0.8rem;
    }
`;

const LoadingState = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    color: #6b7280;
`;

const CalendarioDoctorSemana = (rol) => {
  const [isLoading, setIsLoading] = useState(true);
  const [lista, setLista] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [Citado, setCitado] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setCitado(null); 
  };
  const shootTrigger = () => {
    setRefreshKey(prev => prev + 1);
  };

  const isEditable = rol?.rol?.rol === 'secreto';

  async function fetchCitasCompletas() {
    try {
      const response = await fetch(`${API_BASE}/citaCompleta`);
      const citas = await response.json();
      const returning = citas.map(cita => {        
        let fechaPrueba2 = new Date(cita.date_cita);
        let fechaPrueba = new Date(cita.date_cita);
        let status = cita.status_cita;
        const hoy = new Date();
        let color = '#adff2f';

        fechaPrueba2.setHours(fechaPrueba.getHours() - 4);
        fechaPrueba.setHours(fechaPrueba.getHours() + cita.time_cita - 4);
        hoy.setHours(hoy.getHours() - 4);

        if (hoy.getTime() > fechaPrueba2.getTime()) {
          status = "COMPLETADA";
        }

        let fechaInicio = fechaPrueba2.toISOString();
        let fechaFinal = fechaPrueba.toISOString();

        switch (status) {
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
        
        return {
          id: cita.id_citas,
          title: cita.name_paciente, 
          start: fechaInicio, 
          end: fechaFinal,
          description: cita.desc_cita,
          editable: isEditable,
          color: color,
          extendedProps: {
              sexo: cita.genre_paciente,
              nacimiento: cita.birth_paciente,
              direccion: cita.dir_paciente,
              telefono: cita.telf_paciente,
              estatus: status,
              start: fechaInicio, 
              end: fechaFinal,
              id: cita.id_citas
            }
          };
      });

      return returning;
    } catch (error) {
      console.error('ERROR!:' + error);
    }
  };

  function openCita(info) {
    setCitado(info.event);
    openModal();
  }

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await fetchCitasCompletas();
      if (data) {
        setLista([data].flat());
      }
      setIsLoading(false);
    };
    load();
  }, [refreshKey]);

  if (isLoading) {
    return <LoadingState>Cargando turnos...</LoadingState>;
  }

  return (
    <CalendarWrapper>
      <EventModal
        isOpen={isOpen} 
        onClose={closeModal} 
        fetchCitas={fetchCitasCompletas}
        info={Citado}
        trigger={shootTrigger} 
      />
      
      <FullCalendar
        plugins={[DayGridPlugin, TimeGridPlugin, InteractionPlugin]}
        initialView="timeGridWeek"
        slotMinTime="08:00:00"
        slotMaxTime="19:00:00"
        weekends={false}
        timeZone="UTC"
        headerToolbar={{
          start: "prev",
          center: "title",
          end: "next",
        }}
        eventDisplay="list-item"
        editable={isEditable}
        events={lista}
        eventClick={openCita}
        eventDrop={async function(info) {
            const id = info.event.id;
            const newStart = info.event.start.toISOString();
            
            fetch(`${API_BASE}/citaCompletaDate/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                date_cita: newStart
              })
            }).then(response => {
              if (!response.ok) {
                console.error('Failed to update event in database.');
                info.revert();
              }
            });
            shootTrigger();
        }}
      />
    </CalendarWrapper>
  );
};

export default CalendarioDoctorSemana;
