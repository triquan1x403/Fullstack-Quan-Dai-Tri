# Technologies Stack

<p  align="center">
<a  href="https://www.typescriptlang.org/"  target="blank"><img  src="https://img.icons8.com/?size=100&id=uJM6fQYqDaZK&format=png&color=000000"  height="60"  alt="Typescript Logo" /></a>
<a  href="https://expressjs.com/"  target="blank"><img  src="https://img.icons8.com/?size=100&id=PZQVBAxaueDJ&format=png&color=000000"  height="60"  alt="Express Logo" /></a>
<a  href="https://www.postgresql.org/"  target="blank"><img  src="https://img.icons8.com/?size=100&id=38561&format=png&color=000000"  height="60"  alt="PostgreSQL Logo" /></a>
<a  href="https://prettier.io/"  target="blank"><img  src="https://prettier.io/icon.png"  height="60"  alt="Prettier Logo" /></a>
<a  href="https://eslint.org/"  target="blank"><img  src="https://img.icons8.com/?size=100&id=RBnCyho7WRn7&format=png&color=000000"  height="60"  alt="ESLint Logo" /></a>
<a  href="https://commitlint.js.org/"  target="blank"><img  src="https://commitlint.js.org/assets/icon.png"  height="60"  alt="Commitlint Logo" /></a>
<a  href="https://docs.docker.com/"  target="blank"><img  src="https://img.icons8.com/?size=100&id=Wln8Z3PcXanx&format=png&color=000000"  height="60"  alt="Docker Logo" /></a>
<a  href="https://typicode.github.io/husky/get-started.html"  target="blank"><img  src="https://img.icons8.com/?size=100&id=121204&format=png&color=000000"  height="60"  alt="Husky Logo" /></a>
<a  href="https://zod.dev/"  target="blank"><img  src="https://zod.dev/logo.svg"  height="60"  alt="Zod Logo" /></a>
<a  href="https://jwt.io/"  target="blank"><img  src="https://jwt.io/img/pic_logo.svg"  height="55"  alt="Jwt Logo" /></a>
<a  href="https://swagger.io/docs/"  target="blank"><img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Swagger-logo.png/150px-Swagger-logo.png"  height="60"  alt="Swagger Logo" /></a>
<a  href="https://www.prisma.io/docs/orm"  target="blank"><img  src="https://img.icons8.com/?size=100&id=aqb9SdV9P8oC&format=png&color=000000"  height="60"  alt="Prisma Logo" /></a>
<a  href="https://zenstack.dev/docs/welcome"  target="blank"><img  src="https://zenstack.dev/img/logo.png"  height="60"  alt="Zenstack Logo" /></a>
</p>

# Table Of Contents

- Source API
  - [Table Of Content](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/README.md#table-of-contents)
  - [Getting Started](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/README.md#getting-started)
    - [Prerequisites](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/README.md#prerequisites)
    - [Installation](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/README.md#installation)
  - [What's in the box?](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/README.md#whats-in-the-box-)
    - [Typescript](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/README.md#typescript)
    - [ExpressJS](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/README.md#expressjs)
    - [Docker Compose](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/README.md#docker-compose)
    - [Migration Database](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/README.md#migration-database)
    - [Convention](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/README.md#conventions)
    - [Swagger](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/README.md#swagger-api-documents)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them :

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [Docker](https://www.docker.com/) or [Docker Toolbox](https://github.com/docker-archive/toolbox/releases)
- [NVM](https://github.com/nvm-sh/nvm) (Optional)

  > NVM is **Node Version Manager**, You should only install **NVM** if your **Node.js** version is lower or higher than the current **Node.js** version of the repository.

### Installation

1. Clone The Git Repository

```bash
  # For HTTPS
  git clone https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri.git

  # For SSH
  git clone git@github.com:triquan1x403/Fullstack-Quan-Dai-Tri.git
```

2. Go Into The Project Directory

```bash
  cd src/problem5
```

3. Checkout Working Branch

```bash
  # Checkout to develop first
  git checkout develop

  # From develop checkout to your feature branch
  git checkout <branch>
```

4. Install Dependencies

```bash
  # For NPM
  npm install

  # For YARN
  yarn
```

5. Copy File Environment

```bash
  cp .env.example .env
```

6. Create Docker Images And Launch Them

```bash
  # For the first built
  docker compose up -d --build

  # For an already built image
  docker compose up -d
```

7. Down Docker Containers

```bash
  docker compose down

  # For removing the volumes
  docker compose down -v
```

8. Run Repository

```bash
  # Without host reload
  # For NPM
  npm run start || npm start

  # For YARN
  yarn start

  # With host reload
  # For NPM
  npm run start:dev

  # For YARN
  yarn start:dev

```

# What's In The Box ?

Regarding the content here, I only intend to provide a brief overview of the technologies that will be or are currently used in this source. Additionally, I will include reputable sources for further reference if you wish to gain a deeper understanding of them, along with basic commands to interact with these technologies.

## TypeScript

It's an open-source programming language developed by Microsoft, built on top of JavaScript. TypeScript adds static typing features to JavaScript, allowing developers to define data types for variables, functions, and other data structures in their code. This helps catch errors during the compilation process, improving code maintainability and readability.

### Features

1. **Static Typing**: TypeScript allows you to define data types for variables and function parameters, helping to catch errors at compile time.

2. **Support for OOP (Object-Oriented Programming)**: TypeScript supports OOP concepts such as classes, interfaces, inheritance, and abstraction.

3. **JavaScript Compatibility**: Any valid JavaScript code is also valid TypeScript code. You can use existing JavaScript libraries without issues.

4. **Support for ES6 and ES7**: TypeScript supports new JavaScript features like async/await, arrow functions, and destructuring.

5. **Powerful Development Tools**: TypeScript integrates well with various IDEs and code editors, providing features like code completion, error checking, and type suggestions.

> [TypeScript](https://www.typescriptlang.org/docs/) has become a popular tool in web application development, especially for large and complex projects, thanks to its ability to improve code quality and developer experience.

## Express.js

[Express.js](https://expressjs.com/) is a web application framework for Node.js, designed for building web applications and APIs quickly and easily. It is one of the most popular frameworks in the Node.js community, thanks to its flexibility and high performance.

### Features

1. **Minimalistic and Lightweight**: Express.js is very lightweight and has a simple structure, allowing you to build applications with minimal code.

2. **Middleware**: Express.js uses middleware, enabling you to add processing functions for requests and responses. This helps separate application functionalities and manage processing flows easily.

3. **Routing**: Express.js provides a powerful routing system that allows you to manage and handle requests from clients to specific application endpoints easily.

4. **Easy Integration with Other Technologies**: Express.js can be easily integrated with other libraries and technologies like MongoDB, Passport (for authentication), and many others.

5. **Support for HTTP Methods**: Express.js allows you to handle various HTTP methods such as GET, POST, PUT, DELETE, and more, making it easy to build RESTful APIs.

6. **Large Community and Rich Documentation**: With a large community and extensive documentation, you can easily find guides, examples, and support while working with Express.js.

## Docker Compose

In this repository, we use docker compose to build image. This could be make us easy to setup database,...etc.

### Commands

1. Check That All Container Are Ready Up

```bash
  docker compose ps
```

2. Start Docker

```bash
  docker compose start
```

3. Restart Docker

```bash
  docker compose start
```

4. Stop Docker

```bash
  docker compose stop
```

5. Delete All Containers

```bash
  docker rm $(docker ps -aq)
```

6. Delete All Images

```bash
  docker rmi $(docker images -q)
```

7. Remove All Volumes

```bash
  docker volume prune
```

8. How To Get A Docker Container's IP Address From The Host ?

```bash
  docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container>

  docker inspect $(docker ps -f name=<service> -q) | grep IPAddress
```

## Migration Database

### Packages

#### Prisma

- Prisma is an open-source database toolkit that simplifies database management and access in applications. It provides an easy-to-use ORM (Object-Relational Mapping) for working with databases, allowing developers to interact with databases using JavaScript/TypeScript code. Prisma supports various databases like PostgreSQL, MySQL, SQLite, and SQL Server, and offers features like type safety, auto-completion, migrations, and query optimization. It is commonly used in modern web development to streamline database workflows and enhance development productivity.
- Configuration files: schema.prisma
- For more configuration options and details, see the configuration [documents](https://www.prisma.io/docs/orm).

#### Zenstack

- ZenStack is an open-source tool that optimizes full-stack application development, especially with Prisma because **it was be built on top Prisma**. It provides a data access layer, supports defining business logic on data models, automatically generates APIs, and integrates access control, simplifying and securing the data workflow.
- Configuration files: schema.zmodel
- For more configuration options and details, see the configuration [documents](https://zenstack.dev/docs/quick-start/backend).

### Commands

1. To Check Zenstack Schema Is Valid Or Not

```bash
  # For NPM
  npm run schema:check

  # For YARN
  yarn schema:check
```

2. To Format Zenstack Schema

```bash
  # For NPM
  npm run schema:format

  # For YARN
  yarn schema:format
```

3. To Generate Prisma Schema File

```bash
  # For NPM
  npm run schema:generate

  # For YARN
  yarn schema:generate
```

4. To Reset Schema

```bash
  # For NPM
  npm run schema:reset

  # For YARN
  yarn schema:reset
```

> **⚠️** Be cautious when using this command. It will reset all data and tables in the database. Do not run this command unless you have backed up your data.

5. To Generate Migration File

```bash
  # For NPM
  npm run migration:generate "<name>"

  # For YARN
  yarn migration:generate "<name>"
```

6. To check which migration files have not been applied to the database.

```bash
  # For NPM
  npm run migration:status

  # For YARN
  yarn migration:status
```

7. To Run Migration To Database

```bash
  # For NPM
  npm run migration:dev   # For Development
  npm run migration:prod  # For Production

  # For YARN
  yarn migration:dev   # For Development
  yarn migration:prod  # For Production
```

> **⚠️** Prisma does not support rolling back migrations, so you should create a new migration to override the tables or columns you want to change.

## Conventions

By convention here, I am referring to the naming conventions for branches, structure, as well as commit messages in Git. This will ensure consistency in the development of the application.
<br/>

### Libraries

#### Husky

- It's a package that helps you create git hooks easily.
- Configuration folder: [.husky](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/.husky)
- For more configuration options and details, see the configuration [documents](https://typicode.github.io/husky/)

<hr/>

#### Commitlint

- It'll checks if your commit messages meet the conventional commit format.
- Configuration file: [commitlint.config.mjs](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/commitlint.config.mjs)
- For more configuration options and details, see the configuration [documents](https://commitlint.js.org/guides/getting-started.html)

<hr/>

#### Lint-staged

- It's a Node.js script that allows you to run arbitrary scripts against currently staged files.
- Configuration file: [.lintstagedrc](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/.lintstagedrc)
- For more configuration options and details, see the configuration [documents](https://www.npmjs.com/package/lint-staged/)

<hr/>

#### Eslint

- It's a fully plugin-capable tool for identifying and reporting on patterns in JavaScript.
- Configuration file: [eslint.config.mjs](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/eslint.config.mjs)
- For more configuration options and details, see the configuration [documents](https://eslint.org/docs/latest/)

<hr/>

#### Prettier

- It's an opinionated code formatter.
- Configuration file: [.prettierrc.mjs](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/.prettierrc.mjs)
- Ignore file: [.prettierignore](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/.gitignore)
- For more configuration options and details, see the configuration [documents](https://prettier.io/docs/en/)

<hr/>

#### Cspell (Code Spell Checker)

- It is an open-source library used to check spelling in your source code and documentation. It helps detect spelling errors in variable names, string literals, and other content to ensure professionalism and consistency in the code.
- Configuration file: [.cspell.json](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/.cspell.json)
- For more configuration options and details, see the configuration [documents](https://cspell.org/)

<hr/>

### Branches

```bash
  # To ensure you need to checkout to develop branch
  git checkout develop

  git checkout -b <types>/<details>
```

> Types must follow this format: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test, hotfix, opt, init, bug, deploy, setup

### Commit Message

```bash
  # To ensure whole edited files will be moved to staging area
  git add .

  # For normal message with convention (scope is optional)
  git commit -m "<types>(scope?): <message>"

  # For remove double-check in husky and lint-staged
  git commit -m "<types>(scope?): <message> --no-verify"
```

### Folders

```bash
  # Create folder names should always be in plural form
  mkdir ./src/<folder>

  # Example
  mkdir ./src/modules
```

### Files

```bash
  # Create file names should include a suffix after a period
  touch ./src/<folder>/<file>

  # Example
  touch ./src/modules/example.module.ts
```

## Swagger (API Documents)

It is a tool and software suite that helps design, build, document, and standardize APIs (Application Programming Interfaces). Swagger provides an easy way to create and maintain API documentation in an interactive manner, helping developers and API consumers understand how to use and integrate with the service.

Just references [this](https://editor.swagger.io/) to know more how to define a route in swagger document.

Configuration file: [swagger.document.yml](https://github.com/triquan1x403/Fullstack-Quan-Dai-Tri/blob/master/src/problem5/src/documents/swagger.document.yml)
