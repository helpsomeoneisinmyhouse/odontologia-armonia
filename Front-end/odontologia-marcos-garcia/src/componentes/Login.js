import React, { useState } from "react";
import styled from "styled-components";
import { FaUser, FaLock } from "react-icons/fa";

const Card = styled.div`
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 420px;
    border: 1px solid #f0f0f0;
    overflow: hidden;
`;

const CardHeader = styled.div`
    background: linear-gradient(135deg, #5c0e6d, #7b1fa2);
    padding: 36px 36px 28px;
    text-align: center;
`;

const CardLogo = styled.div`
    font-family: 'Dancing Script', cursive;
    font-size: 2.2rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 4px;
`;

const CardHeaderText = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.75);
    margin: 0;
`;

const CardBody = styled.div`
    padding: 32px 36px 36px;
`;

const WelcomeTitle = styled.h2`
    font-family: 'Poppins', sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 4px;
    text-align: center;
`;

const WelcomeSub = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 0.85rem;
    color: #6b7280;
    margin-bottom: 28px;
    text-align: center;
`;

const InputGroup = styled.div`
    margin-bottom: 18px;
`;

const InputLabel = styled.label`
    display: block;
    font-family: 'Poppins', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 6px;
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const InputIcon = styled.span`
    position: absolute;
    left: 14px;
    color: #9ca3af;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    pointer-events: none;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 14px 12px 42px;
    border: 1.5px solid #d1d5db;
    border-radius: 12px;
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    outline: none;
    transition: all 0.25s ease;
    background: #fafafa;
    color: #1a1a2e;

    &:focus {
        border-color: #5c0e6d;
        box-shadow: 0 0 0 4px rgba(92, 14, 109, 0.1);
        background: #ffffff;
    }

    &::placeholder {
        color: #9ca3af;
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 14px;
    margin-top: 28px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #9de03e, #86c935);
    color: #1a1a2e;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 0.3px;
    box-shadow: 0 4px 16px rgba(157, 224, 62, 0.35);
    transition: all 0.25s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 28px rgba(157, 224, 62, 0.5);
    }

    &:active {
        transform: translateY(0) scale(0.98);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`;

const ErrorMsg = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 0.85rem;
    color: #dc2626;
    text-align: center;
    margin-top: 12px;
`;

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email_user: email, key_user: password }),
            });

            if (response.ok) {
                const user = await response.json();
                props.onLogin(user.nombre_rol, user);
            } else {
                const data = await response.json();
                setError(data.error || 'Email o contraseña incorrectos');
            }
        } catch {
            setError('Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    // Modo embedded: sin Card/CardHeader, solo el formulario (para usar dentro de otra card)
    if (props.embedded) {
        return (
            <CardBody>
                <WelcomeTitle>Bienvenido</WelcomeTitle>
                <WelcomeSub>Ingresá tus datos para continuar</WelcomeSub>

                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <InputWrapper>
                            <InputIcon><FaUser /></InputIcon>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                            />
                        </InputWrapper>
                    </InputGroup>

                    <InputGroup>
                        <InputLabel htmlFor="password">Contraseña</InputLabel>
                        <InputWrapper>
                            <InputIcon><FaLock /></InputIcon>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </InputWrapper>
                    </InputGroup>

                    {error && <ErrorMsg>{error}</ErrorMsg>}

                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </SubmitButton>
                </form>
            </CardBody>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardLogo>Armonía</CardLogo>
                <CardHeaderText>Accedé al sistema de turnos</CardHeaderText>
            </CardHeader>

            <CardBody>
                <WelcomeTitle>Bienvenido</WelcomeTitle>
                <WelcomeSub>Ingresá tus datos para continuar</WelcomeSub>

                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <InputWrapper>
                            <InputIcon><FaUser /></InputIcon>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                            />
                        </InputWrapper>
                    </InputGroup>

                    <InputGroup>
                        <InputLabel htmlFor="password">Contraseña</InputLabel>
                        <InputWrapper>
                            <InputIcon><FaLock /></InputIcon>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </InputWrapper>
                    </InputGroup>

                    {error && <ErrorMsg>{error}</ErrorMsg>}

                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </SubmitButton>
                </form>
            </CardBody>
        </Card>
    );
};

export default Login;
