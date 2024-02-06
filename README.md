# Hotelbea

## Project structure

```

├── client
│   ├── src
│   ├── Dockerfile
│   ├── **/*
├── server
│   ├── src
│   ├── test
│   ├── Dockerfile
│   ├── **/*
├── docker-compose.yml
├── README.md
└── .gitignore
```

## frameworks used

1. Server

   - Expressjs - http + server
   - Prisma - ORM for postgres
   - Morgan + Winston - logging
   - jest - testing

2. Client
   - Reactjs - SPA framework
   - MUI - Ui and design library
   - moment + dayjs - datetime utils and adapter
   - React router - Browser routers

The project is completely built on typescript.
To start the server, navigate to the root of the folder with the `docker-compose.yml` file and run:

```
docker compose up --build
```

once both the backend and frontend servers have booted up, on a browser go to `localhost:3000` to access the UI
the UI will have an empty screen as there is no data in the db yet.

I have added a `setup.sql` which can be run on the db to populate the initial data, to do so connect to the postgres db using the connection url

```
postgresql://myuser:mypassword@localhost:5435/hoteldb?schema=public
```

### assumptions and areas missed

- missed responsive page designs
- UI test not included
- a unique device id is generated on first visit, this acts like a session and the bookings are stored against this deviceId. This is a makeshift attempt to browser fingerprinting.
