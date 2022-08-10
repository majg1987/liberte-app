import React, { useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/searchBar.css";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export function SearchBar() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.search();
  }, [store.registro]);

  const artistas = store.artistas.slice();

  return (
    <Autocomplete
      id="autocomplete"
      blurOnSelect
      disableClearable
      options={artistas}
      getOptionLabel={(option) => {
        return option.nombre && option.apellido
          ? option.nombre + " " + option.apellido
          : "";
      }}
      renderOption={(option) => (
        <Link
          className="text-black text-decoration-none"
          to={`/perfil/${option.id}`}
        >
          {option.nombre} {option.apellido}
        </Link>
      )}
      noOptionsText={"No existe un artista con ese nombre"}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="Busca a tu artista"
          margin="normal"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
    />
  );
}
