import { useContext, useState } from "react";
import { TransactionsContainer } from "./styled";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

export default function TransactionsPage() {
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  const [formattedType, setFormattedType] = useState('entrada');

  const { type } = useParams();

  const { token } = useContext(Context);

  const navigate = useNavigate();

  if (type == 'saida') setFormattedType('saída');

  function newTransaction(event) {
    event.preventDefault();

    const authentication = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = { value: parseFloat(value), description: description };

    const req = axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${type}`, data, authentication);
    req.then(navigate('/home'));
    req.catch(res => alert(`Falha ao criar transação! ${res.response.data.message}`));
  }

  return (
    <TransactionsContainer>
      <h1>Nova {formattedType}</h1>
      <form onSubmit={newTransaction}>
        <input
          placeholder="Valor"
          type="number"
          value={value}
          onChange={e => setValue(e.target.value)}
          data-test="registry-amount-input"
        />
        <input
          placeholder="Descrição"
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          data-test="registry-name-input"
        />
        <button type="submit" data-test="registry-save">Salvar {formattedType}</button>
      </form>
    </TransactionsContainer>
  )
}
