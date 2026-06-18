# Dictionary Platform

Aplicação web de dicionário desenvolvida com Next.js 15 e App Router. O projeto permite cadastrar usuário, realizar login, pesquisar palavras em inglês, visualizar detalhes completos, consultar histórico de buscas, favoritar palavras e navegar por um dicionário paginado.

Além dos requisitos principais do desafio, a aplicação também possui reprodução de pronúncia das palavras para melhorar a experiência do usuário. Para isso, utiliza a Free Dictionary API como fonte de áudio quando disponível e faz fallback para a Web Speech API do navegador.

## Deploy

Web:

```txt
https://dictionary-platform-web.vercel.app/entrar
```

API mockada com json-server no Render:

```txt
https://mock-api-o4lj.onrender.com
```

## Stack

- Next.js 15
- React 19
- TypeScript
- App Router
- Tailwind CSS 4
- json-server
- Zod
- Lucide React
- Free Dictionary API
- Web Speech API
- ESLint
- Vitest
- React Testing Library
- Playwright

## Funcionalidades

- Cadastro e login com validação client-side.
- Sessão mockada com token salvo no `localStorage`.
- Rotas privadas protegidas por autenticação.
- Logout com limpeza da sessão.
- Busca de palavras em inglês com debounce.
- Histórico recente de pesquisas por usuário.
- Página de detalhes da palavra com fonética, definições, exemplos e sinônimos.
- Reprodução de pronúncia da palavra.
- Favoritar e desfavoritar palavras.
- Tela de favoritos com remoção direta e modal de confirmação.
- Dicionário completo com paginação.
- Modal de detalhes no dicionário.
- Estados de loading, erro e vazio.
- Toasts para feedbacks de ações.
- Layout responsivo para mobile e desktop.

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Para usar a API publicada no Render:

```bash
NEXT_PUBLIC_API_URL=https://mock-api-o4lj.onrender.com
```

A variável `NEXT_PUBLIC_API_URL` é usada pelo cliente HTTP da aplicação para direcionar todas as chamadas REST.

## Como rodar localmente

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Suba a API mockada:

```bash
npm run mock
```

Em outro terminal, suba o front-end:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000/entrar
```

## Scripts disponíveis

Rodar o projeto em desenvolvimento:

```bash
npm run dev
```

Rodar o json-server local:

```bash
npm run mock
```

Executar validação estática:

```bash
npm run lint
```

Gerar build de produção:

```bash
npm run build
```

Rodar build gerado:

```bash
npm run start
```

Rodar testes unitários:

```bash
npm run test
```

Rodar testes E2E:

```bash
npm run test:e2e
```

## Arquitetura

O projeto utiliza App Router e mantém as páginas como Server Components sempre que possível. Componentes com interação, acesso a `localStorage`, controle de formulário, debounce, modais ou navegação client-side são Client Components.

Principais diretórios:

```txt
src/
  app/
  components/
  config/
  hooks/
  lib/
  services/
  types/
```

As chamadas HTTP ficam centralizadas em `src/services/http.ts`, com suporte a:

- tratamento padronizado de erro;
- `ApiError` com status HTTP;
- respostas `204 No Content`;
- retry com backoff exponencial para operações idempotentes;
- leitura de headers para paginação;
- estratégias de cache compatíveis com o fetch do Next.js.

## API mockada

A API foi simulada com json-server, usando os recursos:

```txt
/users
/words
/favorites
/history
```

No ambiente de produção, o json-server está publicado no Render. Localmente, os dados ficam em:

```txt
mock/db.json
```

## Pronúncia das palavras

A reprodução de voz segue esta ordem:

1. Consulta a Free Dictionary API para buscar áudio real da palavra.
2. Caso não exista áudio disponível, utiliza `speechSynthesis` do navegador como fallback.

Essa funcionalidade foi adicionada como melhoria de experiência, mesmo não sendo obrigatória no desafio.

## Observações

O projeto foi desenvolvido com foco em clareza de arquitetura, separação de responsabilidades, tipagem consistente, estados de interface bem definidos e experiência responsiva.
