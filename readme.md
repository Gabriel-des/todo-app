# Todo‑App Full Stack

Este projeto é um **sistema de tarefas (To‑Do List)** completo, desenvolvendo o backend com **Laravel 10+** (API REST protegida por JWT) e o frontend com **AngularJS 1.6**, empacotados via Docker Compose para facilitar o desenvolvimento.

## Estrutura do Repositório

O repositório está organizado da seguinte forma:

```
todo-app/
├── backend/              # Código Laravel (API)
│   ├── app/              # Pastas do Laravel
│   ├── Dockerfile        # Imagem PHP 8.2 + Composer
│   ├── artisan
│   ├── composer.json
│   └── .env.example
├── frontend/             # Aplicação AngularJS + Tailwind
│   ├── index.html        # SPA principal
│   ├── app.js            # Configuração do AngularJS
│   ├── services/         # Serviços (authentication, task, header)
│   ├── controllers/      # Controladores
│   ├── views/            # Templates HTML (login, register, tasks, shared/header)
│   ├── package.json      # Configuração NPM (Tailwind opcional)
│   └── tsconfig.json     # (se usar TypeScript)
├── docker-compose.yml    # Orquestra containers: backend, database e frontend
└── README.md             # Este arquivo
```

## Configuração com Docker Compose

Para iniciar todo o ambiente, basta executar no diretório raiz do projeto:

```bash
docker compose up -d
```

Isso criará e iniciará três containers:

- **db**: um MySQL configurado com usuário `todo_user` e banco `todo_db`.
- **backend**: imagem Laravel/PHP servindo a API na porta `8000`.
- **frontend**: servidor Nginx que serve os arquivos estáticos na porta `5500`.

### Ajuste do .env do Backend

Antes de rodar a migração, copie o arquivo de exemplo:

```bash
cp backend/.env.example backend/.env
```

Edite `backend/.env` para garantir que as configurações de banco apontem para o serviço Docker:

```
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=todo
DB_USERNAME=todo
DB_PASSWORD=secret
JWT_SECRET=
```

O campo `JWT_SECRET` será gerado automaticamente.

### Instalando Dependências e Migrando o Banco

Entre no shell do container do backend e execute os comandos:

```bash
docker compose run --rm backend bash
composer install --no-interaction --prefer-dist
php artisan key:generate
php artisan jwt:secret
php artisan migrate --seed
exit
```

Após isso, a API estará disponível em `http://localhost:8000/api`.

### Preparando o Frontend

O container frontend está configurado para servir diretamente o conteúdo estático. No entanto, se você adicionar dependências localmente (por exemplo, Tailwind ou pacotes npm), entre no container e instale:

```bash
cd frontend
npm install
npm run build
exit
```

Em seguida, acesse no navegador `http://localhost:8080` para usar a aplicação AngularJS.

## Testes e Verificação

Para garantir que tudo funcione, você pode rodar os testes do Laravel:

```bash
docker compose exec backend bash
php artisan test
```

E, no frontend, verifique o console do navegador e as requisições de API, garantindo que não haja erros de carregamento de templates.

## Pronto para Usar

Com os containers em execução, cadastre um usuário via POST em `/api/auth/register`, faça login em `/api/auth/login` e comece a gerenciar suas tarefas na interface AngularJS.

Qualquer dúvida sobre a configuração ou execução, consulte este documento ou volte na nossa conversa para detalhes adicionais.

