"use client"
// Form de Login/Cadastro simples com redirect pós-login
import React, { useState } from 'react';
import { authService } from '@/lib/auth';

type AuthFormsProps = {
  // Chamado após login bem-sucedido (para redirecionar)
  onSuccessLogin?: () => void;
};

const AuthForms = ({ onSuccessLogin }: AuthFormsProps) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState<string | null>(null);

  const onLogin = async () => {
    setError(null); setMessage(null); setLoading(true);
    try {
      await authService.login(loginData);
      setMessage('Login realizado com sucesso!');
      // Redireciona para o dashboard quando houver handler
      if (onSuccessLogin) onSuccessLogin();
    } catch (e) {
      setError('Falha no login. Verifique suas credenciais.');
    } finally { setLoading(false); }
  };

  const onRegister = async () => {
    setError(null); setMessage(null); setLoading(true);
    try {
      await authService.register(registerData);
      setMessage('Cadastro realizado com sucesso!');
      setTab('login');
    } catch (e) {
      setError('Falha no cadastro. E-mail pode já estar em uso.');
    } finally { setLoading(false); }
  };

  return (
    <div className="w-full max-w-2xl justify-center align-center mx-auto bg-[#2B402B] rounded-xl p-10 md:p-12 text-white shadow-lg min-h-[560px]">
      <div className="flex space-x-3 mb-6">
        <button onClick={() => setTab('login')} className={`px-5 py-3 rounded-lg ${tab === 'login' ? 'bg-green-700' : 'bg-[#1A2A1A]'}`}>Login</button>
        <button onClick={() => setTab('register')} className={`px-5 py-3 rounded-lg ${tab === 'register' ? 'bg-green-700' : 'bg-[#1A2A1A]'}`}>Cadastro</button>
      </div>
      {error && <div className="mb-5 p-4 bg-red-600 rounded-lg text-base">{error}</div>}
      {message && <div className="mb-5 p-4 bg-green-700 rounded-lg text-base">{message}</div>}

      {tab === 'login' ? (
        <div className="space-y-6">
          <input className="w-full p-4 rounded-lg bg-[#122112] border border-[#4A5D4A] text-lg" placeholder="Email" type="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
          <input className="w-full p-4 rounded-lg bg-[#122112] border border-[#4A5D4A] text-lg" placeholder="Senha" type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
          <button disabled={loading} onClick={onLogin} className="w-full p-4 text-lg bg-green-600 rounded-xl disabled:opacity-50 hover:bg-green-700 transition-colors">{loading ? 'Entrando...' : 'Entrar'}</button>
          <button type="button" className="w-full text-center text-sm text-[#E5E8EB] hover:underline opacity-80">
            Esqueci a senha
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <input className="w-full p-4 rounded-lg bg-[#122112] border border-[#4A5D4A] text-lg" placeholder="Nome" value={registerData.name} onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} />
          <input className="w-full p-4 rounded-lg bg-[#122112] border border-[#4A5D4A] text-lg" placeholder="Email" type="email" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
          <input className="w-full p-4 rounded-lg bg-[#122112] border border-[#4A5D4A] text-lg" placeholder="Senha" type="password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
          <button disabled={loading} onClick={onRegister} className="w-full p-4 text-lg bg-green-600 rounded-xl disabled:opacity-50 hover:bg-green-700 transition-colors">{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
        </div>
      )}
    </div>
  );
};

export default AuthForms;
