import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/cesta-itemdetails.css";

export const ItemDetails = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="card ms-5" style={{ width: 16 + "rem" }}>
        <img
          src="https://picsum.photos/id/1027/200"
          className="card-img-top rounded"
        />
        <div className="card-body pb-0">
          <h5 className="card-title">Hellen Hans</h5>
          <div className="card-text">
            Ut cursus vel leo non mattis.
            <div className="col text-start">
              <br></br>
              <p>PVP: 100€</p>
            </div>
            <div className="col text-end">
              <p>Eliminar Producto <button
                type="button"
                className="btn-close align-bottom"
                aria-label="Close"
              ></button></p>
              
            </div>
          </div>
        </div>
      </div>
      <div className="card ms-5" style={{ width: 16 + "rem" }}>
        <img
          src="https://picsum.photos/id/1027/200"
          className="card-img-top rounded"
        />
        <div className="card-body pb-0">
          <h5 className="card-title">Hellen Hans</h5>
          <div className="card-text">
            Ut cursus vel leo non mattis.
            <div className="col text-end">
              <br></br>
              <p>PVP: 100€</p>
            </div>
            <div className="col text-end">
              <p>Eliminar Producto <button
                type="button"
                className="btn-close align-bottom"
                aria-label="Close"
              ></button></p>
              
            </div>
          </div>
        </div>
      </div>
      <div className="card ms-5" style={{ width: 16 + "rem" }}>
        <img
          src="https://picsum.photos/id/1027/200"
          className="card-img-top rounded"
        />
        <div className="card-body pb-0">
          <h5 className="card-title">Hellen Hans</h5>
          <div className="card-text">
            Ut cursus vel leo non mattis.
            <div className="col text-end">
              <br></br>
              <p>PVP: 100€</p>
            </div>
            <div className="col text-end">
              <p>Eliminar Producto <button
                type="button"
                className="btn-close align-bottom"
                aria-label="Close"
              ></button></p>
              
            </div>
          </div>
        </div>
      </div>
      <div className="card ms-5" style={{ width: 16 + "rem" }}>
        <img
          src="https://picsum.photos/id/1027/200"
          className="card-img-top rounded"
        />
        <div className="card-body pb-0">
          <h5 className="card-title">Hellen Hans</h5>
          <div className="card-text">
            Ut cursus vel leo non mattis.
            <div className="col text-end">
              <br></br>
              <p>PVP: 100€</p>
            </div>
            <div className="col text-end">
              <p>Eliminar Producto <button
                type="button"
                className="btn-close align-bottom"
                aria-label="Close"
              ></button></p>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
