import ChoiceButton from "./ChoiceButton.jsx";

export default function StartScreen({ onStart }) {
  return (
    <section className="start-screen panel">
      <h1>Recuerdos Inolvidables</h1>
      <p className="subtitle">Una aventura interactiva de Roberto para Ian ❣</p>
      <div className="status-grid" aria-label="Estado del archivo">
        <span>ESTADO DE RECUERDOS:</span>
        <strong>CORRUPTO</strong>
      </div>
      <ChoiceButton onClick={onStart}>Iniciar recuperación</ChoiceButton>
    </section>
  );
}
