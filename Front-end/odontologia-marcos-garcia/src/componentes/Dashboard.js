import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FiHome, FiCalendar, FiUsers, FiFileText,
  FiPlusCircle, FiClock, FiLogOut, FiCheckCircle
} from 'react-icons/fi';
import CalendarioDoctorSemana from './Calendar';
import AppointmentForm from './AppointmentForm';
import AppointmentSuccess from './AppointmentSuccess';

const API_BASE = 'http://localhost:3001/api';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
  font-family: 'Poppins', sans-serif;
`;

const Sidebar = styled.aside`
  width: 240px;
  min-width: 240px;
  background: #4a0b5a;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
`;

const SidebarLogo = styled.div`
  font-family: 'Dancing Script', cursive;
  font-size: 1.8rem;
  color: #ffffff;
  padding: 24px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 8px;
`;

const NavItems = styled.nav`
  flex: 1;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${props => props.$active ? 'rgba(157, 224, 62, 0.15)' : 'transparent'};
  color: ${props => props.$active ? '#9de03e' : 'rgba(255,255,255,0.7)'};
  border: none;
  border-radius: 10px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: ${props => props.$active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }
`;

const NavIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
`;

const MainArea = styled.div`
  flex: 1;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.header`
  height: 70px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 50;
`;

const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Greeting = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #1a1a2e;
`;

const RoleBadge = styled.span`
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  background: ${props => props.$color || '#5c0e6d'};
  color: #ffffff;
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: transparent;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #fef2f2;
    border-color: #fca5a5;
    color: #dc2626;
  }
`;

const ContentArea = styled.div`
  padding: 28px 32px;
  flex: 1;
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  color: #6b7280;
  font-size: 0.95rem;
`;

const ErrorState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  color: #dc2626;
  font-size: 0.95rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #f3f4f6;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  background: ${props => props.$bg || '#f3f4f6'};
  color: ${props => props.$color || '#6b7280'};
`;

const StatInfo = styled.div`
  flex: 1;
`;

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.2;
`;

const StatLabel = styled.div`
  font-size: 0.82rem;
  color: #6b7280;
  margin-top: 2px;
`;

const TableContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #f3f4f6;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Poppins', sans-serif;
`;

const Th = styled.th`
  text-align: left;
  padding: 14px 20px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #6b7280;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Td = styled.td`
  padding: 14px 20px;
  font-size: 0.9rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
`;

const Tr = styled.tr`
  &:last-child td {
    border-bottom: none;
  }
  &:hover {
    background: #f9fafb;
  }
`;

const AppointmentCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #f3f4f6;
`;

const CardLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CardDate = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a1a2e;
`;

const CardTime = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
`;

const CardDesc = styled.div`
  font-size: 0.85rem;
  color: #374151;
  margin-top: 4px;
`;

const StatusBadge = styled.span`
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  background: ${props => props.$color || '#6b7280'}20;
  color: ${props => props.$color || '#6b7280'};
`;

const ViewTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 24px;
`;

const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const statConfigs = [
  { icon: FiUsers, bg: '#ede9fe', color: '#5c0e6d', label: 'Total pacientes' },
  { icon: FiCalendar, bg: '#dbeafe', color: '#2563eb', label: 'Citas hoy' },
  { icon: FiClock, bg: '#fef3c7', color: '#d97706', label: 'Citas pendientes' },
  { icon: FiCheckCircle, bg: '#dcfce7', color: '#16a34a', label: 'Citas completadas' },
];

const statusColors = {
  PENDIENTE: '#d97706',
  CONFIRMADA: '#16a34a',
  CANCELADA: '#dc2626',
  COMPLETADA: '#6b7280',
};

function getRoleColor(rol) {
  switch (rol) {
    case 'Administrador': return '#5c0e6d';
    case 'Doctor': return '#2563eb';
    case 'Asistente': return '#d97706';
    case 'Paciente': return '#16a34a';
    default: return '#5c0e6d';
  }
}

function getNavItems(rol) {
  switch (rol) {
    case 'Administrador':
      return [
        { key: 'inicio', label: 'Inicio', icon: FiHome },
        { key: 'calendario', label: 'Calendario', icon: FiCalendar },
        { key: 'pacientes', label: 'Pacientes', icon: FiUsers },
        { key: 'citas', label: 'Citas', icon: FiFileText },
      ];
    case 'Doctor':
      return [
        { key: 'inicio', label: 'Inicio', icon: FiHome },
        { key: 'calendario', label: 'Calendario', icon: FiCalendar },
        { key: 'pacientes', label: 'Mis pacientes', icon: FiUsers },
      ];
    case 'Asistente':
      return [
        { key: 'inicio', label: 'Inicio', icon: FiHome },
        { key: 'calendario', label: 'Calendario', icon: FiCalendar },
        { key: 'pacientes', label: 'Pacientes', icon: FiUsers },
        { key: 'agendar', label: 'Agendar turno', icon: FiPlusCircle },
      ];
    case 'Paciente':
      return [
        { key: 'mis-citas', label: 'Mis citas', icon: FiClock },
        { key: 'agendar', label: 'Agendar turno', icon: FiPlusCircle },
      ];
    default:
      return [
        { key: 'inicio', label: 'Inicio', icon: FiHome },
      ];
  }
}

function InicioView() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ totalPacientes: 0, citasHoy: 0, pendientes: 0, completadas: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citasRes, pacientesRes] = await Promise.all([
          fetch(`${API_BASE}/citaCompleta`),
          fetch(`${API_BASE}/pacientes`),
        ]);

        if (!citasRes.ok || !pacientesRes.ok) throw new Error('Error al cargar datos');

        const citas = await citasRes.json();
        const pacientes = await pacientesRes.json();

        const todayStr = new Date().toISOString().split('T')[0];

        const citasHoy = citas.filter(c => {
          const citaDate = new Date(c.date_cita);
          return citaDate.toISOString().split('T')[0] === todayStr;
        }).length;

        setStats({
          totalPacientes: pacientes.length,
          citasHoy,
          pendientes: citas.filter(c => c.status_cita === 'PENDIENTE').length,
          completadas: citas.filter(c => c.status_cita === 'COMPLETADA').length,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingState>Cargando estadísticas...</LoadingState>;
  if (error) return <ErrorState>Error: {error}</ErrorState>;

  const values = [stats.totalPacientes, stats.citasHoy, stats.pendientes, stats.completadas];

  return (
    <div>
      <ViewTitle>Panel de control</ViewTitle>
      <StatsGrid>
        {statConfigs.map((cfg, i) => {
          const Icon = cfg.icon;
          return (
            <StatCard key={cfg.label}>
              <StatIcon $bg={cfg.bg} $color={cfg.color}><Icon /></StatIcon>
              <StatInfo>
                <StatNumber>{values[i]}</StatNumber>
                <StatLabel>{cfg.label}</StatLabel>
              </StatInfo>
            </StatCard>
          );
        })}
      </StatsGrid>
    </div>
  );
}

function CalendarView({ rol }) {
  const calRol = rol === 'Doctor' ? { rol: 'doctor' } : { rol: 'secreto' };
  return <CalendarioDoctorSemana rol={calRol} />;
}

function PatientsView() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch(`${API_BASE}/pacientes`);
        if (!res.ok) throw new Error('Error al cargar pacientes');
        const data = await res.json();
        setPatients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  if (loading) return <LoadingState>Cargando pacientes...</LoadingState>;
  if (error) return <ErrorState>Error: {error}</ErrorState>;
  if (patients.length === 0) return <LoadingState>No hay pacientes registrados</LoadingState>;

  return (
    <div>
      <ViewTitle>Pacientes</ViewTitle>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Nombre</Th>
              <Th>Sexo</Th>
              <Th>Teléfono</Th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, i) => (
              <Tr key={p.id_paciente || i}>
                <Td>{p.name_paciente}</Td>
                <Td>{p.genre_paciente === 'M' ? 'Masculino' : 'Femenino'}</Td>
                <Td>{p.telf_paciente || '—'}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

function CitasView() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/citaCompleta`);
        if (!res.ok) throw new Error('Error al cargar citas');
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingState>Cargando citas...</LoadingState>;
  if (error) return <ErrorState>Error: {error}</ErrorState>;
  if (appointments.length === 0) return <LoadingState>No hay citas registradas</LoadingState>;

  return (
    <div>
      <ViewTitle>Todas las citas</ViewTitle>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Paciente</Th>
              <Th>Fecha</Th>
              <Th>Descripción</Th>
              <Th>Estado</Th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((c, i) => {
              const date = new Date(c.date_cita);
              const dateStr = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
              return (
                <Tr key={c.id_citas || i}>
                  <Td><strong>{c.name_paciente}</strong></Td>
                  <Td>{dateStr}</Td>
                  <Td>{c.desc_cita}</Td>
                  <Td>
                    <StatusBadge $color={statusColors[c.status_cita] || '#6b7280'}>
                      {c.status_cita}
                    </StatusBadge>
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

function MyAppointmentsView({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`${API_BASE}/citaCompleta`);
        if (!res.ok) throw new Error('Error al cargar citas');
        const data = await res.json();
        const userAppts = data.filter(c =>
          c.id_user === user.id_user ||
          c.email_user === user.email_user ||
          c.name_user === user.name_user
        );
        setAppointments(userAppts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [user]);

  if (loading) return <LoadingState>Cargando tus citas...</LoadingState>;
  if (error) return <ErrorState>Error: {error}</ErrorState>;
  if (appointments.length === 0) return <LoadingState>No tenés citas agendadas</LoadingState>;

  return (
    <div>
      <ViewTitle>Mis citas</ViewTitle>
      <CardsList>
        {appointments.map((c, i) => {
          const date = new Date(c.date_cita);
          const dateStr = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
          return (
            <AppointmentCard key={c.id_citas || i}>
              <CardLeft>
                <CardDate>{dateStr}</CardDate>
                <CardTime>{c.time_cita ? `${c.time_cita}h` : '—'}</CardTime>
                <CardDesc>{c.desc_cita}</CardDesc>
              </CardLeft>
              <StatusBadge $color={statusColors[c.status_cita] || '#6b7280'}>
                {c.status_cita}
              </StatusBadge>
            </AppointmentCard>
          );
        })}
      </CardsList>
    </div>
  );
}

function NewAppointmentView({ user }) {
  const [step, setStep] = useState('form');

  if (step === 'form') {
    return <AppointmentForm user={user} onSuccess={() => setStep('success')} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <AppointmentSuccess />
      <button
        onClick={() => setStep('form')}
        style={{
          marginTop: '24px',
          padding: '12px 28px',
          border: 'none',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #9de03e, #86c935)',
          color: '#1a1a2e',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '0.9rem',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(157, 224, 62, 0.35)',
          transition: 'transform 0.2s'
        }}
      >
        Agendar otra cita
      </button>
    </div>
  );
}

export default function Dashboard({ user, onLogout }) {
  const [activeView, setActiveView] = useState('inicio');

  const rol = user?.nombre_rol || '';
  const navItems = getNavItems(rol);

  const renderView = () => {
    switch (activeView) {
      case 'inicio':
        return <InicioView />;
      case 'calendario':
        return <CalendarView rol={rol} />;
      case 'pacientes':
        return <PatientsView />;
      case 'citas':
        return <CitasView />;
      case 'mis-citas':
        return <MyAppointmentsView user={user} />;
      case 'agendar':
        return <NewAppointmentView user={user} />;
      default:
        return <InicioView />;
    }
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarLogo>Armonía</SidebarLogo>
        <NavItems>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavItem
                key={item.key}
                $active={activeView === item.key}
                onClick={() => setActiveView(item.key)}
              >
                <NavIcon><Icon /></NavIcon>
                {item.label}
              </NavItem>
            );
          })}
        </NavItems>
      </Sidebar>
      <MainArea>
        <TopBar>
          <TopBarLeft>
            <Greeting>Hola, {user?.name_user || 'Usuario'}</Greeting>
            <RoleBadge $color={getRoleColor(rol)}>{rol}</RoleBadge>
          </TopBarLeft>
          <LogoutBtn onClick={onLogout}>
            <FiLogOut /> Cerrar sesión
          </LogoutBtn>
        </TopBar>
        <ContentArea>
          {renderView()}
        </ContentArea>
      </MainArea>
    </DashboardContainer>
  );
}
