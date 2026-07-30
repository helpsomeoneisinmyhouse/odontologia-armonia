import React from "react";
import limpieza from "../assets/images/limpieza.jpg";
import resina from "../assets/images/resina.jpg";
import cirugia from "../assets/images/cirugia.jpg";
import ortodonciaInterceptiva from "../assets/images/ortodoncia_interceptiva.jpg";
import ortodonciaCorrectiva from "../assets/images/ortodoncia_correctiva.jpg";
import protesis from "../assets/images/protesis.jpg";
import blanqueamiento from "../assets/images/blanqueamiento.jpg";
import retenedores from "../assets/images/retenedores.jpg";
import muchoMas from "../assets/images/mucho_mas.jpg";
import '../styles/services.css';

const servicesData = [
    {
        img: limpieza,
        title: "Limpieza Dental",
        desc: "Remoción y eliminación de cálculo dental, placa bacteriana y manchas de la superficie dental."
    },
    {
        img: resina,
        title: "Restauraciones en Resina",
        desc: "Devuelve la anatomía, estructura y salud perdida por caries o algún trauma."
    },
    {
        img: cirugia,
        title: "Cirugía Bucal",
        desc: "Intervención mínimamente invasiva para extraer muelas del juicio o cordales."
    },
    {
        img: ortodonciaInterceptiva,
        title: "Ortodoncia Interceptiva",
        desc: "Aparatología en edad temprana para guiar el crecimiento dental y esqueletal."
    },
    {
        img: ortodonciaCorrectiva,
        title: "Ortodoncia Correctiva",
        desc: "Aparatos fijos para la corrección de maloclusiones."
    },
    {
        img: protesis,
        title: "Prótesis Dentales",
        desc: "Reemplaza estructuras dentales perdidas devolviendo función y estética."
    },
    {
        img: blanqueamiento,
        title: "Blanqueamiento Dental",
        desc: "Procedimiento para aclarar el tono de los dientes naturales."
    },
    {
        img: retenedores,
        title: "Retenedores",
        desc: "Mantienen en correcta posición los dientes post tratamiento de ortodoncia."
    },
    {
        img: muchoMas,
        title: "¡Y mucho más!",
        desc: "Ofrecemos una amplia gama de tratamientos odontológicos para toda la familia."
    }
];

const ServiceCard = ({ s }) => (
    <div className="service">
        <div className="serviceImgWrapper">
            <img src={s.img} alt={s.title} />
        </div>
        <div className="serviceBody">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
        </div>
    </div>
);

const Services = () => {
    return (
        <div className="servicesPage">
            <h1 className="servicesPageTitle">Nuestros Servicios</h1>
            <p className="servicesPageSubtitle">
                Ofrecemos atención odontológica integral para toda la familia
            </p>

            <div className="servicesSlider">
                <div className="servicesTrack">
                    {/* Primera vuelta */}
                    {servicesData.map((s, i) => (
                        <ServiceCard key={i} s={s} />
                    ))}
                    {/* Segunda vuelta (duplicada para loop infinito) */}
                    {servicesData.map((s, i) => (
                        <ServiceCard key={`dup-${i}`} s={s} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
