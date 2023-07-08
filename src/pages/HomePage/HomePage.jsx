import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useState } from "react";
import { HomeContainer, Header, TransactionsContainer, ButtonsContainer, Value, ListItemContainer } from './styled';

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/receitas`)
    .then(res => setTransactions(res.data))
    .catch(err => console.log(err.response.data));
  }, []);


  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {Fulano}</h1>
        <BiExit data-test="logout"/>
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map((transaction, index) => (
            <ListItemContainer>
              <div>
                <span>{transaction.date}</span>
                <strong>{transaction.title}</strong>
              </div>
              <Value color={transaction.balance}>{transaction.value}</Value>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"}>2880,00</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}