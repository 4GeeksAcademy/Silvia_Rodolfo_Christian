import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import linea from "../../img/linea.png"
import { Link, useNavigate } from "react-router-dom";
import Article from "../component/Article";

const Stock = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [hidden, setHidden] = useState(true);

    //comprueba si hay token y el usertype
    useEffect(() => {
        const token = localStorage.getItem("jwt_token")
        if (!token) {
            console.log("No hay token")
            navigate("/")
        } else {
            const usertype = store.usertype;
            if (usertype === "usuario") {
                setHidden(true);
            } else {
                setHidden(false);
            }
        }
        actions.getStock();
    }, []);

    return (
        <div className="container">
            <div className="d-flex vh-100 mt-5 row">
                <div>
                    <h1 className="mb-n1 px-5" style={{ position: "relative", zIndex: 1, fontWeight: "bold" }}>Stock</h1>
                    <img src={linea} style={{ zIndex: 0 }} alt="Linea decorativa" />
                </div>
                <div className="mt-5">
                    <Link to="/new-article">
                        <button type="button" className="btn btn-primary fw-light" style={{ backgroundColor: "#4F9CF9", border: "none" }}>
                            New article
                        </button>
                    </Link>
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
                                            usertype={hidden}
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