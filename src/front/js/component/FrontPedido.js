import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const FrontPedido = () => {
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const navigate = useNavigate();
  const { detail_id } = useParams(); //Accedemos a los parámetros dinámicos de la URL como "detail_id".
  const apiUrl = process.env.BACKEND_URL;

  const addForm = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("jwt_token"); //Obtiene el token de autenticación almacenado.
    console.log("Token:", token);
    if (!token) { //Si no hay token:
      navigate('/login'); //Redirige al usuario a la página de inicio de sesión.
      return; //Termina la ejecución de la función fetchData si no hay un token.
    }
    if (!initialDate || !finalDate) { //Validar ambas fechas.
      alert('Por favor selecciona ambas fechas.');
      return;
    }
    try {
      const response = await fetch(`${apiUrl}form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` //Autorizamos al usuario a hacer la solicitud
        },
        body: JSON.stringify({
          initialDate,
          finalDate,
          description: "description",
          quantity //PREGUNTAR Y MODIFICAR(DEFINIR DESCRIPCIÓN EN LA BD SI SE VA A MOSTRAR EN EL FORM Y QUANTITY LO COLOCA EL USUARIO O SELECCIONA ARTICULO POR ARTICULO?)
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.msg === "Form and details created successfully") {
        navigate('/stock'); //PREGUNTAR Y MODIFICAR(PÁGINA PRINCIPAL?)
      } else {
        alert("Error al crear formulario")
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
      alert("Error al crear formulario. Inténtalo de nuevo");
    }
  };
  const upDateForm = async () => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      navigate('/login');
      return;
    }
    if (!initialDate || !finalDate) { //Validar ambas fechas.
      alert('Por favor selecciona ambas fechas.');
      return;
    }
    try {
      const response = await fetch(`${apiUrl}form/${detail_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` //Autorizamos al usuario a hacer la solicitud
        },
        body: JSON.stringify({
          initialDate,
          finalDate,
          description: "description", //PREGUNTAR
          quantity: "quantity" //PREGUNTAR Y MODIFICAR(DEFINIR DESCRIPCIÓN EN LA BD SI SE VA A MOSTRAR EN EL FORM Y QUANTITY LO COLOCA EL USUARIO O SELECCIONA ARTICULO POR ARTICULO?)
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.msg === "DetailForm updated successfully") {
        navigate('/stock'); //PREGUNTAR Y MODIFICAR(PÁGINA PRINCIPAL?)
      } else {
        alert("Error al actualizar formulario")
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
      alert("Error al actualizar el formulario. Inténtalo de nuevo");
    }
  }

  //ENDPOINTS DEL FORMULARIO Y STOCK NECESITAN REQUERIMIENTO DE TOKEN!

  return (
    <div>FrontPedido</div>
  )
}

export default FrontPedido