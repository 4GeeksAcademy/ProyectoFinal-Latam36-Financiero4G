import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoFinanciaUrlBlue from "../../../img/Financiate_blue.png";
import CerditoVacasImg from "../../../img/Cerdito_Vacas.png";
import LpMan from "../../../img/man-holding.png";
import Navbar from './Navbar.jsx';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div>
            <Navbar />

            <div className="container mt-5">
                <div className="row align-items-center">
                    <div className="col-12 col-md-6">
                        <div className="header">Tus ingresos y egresos a un solo click</div>

                        {/* Descripción */}
                        <p>
                            FINÁNCIA+E gestiona tu economía mediante categorías personalizadas, alertas de pagos de suscripciones, planes de ahorro y mucho más al alcance de tu mouse o tu celular.
                        </p>

                        {/* Botón CTA */}
                        <Link to="/login" className="fw-bold fs-5 Boton-cta btn btn-primary w-100">
                            Finánciate aquí
                        </Link>
                    </div>

                    {/* Persona con cerdito*/}
                    <div className="col-12 col-md-6 mt-4 mt-md-0">
                        <img src={LpMan} alt="Persona con cerdito" className="img-fluid" />
                    </div>
                </div>
            </div>
            <br /><br /><br /><br /> <br /><br /><br /><br /> <br /><br />

            {/* Explicacion de Plan de ahorro*/}
            <div className="container mt-5">
                <div className="row align-items-center">
                    {/* Columna de imagen*/}
                    <div className="col-12 col-md-6 order-md-1 mt-4 mt-md-0">
                        <img src={CerditoVacasImg} alt="Imagen de Cerdito y Vacas" className="img-fluid" />
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="header">Ahorrar para las vacaciones nunca antes fue tan fácil con la opción de PLANES DE AHORRO</div>

                        {/* Descripción*/}
                        <p>
                            Nuestra función de PLANES DE AHORRO sin duda es una de nuestras mejores opciones. Apunta uno o más planes de ahorro en FINÁNCIA+E para organizar tus finanzas y visualiza en una vista tus objetivo financieros mas importantes como: vacaciones de familia, compra de coche, vivienda y lo que quieras
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LandingPage;