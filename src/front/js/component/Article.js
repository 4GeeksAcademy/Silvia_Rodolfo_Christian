import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Article = ({ description, quantity, stocktype, image, usertype, id }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(store.selected.some((element) => element.description === description));
  }, [store.selected, description]);

  const handleSelectedClick = () => {
    if (isSelected) {
      actions.deleteSelected(description);
    } else {
      actions.addSelected([description]);
    }
    setIsSelected(!isSelected);
  };

  const deleteArticleClic = (id) => {
    console.log(id);
    actions.deleteArticle(id);
};

  return (
    <div className="card mb-5 p-2" style={{ width: "18rem", backgroundColor: "#FFE492" }}>
      <img src={image} className="card-img-top" style={{ objectFit: "cover" }} />
      <div className="card-body">
        <h4 className="card-title"> {description}</h4>
        <p>{stocktype}</p>
        <p>Quantity:{quantity}</p>


        <div className={`btn btn-outline-secondary ${isSelected ? 'active' : ''}`} onClick={handleSelectedClick} hidden={usertype != "usuario"}>
          {isSelected ? (
            <i className="fa-solid fa-cart-shopping" />
          ) : (
            <i className="fa-solid fa-cart-arrow-down" />
          )}
        </div>
        <div className="text-center mb-2" hidden={usertype === "usuario"}>
          <button type="button" className="btn btn-secondary m-2" style={{ backgroundColor: "#043873" }} onClick={() => navigate(`/edit-article/${id}`)}>
            <i className="fa-solid fa-pen-to-square" />
          </button>
          <button type="button" className="btn btn-secondary m-2" style={{ backgroundColor: "#043873" }} onClick={() => {deleteArticleClic(id)}}>
            <i className="fa-solid fa-trash" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Article