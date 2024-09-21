import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import linea from "../../img/linea.png"
import { useNavigate } from "react-router-dom";
import Article from "../component/Article";

const Stock = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const usertype = store.usertype;

    //comprueba si hay token y el usertype para ocultar botones
    useEffect(() => {
        const fetchUserType = async () => {
            const token = localStorage.getItem("jwt_token");
            if (!token) {
                navigate("/");
            } else {
                await actions.getUser();
            }
        };
        fetchUserType();
        console.log(usertype);
    }, []);

    //dependiendo del usertype el botón va a una página o a otra
    const goTo = () => {
        if (usertype === "usuario") {
            navigate("/formPedido");
        } else {
            navigate("/new-article");
        }
    };

    return (
        <div className="container">
            <div className="d-flex vh-100 mt-5 row">
                <div>
                    <h1 className="mb-n1 px-5" style={{ position: "relative", zIndex: 1, fontWeight: "bold" }}>Stock</h1>
                    <img src={linea} style={{ zIndex: 0 }} alt="Linea decorativa" />
                </div>
                <div className="mt-5">
                    <button onClick={goTo} type="button" className="btn btn-primary fw-light" style={{ backgroundColor: "#4F9CF9", border: "none" }}>
                    {usertype === "usuario" ? "Order" : "New article"}
                    </button>
                </div>
                <div className="container mt-3">
                    <div className="row">
                        {store.article && store.article.length > 0 ? (
                            store.article.map((article, index) => {
                                return (
                                    <div key={index} className="col-3 me-2">
                                        <Article
                                            description={article.description}
                                            stocktype={article.stocktype}
                                            quantity={article.quantity}
                                            image={article.image}
                                            usertype={usertype}
                                            id={article.id}
                                        />
                                    </div>
                                )
                            })
                        ) : (
                            <p>No hay artículos disponibles.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stock