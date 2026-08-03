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

  &:invalid {
    border-color: ${props => props.$error ? '#dc2626' : '#d1d5db'};
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

const ModeToggleContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const ModeToggleButton = styled.button`
  flex: 1;
  padding: 10px 16px;
  border-radius: 10px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$active ? '#5c0e6d' : '#ffffff'};
  color: ${props => props.$active ? '#ffffff' : '#5c0e6d'};
  border: 1.5px solid #5c0e6d;

  &:hover {
    background: ${props => props.$active ? '#4a0b5a' : '#faf5ff'};
  }
`;

// ─── 3 estaciones base ───
const stations = [
  { key: 'paciente', icon: FiUser, label: 'Paciente', title: 'Datos del paciente', desc: 'Contanos quién va a atenderse' },
  { key: 'turno',   icon: FiCalendar, label: 'Turno',    title: 'Seleccioná tu turno', desc: 'Elegí la fecha y hora disponible que te quede mejor' },
  { key: 'consulta', icon: FiFileText, label: 'Consulta', title: 'Motivo de la consulta', desc: 'Revisá tus datos y confirmá el turno' },
];

// ─── helpers ───
function todayStr() {
  const d = new Date();
  return d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
}

// ─── helpers continuados ───
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

function parseHour(timeStr) {
  if (!timeStr) return 0;
  return parseInt(timeStr.split(':')[0], 10);
}

export default function AppointmentForm({ user, onSuccess }) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
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
    desc_cita: '',
  });

  const isPatient = user && user.nombre_rol === 'Paciente';
  const isStaff = user && user.nombre_rol !== 'Paciente';
  const activeStations = isPatient ? stations.filter(s => s.key !== 'paciente') : stations;
  const totalSteps = activeStations.length;

  const [pacientes, setPacientes] = useState([]);
  const [selectedPacienteId, setSelectedPacienteId] = useState('');
  const [creationMode, setCreationMode] = useState('select'); // 'select' | 'create'
  const [loadingPacientes, setLoadingPacientes] = useState(false);

  // ─── cargar lista de pacientes si el usuario es staff ───
  useEffect(() => {
    if (isStaff) {
      const fetchPacientes = async () => {
        setLoadingPacientes(true);
        try {
          const res = await fetch(`${API_BASE}/pacientes`);
          if (res.ok) {
            const data = await res.json();
            setPacientes(Array.isArray(data) ? data : []);
          }
        } catch (e) {
          console.error('Error al cargar pacientes:', e);
        } finally {
          setLoadingPacientes(false);
        }
      };
      fetchPacientes();
    }
  }, [isStaff]);

  // ─── cargar citas existentes para validar disponibilidad ───
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

  // ─── precargar datos del paciente desde user logueado (solo si es paciente) ───
  useEffect(() => {
    if (user && isPatient) {
      setForm(prev => ({
        ...prev,
        name_paciente: user.name_paciente || user.name_user || '',
        genre_paciente: user.genre_paciente || '',
        birth_paciente: user.birth_paciente || '',
        dir_paciente: user.dir_paciente || '',
        telf_paciente: user.telf_paciente || '',
      }));
    }
  }, [user, isPatient]);

  // ─── horas ocupadas para la fecha seleccionada ───
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

  // ─── validar que la hora no sea pasada (si es hoy) ───
  const isTimePast = form.date_cita_1 === todayStr() && form.date_cita_2 && form.date_cita_2 <= nowTimeStr();

  const timeError = isTimeBooked
    ? 'Este horario ya está ocupado. Elegí otro horario.'
    : isTimePast
      ? 'No podés seleccionar una hora que ya pasó.'
      : null;

  // ─── validar que la fecha no sea pasada ───
  const isDatePast = form.date_cita_1 && form.date_cita_1 < todayStr();

  const isDateValid = form.date_cita_1 && !isDatePast;

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const canGoNext = () => {
    const station = activeStations[step];
    switch (station.key) {
      case 'paciente':
        if (isStaff && creationMode === 'select') {
          return selectedPacienteId !== '';
        }
        return form.name_paciente && form.genre_paciente && form.birth_paciente;
      case 'turno':
        return isDateValid && form.date_cita_2 && form.time_cita && !timeError;
      default:
        return true;
    }
  };

  const handleNext = () => {
    setError('');
    if (!canGoNext()) {
      const station = activeStations[step];
      if (station.key === 'paciente') {
        if (isStaff && creationMode === 'select' && !selectedPacienteId) {
          setError('Seleccioná un paciente existente antes de continuar');
        } else {
          setError('Completá todos los campos requeridos antes de continuar');
        }
      } else if (station.key === 'turno') {
        if (!isDateValid) setError('Seleccioná una fecha válida (no puede ser pasada)');
        else if (timeError) setError(timeError);
        else setError('Completá todos los campos requeridos antes de continuar');
      }
      return;
    }
    if (step < totalSteps - 1) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setError('');
    if (step > 0) setStep(prev => prev - 1);
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setForm(prev => ({ ...prev, telf_paciente: val }));
  };


  // ---------------------------------------------------------
  // EL HANDLEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  // ---------------------------------------------------------
  const handleSubmit = async () => {
    setError('');
    setSubmitting(true);

    console.log('entro al handle')

    const hour = parseHour(form.date_cita_2);
    if (hour < 8 || hour > 18) {
      setError('El horario de atención es de 8:00 AM a 6:00 PM');
      setSubmitting(false);
      return;
    }

    if (isTimeBooked) {
      setError('Este horario ya está ocupado. Elegí otro.');
      setSubmitting(false);
      return;
    }

    console.log('llegamos justo antes del date')

    try {
      const date = `${form.date_cita_1}T${form.date_cita_2}:00.000Z`;
      console.log(date)
      let response;


      if (isPatient && user?.id_paciente) {
        response = await fetch(`${API_BASE}/citas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fk_paciente: parseInt(user.id_paciente, 10),
            fk_doctor: 1,
            date_cita: date,
            time_cita: form.time_cita,
            desc_cita: form.desc_cita,
            status_cita: 'PENDIENTE',
            logic_cita: 'A',
          }),
        });
      } else if (isStaff && creationMode === 'select' && selectedPacienteId) {
        response = await fetch(`${API_BASE}/citas`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fk_paciente: parseInt(selectedPacienteId, 10),
            fk_doctor: 1,
            date_cita: date,
            time_cita: form.time_cita,
            desc_cita: form.desc_cita,
            status_cita: 'PENDIENTE',
            logic_cita: 'A',
          }),
        });
      } else {
        response = await fetch(`${API_BASE}/citaCompleta`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name_user: form.name_paciente,
            email_user: `${form.name_paciente.replace(/\s/g, '').toLowerCase()}@email.com`,
            key_user: 'paciente2024',
            fk_rol: 4,
            logic_user: 'A',
            name_paciente: form.name_paciente,
            genre_paciente: form.genre_paciente || 'M',
            birth_paciente: form.birth_paciente || '2000-01-01',
            dir_paciente: form.dir_paciente || 'Sin especificar',
            telf_paciente: form.telf_paciente || '0000000000',
            logic_paciente: 'A',
            fk_doctor: 1,
            date_cita: date,
            time_cita: form.time_cita,
            desc_cita: form.desc_cita,
            status_cita: 'PENDIENTE',
            logic_cita: 'A',
          }),
        });
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al registrar la cita');

      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const getStepStatus = (index) => {
    if (index < step) return 'completed';
    if (index === step) return 'active';
    return 'pending';
  };

  // ─── render de cada paso ───

  const renderStep = () => {
    const station = activeStations[step];
    switch (station.key) {
      case 'paciente':
        return (
          <>
            <StepTitle>{station.title}</StepTitle>
            <StepDescription>{station.desc}</StepDescription>

            {isStaff && (
              <ModeToggleContainer>
                <ModeToggleButton
                  type="button"
                  $active={creationMode === 'select'}
                  onClick={() => {
                    setCreationMode('select');
                    setSelectedPacienteId('');
                    setForm(prev => ({
                      ...prev,
                      name_paciente: '',
                      genre_paciente: '',
                      birth_paciente: '',
                      dir_paciente: '',
                      telf_paciente: '',
                    }));
                  }}
                >
                  Seleccionar paciente existente
                </ModeToggleButton>
                <ModeToggleButton
                  type="button"
                  $active={creationMode === 'create'}
                  onClick={() => {
                    setCreationMode('create');
                    setSelectedPacienteId('');
                    setForm(prev => ({
                      ...prev,
                      name_paciente: '',
                      genre_paciente: '',
                      birth_paciente: '',
                      dir_paciente: '',
                      telf_paciente: '',
                    }));
                  }}
                >
                  Crear nuevo paciente
                </ModeToggleButton>
              </ModeToggleContainer>
            )}

            {isStaff && creationMode === 'select' && (
              <FieldGroup style={{ marginBottom: '20px' }}>
                <FieldLabel>Seleccionar Paciente *</FieldLabel>
                {loadingPacientes ? (
                  <InfoText>Cargando pacientes...</InfoText>
                ) : (
                  <FieldSelect
                    value={selectedPacienteId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setSelectedPacienteId(id);
                      if (id) {
                        const p = pacientes.find(x => String(x.id_paciente) === String(id));
                        if (p) {
                          setForm(prev => ({
                            ...prev,
                            name_paciente: p.name_paciente,
                            genre_paciente: p.genre_paciente || 'M',
                            birth_paciente: p.birth_paciente || '',
                            dir_paciente: p.dir_paciente || '',
                            telf_paciente: p.telf_paciente || '',
                          }));
                        }
                      } else {
                        setForm(prev => ({
                          ...prev,
                          name_paciente: '',
                          genre_paciente: '',
                          birth_paciente: '',
                          dir_paciente: '',
                          telf_paciente: '',
                        }));
                      }
                    }}
                  >
                    <option value="">-- Seleccionar paciente --</option>
                    {pacientes.map(p => (
                      <option key={p.id_paciente} value={p.id_paciente}>
                        {p.name_paciente} ({p.telf_paciente || 'Sin teléfono'})
                      </option>
                    ))}
                  </FieldSelect>
                )}
              </FieldGroup>
            )}

            {(!isStaff || creationMode === 'create' || selectedPacienteId) && (
              <>
                <FieldGrid $twoCol>
                  <FieldGroup>
                    <FieldLabel>Nombre completo *</FieldLabel>
                    <FieldInput
                      type="text"
                      placeholder="Nombre del paciente"
                      value={form.name_paciente}
                      onChange={set('name_paciente')}
                      disabled={isStaff && creationMode === 'select'}
                    />
                  </FieldGroup>
                  <FieldGroup>
                    <FieldLabel>Sexo *</FieldLabel>
                    <FieldSelect
                      value={form.genre_paciente}
                      onChange={set('genre_paciente')}
                      disabled={isStaff && creationMode === 'select'}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                    </FieldSelect>
                  </FieldGroup>
                </FieldGrid>
                <FieldGrid $twoCol>
                  <FieldGroup>
                    <FieldLabel>Fecha de nacimiento *</FieldLabel>
                    <FieldInput
                      type="date"
                      value={form.birth_paciente}
                      onChange={set('birth_paciente')}
                      disabled={isStaff && creationMode === 'select'}
                    />
                  </FieldGroup>
                  <FieldGroup>
                    <FieldLabel>Teléfono</FieldLabel>
                    <FieldInput
                      type="tel"
                      placeholder="04121234567"
                      value={form.telf_paciente}
                      onChange={handlePhoneChange}
                      maxLength={15}
                      disabled={isStaff && creationMode === 'select'}
                    />
                    <InfoText>Solo números, sin guiones ni espacios</InfoText>
                  </FieldGroup>
                </FieldGrid>
                <FieldGroup>
                  <FieldLabel>Dirección</FieldLabel>
                  <FieldInput
                    type="text"
                    placeholder="Dirección del hogar"
                    value={form.dir_paciente}
                    onChange={set('dir_paciente')}
                    disabled={isStaff && creationMode === 'select'}
                  />
                </FieldGroup>
              </>
            )}
          </>
        );

      case 'turno':
        return (
          <>
            <StepTitle>{station.title}</StepTitle>
            <StepDescription>{station.desc}</StepDescription>

            {loadingCitas && (
              <InfoText style={{ marginBottom: 12 }}>Verificando disponibilidad...</InfoText>
            )}

            <FieldGrid $twoCol>
              <FieldGroup>
                <FieldLabel>Fecha *</FieldLabel>
                <FieldInput
                  type="date"
                  min={todayStr()}
                  value={form.date_cita_1}
                  onChange={(e) => {
                    setForm(prev => ({ ...prev, date_cita_1: e.target.value, date_cita_2: '' }));
                  }}
                />
                {isDatePast && (
                  <ErrorText><FiAlertCircle /> No podés seleccionar una fecha pasada</ErrorText>
                )}
              </FieldGroup>



              {/*LA HORA DE LA DISCORDIAAAAAAAAAAAAAAAAAAA*/}
              <FieldGroup>
                <FieldLabel>Hora *</FieldLabel>
                <FieldInput
                  type="time"
                  min={form.date_cita_1 === todayStr() ? nowTimeStr() : '08:00'}
                  max="18:00"
                  value={form.date_cita_2}
                  onChange={set('date_cita_2')}
                  disabled={!isDateValid}
                />
              </FieldGroup>
            </FieldGrid>




            {timeError && (
              <ErrorText><FiAlertCircle /> {timeError}</ErrorText>
            )}

            {form.date_cita_1 && bookedTimes.length > 0 && (
              <WarningBox>
                <FiAlertCircle size={18} />
                <span>
                  Horarios ya ocupados para esta fecha: <strong>{bookedTimes.join(', ')}</strong>
                </span>
              </WarningBox>
            )}

            {form.date_cita_1 && bookedTimes.length === 0 && !loadingCitas && (
              <InfoText style={{ marginTop: 8 }}>✅ Todos los horarios están disponibles para esta fecha.</InfoText>
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

      case 'consulta':
        return (
          <>
            <StepTitle>{station.title}</StepTitle>
            <StepDescription>{station.desc}</StepDescription>
            <FieldGroup>
              <FieldLabel>Descripción del motivo *</FieldLabel>
              <FieldTextarea
                placeholder="Contanos brevemente el motivo de tu consulta..."
                value={form.desc_cita}
                onChange={set('desc_cita')}
              />
            </FieldGroup>

            <StepTitle style={{ fontSize: '0.95rem', marginTop: '24px' }}>Resumen de tu turno</StepTitle>
            <ReviewBox>
              <ReviewRow>
                <ReviewLabel>Paciente</ReviewLabel>
                <ReviewValue>{form.name_paciente}</ReviewValue>
              </ReviewRow>
              <ReviewRow>
                <ReviewLabel>Sexo</ReviewLabel>
                <ReviewValue>{formatGender(form.genre_paciente)}</ReviewValue>
              </ReviewRow>
              <ReviewRow>
                <ReviewLabel>Fecha</ReviewLabel>
                <ReviewValue>{formatDate(form.date_cita_1)}</ReviewValue>
              </ReviewRow>
              <ReviewRow>
                <ReviewLabel>Horario</ReviewLabel>
                <ReviewValue>{form.date_cita_2 || '—'} hs</ReviewValue>
              </ReviewRow>
              <ReviewRow>
                <ReviewLabel>Duración</ReviewLabel>
                <ReviewValue>{formatDuration(form.time_cita)}</ReviewValue>
              </ReviewRow>
              <ReviewRow>
                <ReviewLabel>Usuario</ReviewLabel>
                <ReviewValue>{user?.name_user || form.name_paciente}</ReviewValue>
              </ReviewRow>
              <ReviewRow>
                <ReviewLabel>Email</ReviewLabel>
                <ReviewValue>{user?.email_user || '—'}</ReviewValue>
              </ReviewRow>
            </ReviewBox>
          </>
        );

      default:
        return null;
    }
  };

  const isLastStep = step === totalSteps - 1;

  return (
    <WizardCard>
      <WizardHeader>
        <WizardTitle>Agendá tu turno</WizardTitle>
        <WizardSubtitle>{user ? 'Elegí tu turno en solo 2 pasos' : 'Completá tus datos paso a paso'}</WizardSubtitle>
      </WizardHeader>

      <ProgressBar>
        {activeStations.map((s, i) => (
          <React.Fragment key={s.key}>
            <StepCircle $status={getStepStatus(i)}>
              {getStepStatus(i) === 'completed' ? <FiCheck /> : <s.icon />}
            </StepCircle>
            {i < totalSteps - 1 && (
              <StepConnector $completed={getStepStatus(i) === 'completed'} />
            )}
          </React.Fragment>
        ))}
      </ProgressBar>

      <StepLabels>
        {activeStations.map((s, i) => (
          <StepLabel
            key={s.key}
            $active={step === i}
            $status={getStepStatus(i)}
          >
            {s.label}
          </StepLabel>
        ))}
      </StepLabels>

      <FormBody>
        {renderStep()}

        {error && <ErrorText><FiAlertCircle /> {error}</ErrorText>}

        <NavButtons $single={step === 0}>
          {step > 0 && (
            <BtnSecondary onClick={handleBack}>
              <FiChevronLeft /> Anterior
            </BtnSecondary>
          )}
          {isLastStep ? (
            <BtnPrimary onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Agendando...' : 'Agendar turno'} <FiChevronRight />
            </BtnPrimary>
          ) : (
            <BtnPrimary onClick={handleNext} disabled={!canGoNext() && activeStations[step].key === 'turno' && !!timeError}>
              Siguiente <FiChevronRight />
            </BtnPrimary>
          )}
        </NavButtons>
      </FormBody>
    </WizardCard>
  );
}
