import { useMemo, useState } from "react";
import ChoiceButton from "./ChoiceButton.jsx";
import { finalCode } from "../data/scenes.js";

const normalizeCode = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();

const shuffleFragments = (fragments) => {
  if (fragments.length <= 2) return [...fragments].reverse();

  const shuffled = [...fragments];
  for (let index = 0; index < shuffled.length; index += 1) {
    const swapIndex = (index * 2 + 3) % shuffled.length;
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  if (shuffled.join(" ") === fragments.join(" ")) {
    return [shuffled[1], shuffled[0], ...shuffled.slice(2)];
  }

  return shuffled;
};

export default function CodeInput({ fragments, onUnlock }) {
  const scrambledFragments = useMemo(() => shuffleFragments(fragments), [fragments]);
  const [selectedFragments, setSelectedFragments] = useState([]);
  const [error, setError] = useState("");

  const availableFragments = scrambledFragments.filter(
    (fragment) => !selectedFragments.includes(fragment),
  );
  const currentPhrase = selectedFragments.join(" ");

  const addFragment = (fragment) => {
    setError("");
    setSelectedFragments((current) => [...current, fragment]);
  };

  const removeFragment = (fragment) => {
    setError("");
    setSelectedFragments((current) => current.filter((item) => item !== fragment));
  };

  const resetPhrase = () => {
    setError("");
    setSelectedFragments([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (normalizeCode(currentPhrase) === normalizeCode(finalCode)) {
      setError("");
      onUnlock();
      return;
    }
    setError("Verificación incompleta. Reordena las palabras correctamente.");
  };

  return (
    <section className="panel code-screen">
      <p className="eyebrow">verificación emocional</p>
      <h2>Confirmar existencia compartida</h2>
      <p>Todos los recuerdos recuperables han sido restaurados.</p>
      <p>
        UNIDAD INDIVIDUAL RESTAURADA: IAN
        <br />
        UNIDAD COMPARTIDA: NO VERIFICADA
      </p>

      <form onSubmit={handleSubmit} className="code-form">
        <div className="phrase-builder">
          <span className="builder-label">Ordena la frase recuperada</span>
          <div className="selected-fragments" aria-label="Frase armada">
            {selectedFragments.length > 0 ? (
              selectedFragments.map((fragment) => (
                <button
                  type="button"
                  key={fragment}
                  className="fragment-token selected"
                  onClick={() => removeFragment(fragment)}
                >
                  {fragment}
                </button>
              ))
            ) : (
              <span className="empty-phrase">Toca las palabras en el orden correcto</span>
            )}
          </div>
        </div>

        <div className="fragment-row scrambled" aria-label="Fragmentos desordenados">
          {availableFragments.map((fragment) => (
            <button
              type="button"
              key={fragment}
              className="fragment-token"
              onClick={() => addFragment(fragment)}
            >
              {fragment}
            </button>
          ))}
        </div>

        <button className="reset-phrase" type="button" onClick={resetPhrase}>
          Reiniciar orden
        </button>

        {error && <p className="error-text">{error}</p>}
        <ChoiceButton type="submit">Confirmar</ChoiceButton>
      </form>
    </section>
  );
}
