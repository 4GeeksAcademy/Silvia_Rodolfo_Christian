import React, { Component, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; //Permite crear enlaces de navegación entre páginas.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faCalendar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons/faCalendarCheck";

export const CardPedido = ({ listaArtículo, onDelete }) => {


    return (
        <div class="card mb-3">
            <div class="card-body d-flex justify-content-between align-items-center" style={{backgroundColor: "#FFE492"}}>
                <span>DESCRIPCIÓN ARTÍCULO</span>
                <div class="d-flex align-items-center">
                    <span class="me-3">DISPONIBLES: 5</span>
                    <button class="btn me-2"><FontAwesomeIcon icon={faCalendar} /></button>
                    <button class="btn me-2"><FontAwesomeIcon icon={faCheckCircle} /></button>
                    <button class="btn "><FontAwesomeIcon icon={faTimesCircle} /></button>
                </div>
            </div>
        </div>

    );
};
