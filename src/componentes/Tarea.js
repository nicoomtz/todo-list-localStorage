import React from "react";
import "./Tarea.css";

function Tarea({ texto, id, completada, eliminarTarea, completarTarea }) {
  return (
    <div className="tarea" id={id} key={id} completada={completada}>
      <p id={id} className="tarea-texto" onClick={completarTarea}>
        {texto}
      </p>
      <button onClick={eliminarTarea} id={id}>
        X
      </button>
    </div>
  );
}

export default Tarea;
