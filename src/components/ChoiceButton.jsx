export default function ChoiceButton({ children, onClick, disabled = false, type = "button" }) {
  return (
    <button className="choice-button" type={type} onClick={onClick} disabled={disabled}>
      <span>{children}</span>
    </button>
  );
}
