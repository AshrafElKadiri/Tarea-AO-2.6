import { useState, useEffect } from "react";

function Reloj(): JSX.Element {
  const [instantesGuardados, setInstantesGuardados] = useState<string[]>([]);
  const [horaActual, setHoraActual] = useState<string>("");

  // Actualizar la hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setHoraActual(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Cargar instantes guardados desde localStorage al inicializar el componente
  useEffect(() => {
    const instantesLocal = JSON.parse(localStorage.getItem("instantesGuardados") || "[]") as string[];
    setInstantesGuardados(instantesLocal);
  }, []);

  // Guardar el instante actual en el estado y en localStorage
  const guardarInstante = () => {
    const nuevasHoras = [...instantesGuardados, horaActual];
    setInstantesGuardados(nuevasHoras);
    localStorage.setItem("instantesGuardados", JSON.stringify(nuevasHoras));
  };

  // Eliminar un instante específico por índice
  const borrarInstante = (index: number) => {
    const nuevasHoras = instantesGuardados.filter((_, i) => i !== index);
    setInstantesGuardados(nuevasHoras);
    localStorage.setItem("instantesGuardados", JSON.stringify(nuevasHoras));
  };

  // Borrar todos los instantes
  const borrarTodos = () => {
    setInstantesGuardados([]);
    localStorage.removeItem("instantesGuardados");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Reloj</h1>
      <h2 style={{ fontSize: "150px", fontWeight: "bold" }}>{horaActual}</h2>

      <button onClick={guardarInstante} style={{ padding: "10px", margin: "10px" }}>
        Guardar instante actual
      </button>
      <button
        onClick={borrarTodos}
        style={{ padding: "10px", margin: "10px", backgroundColor: "red", color: "white" }}
      >
        Borrar todos
      </button>

      <div>
        <h3>Instantes guardados:</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {instantesGuardados.map((instante, index) => (
            <li key={index} style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
              <span>{instante}</span>
              <button
                onClick={() => borrarInstante(index)}
                style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Reloj;
