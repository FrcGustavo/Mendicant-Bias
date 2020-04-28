# Blog - API

This is the API for my blog

## Config the enviroment variables
Before the start, your must config enviroment variables

#### Intructions:
- Copy the file '.env.example'
- Change the name '.env.example' to '.env'
- open file and complete the variables

Example
```
  PORT=8080
  DB_USER=user
  DB_PASSWORD=password
  DB_HOST=localhost
  DB_NAME=blog
```

## Start

Install dependencies
```bash
npm install
```

Run development mode
```bash
npm run dev
```

Run test and coverage
```bash
npm run test
npm run cover
```

Run production mode
```bash
npm start
```

Run linter and auto fix files
```bash
npm run lint
npm run lint -- --fix
```