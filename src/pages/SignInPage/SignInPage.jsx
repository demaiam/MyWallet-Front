import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyWalletLogo from "../../components/MyWalletLogo";
import axios from 'axios';
import { SignInContainer } from "./styled";

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();
    const data = { email: email, password: password };
    const req = axios.post('http://localhost:5000/', data)
    .then(navigate('/'))
    .catch(res => alert(`Failed to login! ${res.response.data.message}`));
  }

  return (
    <SignInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          data-test="email"
          />
        <input
          placeholder="Senha"
          type="password"
          autocomplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          data-test="password"
          />
        <button type="submit" data-test="sign-in-submit">Entrar</button>
      </form>

      <button onClick={() => navigate('/cadastro')}>Primeira vez? Cadastre-se!</button>
    </SignInContainer>
  )
}