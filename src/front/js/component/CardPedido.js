import React, { Component, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; //Permite crear enlaces de navegación entre páginas.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPlus, faMinus, faCalendar, faMagnifyingGlass, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


export const CardPedido = ({ descripcion, cantidad, onDelete, onCantidadChange }) => {
    // Función para aumentar la cantidad
    const incrementarCantidad = () => {
      onCantidadChange(cantidad + 1); // Incrementa la cantidad
    };
  
    // Función para disminuir la cantidad (evitando que sea menor que 1)
    const decrementarCantidad = () => {
      if (cantidad > 1) {
        onCantidadChange(cantidad - 1); // Decrementa la cantidad
      }
    };

    return (
        <div className="card mb-3">
            <div className="card-body d-flex justify-content-between align-items-center" style={{ backgroundColor: "#FFE492" }}>
                <span>{descripcion}</span>
                <div className="d-flex align-items-center">
                    <span className="me-3">STOCK DISPONIBLE: 5</span>
                    <button className="btn me-2"><FontAwesomeIcon icon={faCalendar} /></button>
                    <span className="me-3">
                        Cantidad: {cantidad}
                        <button onClick={incrementarCantidad} className="btn p-0 ms-2" style={{fontSize: "10px"}}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>/
                        <button onClick={decrementarCantidad} className="btn p-0 ms-2">
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                    </span>
                    <button className="btn" onClick={onDelete}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                </div>
            </div>
        </div>

    );
};
