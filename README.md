# Instructions

create `.env` file with recommended values like `.env.example`
and Run below Command:

> npm i

> npm run db:create

> npm run db:migrate

> npm run test

then Start Server using below command:
> npm start

## My Assumptions

* I assumed That The user will login and once he logged in, he cannot go to login/register page again
* The username is unique for login
* The database host will have the production and test databases

## How to reuse

* we will just copy `service` folder contents and use it but the server must has ServerError class
  and password utilizations so we need to copy `util` folder content as well.
* copy `views` folder contents
* configure your controllers to render the right view for each request.
* we must install `jsonwebtoken` package
* we must use sequelize with its initialized configuration using `sequelize init` command
