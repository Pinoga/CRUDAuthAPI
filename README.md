# API - uaiFood

## Frameworks e Tecnologias
A API é servida por um servidor em `NodeJs`, `express` e `GraphQL`. 
Arquitetei o sistema pensando na [separação de responsabilidades](https://pt.stackoverflow.com/questions/417198/o-que-%C3%A9-separa%C3%A7%C3%A3o-de-interesses-soc-separation-of-concerns#:~:text=A%20Separa%C3%A7%C3%A3o%20de%20Responsabilidades%20%C3%A9,sejam%20respons%C3%A1veis%20por%20responsabilidades%20distintas.) e na [Arquitetura multicamada](https://pt.wikipedia.org/wiki/Arquitetura_multicamada), onde o acesso aos dados, lógica de negócio e controladores são separados:

  <img src=https://i.imgur.com/Cyk82OO.png width=400>



## Requisitos
- [Docker Engine](https://docs.docker.com/engine/install/ubuntu/) v19.03.0+
- [Docker Compose](https://docs.docker.com/compose/install/) v1.27.4

## Instalação
```
git clone https://github.com/Pinoga/uaiFood.git
cd uaiFood

//versão de desenvolvimento
sudo docker-compose up --build

//versão de produção
sudo docker-compose -f docker-compose.prod.yml up --build
```

## Uso
Após rodar os comandos de instalação, a API estará disponível no endpoint http://localhost:${HOST_PORT}/graphql, onde HOST_PORT tem como default 3000.
As requisições podem ser feitas pela interface do GraphQL, ou por um [HTTP Request](https://graphql.org/learn/serving-over-http/)
#### 1. Cadastrar Restaurante
  
  Para cadastrar um novo restaurante, os seguintes parâmetros são necessários:
  - **name**: Nome do restaurante: `String`
  - **cuisineType**: Tipo de cozinha: `String`
  - **city**: Cidade: `String`
  - **location**: Coordenadas do restaurante: `Array<longitude: Float, latitude: Float>`
  
  Opcionalmente, é possível declarar os itens do novo restaurante:
  - **items**: `Array<Item>` (definição no próximo item)
  
  Depois dos parâmetros da requisição, é possível selecionar os campos desejados, como no exemplo a seguir, onde se está selecionando **name**, **cuisineType**, **city**, **id** e **items**
  ```graphql
  mutation {
    createRestaurant(
      restaurant: {
        name: "Madero",
        cuisineType: "Hambúrguer",
        city: "São Paulo",
        items: [
          {
            name: "Cheeseburger Simples",
            cuisineType: "Hambúrguer"
            price: 49.99
          }
        ]
        location: [0, 0]
      }) {
      # Campos selecionados
      name
      cuisineType
      city
      id
      items {
        name
        cuisineType
        price
      }
    }
  }
  ```
  
#### 2. Cadastrar Item

  Para cadastrar um novo item, os seguintes parâmetros são necessários:
  - **name**: Nome do restaurante: `String` 
  - **cuisineType**: Tipo de cozinha: `String`
  - **price**: Preço do item: `Float`
  ```graphql
    mutation {
      createItem(
        item: {
          name: "Cheeseburger Complexo", 
          cuisineType: "Gourmet", 
          price: 99.99
        }, 
        restaurantId:"5ffb72919aa8b4c2e2a712ba") {
            # Campos selecionados
            name
        }
    }
  ```
  
#### 3. Atualizar Item

  Para atualizar um item, os seguintes parâmetros são necessários:
  - **restaurantId**: ID do restaurante: `String` 
  - **itemId**: ID do item: `String`
  - **newData**: Dados a serem atualizados: `Item`
  
  No caso de **newData**, o objeto obrigatoriamente deve ser passado, mas nenhum campo interno é necessário. Apenas os campos fornecidos serão usados para sobrescrever os já existentes
  ```graphql
  mutation {
    updateItem(
      restaurantId: "5ffb72919aa8b4c2e29712ba", 
      itemId: "5ffb72919aa8b4c2e29712ba", 
      newData: {}) {
        # Campos selecionados
        name
        cuisineType
        price
    }
  }
  ```
  
#### 4. Listar Restaurantes

  Para listar os restaurantes, nenhum parâmetro é necessário, porém existem 4 opcionais:
  - **city**: Cidade à qual restringir a busca: `String`
  - **distance**: Coordenadas do ponto de busca e raio, em quilômetros, ao redor do ponto `(definição a seguir)` 
  - **cuisineType**: Tipo de cozinha à qual restringir a busca: `String`
  - **itemRelated**: Termo para buscar restaurantes relacionados: `String`
    - O termo pode ser tanto um tipo de cozinha o nome de um prato
    - A busca leva em conta o radical das palavras e ignora acentos e letras maiúsculas
    
   ```graphql
      query {
        restaurants(
          city: "São Paulo", 
          distance: {
            center: [0, 0],
            radius: 3
          },
          cuisineType: "Hambúrguer",
          itemRelated: "Gourmet") {
            # Campos selecionados
            name
            city
          }
      }
  ``` 
  
  ## E agora?
  Esse projeto foi feito com muito carinho e dedicação. Com o tempo, vou incrementar o projeto e aproveitar essa jornada como fonte de aprendizado!
  
  ### To-do list:
  
    - Busca por nomes (cidade, tipo de cozinha) ser case-insensitive e normalizada
    - Mensagens customizadas para erros de parâmetros faltando do GraphQL
    - Transações no MongoDB para atomicidade das operações
    - Logs diferenciados entre DEV/PROD
    - Adicao de testes automatizados
