import { useEffect, useMemo, useRef, useState } from "react";

const parseTypewriterText = (value) => {
  const tokens = [];
  const pausePattern = /\[pause(?::(\d+))?\]/gi;
  let lastIndex = 0;
  let match = pausePattern.exec(value);

  while (match) {
    const beforePause = value.slice(lastIndex, match.index);
    tokens.push(...beforePause.split("").map((char) => ({ type: "char", value: char })));
    tokens.push({ type: "pause", duration: Number(match[1] || 700) });
    lastIndex = pausePattern.lastIndex;
    match = pausePattern.exec(value);
  }

  tokens.push(...value.slice(lastIndex).split("").map((char) => ({ type: "char", value: char })));
  return tokens;
};

export default function TypewriterText({ text, speed = 28, fastSpeed = 8, onDone }) {
  const [index, setIndex] = useState(0);
  const [isFast, setIsFast] = useState(false);
  const reportedDone = useRef(false);
  const previousText = useRef(text);
  const tokens = useMemo(() => parseTypewriterText(text), [text]);
  const visibleIndex = previousText.current === text ? index : 0;
  const done = visibleIndex >= tokens.length;

  useEffect(() => {
    previousText.current = text;
    setIndex(0);
    setIsFast(false);
    reportedDone.current = false;
  }, [text]);

  useEffect(() => {
    if (done) {
      if (!reportedDone.current) {
        reportedDone.current = true;
        onDone?.();
      }
      return undefined;
    }

    const currentToken = tokens[visibleIndex];
    const pauseDelay = currentToken?.type === "pause" ? currentToken.duration : null;
    const delay = pauseDelay ?? (isFast ? fastSpeed : speed);
    const timeout = window.setTimeout(() => {
      setIndex(Math.min(visibleIndex + 1, tokens.length));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [done, fastSpeed, isFast, onDone, speed, tokens, visibleIndex]);

  const visibleText = useMemo(
    () =>
      tokens
        .slice(0, visibleIndex)
        .filter((token) => token.type === "char")
        .map((token) => token.value)
        .join(""),
    [tokens, visibleIndex],
  );

  return (
    <div className="typewriter-wrap">
      <p className="typewriter-text">
        {visibleText}
        {!done && <span className="cursor" aria-hidden="true" />}
      </p>
      <div className="typewriter-actions">
        {!done ? (
          <>
            <button type="button" onClick={() => setIsFast((value) => !value)}>
              {isFast ? "Velocidad normal" : "Acelerar"}
            </button>
            <button type="button" onClick={() => setIndex(tokens.length)}>
              Saltar texto
            </button>
          </>
        ) : (
          <span className="complete-label">Transmisión completa</span>
        )}
      </div>
    </div>
  );
}
