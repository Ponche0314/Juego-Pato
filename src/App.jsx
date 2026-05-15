import { useMemo, useState } from "react";
import ChoiceButton from "./components/ChoiceButton.jsx";
import CodeInput from "./components/CodeInput.jsx";
import MemoryFile from "./components/MemoryFile.jsx";
import StartScreen from "./components/StartScreen.jsx";
import TypewriterText from "./components/TypewriterText.jsx";
import { finalSceneLines, introChoices, introLines, memories } from "./data/scenes.js";

const phases = {
  START: "start",
  INTRO: "intro",
  MEMORIES: "memories",
  CODE: "code",
  FINAL: "final",
  END: "end",
};

export default function App() {
  const [phase, setPhase] = useState(phases.START);
  const [introIndex, setIntroIndex] = useState(0);
  const [introTextDone, setIntroTextDone] = useState(false);
  const [choiceResponse, setChoiceResponse] = useState("");
  const [choiceResponseDone, setChoiceResponseDone] = useState(false);
  const [pendingRecovery, setPendingRecovery] = useState(false);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [restoredIds, setRestoredIds] = useState([]);
  const [memoryResponse, setMemoryResponse] = useState("");
  const [finalIndex, setFinalIndex] = useState(0);
  const [finalTextDone, setFinalTextDone] = useState(false);

  const currentMemory = memories[memoryIndex];
  const restoredWords = useMemo(
    () =>
      memories
        .filter((memory) => restoredIds.includes(memory.id))
        .map((memory) => memory.codeWord),
    [restoredIds],
  );

  const startIntro = () => {
    setPhase(phases.INTRO);
    setIntroIndex(0);
    setIntroTextDone(false);
  };

  const advanceIntro = () => {
    setChoiceResponse("");
    setChoiceResponseDone(false);
    setPendingRecovery(false);
    setIntroTextDone(false);
    setIntroIndex((current) => Math.min(current + 1, introLines.length));
  };

  const chooseIntro = (choice) => {
    setChoiceResponse(choice.response);
    setChoiceResponseDone(false);
    if (choice.startsRecovery) {
      setPendingRecovery(true);
    }
  };

  const openRecovery = () => {
    setPhase(phases.MEMORIES);
    setChoiceResponse("");
    setChoiceResponseDone(false);
    setPendingRecovery(false);
  };

  const answerMemory = (choice) => {
    setMemoryResponse(choice.response);
    if (!choice.correct) return;

    setRestoredIds((ids) =>
      ids.includes(currentMemory.id) ? ids : [...ids, currentMemory.id],
    );
  };

  const continueAfterMemory = () => {
    setMemoryResponse("");
    if (memoryIndex >= memories.length - 1) {
      setPhase(phases.CODE);
      return;
    }
    setMemoryIndex((current) => current + 1);
  };

  const advanceFinal = () => {
    if (finalIndex >= finalSceneLines.length - 1) {
      setPhase(phases.END);
      return;
    }
    setFinalTextDone(false);
    setFinalIndex((current) => current + 1);
  };

  const introComplete = introIndex >= introLines.length;
  const currentRestored = currentMemory && restoredIds.includes(currentMemory.id);

  return (
    <main className="app-shell">
      <div className="ambient-grid" aria-hidden="true" />

      {phase !== phases.START && (
        <header className="topbar">
          <div>
            <span></span>
            <strong>{restoredIds.length}/5 recuerdos restaurados</strong>
          </div>
          <div className="progress-dots" aria-label={`${restoredIds.length} de 5 archivos restaurados`}>
            {memories.map((memory) => (
              <span
                key={memory.id}
                className={restoredIds.includes(memory.id) ? "done" : ""}
              />
            ))}
          </div>
        </header>
      )}

      {phase === phases.START && <StartScreen onStart={startIntro} />}

      {phase === phases.INTRO && (
        <section className="panel story-panel">
          {!introComplete ? (
            <>
              <TypewriterText
                text={introLines[introIndex]}
                onDone={() => setIntroTextDone(true)}
              />
              <ChoiceButton onClick={advanceIntro} disabled={!introTextDone}>
                Continuar
              </ChoiceButton>
            </>
          ) : (
            <>
              <p className="terminal-label">Entrada requerida</p>
              <div className="choices">
                {introChoices.map((choice) => (
                  <ChoiceButton key={choice.id} onClick={() => chooseIntro(choice)}>
                    {choice.text}
                  </ChoiceButton>
                ))}
              </div>
              {choiceResponse && (
                <div className="response success">
                  <TypewriterText
                    text={choiceResponse}
                    speed={18}
                    onDone={() => setChoiceResponseDone(true)}
                  />
                </div>
              )}
              {pendingRecovery && (
                <ChoiceButton onClick={openRecovery} disabled={!choiceResponseDone}>
                  Ver archivos corruptos
                </ChoiceButton>
              )}
            </>
          )}
        </section>
      )}

      {phase === phases.MEMORIES && (
        <MemoryFile
          memory={currentMemory}
          response={memoryResponse}
          restored={currentRestored}
          onChoice={answerMemory}
          onContinue={continueAfterMemory}
          canContinue={currentRestored}
        />
      )}

      {phase === phases.CODE && (
        <CodeInput fragments={restoredWords} onUnlock={() => setPhase(phases.FINAL)} />
      )}

      {phase === phases.FINAL && (
        <section className="panel story-panel final-story">
          <TypewriterText
            text={finalSceneLines[finalIndex]}
            onDone={() => setFinalTextDone(true)}
          />
          <ChoiceButton onClick={advanceFinal} disabled={!finalTextDone}>
            {finalIndex >= finalSceneLines.length - 1 ? "Completar recuperación" : "Continuar"}
          </ChoiceButton>
        </section>
      )}

      {phase === phases.END && (
        <section className="panel end-screen">
          <p className="eyebrow"></p>
          <h2>Archivo restaurado.</h2>
          <p>Final de la aventura. ¡Gracias por jugar!</p>
        </section>
      )}
    </main>
  );
}
