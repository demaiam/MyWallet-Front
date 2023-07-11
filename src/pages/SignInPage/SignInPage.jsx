import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyWalletLogo from "../../components/MyWalletLogo";
import axios from 'axios';
import { SignInContainer } from "./styled";
import { Context } from "../../context/Context";

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, setName } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = localStorage.getItem('token');
    if (sessionToken) {
      setToken(sessionToken);
      navigate('/home');
    }
  }, []);

  function login(event) {
    event.preventDefault();
    const data = { email: email, password: password };
    const req = axios.post(`${import.meta.env.VITE_API_URL}/`, data);
    req.then(res => {
      setToken(res.data.token);
      setName(res.data.name);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    });
    req.catch(res => 
      alert(`Falha ao fazer Login! ${res.response.data}`)
    );
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