import { useEffect, useRef, useState } from "react";
import ChoiceButton from "./ChoiceButton.jsx";
import TypewriterText from "./TypewriterText.jsx";
import { memoryVisualSettings } from "../data/scenes.js";

export default function MemoryFile({
  memory,
  response,
  restored,
  onChoice,
  onContinue,
  canContinue,
}) {
  const imageRef = useRef(null);
  const wasRestored = useRef(restored);
  const [introDone, setIntroDone] = useState(false);
  const [clueDone, setClueDone] = useState(false);
  const [responseDone, setResponseDone] = useState(false);
  const hasIntroText = Boolean(memory.introText?.trim());
  const hasClueText = Boolean(memory.clueText?.trim());
  const lockedVisuals = memoryVisualSettings.locked;
  const visualStyle = {
    "--block-size": `${lockedVisuals.blockSize}px`,
    "--locked-blur": `${lockedVisuals.blur}px`,
    "--locked-brightness": lockedVisuals.brightness,
    "--locked-contrast": lockedVisuals.contrast,
    "--locked-saturation": lockedVisuals.saturation,
    "--overlay-opacity": lockedVisuals.overlayOpacity,
    "--overlay-opacity-warm": lockedVisuals.overlayOpacity * 0.78,
    "--overlay-opacity-deep": Math.min(lockedVisuals.overlayOpacity * 1.18, 1),
    "--overlay-opacity-rose": lockedVisuals.overlayOpacity * 0.52,
    "--overlay-blur": `${lockedVisuals.blur * 0.45}px`,
  };

  useEffect(() => {
    setResponseDone(false);
  }, [response]);

  useEffect(() => {
    setIntroDone(!hasIntroText);
    setClueDone(!hasClueText);
    setResponseDone(false);
    wasRestored.current = restored;
  }, [hasClueText, hasIntroText, memory.id]);

  useEffect(() => {
    if (restored && !wasRestored.current && imageRef.current) {
      const topbarOffset = 76;
      const imageTop = imageRef.current.getBoundingClientRect().top + window.scrollY;

      window.setTimeout(() => {
        window.scrollTo({
          top: Math.max(imageTop - topbarOffset, 0),
          behavior: "smooth",
        });
      }, 120);
    }

    wasRestored.current = restored;
  }, [restored]);

  const handleChoice = (choice) => {
    setResponseDone(false);
    onChoice(choice);
  };

  return (
    <section className={`memory-file panel ${restored ? "is-restored" : ""}`} style={visualStyle}>
      <div className="file-header">
        <div>
          <p className="eyebrow">{memory.fileName}</p>
          <h2>{memory.title}</h2>
        </div>
      </div>

      <div className="memory-image-shell" ref={imageRef}>
        <img src={memory.image} alt="" className="memory-image" />
        {!restored && <div className="corruption-overlay" aria-hidden="true" />}
      </div>

      {hasIntroText && (
        <div className="memory-intro">
          <TypewriterText
            key={`intro-${memory.id}`}
            text={memory.introText}
            onDone={() => setIntroDone(true)}
          />
        </div>
      )}

      {introDone && hasClueText && (
        <div className="memory-clue">
          <TypewriterText
            key={`clue-${memory.id}`}
            text={memory.clueText}
            speed={22}
            onDone={() => setClueDone(true)}
          />
        </div>
      )}

      {!restored && clueDone && (
        <div className="question-block">
          <h3>{memory.question}</h3>
          <div className="choices">
            {memory.choices.map((choice) => (
              <ChoiceButton key={choice.text} onClick={() => handleChoice(choice)}>
                {choice.text}
              </ChoiceButton>
            ))}
          </div>
        </div>
      )}

      {response && (
        <div className={`response ${restored ? "success" : "error"}`}>
          <TypewriterText
            key={`${memory.id}-${response}`}
            text={response}
            speed={18}
            onDone={() => setResponseDone(true)}
          />
        </div>
      )}

      {restored && (
        <div className="restored-card">
          <p>{memory.restoredCaption}</p>
          <div className="code-fragment">
            <span>Fragmento recuperado</span>
            <strong>{memory.codeWord}</strong>
          </div>
          <ChoiceButton onClick={onContinue} disabled={!canContinue || !responseDone}>
            {canContinue && responseDone ? "Continuar" : "Restaurando..."}
          </ChoiceButton>
        </div>
      )}
    </section>
  );
}
