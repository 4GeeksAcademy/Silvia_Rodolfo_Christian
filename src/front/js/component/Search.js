import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [searchArticle, setSerachArticle] = useState("")
  const apiUrl = process.env.BACKEND_URL;

  const getArticlesByEnum = async () => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await fetch(`/search`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    }
    catch (error) {
      console.log("Error en la solicitud", error);
      alert("Error al obtener los artículos");
    }
  };
  const handlekeyDown = (event) => {
    if (event.key === "Enter") {
      getArticlesByEnum();
    }
  };
  return (
    <div>Search</div>
  )
}

export default Search