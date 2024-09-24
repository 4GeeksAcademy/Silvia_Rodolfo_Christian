import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCalendar, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export const CardPedido = ({ description, quantity }) => {
    const [cantidad, setCantidad] = useState(0);

    // Función para aumentar la cantidad
    const incrementarCantidad = () => {
        if (cantidad < quantity) {
            setCantidad(cantidad + 1); // Incrementa la cantidad
        }
    };

    // Función para disminuir la cantidad (evitando que sea menor que 1)
    const decrementarCantidad = () => {
        if (quantity > 1) {
            setCantidad(cantidad + 1); // Decrementa la cantidad
        }
    };

    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-wrap justify-content-between align-items-center" style={{ backgroundColor: "#FFE492" }}>

                {/* Descripción del pedido (siempre alineada a la izquierda) */}
                <span className="fs-5 col-12 col-md-6 mb-2 mb-md-0">{description}</span>

                {/* Controles y stock (en resoluciones grandes se alinea a la derecha, en pequeñas se reordena) */}
                <div className="d-flex flex-wrap align-items-center justify-content-between col-12 col-md-6">
                    {/* Stock disponible */}
                    <span className="me-4" style={{ fontWeight: "bold" }}>STOCK DISPONIBLE: {quantity}</span>

                    {/* Botón de calendario */}
                    <button className="btn me-4 p-0" style={{ fontSize: "24px" }}>
                        <FontAwesomeIcon icon={faCalendar} />
                    </button>

                    {/* Control de cantidad */}
                    <div className="d-flex align-items-center">
                        <button
                            onClick={incrementarCantidad}
                            className="btn btn-sm btn-outline-success p-0 ms-2"
                            style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>

                        <span className="m-2"> {cantidad}</span>

                        <button
                            onClick={decrementarCantidad}
                            className="btn btn-sm btn-outline-danger p-0 ms-2"
                            style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                    </div>

                    {/* Botón de eliminación */}
                    <button
                        className="btn btn-sm btn-outline-danger ms-md-4 mt-2 mt-md-0"  // Margin en pantallas grandes, pero no en pequeñas
                        onClick={deleteArticle}
                        style={{ fontSize: "24px" }}
                    >
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                </div>
            </div>
        </div>
    );
};
