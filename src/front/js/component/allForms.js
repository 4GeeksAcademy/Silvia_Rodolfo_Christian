import { React, useNavigate } from 'react'


const allForms = () => {
  const navigate = useNavigate();
  const [searching, setSeraching] = useState("");
  const token = localStorage.getItem("jwt_token"); //Obtiene el token de autenticación almacenado.
  const apiUrl = process.env.BACKEND_URL;

  const getFormByEmail = async () => {
    if (!token) {
      navigate("/login")
      return;
    };
    try {
      const response = await fetch(`${apiUrl}all_forms`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer, ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.ok}`);
      }
      const data = await response.json()
      console.log(data);
    }
    catch (error) {
      console.error("Usuario no encontrado", error);
      alert("Error al obtener los formularios")

    }
  }
  const handlekeyDown = (event) => {
    if (event.key === "Enter") {
      getFormByEmail();
    }
  }
  return (
    <div>allForms</div>
  )
}

export default allForms
