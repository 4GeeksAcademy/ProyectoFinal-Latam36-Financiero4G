import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Line,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import "./Dashboard.css"; // Importar los estilos
import ProgressBar from "./ProgressBar.jsx"; // Importación de ProgressBar

const chartWidth = "100%";
const chartHeight = 200;
const colores = ["#4caf50", "#ff0058"]; // Colores para ingresos y egresos

const Dashboard = () => {
    const { store } = useContext(Context);
    const [totales, setTotales] = useState([]);
    const [capitales, setCapitales] = useState([]);
    const [datosMensuales, setDatosMensuales] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // LLAMADA A LA API PARA GRAFICO DE DONA
    useEffect(() => {
        const fetchTotales = async () => {
            try {
                setLoading(true);

                if (!store.usuario_id) {
                    throw new Error("ID del usuario requerido");
                }

                const response = await fetch(
                    `${process.env.BACKEND_URL}/api/usuario/totales?usuario_id=${store.usuario_id}`
                );

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();

                const formattedData = [
                    { name: "Ingresos", value: data.total_ingresos },
                    { name: "Egresos", value: data.total_egresos },
                ];
                setTotales(formattedData);

                setCapitales({
                    "capital_inicial": data.capital_inicial,
                    "capital_actual": data.capital_actual
                });

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTotales();
    }, [store.usuario_id]);

    // LLAMADA A LA API PARA GRAFICO DE LINEAS
    useEffect(() => {
        const fetchTotalDatosMensuales = async () => {
            try {
                setLoading(true);

                if (!store.usuario_id) {
                    throw new Error("ID del usuario requerido");
                }
                const response = await fetch(process.env.BACKEND_URL + '/api/datosmensuales', {
                    method: "POST", 
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        usuario_id: store.usuario_id,
                        meses: ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();

                const formattedData = data.map(d => ({
                    mes: d.mes,
                    ingresos: d.ingresos,
                    egresos: d.egresos,
                }));

                setDatosMensuales(formattedData);
            } catch (err) {
                setError("Error.....", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTotalDatosMensuales();
    }, [store.usuario_id]);

    return (
        <div className="dashboard-container">
            <h3 className="main-title">Dashboard Fináncia+E</h3>

            {loading ? (
                <p className="loading-text">Cargando datos...</p>
            ) : error ? (
                <p className="error-text">{error}</p>
            ) : (
                <div className="dashboard">
                    <div className="row justify-content-center mb-2">

                        {/* Gráfico de dona con leyendas */}
                        <div className="col-md-6 mb-4">
                            <h4 className="chart-title">Distribución de Ingresos vs Egresos</h4>
                            <div className="donut-chart-container">
                                <div className="legend-container">
                                    <p className="legend-text capital-inicial">
                                        Capital Inicial: {new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(capitales.capital_inicial)}
                                    </p>
                                </div>
                                <ResponsiveContainer width={chartWidth} height={chartHeight}>
                                    <PieChart>
                                        <Pie
                                            data={totales}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            innerRadius={50}
                                            label={({ name, value }) => `${name}: ${value}`}
                                            labelStyle={{
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                fill: "#555",
                                            }}
                                        >
                                            {totales.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={colores[index % colores.length]}
                                                />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="legend-container">
                                    <p className="legend-text capital-actual">
                                        Capital Actual: {new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(capitales.capital_actual)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Gráfico de líneas */}
                        <div className="col-md-6 mb-4">
                            <h4 className="chart-title">Evolución Mensual de Ingresos y Egresos</h4>
                            <div className="line-chart-container">
                                <ResponsiveContainer width={chartWidth} height={chartHeight}> 
                                    <LineChart
                                        data={[...datosMensuales, { mes: null, ingresos: null, egresos: null }]} // Agregar punto final nulo
                                        margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="mes"
                                            interval={0}
                                            padding={{ right: 10 }}
                                            tickFormatter={(mes) => (mes ? mes.substring(0, 3) : "")} // Mostrar las tres primeras letras del mes
                                        />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="ingresos" stroke="#82ca9d" connectNulls={false} dot />
                                        <Line type="monotone" dataKey="egresos" stroke="#ff0058" connectNulls={false} dot />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Barra de progreso */}
                        <div className="progress-container mt-5">
                            <ProgressBar inicio={0} total={100000} current={20000} />
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
