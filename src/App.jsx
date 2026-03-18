import { useState } from "react";
import Botao from "./Botao";

export default function App() {
  const [atividade, setAtividade] = useState('');
  const [atividades, setAtividades] = useState([]);

  function atualizarAtividade(valor) {
    setAtividade(valor);
  }

  function adicionarAtividade() {
    if (atividade.trim() !== '') {
      const novaAtividade = {
        id: Date.now(),
        texto: atividade,
        feita: false
      };

      setAtividades([...atividades, novaAtividade]);
      setAtividade('');
    }
  }

  function completarAtividade(id) {
    setAtividades(
      atividades.map(item =>
        item.id === id
          ? { ...item, feita: !item.feita }
          : item
      )
    );
  }

  function excluirAtividade(id) {
    setAtividades(
      atividades.filter(item => item.id !== id)
    );
  }

  return (
    <div>
      <h2>Lista de Tarefas</h2>

      <input
        type="text"
        value={atividade}
        onChange={e => atualizarAtividade(e.target.value)}
        placeholder="Digite uma tarefa..."
      />

      <Botao funcao={adicionarAtividade} btnText="Adicionar" />

      <ul>
        {atividades.map(item => (
          <li
            key={item.id}
            style={{
              textDecoration: item.feita ? "line-through" : "none"
            }}
          >
            <input
              type="checkbox"
              checked={item.feita}
              onChange={() => completarAtividade(item.id)}
            />

            {item.texto}

            <Botao
              funcao={() => excluirAtividade(item.id)}
              btnText="Remover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}