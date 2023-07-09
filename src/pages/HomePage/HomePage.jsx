import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useState } from "react";
import { HomeContainer, Header, TransactionsContainer, ButtonsContainer, Value, ListItemContainer } from './styled';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Context from "../../context/Context";

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const navigate = useNavigate();

  const [info] = useContext(Context);
  const token = info.data.token;

  useEffect(() => {
    const authentication = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const req = axios.get(`${import.meta.env.VITE_API_URL}/home`, authentication);
    req.then(res => {
      setTransactions(res.data);
      calculateBalance();
    });
    req.catch(err =>
      console.log(err.response.data)
    );
  }, []);
  
  function calculateBalance() {
    let sum = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type == 'saida') sum -= transactions[i].value;
      else sum += transactions[i].value;
    }
    setBalance(sum);
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, </h1>
        <BiExit data-test="logout"/>
      </Header>

      {transactions.length == 0
        ?
        <TransactionsContainer>
          Não há registros de entrada ou saída
        </TransactionsContainer>
        :
        <TransactionsContainer>
          <ul>
            {transactions.map((transaction, index) => (
              <ListItemContainer>
                <div>
                  <span>{transaction.time}</span>
                  <strong data-test="registry-name">{transaction.description}</strong>
                </div>
                <Value color={transaction.type} data-test="registy-amount">{transaction.value}</Value>
              </ListItemContainer>
            ))}
          </ul>

          <article data-test="total-amount">
            <strong>Saldo</strong>
            <Value color={() => balance >= 0 ? 'entrada' : 'saida'}>{balance.toFixed(2)}</Value>
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