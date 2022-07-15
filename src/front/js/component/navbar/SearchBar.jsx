import React, { useState, useEffect, useContext } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { Context } from "../../store/appContext";
import "../../../styles/searchBar.css";
import TextField from "@material-ui/core/TextField";

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const filter = createFilterOptions();

export function SearchBar() {
  const [value, setValue] = useState(null);

  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.search();
  }, []);

  const artistas = store.artistas.slice();

  return (
    <Autocomplete
      id="autocomplete"
      freeSolo
      disableClearable
      options={artistas.map((option) => `${option.nombre} ${option.apellido}`)}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="Search for your artist"
          margin="normal"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
    />
  );
}
