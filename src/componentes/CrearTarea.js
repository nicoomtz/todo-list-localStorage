import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Tarea from "./Tarea";
import "./CrearTarea.css";

function CrearTarea(props) {
  const [input, setInput] = useState(
    window.localStorage.getItem("input") || ``
  );

  useEffect(() => {
    window.localStorage.setItem("input", input);
  });

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input !== "") {
      const nuevaTarea = {
        texto: input,
        id: uuidv4()
      };

      props.setTareas([nuevaTarea, ...props.tareas]);
      window.localStorage.setItem('tareas', JSON.stringify(props.tareas))
    }
  }

  function eliminarTarea(e) {
    const tareasActualizadas = props.tareas.filter(
      (tarea) => tarea.id !== e.target.id
    );
    window.localStorage.setItem('tareas', JSON.stringify(tareasActualizadas))
    props.setTareas(tareasActualizadas);
  }

  function completarTarea(e) {
    if (e.target.className === "tarea-texto completada") {
      e.target.classList.remove("completada");
    } else {
      e.target.classList.add("completada");
    }
  }

  return (
    <div className="crear-tarea-container">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={input}/>
        <button type="submit" className="boton-agregar">
          Agregar Tarea
        </button>
      </form>
      <div className="lista-de-tareas">
        {props.tareas.map((tarea) => (
          <Tarea
            texto={tarea.texto}
            id={tarea.id}
            key={tarea.id}
            completada={tarea.completada}
            eliminarTarea={eliminarTarea}
            completarTarea={completarTarea}
          />
        ))}
      </div>
    </div>
  );
}

export default CrearTarea;
