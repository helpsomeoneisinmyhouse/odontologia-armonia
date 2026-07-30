import React, { useState } from 'react';
import styled from 'styled-components';
import Login from './Login';
import RegistrationWizard from './RegistrationWizard';
import AppointmentForm from './AppointmentForm';
import AppointmentSuccess from './AppointmentSuccess';
import BackgroundSlider from './BackgroundSlider';
import Dashboard from './Dashboard';
import Boton from '../elementos/boton.js';
import { FiUserPlus, FiLogIn } from 'react-icons/fi';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 60px;
  position: relative;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 760px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoutButton = styled(Boton)`
  margin: 32px auto 0;
  display: flex;
`;

const BackButton = styled(Boton)`
  margin: 20px auto 0;
  display: flex;
`;

// ─── Card unificada con tabs integradas ───

const AuthCard = styled.div`
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 720px;
  border: 1px solid #f0f0f0;
  overflow: hidden;
`;

const AuthHeader = styled.div`
  background: linear-gradient(135deg, #5c0e6d, #7b1fa2);
  display: flex;
  padding: 0;
`;

const AuthTab = styled.button`
  flex: 1;
  padding: 20px 24px;
  border: none;
  background: transparent;
  color: ${props => props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.55)'};
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: ${props => props.$active ? '700' : '500'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.25s ease;
  border-bottom: 3px solid ${props => props.$active ? '#9de03e' : 'transparent'};
  position: relative;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.06);
  }
`;

const AuthBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ─── Patient Dashboard (vista sencilla para pacientes) ───

const PatientDashboardWrapper = styled.div`
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 760px;
  border: 1px solid #f0f0f0;
  overflow: hidden;
`;

const PatientHeader = styled.div`
  background: linear-gradient(135deg, #5c0e6d, #7b1fa2);
  padding: 28px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PatientInfo = styled.div`
  color: #ffffff;
`;

const PatientName = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 2px;
`;

const PatientRole = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.15);
  padding: 3px 12px;
  border-radius: 20px;
`;

const PatientBody = styled.div`
  padding: 28px 36px 36px;
`;

const SectionTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CitaCard = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
`;

const CitaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CitaFecha = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a1a2e;
`;

const CitaDesc = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 0.82rem;
  color: #6b7280;
`;

const StatusBadge = styled.span`
  padding: 4px 14px;
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  background: ${props =>
    props.$color === 'green' ? '#dcfce7' :
    props.$color === 'red' ? '#fef2f2' :
    props.$color === 'gray' ? '#f3f4f6' :
    '#fef3c7'};
  color: ${props =>
    props.$color === 'green' ? '#16a34a' :
    props.$color === 'red' ? '#dc2626' :
    props.$color === 'gray' ? '#6b7280' :
    '#d97706'};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #9ca3af;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
`;

const NewAppointmentBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #9de03e, #86c935);
  color: #1a1a2e;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  margin: 0 auto 24px;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(157, 224, 62, 0.35);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(157, 224, 62, 0.5);
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 40px;
  color: #6b7280;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 40px;
  color: #dc2626;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
`;

const API_BASE = 'http://localhost:3001/api';

function getStatusColor(status) {
  switch (status) {
    case 'CONFIRMADA': return 'green';
    case 'CANCELADA': return 'red';
    case 'COMPLETADA': return 'gray';
    default: return 'yellow';
  }
}

function formatDateShort(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ─── Componente PatientDashboard ───

function PatientDashboard({ user, onLogout }) {
  const [view, setView] = useState('citas'); // 'citas' | 'nuevo-turno' | 'exito'
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCitas = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/citaCompleta`);
      if (!res.ok) throw new Error('Error al cargar citas');
      const data = await res.json();
      const misCitas = data.filter(c =>
        c.id_user === user.id_user ||
        c.email_user === user.email_user ||
        c.name_user === user.name_user
      );
      setCitas(misCitas);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (view === 'citas') loadCitas();
  }, [view]);

  if (view === 'nuevo-turno') {
    return (
      <PatientDashboardWrapper>
        <PatientHeader>
          <PatientInfo>
            <PatientName>Nuevo turno</PatientName>
          </PatientInfo>
          <PatientRole as="button" onClick={() => setView('citas')}
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', cursor: 'pointer', padding: '6px 16px', borderRadius: 20, fontFamily: 'Poppins', fontSize: '0.8rem' }}>
            ← Volver
          </PatientRole>
        </PatientHeader>
        <PatientBody>
          <AppointmentForm user={user} onSuccess={() => setView('exito')} />
        </PatientBody>
      </PatientDashboardWrapper>
    );
  }

  if (view === 'exito') {
    return (
      <PatientDashboardWrapper>
        <PatientBody>
          <AppointmentSuccess />
          <BackButton verde onClick={() => setView('citas')}>
            Ver mis citas
          </BackButton>
        </PatientBody>
      </PatientDashboardWrapper>
    );
  }

  return (
    <PatientDashboardWrapper>
      <PatientHeader>
        <PatientInfo>
          <PatientName>Hola, {user?.name_user || 'Paciente'}</PatientName>
          <PatientRole>Paciente</PatientRole>
        </PatientInfo>
        <Boton rojo onClick={onLogout} style={{ padding: '6px 18px', fontSize: '0.8rem', margin: 0 }}>
          Cerrar sesión
        </Boton>
      </PatientHeader>

      <PatientBody>
        <NewAppointmentBtn onClick={() => setView('nuevo-turno')}>
          + Agendar nuevo turno
        </NewAppointmentBtn>

        <SectionTitle>📋 Mis citas</SectionTitle>

        {loading && <LoadingState>Cargando tus citas...</LoadingState>}
        {error && <ErrorState>Error: {error}</ErrorState>}

        {!loading && !error && citas.length === 0 && (
          <EmptyState>
            No tenés citas agendadas todavía.<br />
            Hacé clic en "Agendar nuevo turno" para sacar tu primer turno.
          </EmptyState>
        )}

        {!loading && citas.map((c, i) => (
          <CitaCard key={c.id_citas || i}>
            <CitaInfo>
              <CitaFecha>{formatDateShort(c.date_cita)}</CitaFecha>
              <CitaDesc>{c.desc_cita || 'Sin descripción'}</CitaDesc>
            </CitaInfo>
            <StatusBadge $color={getStatusColor(c.status_cita)}>
              {c.status_cita || 'PENDIENTE'}
            </StatusBadge>
          </CitaCard>
        ))}
      </PatientBody>
    </PatientDashboardWrapper>
  );
}

// ─── SignUp principal ───

export default function SignUp({ isAuthenticated: propIsAuthenticated, user: propUser, onLogin, onLogout }) {
  const [internalIsAuthenticated, setInternalIsAuthenticated] = useState(false);
  const [internalUser, setInternalUser] = useState(null);
  const [step, setStep] = useState('form');
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  const isAuthenticated = propIsAuthenticated !== undefined ? propIsAuthenticated : internalIsAuthenticated;
  const user = propUser !== undefined ? propUser : internalUser;

  const handleLoginSuccess = (rolAsignado, userData) => {
    if (onLogin) {
      onLogin(userData);
    } else {
      setInternalUser(userData);
      setInternalIsAuthenticated(true);
    }
  };

  const handleRegisterSuccess = (userData) => {
    // Auto-login después del registro
    if (onLogin) {
      onLogin(userData);
    } else {
      setInternalUser(userData);
      setInternalIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      setInternalIsAuthenticated(false);
      setInternalUser(null);
    }
    setStep('form');
  };

  const staffRoles = ['Administrador', 'Doctor', 'Asistente'];

  // ─── Staff → Dashboard actual ───
  if (isAuthenticated && user && staffRoles.includes(user.nombre_rol)) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  // ─── Paciente autenticado → PatientDashboard ───
  if (isAuthenticated && user) {
    return (
      <PageWrapper>
        <BackgroundSlider />
        <ContentWrapper>
          <PatientDashboard user={user} onLogout={handleLogout} />
        </ContentWrapper>
      </PageWrapper>
    );
  }

  // ─── No autenticado → Login / Registro en card unificada ───
  return (
    <PageWrapper>
      <BackgroundSlider />

      <ContentWrapper>
        <AuthCard>
          <AuthHeader>
            <AuthTab $active={authMode === 'login'} onClick={() => setAuthMode('login')}>
              <FiLogIn size={18} /> Iniciar sesión
            </AuthTab>
            <AuthTab $active={authMode === 'register'} onClick={() => setAuthMode('register')}>
              <FiUserPlus size={18} /> Registrarse
            </AuthTab>
          </AuthHeader>

          <AuthBody>
            {authMode === 'login' ? (
              <Login embedded onLogin={handleLoginSuccess} />
            ) : (
              <RegistrationWizard
                embedded
                onRegister={handleRegisterSuccess}
                onBackToLogin={() => setAuthMode('login')}
              />
            )}
          </AuthBody>
        </AuthCard>
      </ContentWrapper>
    </PageWrapper>
  );
}
