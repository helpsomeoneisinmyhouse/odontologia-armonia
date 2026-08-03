import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { FiUser, FiCalendar, FiFileText, FiCheck, FiChevronRight, FiChevronLeft, FiAlertCircle } from 'react-icons/fi';

const API_BASE = 'http://localhost:3001/api';

const WizardCard = styled.div`
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 720px;
  border: 1px solid #f0f0f0;
  overflow: hidden;
`;

const WizardHeader = styled.div`
  background: linear-gradient(135deg, #5c0e6d, #7b1fa2);
  padding: 28px 36px 24px;
  text-align: center;
`;

const WizardTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 4px;
`;

const WizardSubtitle = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 36px 8px;
  gap: 0;
`;

const StepCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  background: ${props =>
    props.$status === 'completed' ? '#9de03e' :
    props.$status === 'active' ? '#5c0e6d' :
    '#e5e7eb'};
  color: ${props =>
    props.$status === 'completed' ? '#1a1a2e' :
    props.$status === 'active' ? '#ffffff' :
    '#9ca3af'};
  box-shadow: ${props =>
    props.$status === 'active' ? '0 0 0 4px rgba(92, 14, 109, 0.2)' :
    'none'};
`;

const StepConnector = styled.div`
  flex: 1;
  height: 3px;
  background: ${props => props.$completed ? '#9de03e' : '#e5e7eb'};
  transition: background 0.3s ease;
  margin: 0 4px;
  min-width: 30px;
`;

const StepLabels = styled.div`
  display: flex;
  justify-content: center;
  padding: 6px 36px 20px;
  gap: 0;
`;

const StepLabel = styled.div`
  flex: 1;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 0.7rem;
  font-weight: ${props => props.$active ? '700' : '500'};
  color: ${props =>
    props.$status === 'completed' ? '#9de03e' :
    props.$status === 'active' ? '#5c0e6d' :
    '#9ca3af'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
`;

const FormBody = styled.div`
  padding: 8px 36px 36px;
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$twoCol ? '1fr 1fr' : '1fr'};
  gap: 16px;
`;

const FieldGroup = styled.div`
  margin-bottom: 6px;
`;

const FieldLabel = styled.label`
  display: block;
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
`;

const FieldInput = styled.input`
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid #d1d5db;
  border-radius: 10px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.25s ease;
  background: #fafafa;
  color: #1a1a2e;
  box-sizing: border-box;

  &:focus {
    border-color: #5c0e6d;
    box-shadow: 0 0 0 4px rgba(92, 14, 109, 0.1);
    background: #ffffff;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const FieldSelect = styled.select`
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid #d1d5db;
  border-radius: 10px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.25s ease;
  background: #fafafa;
  color: #1a1a2e;
  box-sizing: border-box;

  &:focus {
    border-color: #5c0e6d;
    box-shadow: 0 0 0 4px rgba(92, 14, 109, 0.1);
    background: #ffffff;
  }
`;

const FieldTextarea = styled.textarea`
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid #d1d5db;
  border-radius: 10px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.25s ease;
  background: #fafafa;
  color: #1a1a2e;
  min-height: 100px;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    border-color: #5c0e6d;
    box-shadow: 0 0 0 4px rgba(92, 14, 109, 0.1);
    background: #ffffff;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const StepTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 4px;
`;

const StepDescription = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 0.82rem;
  color: #6b7280;
  margin: 0 0 20px;
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: ${props => props.$single ? 'flex-end' : 'space-between'};
  margin-top: 28px;
  gap: 12px;
`;

const BtnPrimary = styled.button`
  padding: 12px 32px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #9de03e, #86c935);
  color: #1a1a2e;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(157, 224, 62, 0.35);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(157, 224, 62, 0.5);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const BtnSecondary = styled.button`
  padding: 12px 24px;
  border: 1.5px solid #d1d5db;
  border-radius: 12px;
  background: #ffffff;
  color: #374151;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #5c0e6d;
    color: #5c0e6d;
    background: #faf5ff;
  }
`;

const ErrorText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 0.82rem;
  color: #dc2626;
  margin: 8px 0 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const WarningBox = styled.div`
  background: #fef3c7;
  border: 1px solid #fde68a;
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.82rem;
  color: #92400e;
`;

const ReviewBox = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e7eb;
`;

const ReviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
  font-family: 'Poppins', sans-serif;
  font-size: 0.88rem;

  &:last-child {
    border-bottom: none;
  }
`;

const ReviewLabel = styled.span`
  color: #6b7280;
  font-weight: 500;
`;

const ReviewValue = styled.span`
  color: #1a1a2e;
  font-weight: 600;
  text-align: right;
`;

const InfoText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  color: #6b7280;
  margin: 4px 0 0;
`;

const SuccessBody = styled.div`
  padding: 48px 36px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  color: #16a34a;
  margin-bottom: 16px;
`;

const SuccessTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 8px;
`;

const SuccessText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0 0 24px;
`;

// ─── 3 estaciones ───
const stations = [
  { key: 'paciente', icon: FiUser,     label: 'Paciente',  title: 'Datos del paciente',   desc: 'Contanos quién va a atenderse' },
  { key: 'turno',    icon: FiCalendar,  label: 'Turno',     title: 'Seleccioná tu turno',  desc: 'Elegí fecha y hora disponible' },
  { key: 'consulta', icon: FiFileText,  label: 'Consulta',  title: 'Motivo de la consulta', desc: 'Revisá tus datos y confirmá' },
];

function todayStr() {
  const d = new Date();
  return d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
}

function nowTimeStr() {
  const d = new Date();
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatGender(g) {
  if (g === 'M') return 'Masculino';
  if (g === 'F') return 'Femenino';
  return g || '—';
}

function formatDuration(h) {
  if (h === '1') return '1 hora';
  if (h === '2') return '2 horas';
  return h || '—';
}

export default function RegistrationWizard({ onRegister, onBackToLogin, embedded = false }) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [existingCitas, setExistingCitas] = useState([]);
  const [loadingCitas, setLoadingCitas] = useState(true);

  const [form, setForm] = useState({
    name_paciente: '',
    genre_paciente: '',
    birth_paciente: '',
    dir_paciente: '',
    telf_paciente: '',
    date_cita_1: '',
    date_cita_2: '',
    time_cita: '',
    email_user: '',
    key_user: '',
    confirm_key_user: '',
    desc_cita: '',
  });

  const totalSteps = stations.length;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/citaCompleta`);
        if (res.ok) {
          const data = await res.json();
          setExistingCitas(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error('Error al cargar citas:', e);
      } finally {
        setLoadingCitas(false);
      }
    };
    load();
  }, []);

  const bookedTimes = useMemo(() => {
    if (!form.date_cita_1 || existingCitas.length === 0) return [];
    return existingCitas
      .filter(c => {
        const citaDate = new Date(c.date_cita);
        const citaDateStr = citaDate.getFullYear() + '-' +
          String(citaDate.getMonth() + 1).padStart(2, '0') + '-' +
          String(citaDate.getDate()).padStart(2, '0');
        return citaDateStr === form.date_cita_1 && c.logic_cita !== 'I';
      })
      .map(c => {
        const d = new Date(c.date_cita);
        return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
      });
  }, [form.date_cita_1, existingCitas]);

  const isTimeBooked = form.date_cita_2 && bookedTimes.includes(form.date_cita_2);
  const isTimePast = form.date_cita_1 === todayStr() && form.date_cita_2 && form.date_cita_2 <= nowTimeStr();
  const timeError = isTimeBooked
    ? 'Este horario ya está ocupado. Elegí otro.'
    : isTimePast
      ? 'No podés seleccionar una hora que ya pasó.'
      : null;

  const isDatePast = form.date_cita_1 && form.date_cita_1 < todayStr();
  const isDateValid = form.date_cita_1 && !isDatePast;

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setForm(prev => ({ ...prev, telf_paciente: val }));
  };

  const canGoNext = () => {
    switch (step) {
      case 0: return form.name_paciente && form.genre_paciente && form.birth_paciente && form.email_user && form.key_user && form.key_user === form.confirm_key_user;
      case 1: return isDateValid && form.date_cita_2 && form.time_cita && !timeError;
      default: return true;
    }
  };

  const handleNext = () => {
    setError('');
    if (!canGoNext()) {
      if (step === 0 && form.key_user !== form.confirm_key_user) {
        setError('Las contraseñas no coinciden');
      } else {
        setError('Completá todos los campos requeridos');
      }
      return;
    }
    if (step < totalSteps - 1) setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setError('');
    if (step > 0) setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setError('');
    setSubmitting(true);

    const hour = parseInt(form.date_cita_2?.split(':')[0] || '0', 10);
    if (hour < 8 || hour > 18) {
      setError('El horario de atención es de 8:00 AM a 6:00 PM');
      setSubmitting(false);
      return;
    }

    if (isTimeBooked) {
      setError('Este horario ya está ocupado');
      setSubmitting(false);
      return;
    }

    try {
      const date = `${form.date_cita_1}T${form.date_cita_2}:00.000Z`;
      console.log(date)
      const response = await fetch(`${API_BASE}/citaCompleta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name_user: form.name_paciente,
          email_user: form.email_user,
          key_user: form.key_user,
          fk_rol: 4,
          logic_user: 'A',
          name_paciente: form.name_paciente,
          genre_paciente: form.genre_paciente,
          birth_paciente: form.birth_paciente,
          dir_paciente: form.dir_paciente,
          telf_paciente: form.telf_paciente,
          logic_paciente: 'A',
          fk_doctor: 1,
          date_cita: date,
          time_cita: form.time_cita,
          desc_cita: form.desc_cita,
          status_cita: 'PENDIENTE',
          logic_cita: 'A',
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al registrar');

      // Auto-login: llamar al endpoint de login con las credenciales
      const loginRes = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_user: form.email_user, key_user: form.key_user }),
      });

      if (loginRes.ok) {
        const userData = await loginRes.json();
        setRegistered(true);
        // Darle tiempo al usuario para ver el mensaje de éxito
        setTimeout(() => onRegister(userData), 2000);
      } else {
        // Si el login falla, igual considerar registro exitoso
        setRegistered(true);
        setTimeout(() => onRegister({
          name_user: form.name_paciente,
          email_user: form.email_user,
          nombre_rol: 'Paciente',
          fk_rol: 4,
        }), 2000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (registered) {
    if (embedded) {
      return (
        <>
          <SuccessBody style={{ paddingTop: 24 }}>
            <SuccessIcon><FiCheck /></SuccessIcon>
            <SuccessTitle>Bienvenido, {form.name_paciente}</SuccessTitle>
            <SuccessText>
              Tu cuenta fue creada y tu turno está pendiente de confirmación.<br />
              Te redirigimos a tu panel...
            </SuccessText>
          </SuccessBody>
        </>
      );
    }
    return (
      <WizardCard>
        <WizardHeader style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}>
          <WizardTitle>¡Registro exitoso!</WizardTitle>
        </WizardHeader>
        <SuccessBody>
          <SuccessIcon><FiCheck /></SuccessIcon>
          <SuccessTitle>Bienvenido, {form.name_paciente}</SuccessTitle>
          <SuccessText>
            Tu cuenta fue creada y tu turno está pendiente de confirmación.<br />
            Te redirigimos a tu panel...
          </SuccessText>
        </SuccessBody>
      </WizardCard>
    );
  }

  const getStepStatus = (index) => {
    if (index < step) return 'completed';
    if (index === step) return 'active';
    return 'pending';
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <StepTitle>{stations[0].title}</StepTitle>
            <StepDescription>{stations[0].desc}</StepDescription>
            <FieldGrid $twoCol>
              <FieldGroup>
                <FieldLabel>Nombre completo *</FieldLabel>
                <FieldInput type="text" placeholder="Tu nombre completo" value={form.name_paciente} onChange={set('name_paciente')} />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Sexo *</FieldLabel>
                <FieldSelect value={form.genre_paciente} onChange={set('genre_paciente')}>
                  <option value="">Seleccionar...</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </FieldSelect>
              </FieldGroup>
            </FieldGrid>
            <FieldGrid $twoCol>
              <FieldGroup>
                <FieldLabel>Fecha de nacimiento *</FieldLabel>
                <FieldInput type="date" value={form.birth_paciente} onChange={set('birth_paciente')} />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Teléfono</FieldLabel>
                <FieldInput type="tel" placeholder="04121234567" value={form.telf_paciente} onChange={handlePhoneChange} maxLength={15} />
                <InfoText>Solo números, sin guiones ni espacios</InfoText>
              </FieldGroup>
            </FieldGrid>
            <FieldGroup>
              <FieldLabel>Dirección</FieldLabel>
              <FieldInput type="text" placeholder="Dirección de tu hogar" value={form.dir_paciente} onChange={set('dir_paciente')} />
            </FieldGroup>
            <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
            <StepTitle style={{ fontSize: '0.95rem' }}>Datos de acceso</StepTitle>
            <FieldGrid $twoCol>
              <FieldGroup>
                <FieldLabel>Correo electrónico *</FieldLabel>
                <FieldInput type="email" placeholder="tu@correo.com" value={form.email_user} onChange={set('email_user')} />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Contraseña *</FieldLabel>
                <FieldInput type="password" placeholder="Tu contraseña" value={form.key_user} onChange={set('key_user')} />
              </FieldGroup>
            </FieldGrid>
            <FieldGroup>
              <FieldLabel>Confirmar contraseña *</FieldLabel>
              <FieldInput type="password" placeholder="Repetí tu contraseña" value={form.confirm_key_user} onChange={set('confirm_key_user')} />
              {form.confirm_key_user && form.key_user !== form.confirm_key_user && (
                <ErrorText><FiAlertCircle /> Las contraseñas no coinciden</ErrorText>
              )}
            </FieldGroup>
          </>
        );

      case 1:
        return (
          <>
            <StepTitle>{stations[1].title}</StepTitle>
            <StepDescription>{stations[1].desc}</StepDescription>
            {loadingCitas && <InfoText style={{ marginBottom: 12 }}>Verificando disponibilidad...</InfoText>}
            <FieldGrid $twoCol>
              <FieldGroup>
                <FieldLabel>Fecha *</FieldLabel>
                <FieldInput type="date" min={todayStr()} value={form.date_cita_1} onChange={(e) => setForm(prev => ({ ...prev, date_cita_1: e.target.value, date_cita_2: '' }))} />
                {isDatePast && <ErrorText><FiAlertCircle /> No podés seleccionar una fecha pasada</ErrorText>}
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Hora *</FieldLabel>
                <FieldInput type="time" min={form.date_cita_1 === todayStr() ? nowTimeStr() : '08:00'} max="18:00" value={form.date_cita_2} onChange={set('date_cita_2')} disabled={!isDateValid} />
              </FieldGroup>
            </FieldGrid>
            {timeError && <ErrorText><FiAlertCircle /> {timeError}</ErrorText>}
            {form.date_cita_1 && bookedTimes.length > 0 && (
              <WarningBox>
                <FiAlertCircle size={18} />
                <span>Horarios ocupados: <strong>{bookedTimes.join(', ')}</strong></span>
              </WarningBox>
            )}
            {form.date_cita_1 && bookedTimes.length === 0 && !loadingCitas && (
              <InfoText style={{ marginTop: 8 }}>✅ Todos los horarios están disponibles.</InfoText>
            )}
            <FieldGroup style={{ marginTop: 8 }}>
              <FieldLabel>Duración *</FieldLabel>
              <FieldSelect value={form.time_cita} onChange={set('time_cita')}>
                <option value="">Seleccionar...</option>
                <option value="1">1 hora</option>
                <option value="2">2 horas</option>
              </FieldSelect>
            </FieldGroup>
          </>
        );

      case 2:
        return (
          <>
            <StepTitle>{stations[2].title}</StepTitle>
            <StepDescription>{stations[2].desc}</StepDescription>
            <FieldGroup>
              <FieldLabel>Descripción del motivo *</FieldLabel>
              <FieldTextarea placeholder="Contanos brevemente el motivo de tu consulta..." value={form.desc_cita} onChange={set('desc_cita')} />
            </FieldGroup>

            <StepTitle style={{ fontSize: '0.95rem', marginTop: '24px' }}>Resumen</StepTitle>
            <ReviewBox>
              <ReviewRow><ReviewLabel>Paciente</ReviewLabel><ReviewValue>{form.name_paciente}</ReviewValue></ReviewRow>
              <ReviewRow><ReviewLabel>Sexo</ReviewLabel><ReviewValue>{formatGender(form.genre_paciente)}</ReviewValue></ReviewRow>
              <ReviewRow><ReviewLabel>Fecha</ReviewLabel><ReviewValue>{formatDate(form.date_cita_1)}</ReviewValue></ReviewRow>
              <ReviewRow><ReviewLabel>Horario</ReviewLabel><ReviewValue>{form.date_cita_2 || '—'} hs</ReviewValue></ReviewRow>
              <ReviewRow><ReviewLabel>Duración</ReviewLabel><ReviewValue>{formatDuration(form.time_cita)}</ReviewValue></ReviewRow>
              <ReviewRow><ReviewLabel>Email</ReviewLabel><ReviewValue>{form.email_user}</ReviewValue></ReviewRow>
              <ReviewRow style={{ border: 'none' }}><ReviewLabel>Estado</ReviewLabel><ReviewValue style={{ color: '#d97706' }}>Pendiente</ReviewValue></ReviewRow>
            </ReviewBox>
          </>
        );

      default:
        return null;
    }
  };

  const isLastStep = step === totalSteps - 1;

  // Modo embedded: sin WizardCard/WizardHeader, solo el contenido
  if (embedded) {
    return (
      <>
        <ProgressBar>
          {stations.map((s, i) => (
            <React.Fragment key={s.key}>
              <StepCircle $status={getStepStatus(i)}>
                {getStepStatus(i) === 'completed' ? <FiCheck /> : <s.icon />}
              </StepCircle>
              {i < totalSteps - 1 && <StepConnector $completed={getStepStatus(i) === 'completed'} />}
            </React.Fragment>
          ))}
        </ProgressBar>

        <StepLabels>
          {stations.map((s, i) => (
            <StepLabel key={s.key} $active={step === i} $status={getStepStatus(i)}>{s.label}</StepLabel>
          ))}
        </StepLabels>

        <FormBody>
          {renderStep()}
          {error && <ErrorText><FiAlertCircle /> {error}</ErrorText>}

          <NavButtons $single={step === 0}>
            {step > 0 && (
              <BtnSecondary onClick={handleBack}><FiChevronLeft /> Anterior</BtnSecondary>
            )}
            {isLastStep ? (
              <BtnPrimary onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Creando cuenta...' : 'Crear cuenta y agendar'} <FiChevronRight />
              </BtnPrimary>
            ) : (
              <BtnPrimary onClick={handleNext} disabled={step === 1 && !!timeError}>
                Siguiente <FiChevronRight />
              </BtnPrimary>
            )}
          </NavButtons>

          {step === 0 && (
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <BtnSecondary onClick={onBackToLogin}>
                ← Ya tengo cuenta, quiero iniciar sesión
              </BtnSecondary>
            </div>
          )}
        </FormBody>
      </>
    );
  }

  return (
    <WizardCard>
      <WizardHeader>
        <WizardTitle>Creá tu cuenta y agendá tu turno</WizardTitle>
        <WizardSubtitle>Todo en un solo paso</WizardSubtitle>
      </WizardHeader>

      <ProgressBar>
        {stations.map((s, i) => (
          <React.Fragment key={s.key}>
            <StepCircle $status={getStepStatus(i)}>
              {getStepStatus(i) === 'completed' ? <FiCheck /> : <s.icon />}
            </StepCircle>
            {i < totalSteps - 1 && <StepConnector $completed={getStepStatus(i) === 'completed'} />}
          </React.Fragment>
        ))}
      </ProgressBar>

      <StepLabels>
        {stations.map((s, i) => (
          <StepLabel key={s.key} $active={step === i} $status={getStepStatus(i)}>{s.label}</StepLabel>
        ))}
      </StepLabels>

      <FormBody>
        {renderStep()}
        {error && <ErrorText><FiAlertCircle /> {error}</ErrorText>}

        <NavButtons $single={step === 0}>
          {step > 0 && (
            <BtnSecondary onClick={handleBack}><FiChevronLeft /> Anterior</BtnSecondary>
          )}
          {isLastStep ? (
            <BtnPrimary onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Creando cuenta...' : 'Crear cuenta y agendar'} <FiChevronRight />
            </BtnPrimary>
          ) : (
            <BtnPrimary onClick={handleNext} disabled={step === 1 && !!timeError}>
              Siguiente <FiChevronRight />
            </BtnPrimary>
          )}
        </NavButtons>

        {step === 0 && (
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <BtnSecondary onClick={onBackToLogin}>
              ← Ya tengo cuenta, quiero iniciar sesión
            </BtnSecondary>
          </div>
        )}
      </FormBody>
    </WizardCard>
  );
}
