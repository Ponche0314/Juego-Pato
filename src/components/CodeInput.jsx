import { useState } from "react";
import ChoiceButton from "./ChoiceButton.jsx";
import { finalCode } from "../data/scenes.js";

const normalizeCode = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();

export default function CodeInput({ fragments, onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (normalizeCode(value) === normalizeCode(finalCode)) {
      setError("");
      onUnlock();
      return;
    }
    setError("Acceso denegado. La frase está cerca, pero el archivo no reconoce ese latido.");
  };

  return (
    <section className="panel code-screen">
      <p className="eyebrow">message_to_ian.txt</p>
      <h2>Archivo oculto detectado</h2>
      <p>
        Todos los archivos recuperables restaurados. Acceso requiere frase recuperada.
      </p>

      <div className="fragment-row" aria-label="Fragmentos recuperados">
        {fragments.map((fragment) => (
          <span key={fragment}>{fragment}</span>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="code-form">
        <label htmlFor="final-code">Frase de acceso</label>
        <input
          id="final-code"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Escribe la frase recuperada"
          autoComplete="off"
        />
        {error && <p className="error-text">{error}</p>}
        <ChoiceButton type="submit">Desbloquear archivo</ChoiceButton>
      </form>
    </section>
  );
}
