export default function Botao({ funcao, btnText }) {
  return (
    <button onClick={funcao}>
      {btnText}
    </button>
  );
}