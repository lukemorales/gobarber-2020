# Server

Você pode ler também em [inglês](./README.md).

## Etapas Iniciais

Há algumas etapas para poder configurar o banco de dados nessa API, primeiro, certifique-se de ter instalado:

- Docker
- Docker Compose

Primeiro, crie um arquivo chamado `.env`, ele irá configurar algumas coisas do banco de dados e da API,
e depois copie o conteúdo do arquivo `env-pr-BR.example` para dentro do `.env`.

Após isso, use o comando a seguir para inicializar o banco de dados:

```bash
docker-compose up -d postgres
```

Após isso, o seu banco de dados em Postgres estará funcionando, e você pode
iniciar a API usando o comando `yarn dev`.

## Gerenciando o banco de dados

Há alguns comandos básicos no `package.json` que te ajuda a gerenciar o banco de dados, elas são:

- `yarn typeorm`: É o comando básico, você pode utilizar ele para realizar operações mais complexas com o Typeorm.
- `yarn migration`: Roda as migrações que estiverem pendentes.
- `yarn add-migration NOME_DA_MIGRAÇÃO`: Pode ser utilizado para criar novas migrações a partir da detecção da diferença do que há nas entidades e do que há no banco de dados que está conectado a API.
