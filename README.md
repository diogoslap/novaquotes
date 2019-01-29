# The project

This is a study project where it receives Post requests from Slack Commands and store in database.

The stack of this project is:

- Node.js (10.15 usage)
- Express.js
- Postgresql 11
- Slack Commands

## Creating Slack commands

You can follow the oficial api [documentation](https://api.slack.com) from Slack to build, but another alternative is the link.

https://scotch.io/tutorials/create-a-custom-slack-slash-command-with-nodejs-and-express

Important thing, when you create the slack command, don't forget to check the option: "Escape channels, users, and links sent to your app". E.g of command on slack:

``
/mycustomcommand my message by: @<author>
``

Also, you need to create an external url for you API, so you can use heroku, aws, digital ocean and whatever you want, because it's a require from Slack command.

Put this url after you up the project:

http://myhost-name/ - (Your slack commands must request the index - '/')

## Install project

First all, install nodejs in your machine or in your host.

You need to set the API_TOKEN of your Slack App. Create a environment variable:

``
API_TOKEN=1238ahfsodifju123
``

After that, install and start your project:

``
npm install && npm start
``

To see your quotes, access your address: http://myhost-name/quotes

## Using Docker

To use docker in your local machine, open the file docker-compose.yml and edit all variables such user, password, database and API_TOKEN.

You need docker installed and docker-compose.

To start local environment with docker, execute:

``
docker-compose up -d
``

It will start on port 3000, if you prefer another port, change the docker-compose.yml before you up the containers.

## Template view

I developed another project just to show the quotes with a template. It was made with ReactJs.

Check the repository: https://github.com/diogoslap/client-novaquotes


