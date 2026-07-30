import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: rgba(92, 14, 109, 0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
    box-shadow: 0 2px 12px rgba(92, 14, 109, 0.35);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    transition: background 0.3s ease;
`;

export const NavLink = styled(Link)`
    color: #ffffff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1.2rem;
    height: 100%;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 0.95rem;
    letter-spacing: 0.3px;
    transition: color 0.2s ease, border-color 0.2s ease;
    cursor: pointer;
    position: relative;

    &:hover {
        color: #9de03e;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%) scaleX(0);
        width: 60%;
        height: 3px;
        background: #9de03e;
        border-radius: 2px;
        transition: transform 0.25s ease;
    }

    &:hover::after {
        transform: translateX(-50%) scaleX(1);
    }

    &.active {
        color: #9de03e;
        border-bottom: 3px solid #9de03e;
    }
`;

/* ScrollLink: igual visual que NavLink pero sin ser <a>, para scroll suave */
export const ScrollLink = styled.span`
    color: #ffffff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1.2rem;
    height: 100%;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 0.95rem;
    letter-spacing: 0.3px;
    transition: color 0.2s ease, border-color 0.2s ease;
    cursor: pointer;
    position: relative;
    background: none;
    border: none;
    user-select: none;

    &:hover {
        color: #9de03e;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%) scaleX(0);
        width: 60%;
        height: 3px;
        background: #9de03e;
        border-radius: 2px;
        transition: transform 0.25s ease;
    }

    &:hover::after {
        transform: translateX(-50%) scaleX(1);
    }
`;

export const SignNavLink = styled(Link)`
    color: #1a1a2e;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1.4rem;
    height: auto;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 0.95rem;
    background: #9de03e;
    border-radius: 8px;
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(157, 224, 62, 0.3);

    &:hover {
        background: #86c935;
        transform: translateY(-2px);
        box-shadow: 0 4px 14px rgba(157, 224, 62, 0.45);
    }

    &:active {
        transform: scale(0.97);
    }

    &.active {
        background: #86c935;
        color: #1a1a2e;
        border-bottom: none;
    }
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #ffffff;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const LogoArea = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    color: #ffffff;
    font-family: 'Dancing Script', cursive;
    font-weight: 700;
    font-size: 1.4rem;
    letter-spacing: 0.5px;
    cursor: pointer;
`;
