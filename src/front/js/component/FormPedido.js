import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom'; // Permite crear enlaces de navegación entre páginas.
import linea from "./../../img/linea.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CardPedido } from "./CardPedido";
import { Context } from './Context'; // Asegúrate de importar Context si no lo tenías ya

export const FormPedido = () => {
    const { store, actions } = useContext(Context);
    const [search, setSearch] = useState(""); // Estado para el valor del buscador
    const [pedidos, setPedidos] = useState([]); // Estado para guardar los pedidos (búsquedas)
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
    const [pendingPedido, setPendingPedido] = useState(null); // Estado para el pedido pendiente
    const [currentDate, setCurrentDate] = useState(""); // Estado para guardar la fecha actual
    const [selectedType, setSelectedType] = useState(""); // Tipo de producto seleccionado
    const [products, setProducts] = useState([]); // Estado para los productos
    const [articles, setArticles] = useState([]); // Estado para guardar los artículos obtenidos
    const navigate = useNavigate(); // Para redirigir a otras páginas
    const apiUrl = process.env.BACKEND_URL; // URL base de la API desde las variables de entorno
    const [initialDate, setInitialDate] = useState(null);
    const [finalDate, setFinalDate] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const { detail_id } = useParams(); // Accedemos a los parámetros dinámicos de la URL como "detail_id".
    const token = localStorage.getItem("jwt_token"); // Obtiene el token de autenticación almacenado.
    const selected = store.selected;

    const getProductsByType = async (type) => {
        console.log("Fetching products of type:", type); // Agregar log para verificar qué tipo se está enviando
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const response = await fetch(`${apiUrl}/search?type=${type}`, { // Pasamos el "type" como parámetro de la URL
                method: "POST", // Método POST según la API definida en el backend
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Autenticación mediante el token
                },
            });
            const data = await response.json(); // Parseamos la respuesta
            console.log("Productos recibidos:", data); // Log de productos recibidos
            setProducts(data.article || []); // Guardamos los productos obtenidos para el tipo seleccionado
        } catch (error) {
            console.log("Error en la solicitud:", error);
            alert("Error al obtener los productos del tipo seleccionado.");
        }
    };

    // Función que añade el producto seleccionado al pedido
    const addProductToOrder = (product) => {
        if (!selected.includes(product)) {
            setPedidos([...selected, {
                description: product.description,
                quantity: product.quantity,
                stocktype: product.stocktype,
                id: product.id,
            }]); // Añadimos el producto a pedidos
            setShowModal(false); // Cerramos el modal
        }
    };

    // Función para manejar la selección de un tipo de producto
    const handleSelectType = (event) => {
        const selectedValue = event.target.value;  // Obtener el valor seleccionado en el dropdown
        setSelectedType(selectedValue);  // Guardar el valor seleccionado en el estado
        if (selectedValue) {
            getProductsByType(selectedValue);  // Llamar a la función para obtener los productos del tipo seleccionado
            setShowModal(true);  // Mostrar el modal con los productos
        }
    };

    const handleSelectedClick = (product) => {
        if (selected.some(p => p.description === product.description)) {
            alert("Este producto ya está en el carrito");
        } else {
            actions.handleSelected(product);
        }
    };

    // Función para manejar el cambio de fechas
    const handleDatesChange = (start, end) => {
        setInitialDate(start);
        setFinalDate(end);
    };

    // Función para agregar el formulario
    const addForm = async (event) => {
        event.preventDefault();
        console.log("Token:", token);
        if (!token) { // Si no hay token:
            navigate('/login'); // Redirige al usuario a la página de inicio de sesión.
            return; // Termina la ejecución de la función fetchData si no hay un token.
        }
        if (!initialDate || !finalDate) { // Validar ambas fechas.
            alert('Por favor selecciona ambas fechas.');
            return;
        }
        try {
            const response = await fetch(`${apiUrl}form`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Autorizamos al usuario a hacer la solicitud
                },
                body: JSON.stringify({
                    initialDate,
                    finalDate,
                    quantity,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (data.msg === "Form and details created successfully") {
                navigate('/stock'); // PREGUNTAR Y MODIFICAR(PÁGINA PRINCIPAL?)
            } else {
                alert("Error al crear formulario");
            }
        } catch (error) {
            console.error("Error en la solicitud", error);
            alert("Error al crear formulario. Inténtalo de nuevo");
        }
    };

    const updateForm = async () => {
        if (!token) {
            navigate('/login');
            return;
        }
        if (!initialDate || !finalDate) { // Validar ambas fechas.
            alert('Por favor selecciona ambas fechas.');
            return;
        }
        try {
            const response = await fetch(`${apiUrl}/form/${detail_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Autorizamos al usuario a hacer la solicitud
                },
                body: JSON.stringify({
                    initialDate,
                    finalDate,
                    quantity,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (data.msg === "DetailForm updated successfully") {
                navigate('/stock'); // PREGUNTAR Y MODIFICAR(PÁGINA PRINCIPAL?)
            } else {
                alert("Error al actualizar formulario");
            }
        } catch (error) {
            console.error("Error en la solicitud", error);
            alert("Error al actualizar el formulario. Inténtalo de nuevo");
        }
    };

    // Función para manejar el clic en el ícono de búsqueda y abrir el modal
    const handleSearchClick = () => {
        if (!selectedType) {
            alert('Por favor, selecciona un tipo de producto antes de buscar.');
            return;
        }
        // Cargar productos del tipo seleccionado
        getProductsByType(selectedType);
    };

    // Función que cierra el modal y añade el pedido si el usuario confirma
    const closeModal = (addPedido) => {
        setShowModal(false); // Cerrar modal
        if (addPedido && pendingPedido) {  // Añadir el pedido pendiente solo si el usuario lo confirma
            setPedidos([...pedidos, { descripcion: pendingPedido, cantidad: 1 }]); // Agregar pedido
        }
        setPendingPedido(null); // Limpiar el pedido pendiente
    };

    // Función para eliminar un pedido de la lista
    const eliminarPedido = (index) => {
        // Filtrar los pedidos eliminando el que tiene el id que recibimos
        const nuevosPedidos = pedidos.filter((_, i) => i !== index);
        setPedidos(nuevosPedidos); // Actualizar el estado con la nueva lista
    };

    // Función para actualizar la cantidad de un pedido
    const actualizarCantidad = (index, nuevaCantidad) => {
        const nuevosPedidos = [...pedidos];
        nuevosPedidos[index].cantidad = nuevaCantidad; // Actualizamos la cantidad directamente
        setPedidos(nuevosPedidos); // Actualizar el estado con la nueva cantidad
    };

    // Función para el conteo de productos pedidos
    function countPedidos() {
        const totalPedidos = pedidos.reduce((total, pedido) => total + pedido.cantidad, 0);
        let maxPedidos = 5;
        let quedanTantosPedidos = maxPedidos - totalPedidos;
        return quedanTantosPedidos;
    }

    return (
        <div>
            {/* Rest of your JSX code */}
        </div>
    );
};

