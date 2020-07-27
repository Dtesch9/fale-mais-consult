<br />
<p align="center">
  <a href="https://github.com/Dtesch9/GoMarketplace">
    <img src="https://github.com/Dtesch9/loldesign-show-me-the-code/blob/master/assets/logo-fale.png" alt="Logo">
  </a>
</p>
<br />

<p align="center">
  <a href="https://www.loldesign.com.br/">
    <img alt="Badge" src="https://img.shields.io/badge/Developer-Douglas%20Tesch-orange">
  </a>
  
  <a href="https://www.linkedin.com/in/douglas-tesch-00b7a518b/">
    <img alt="Badge" src="https://img.shields.io/badge/Desafio-LolDesign-%237159c1">
  </a>
</p>

## References

- [Requirements](#requirements-)
- [About the project](#about-the-project)
- [Install](#install-)
- [Run](#run-)
- [Usage Example](#usage-example)
  
## About the Project

An application that provides a mock E-Commerce place using an incredible strength of context API.

:warning: **ANDROID ONLY** :warning:

## Requirements ✋🏻

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)
- :iphone: Android emulator — [Guid to setup environment](https://docs.rocketseat.dev/ambiente-react-native/android/emulador)

## Install 🔥

**Backend**

1. Clone esse  repositorio;
2. Entre na pasta `cd loldesign-show-me-the-code/backend`;
3. Utilizando docker **Recomendado** crie uma imagem do banco mongoDB com o comando `docker run --name mongodb -p 27017:27017 -d -t mongo`. e para subir o container utilize o comando `docker start mongodb`

3.1 Rode o comando `$ yarn` ou `$ npm install` para instalar as dependências.


**Frontend**

1. Volte uma pasta (Pensando que você está no diretório backend) `cd..` depois entre em `cd frontend`.
2. Rode o comando `$ yarn` ou `$ npm install` para instalar as dependências

**Mobile**

✋🏻 ATENÇÃO: Necessário a utilização de um emulador Android como **Android Studio** ou **Genymotion**

1. Volte uma pasta (Pensando que você está no diretório backend) `cd..` depois entre em `cd mobile`.
2. Rode o comando `$ yarn` ou `$ npm install` para instalar as dependências
3. Entre na pasta `src/services/api.ts` e coloque o IP da sua máquina na url, Caso esteja utilizando Android Studio, você pode também colocar o ip: `10.0.2.2` e para o Genymotion `10.0.3.3`

## Run 🔥 

**Backend**

1. Entre na pasta `cd backend` depois rode `yarn seed:run` para preencher o banco de dados. 

1.2 No mesmo diretório rode o comando `yarn dev:server` para inicializar o backend.

1 Caso não queria utilizar um banco de dados, eu deixei pronto um backend secundário com outros patterns e outra estrutura que sem depender de um database.  
1.2 Caso tenha optado pelo backend secundário, entre no diretório `secondBackend` posteriormente rode `yarn` para instalar as dependências e depois rode `yarn dev:server` para inicializar o backend.

2. Para conferir os tests de ambos os backends, basta rodar o comando `yarn test`

**Frontend**

1. Entre na pasta `cd frontend` e depois rode `yarn dev` para inicializar o frontend (ATENÇÃO! - Deixe o backend rodando em uma outra aba)
2. Ainda na pasta `frontend` você pode conferir os Tests da aplicação com os comandos: `yarn test` para rodas os tests ou `yarn test:coverage` para ter uma melhor
visualização da cobertura dos tests. (Hint: se você entrar na pasta `coverage/lcov` e abrir o arquivo `index.html` você verá os tests no seu browser padrão.

**Mobile**

1. Entre na pasta `cd mobile` e depois rode `yarn dev` para inicializar o frontend (ATENÇÃO! - Deixe o backend rodando em uma outra aba)
2. Ainda na pasta `mobile` você pode conferir os Tests da aplicação com os comandos: `yarn test` para rodas os tests ou `yarn test:coverage` para ter uma melhor
visualização da cobertura dos tests. (Hint: se você entrar na pasta `coverage/lcov` e abrir o arquivo `index.html` você verá os tests no seu browser padrão.



## Usage Example

Mock DDDs para você verificar os preços oferecidos.

Origem Destino $/min

  011 | 016 | 1.90
  
  016 | 011 | 2.90
  
  011 | 017 | 1.70
  
  017 | 011 | 2.70
  
  011 | 018 | 0.90
  
  018 | 011 | 1.90

## Mobile

![Usage](https://github.com/Dtesch9/loldesign-show-me-the-code/blob/master/assets/fale-mais-mobile.gif)

## Web

![Usage](https://github.com/Dtesch9/loldesign-show-me-the-code/blob/master/assets/fale-mais-web.gif)


:link: [Linkedin](https://www.linkedin.com/in/douglas-tesch-00b7a518b/)
