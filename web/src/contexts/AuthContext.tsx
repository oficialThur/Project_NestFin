"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

interface PersonalInfo {
  fullName?: string;
  email?: string;
  phone?: string;
  monthlyIncome?: number;
  monthlyFixedExpenses?: number;
  monthlyVariableExpenses?: number;
  notes?: string;
}

interface Goal {
  id: number;
  name: string;
  targetAmount: number;
}

interface AuthContextType {
  user: User | null;
  personalInfo: PersonalInfo | null;
  goal: Goal | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updatePersonalInfo: (info: PersonalInfo) => void;
  updateGoal: (goal: Goal) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('nestfin_user');
    const savedPersonalInfo = localStorage.getItem('nestfin_personal_info');
    const savedGoal = localStorage.getItem('nestfin_goal');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedPersonalInfo) {
      setPersonalInfo(JSON.parse(savedPersonalInfo));
    }
    if (savedGoal) {
      setGoal(JSON.parse(savedGoal));
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simular login (em produção, fazer chamada para API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock de usuário logado com nome do cadastro
      const mockUser: User = {
        id: 1,
        name: email.split('@')[0], // Usa parte do email como nome
        email: email,
        isActive: true
      };

      // Dados zerados para usuário novo
      const mockPersonalInfo: PersonalInfo = {
        fullName: "",
        email: email,
        phone: "",
        monthlyIncome: 0,
        monthlyFixedExpenses: 0,
        monthlyVariableExpenses: 0,
        notes: ""
      };

      // Meta vazia para usuário novo
      const mockGoal: Goal = {
        id: 1,
        name: "",
        targetAmount: 0
      };

      setUser(mockUser);
      setPersonalInfo(mockPersonalInfo);
      setGoal(mockGoal);

      // Salvar no localStorage
      localStorage.setItem('nestfin_user', JSON.stringify(mockUser));
      localStorage.setItem('nestfin_personal_info', JSON.stringify(mockPersonalInfo));
      localStorage.setItem('nestfin_goal', JSON.stringify(mockGoal));

      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setPersonalInfo(null);
    setGoal(null);
    localStorage.removeItem('nestfin_user');
    localStorage.removeItem('nestfin_personal_info');
    localStorage.removeItem('nestfin_goal');
  };

  const updatePersonalInfo = (info: PersonalInfo) => {
    setPersonalInfo(info);
    localStorage.setItem('nestfin_personal_info', JSON.stringify(info));
  };

  const updateGoal = (newGoal: Goal) => {
    setGoal(newGoal);
    localStorage.setItem('nestfin_goal', JSON.stringify(newGoal));
  };

  const value: AuthContextType = {
    user,
    personalInfo,
    goal,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updatePersonalInfo,
    updateGoal
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};