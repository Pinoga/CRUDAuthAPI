# API e Front - CRUD e autenticação

## Frameworks e Tecnologias

A API é servida em `NodeJs`, com as frameworks `express` e `passportjs` e o Front é servido por uma aplicação em `ReactJs`.
Arquitetei o sistema pensando na [separação de responsabilidades](https://pt.stackoverflow.com/questions/417198/o-que-%C3%A9-separa%C3%A7%C3%A3o-de-interesses-soc-separation-of-concerns#:~:text=A%20Separa%C3%A7%C3%A3o%20de%20Responsabilidades%20%C3%A9,sejam%20respons%C3%A1veis%20por%20responsabilidades%20distintas.) e na [Arquitetura multicamada](https://pt.wikipedia.org/wiki/Arquitetura_multicamada), onde o acesso aos dados, lógica de negócio e controladores são separados, e a organização dos diretórios facilita a modularização e escalabilidade:

  <img src=https://i.imgur.com/mdEazH6.png width=400>

## Requisitos

-   [Docker Engine](https://docs.docker.com/engine/install/ubuntu/) v19.03.0+
-   [Docker Compose](https://docs.docker.com/compose/install/) v1.27.4

## Instalação

```
git clone https://github.com/Pinoga/CRUDAuthAPI.git
cd CRUDAuthAPI

#Versão de desenvolvimento
######################################################################
#Rodando a API
cd server/env.dev && sudo docker-compose -f docker-compose.dev.yml up --build

#Rodando o Front
cd ../../web/env.dev && sudo docker-compose -f docker-compose.dev.yml up --build
######################################################################


#Versão de homologação
######################################################################
#Rodando a API
cd server && sudo docker-compose -f docker-compose.prod.yml up --build

#Rodando o Front
cd ../web && sudo docker-compose -f docker-compose.prod.yml up --build
######################################################################
```

## Uso

-   Após rodar os comandos de instalação, a API estará disponível no endpoint http://localhost:${HOST_PORT}/api/users, onde `HOST_PORT` está definido no `.env`.
-   O Front de desenvolvimento, por default, se comunica com a API de desenvolvimento e o de homologação, com a de homologação. Essa lógica pode ser customizada alterando a variável de ambiente REACT_APP_API_URL do .env correspondente
-   O usuário `root@root.com` com senha `root` é criado na inicialização do servidor.
-   As portas `5432` e `HOST_PORT` devem estar livres na máquina que rodará o servidor.
-   O diretório indicado no campo `volumes` do `docker-compose.yml` (default `/tmp/db_vol_prod`), por questões de segurança, deve ser criado anteriormente à inicialização dos containeres.
-   O Front possui uma tela de login, cadastro e uma tela para atualizar os dados do usuário. A navegação é auto-explicativa

## Formato

As respostas da API são sempre do seguinte formato:

```json
{
	"error": false,
	"message": "",
	"data": {
		"payload": {
			"id": "2700df0a-4947-4d83-8dcc-c1e8b7c708d9",
			"lastName": "",
			"email": "3@root.com",
			"password": "3",
			"updatedAt": "2021-02-09T03:41:25.209Z",
			"createdAt": "2021-02-09T03:41:25.209Z",
			"firstName": null
		}
	}
}
```

Onde `message` contém a mensagem de erro, e `data.payload` é o corpo relevante da resposta, que pode ser um `array`, `objeto`, `null`, ou algum outro valor.

### 1. Recuperar usuário `/api/users/:id`

Onde `:id` é o ID do usuário

### 2. Recuperar todos usuários `/api/users`

### 3. Criar usuário `/api/users/create`

Para cadastrar um novo usuário, os seguintes parâmetros são possíveis:

-   **firstName**: Nome: `String (opcional)`
-   **lastName**: Sobrenome: `String (opcional)`
-   **email**: `String (obrigatório)`
-   **password**: `String (obrigatório)`

E devem estar obrigatoriamente dentro do campo `data` do corpo da requisição:

```json
{
	"data": {
		"email": "fernando_bizzotto@hotmail.com",
		"password": "senha"
	}
}
```

Após uma requisição bem-sucedida, os dados do usuário serão retornados no corpo da resposta.

### 4. Atualizar usuário `/api/users/update/:id`

Para atualizar um novo usuário, os seguintes parâmetros são possíveis e todos são opcionais:

-   **firstName**: Nome: `String (opcional)`
-   **lastName**: Sobrenome: `String (opcional)`
-   **email**: `String (opcional)`
-   **password**: `String (opcional)`

Exemplo:

```json
{
	"data": {}
}
```

### 5. Remover usuário `/api/users/delete/:id`

Onde `:id` é o ID do usuário

## To-do list:

-   Armazenamento da senha em hash
-   Adicao de mocks e testes automatizados com supertest
-   Mensagens mais descritivas em situações de erro interno
-   Senha não pode ser retornada na rota de pegar todos os usuários
