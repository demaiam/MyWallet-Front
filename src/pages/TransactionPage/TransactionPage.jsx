import { useState } from "react";
import { TransactionsContainer } from "./styled";
import { useParams } from "react-router-dom";

export default function TransactionsPage() {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  const { type } = useParams();
  const [info] = useContext(Context);
  const token = info.data.token;

  function newTransaction(event) {
    event.preventDefault();
    const authentication = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = { value: parseFloat(value), description: description };
    const req = axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${type}`, data, authentication);
    req.then(alert("Transaction created!"));
    req.catch(res => alert(`Failed to create transaction! ${res.response.data.message}`));
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
