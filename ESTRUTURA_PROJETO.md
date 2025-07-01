# ⚠️ Passo Inicial: Instale as Dependências

Antes de começar a desenvolver, instale as dependências do frontend e backend:

```bash
# Frontend
cd web
npm install

# Backend
cd backend
dotnet restore
```

---

# 📁 Documentação da Estrutura do Projeto NestFin

## Visão Geral

Este documento descreve a organização e estrutura de pastas do projeto full-stack NestFin, que utiliza Next.js para o frontend e ASP.NET Core para o backend.

## 🏗️ Arquitetura Geral

```
Project_NestFin/
├── web/                 # Frontend Next.js
├── backend/             # Backend ASP.NET Core
├── docker-compose.yml   # Orquestração de containers
├── .gitignore          # Arquivos ignorados pelo Git
└── README.md           # Documentação principal
```

---

## 🎨 Frontend (Next.js) - `/web`

### Estrutura de Pastas

```
web/
├── src/
│   ├── app/                    # App Router (Next.js 14)
│   │   ├── layout.tsx         # Layout principal da aplicação
│   │   └── page.tsx           # Página inicial (tema escuro #122112)
│   │
│   ├── components/            # Componentes React organizados
│   │   ├── ui/               # Componentes de UI básicos (shadcn/ui)
│   │   │   └── button.tsx    # Componente Button com class-variance-authority
│   │   ├── forms/            # Formulários reutilizáveis
│   │   ├── layout/           # Componentes de layout (header, sidebar, etc.)
│   │   │   └── Header.tsx    # Header principal com tema escuro
│   │   └── charts/           # Gráficos e visualizações de dados
│   │
│   ├── hooks/                # Custom hooks React
│   ├── lib/                  # Bibliotecas e configurações externas
│   │   └── utils.ts          # Utilitários (cn function para className)
│   ├── utils/                # Funções utilitárias e helpers
│   ├── types/                # Definições TypeScript
│   ├── styles/               # Estilos globais e CSS
│   │   └── globals.css       # Estilos globais com Tailwind
│   └── public/               # Arquivos estáticos (imagens, ícones, etc.)
│
├── package.json              # Dependências e scripts
├── next.config.js           # Configuração do Next.js
├── tailwind.config.js       # Configuração do Tailwind CSS
├── postcss.config.js        # Configuração do PostCSS
├── tsconfig.json            # Configuração do TypeScript
└── Dockerfile               # Containerização do frontend
```

### Propósito de Cada Pasta

#### `/src/app/`

- **App Router**: Nova arquitetura do Next.js 14
- **layout.tsx**: Layout compartilhado entre todas as páginas
- **page.tsx**: Página inicial da aplicação com tema escuro (#122112)

#### `/src/components/ui/`

- **shadcn/ui**: Componentes de UI baseados em Radix UI
- **button.tsx**: Componente Button com class-variance-authority para variantes
- **Design System**: Componentes reutilizáveis com design consistente

#### `/src/components/layout/`

- **Header.tsx**: Header principal com navegação e tema escuro
- **Tema**: Fundo #122112 com bordas brancas e texto branco
- **Navegação**: Links para Dashboard e Metas
- **Responsivo**: Layout adaptável para diferentes tamanhos de tela

#### `/src/components/`

- **ui/**: Componentes básicos reutilizáveis (Button, Input, Modal, etc.)
- **forms/**: Formulários específicos (LoginForm, RegisterForm, etc.)
- **layout/**: Componentes de estrutura (Header, Sidebar, Footer, etc.)
- **charts/**: Componentes de visualização de dados (gráficos, dashboards)

#### `/src/hooks/`

- Custom hooks React para lógica reutilizável
- Exemplo: `useAuth.ts`, `useApi.ts`, `useLocalStorage.ts`

#### `/src/lib/`

- Configurações de bibliotecas externas
- Clientes de API, configurações de autenticação

#### `/src/utils/`

- Funções utilitárias e helpers
- Formatação de dados, validações, constantes

#### `/src/types/`

- Definições TypeScript
- Interfaces, tipos, enums

#### `/src/styles/`

- Estilos globais e configurações CSS
- Integração com Tailwind CSS

---

## ⚙️ Backend (ASP.NET Core) - `/backend`

### Estrutura de Pastas

```
backend/
├── Controllers/              # Controllers da API REST
│   └── UsersController.cs   # Exemplo de controller CRUD
│
├── Models/                   # Modelos do Entity Framework
│   └── User.cs              # Modelo de usuário
│
├── Data/                     # Camada de acesso a dados
│   └── ApplicationDbContext.cs  # Contexto do Entity Framework
│
├── Services/                 # Lógica de negócio
├── DTOs/                     # Data Transfer Objects
├── Repositories/             # Padrão Repository
├── Middleware/               # Middlewares customizados
├── Extensions/               # Extensões de métodos
├── Configurations/           # Configurações da aplicação
├── Migrations/               # Migrações do Entity Framework
│
├── Program.cs                # Ponto de entrada da aplicação
├── appsettings.json          # Configurações (connection strings, etc.)
├── NestFin.API.csproj        # Arquivo de projeto .NET
└── Dockerfile                # Containerização do backend
```

### Propósito de Cada Pasta

#### `/Controllers/`

- Controllers da API REST
- Endpoints HTTP (GET, POST, PUT, DELETE)
- Validação de entrada e retorno de respostas

#### `/Models/`

- Entidades do Entity Framework
- Representação das tabelas do banco de dados
- Anotações de validação e relacionamentos

#### `/Data/`

- Contexto do Entity Framework
- Configuração do banco de dados
- DbSets e configurações de modelo

#### `/Services/`

- Lógica de negócio da aplicação
- Regras de negócio complexas
- Integração com serviços externos

#### `/DTOs/`

- Data Transfer Objects
- Objetos para transferência de dados entre camadas
- Separação entre modelos de domínio e API

#### `/Repositories/`

- Padrão Repository
- Abstração do acesso a dados
- Operações CRUD reutilizáveis

#### `/Middleware/`

- Middlewares customizados
- Autenticação, logging, tratamento de erros
- Pipeline de requisições HTTP

#### `/Extensions/`

- Extensões de métodos
- Métodos de extensão para classes existentes
- Utilitários para configuração de serviços

#### `/Configurations/`

- Classes de configuração
- Mapeamento de configurações do appsettings.json
- Configurações de serviços

#### `/Migrations/`

- Migrações do Entity Framework
- Controle de versão do banco de dados
- Scripts de criação e alteração de tabelas

---

## 🐳 DevOps e Containerização

### Arquivos de Configuração

#### `docker-compose.yml`

- Orquestração de todos os serviços
- MySQL, Backend e Frontend
- Redes e volumes compartilhados

#### `Dockerfile` (Frontend)

- Containerização do Next.js
- Build otimizado para produção
- Configuração de segurança

#### `Dockerfile` (Backend)

- Containerização do ASP.NET Core
- Build multi-stage para otimização
- Configuração de runtime

#### `.gitignore`

- Arquivos e pastas ignorados pelo Git
- Configurações específicas para .NET e Node.js
- Arquivos temporários e de build

---

## 🚀 Como Usar

### Desenvolvimento Local

1. **Instalar dependências do frontend:**

   ```bash
   cd web
   npm install
   ```

2. **Configurar o backend:**

   ```bash
   cd backend
   dotnet restore
   dotnet build
   ```

3. **Executar com Docker:**
   ```bash
   docker-compose up -d
   ```

### URLs de Desenvolvimento

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Swagger**: http://localhost:5000/swagger
- **MySQL**: localhost:3306

---

## 📋 Convenções de Nomenclatura

### Frontend

- **Componentes**: PascalCase (ex: `UserCard.tsx`)
- **Hooks**: camelCase com prefixo "use" (ex: `useAuth.ts`)
- **Utilitários**: camelCase (ex: `formatCurrency.ts`)
- **Tipos**: PascalCase (ex: `UserType.ts`)

### Backend

- **Controllers**: PascalCase + "Controller" (ex: `UsersController.cs`)
- **Models**: PascalCase (ex: `User.cs`)
- **Services**: PascalCase + "Service" (ex: `UserService.cs`)
- **DTOs**: PascalCase + "DTO" (ex: `UserDTO.cs`)

---

## 🔧 Configurações Importantes

### Frontend

- **Next.js 14** com App Router
- **TypeScript** para tipagem estática
- **Tailwind CSS** para estilização
- **Path mapping** configurado para imports limpos

### Backend

- **ASP.NET Core 8.0**
- **Entity Framework Core** com MySQL
- **AutoMapper** para mapeamento de objetos
- **Swagger** para documentação da API
- **JWT** para autenticação

---

## 📝 Próximos Passos

1. **Implementar autenticação JWT**
2. **Criar mais modelos de dados**
3. **Implementar validações**
4. **Adicionar testes unitários**
5. **Configurar CI/CD**
6. **Implementar logging**
7. **Adicionar monitoramento**

---

## 🎨 Mudanças Recentes (Última Atualização)

### Frontend - Implementações do Dia

#### ✅ Componentes UI (shadcn/ui)

- **Button Component**: Implementado com class-variance-authority
- **Variantes**: default, destructive, outline, secondary, ghost, link
- **Tamanhos**: default, sm, lg, icon
- **Integração**: Radix UI Slot para composição

#### ✅ Header Component

- **Localização**: `/components/layout/Header.tsx`
- **Tema**: Escuro (#122112) com bordas brancas
- **Navegação**: Dashboard e Metas
- **Responsivo**: Layout adaptável
- **Integração**: Usa Button component do shadcn/ui

#### ✅ Página Principal

- **Tema**: Fundo escuro (#122112) em toda a aplicação
- **Layout**: Flexbox com altura mínima de tela
- **Header**: Integrado na página principal

#### ✅ Utilitários

- **cn function**: Implementada em `/lib/utils.ts`
- **Class merging**: Para combinação de classes CSS
- **Tailwind**: Integração otimizada

### Design System

- **Cores**: Tema escuro consistente
- **Tipografia**: Texto branco sobre fundo escuro
- **Componentes**: Reutilizáveis e consistentes
- **Responsividade**: Mobile-first approach

---

_Esta documentação deve ser atualizada conforme o projeto evolui._
