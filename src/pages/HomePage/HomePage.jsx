import { BiExit } from "react-icons/bi";
import { Context } from "../../context/Context";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useState, useEffect } from "react";
import { HomeContainer, Header, TransactionsContainer, ButtonsContainer, Value, ListItemContainer } from './styled';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const navigate = useNavigate();

  const { name, token, setToken } = useContext(Context);

  useEffect(() => {
    if (token == '') navigate('/');
    const authentication = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const req = axios.get(`${import.meta.env.VITE_API_URL}/home`, authentication);
    req.then(res => {
      setTransactions(res.data);
      calculateBalance(res.data);
    });
    req.catch(err => alert(`Erro ao carregar as transações! ${err.response.data}`));
  }, []);
  
  function calculateBalance(data) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].type == 'saida')
        sum -= data[i].value;
      else
        sum += data[i].value;
    }
    setBalance(sum);
  }

  function logout() {
    setToken('');
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {name}</h1>
        <BiExit onClick={logout} data-test="logout"/>
      </Header>

      {transactions.length == 0
        ?
        <TransactionsContainer>
          Não há registros de entrada ou saída
        </TransactionsContainer>
        :
        <TransactionsContainer>
          <ul>
            {transactions.toReversed().map((transaction, index) => (
              <ListItemContainer key={index}>
                <div>
                  <span>{transaction.time}</span>
                  <strong data-test="registry-name">{transaction.description}</strong>
                </div>
                <Value color={transaction.type} data-test="registry-amount">
                  {transaction.value.toFixed(2)}
                </Value>
              </ListItemContainer>
            ))}
          </ul>

          <article>
            <strong>Saldo</strong>
            <Value color={balance >= 0 ? 'entrada' : 'saida'} data-test="total-amount">
              {balance.toFixed(2)}
            </Value>
          </article>
        </TransactionsContainer>
      }

      <ButtonsContainer>
        <button onClick={() => navigate('/nova-transacao/entrada')} data-test="new-income">
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate('/nova-transacao/saida')} data-test="new-expense">
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}