import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";

import bg1 from "../assets/images/limpieza.jpg";
import bg2 from "../assets/images/protesis.jpg";
import bg3 from "../assets/images/blanqueamiento.jpg";
import bg4 from "../assets/images/cirugia.jpg";
import bg5 from "../assets/images/ortodoncia_correctiva.jpg";

const images = [bg1, bg2, bg3, bg4, bg5];

const bgFade = keyframes`
    from { opacity: 0; transform: scale(1.08); }
    to { opacity: 1; transform: scale(1); }
`;

const BgContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
`;

const BgSlide = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.$src});
    background-size: cover;
    background-position: center;
    opacity: ${props => (props.$active ? 1 : 0)};
    animation: ${props => (props.$active ? css`${bgFade} 0.8s ease-out` : 'none')};
    transition: opacity 1.2s ease-out;
`;

const BgOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.35) 0%,
        rgba(0, 0, 0, 0.65) 50%,
        rgba(0, 0, 0, 0.85) 100%
    );
`;

const AUTOPLAY_INTERVAL = 5000;

const BackgroundSlider = () => {
    const [current, setCurrent] = useState(0);

    const goNext = useCallback(() => {
        setCurrent(prev => (prev + 1) % images.length);
    }, []);

    useEffect(() => {
        const id = setInterval(goNext, AUTOPLAY_INTERVAL);
        return () => clearInterval(id);
    }, [goNext]);

    return (
        <BgContainer>
            {images.map((img, i) => (
                <BgSlide
                    key={i}
                    $src={img}
                    $active={i === current}
                    aria-hidden={i !== current}
                />
            ))}
            <BgOverlay />
        </BgContainer>
    );
};

export default BackgroundSlider;
