# Automação Web do Formulário de Reserva de Ingressos

Projeto didático de automação Web com Cypress. A aplicação simula uma reserva de ingressos e possui testes para navegação, preenchimento do formulário, validações e mensagens de retorno.

## Pré-requisitos

Instale os seguintes programas:

- [Node.js](https://nodejs.org/) versão 18 ou superior;
- npm, instalado junto com o Node.js;
- Git, caso o projeto seja clonado do repositório.

Confira as versões instaladas:

```bash
node --version
npm --version
```

## Instalação

1. Clone o repositório e acesse a pasta do projeto:

```bash
git clone <URL_DO_REPOSITORIO>
cd automacao-web-do-formulario-reserva-de-ingressos
```

2. Instale as dependências:

```bash
npm install
```

As dependências de desenvolvimento incluem o Cypress e o `start-server-and-test`.

## Executar a aplicação

Inicie o servidor local:

```bash
npm start
```

A aplicação ficará disponível em:

```text
http://localhost:8080
```

Para acessar diretamente:

- Página inicial: `http://localhost:8080/`
- Formulário: `http://localhost:8080/formulario.html`

## Executar os testes

### Suíte completa

O comando abaixo inicia o servidor automaticamente, aguarda a aplicação ficar disponível e executa todos os testes:

```bash
npm test
```

Existe um único arquivo de testes com um `describe` e vários `it`s:

```text
cypress/e2e/automacao-de-formulario-reserva-de-ingressos.cy.js
```

### Cypress com interface gráfica

Para abrir o Cypress:

```bash
npm run cypress:open
```

Com o Cypress aberto, selecione **E2E Testing**, escolha um navegador e execute o arquivo de testes.

Nesse modo, mantenha o servidor local ativo em outro terminal:

```bash
npm start
```

### Executar os testes em modo interativo com servidor automático

```bash
npm run test:local
```

### Executar apenas o arquivo de testes

Com o servidor já iniciado, execute:

```bash
npm run test:e2e
```

## Estrutura do projeto

```text
index.html                         Página inicial
formulario.html                    Formulário de reserva
css/estilo.css                     Estilos da aplicação
server.js                          Servidor HTTP local
cypress.config.js                  Configuração do Cypress
cypress/e2e/                       Testes end-to-end
```

## Solução de problemas

### Cypress não consegue conectar em `localhost:8080`

O servidor precisa estar ativo antes de usar o Cypress pela interface gráfica. Execute:

```bash
npm start
```

Depois, tente novamente no Cypress.

Se a porta `8080` já estiver em uso, encerre o processo que está usando a porta ou feche o servidor anterior antes de iniciar uma nova instância.

### O Cypress ainda não foi instalado

Execute novamente:

```bash
npm install
npx cypress verify
```