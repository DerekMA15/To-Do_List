# To-Do List: Backend Roadmap
Este projeto é uma aplicação de gerenciamento de tarefas (To-Do List) desenvolvida para documentar a evolução no ecossistema Node.js e TypeScript. O repositório não é apenas um código funcional, mas um roteiro técnico que vai da manipulação básica de memória até a persistência robusta em bancos de dados relacionais.

## Tecnologias e Ferramentas
- **Runtime:** Node.js
- **Linguagem:** TypeScript (Tipagem forte e interfaces)
- **Framework:** Express
- **Banco de Dados:** PostgreSQL
- **Segurança:** Autenticação via JWT (JSON Web Tokens)

## Arquitetura e Evolução Técnica
O projeto foi estruturado em marcos de aprendizado, permitindo visualizar a evolução da complexidade da aplicação:
### Fase 1: Volatilidade e Memória
Nesta etapa inicial, o foco foi entender o ciclo de vida de uma requisição HTTP.
- **Armazenamento:** Arquitetura e Evolução Técnica Uso de Arrays globais para salvar tarefas.

- **Conceito chave:** Entender que os dados são perdidos ao reiniciar o servidor (volatilidade).

- **Operações:** Implementação de GET para listagem e POST para criação básica.

### Fase 2: Persistência Relacional (PostgreSQL)

A transição para um banco de dados real introduziu a necessidade de lidar com processos assíncronos e integridade de dados.

- **Querying:** Uso de SQL puro ou Query Builders para interagir com o PostgreSQL.

- **Modelagem:** Definição de Schemas (ID, Título, Status de Conclusão, Timestamps).

- **Segurança:** Início do tratamento de dados sensíveis e sanitização de inputs para evitar SQL Injection.

### Fase 3: Refatoração e TypeScript Avançado

Refatoração do código para padrões de projeto mais limpos.

- **Interfaces:** Definição rigorosa de contratos para os objetos de Tarefa.

- **Middlewares:** Camada intermediária para validação de dados antes de chegarem ao Controller.

## Destaque Técnico: O Fluxo de Dados

Para um desenvolvedor backend, o entendimento do fluxo de dados é essencial. No main.py (ou nos controladores do Node), o fluxo segue este padrão:

1. **Request:** O cliente envia um JSON via corpo da requisição.

2. **Validation:** O Middleware verifica se o campo titulo existe e é uma string.

3. **Processing:** O serviço processa a lógica (ex: não permitir títulos duplicados).

4. **Persistence:** O dado é enviado ao PostgreSQL via INSERT.

5. **Response:** Retorno do status 201 Created com o objeto persistido.

## Como Executar o Projeto

- Clone o repositório:
git clone https://github.com/DerekMA15/To-Do_List.git
- Instale as dependências:
    bash```
    npm install
        ```
- Configure o Banco de Dados:
    Certifique-se de que o PostgreSQL está ativo em seu sistema Linux:
    bash```
    sudo systemctl start postgresql
        ```
- Inicie em modo de desenvolvimento:
    Bash```
    npm run dev
      ```
