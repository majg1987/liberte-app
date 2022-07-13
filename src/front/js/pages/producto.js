import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { ProductoComponente } from "../component/ProductoComponente.jsx";


export const Producto = (props) => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className="container-producto">

			<ProductoComponente></ProductoComponente>

		</div>
	);
};


