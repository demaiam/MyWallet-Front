import { useState } from "react";
import { TransactionsContainer } from "./styled";

export default function TransactionsPage() {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  function newTransaction(event) {
    event.preventDefault();
    const data = { value: value, description: description };
    const req = axios.post();
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={newTransaction}>
        <input
          placeholder="Valor"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <input
          placeholder="Descrição"
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}
