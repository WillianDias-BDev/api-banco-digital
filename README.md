# API Banco Digital

Este é um projeto desenvolvido como parte do Desafio do Módulo 2 no curso de desenvolvimento web da Cubos Academy. A API Banco Digital permite realizar operações bancárias básicas, como criar contas, listar contas, atualizar dados de usuário, excluir contas, depositar, sacar, transferir, consultar saldo e emitir extrato.

[![](https://mermaid.ink/img/pako:eNqtVTtu3DAQvQrBigvYjcstAiReBwgQuJHdBNsMJDpLRCIFfgA7hg-TA-QCafdi4ZKUSI2ouEmxWs7M4xvO8I30SlvVcbqn3zWMJ_JwOEpCGgvaMvZFnn-3Qu12s49cX38gX4Xx61slLRgWDRItBLzVIuFYWEYUAn20DnrxE_SjcaCFYrOjCr97bnsnEmsyqsADH5UR3mTzCiEaaH00PFHkQYM0T1wLzfISF6ekcb03G-g7xWaTBBufehBW6Ltnq8EqFi2SzAC9_Mq-xtY4y6UV_nwNlyf4BLL17ZmdJHhJp0iIBJ7altWlHaBT6OZI8O3wMYK3vn86db5kdOcxS3HxRQ6Equ2c-LE-qqKJubJyvPv86wLOKatbtsmm9KXeVgK8dwPXailDMipN7s9_LpEdZogbNnimlLNelzqONeZgLm0JqeyamIPWs_YjY3RmthxCyIkljwQalshXhDMpAtU2zoJaDBYahNip0LQg8HIcUtNJB-kmeJwQNBiYojLNSbrLkS7lu0Zvscw6Kt8A7xR18x-qulm_d2JVy5dPUdQau0GxnvxCLa7lxiiW_t-ZvIT6x5QUiIrKiyhWbY7UpFeEt-6yPFu9M2X2uAzuz2JgzD8un016RX0pA4jOf2FfQ-OoPfGBH-neLzvQP470KN88DpxVzYts6f4JesOvqBs7sPwgwH-Zh9k7gvymlLetdvztL6Qotp4?type=png)](https://mermaid.live/edit#pako:eNqtVTtu3DAQvQrBigvYjcstAiReBwgQuJHdBNsMJDpLRCIFfgA7hg-TA-QCafdi4ZKUSI2ouEmxWs7M4xvO8I30SlvVcbqn3zWMJ_JwOEpCGgvaMvZFnn-3Qu12s49cX38gX4Xx61slLRgWDRItBLzVIuFYWEYUAn20DnrxE_SjcaCFYrOjCr97bnsnEmsyqsADH5UR3mTzCiEaaH00PFHkQYM0T1wLzfISF6ekcb03G-g7xWaTBBufehBW6Ltnq8EqFi2SzAC9_Mq-xtY4y6UV_nwNlyf4BLL17ZmdJHhJp0iIBJ7altWlHaBT6OZI8O3wMYK3vn86db5kdOcxS3HxRQ6Equ2c-LE-qqKJubJyvPv86wLOKatbtsmm9KXeVgK8dwPXailDMipN7s9_LpEdZogbNnimlLNelzqONeZgLm0JqeyamIPWs_YjY3RmthxCyIkljwQalshXhDMpAtU2zoJaDBYahNip0LQg8HIcUtNJB-kmeJwQNBiYojLNSbrLkS7lu0Zvscw6Kt8A7xR18x-qulm_d2JVy5dPUdQau0GxnvxCLa7lxiiW_t-ZvIT6x5QUiIrKiyhWbY7UpFeEt-6yPFu9M2X2uAzuz2JgzD8un016RX0pA4jOf2FfQ-OoPfGBH-neLzvQP470KN88DpxVzYts6f4JesOvqBs7sPwgwH-Zh9k7gvymlLetdvztL6Qotp4)

## Tecnologias Utilizadas

- Node.js
- Express
- JavaScript
- Git
- npm (Node Package Manager)
- JSON
- Memória para Armazenamento de Dados
- Insomnia
- VSCode

## Como Executar

Para executar este projeto localmente, siga as etapas abaixo:

1. Faça o clone deste repositório para a sua máquina:

```
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

2. Navegue até a pasta do projeto:

```
cd nome-do-repositorio
```

3. Instale as dependências do projeto:

```
npm install
```

4. Inicie o servidor:

```
npm run dev
```

O servidor estará rodando em http://localhost:3000 por padrão. Você pode alterar a porta no arquivo `index.js` se desejar.

## Endpoints

A API oferece os seguintes endpoints:

### Listar contas bancárias

- **URL:** `/contas?senha_banco=Cubos123Bank`
- **Método:** GET
- **Requisição Query Params:**
  - `senha_banco` (obrigatório): A senha do banco (Cubos123Bank).

### Criar conta bancária

- **URL:** `/contas`
- **Método:** POST
- **Corpo da Requisição:**
  - `nome` (obrigatório): Nome do titular da conta.
  - `cpf` (obrigatório): CPF do titular da conta (deve ser único).
  - `data_nascimento` (obrigatório): Data de nascimento do titular da conta.
  - `telefone` (obrigatório): Número de telefone do titular da conta.
  - `email` (obrigatório): Endereço de e-mail do titular da conta (deve ser único).
  - `senha` (obrigatório): Senha da conta.

### Atualizar usuário da conta bancária

- **URL:** `/contas/:numeroConta/usuario`
- **Método:** PUT
- **Parâmetros de Rota:**
  - `numeroConta` (obrigatório): Número da conta a ser atualizada.
- **Corpo da Requisição:**
  - `nome` (obrigatório): Nome do titular da conta.
  - `cpf` (opcional): CPF do titular da conta (deve ser único).
  - `data_nascimento` (opcional): Data de nascimento do titular da conta.
  - `telefone` (opcional): Número de telefone do titular da conta.
  - `email` (opcional): Endereço de e-mail do titular da conta (deve ser único).
  - `senha` (opcional): Senha da conta.

### Excluir Conta

- **URL:** `/contas/:numeroConta`
- **Método:** DELETE
- **Parâmetros de Rota:**
  - `numeroConta` (obrigatório): Número da conta a ser excluída.

### Depositar

- **URL:** `/transacoes/depositar`
- **Método:** POST
- **Corpo da Requisição:**
  - `numero_conta` (obrigatório): Número da conta onde será feito o depósito.
  - `valor` (obrigatório): Valor do depósito (em centavos).

### Sacar

- **URL:** `/transacoes/sacar`
- **Método:** POST
- **Corpo da Requisição:**
  - `numero_conta` (obrigatório): Número da conta onde será feito o saque.
  - `valor` (obrigatório): Valor do saque (em centavos).
  - `senha` (obrigatório): Senha da conta.

### Tranferir

- **URL:** `/transacoes/transferir`
- **Método:** POST
- **Corpo da Requisição:**
  - `numero_conta_origem` (obrigatório): Número da conta de origem da transferência.
  - `numero_conta_destino` (obrigatório): Número da conta de destino da transferência.
  - `valor` (obrigatório): Valor da transferência (em centavos).
  - `senha` (obrigatório): Senha da conta de origem.

### Saldo

- **URL:** `/contas/saldo?numero_conta=123&senha=123`
- **Método:** GET
- **Requisição Query Params:**
  - `numero_conta` (obrigatório): Número da conta.
  - `senha` (obrigatório): Senha da conta.

### Extrato

- **URL:** `/contas/extrato?numero_conta=123&senha=123`
- **Método:** GET
- **Requisição Query Params:**
  - `numero_conta` (obrigatório): Número da conta.
  - `senha` (obrigatório): Senha da conta.

## Status Codes

A API pode retornar os seguintes status codes:

- 200 (OK): Requisição bem sucedida.
- 201 (Created): Requisição bem sucedida e algo foi criado.
- 204 (No Content): Requisição bem sucedida, sem conteúdo no corpo da resposta.
- 400 (Bad Request): O servidor não entendeu a requisição devido a sintaxe/formato inválido.
- 401 (Unauthorized): O usuário não está autenticado (logado).
- 403 (Forbidden): O usuário não tem permissão de acessar o recurso solicitado.
- 404 (Not Found): O servidor não pode encontrar o recurso solicitado.
- 500 (Internal Server Error): Falhas causadas pelo servidor.

## Persistência dos Dados

Os dados são persistidos em memória, no objeto existente dentro do arquivo `bancodedados.js`. Todas as transações e contas bancárias são inseridas dentro deste objeto, seguindo a estrutura definida no arquivo.

## Autor

Willian Dias - [GitHub](https://github.com/WillianDias-BDev)


