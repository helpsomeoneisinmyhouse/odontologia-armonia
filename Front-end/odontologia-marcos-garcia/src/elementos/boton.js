import styled, { css } from "styled-components";

const Boton = styled.button`
    color: #1a1a2e;
    background: #9de03e;
    display: inline-block;
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    font-family: 'Poppins', system-ui, sans-serif;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;

    &:hover {
        background: #86c935;
        transform: translateY(-1px);
    };

    &:active {
        transform: scale(0.98);
    };

    ${props => props.rojo && css`
        color: #ffffff;
        background: #dc2626;
        &:hover {
            background: #b91c1c;
        };
    `};

    ${props => props.verde && css`
        color: #1a1a2e;
        background: #9de03e;
        &:hover {
            background: #86c935;
        };
    `};

    width: ${props => props.anchocompleto ? "100%" : "auto"};
`;

export default Boton;
