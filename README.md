## Backend Engineer Technical Assessment

## Setup the app on .env file 

add port number
PORT=
HACKER_NEWS_URL=https://hacker-news.firebaseio.com/v0


## Dependencies
npm i --save @nestjs/config

npm i --save-dev @types/lodash

npm i --save @nestjs/axios axios

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Missing edge case
Top 10 most occurring words in titles of the last 600 stories of users with at least 10.000 karma 
from the response return from the service, karma field was remove, as such there was no way to take care of this edge case, 
## 


