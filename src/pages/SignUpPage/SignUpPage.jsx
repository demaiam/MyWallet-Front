import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyWalletLogo from "../../components/MyWalletLogo";
import axios from 'axios';
import { SignUpContainer } from "./styled";

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  function signUp(event) {
    event.preventDefault();

    if (password !== confirmPassword) return alert("Senhas não coincidem");
    
    const data = { name: name, email: email, password: password };

    const req = axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, data);
    req.then(navigate('/'));
    req.catch(res => alert(`Falha ao fazer cadastro! ${res.response.data}`));
  }

  return (
    <SignUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          data-test="name"
        />
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
        <input
          placeholder="Confirme a senha"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          data-test="conf-password"
        />
        <button type="submit" data-test="sign-up-submit">Cadastrar  </button>
      </form>

      <button onClick={() => navigate('/')}>Já tem uma conta? Entre agora!</button>
    </SignUpContainer>
  )
}