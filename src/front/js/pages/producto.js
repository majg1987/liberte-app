import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const Producto = (props) => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className="container container-producto">
			<h1 className="display-4">
				This will show the demo elementHs
			</h1>

		</div>
	);
};


