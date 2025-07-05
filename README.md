# Terralux Frontend

### For usage with [terralux-backend](https://github.com/solid-stack-solutions/terralux-backend), powered by [SunriseSunset.io](https://sunrisesunset.io)

## Installation

### Using [Node.js](https://nodejs.org)

```sh
# fetch the source
git clone https://github.com/solid-stack-solutions/terralux-frontend
cd terralux-frontend
# install dependencies and run
npm i
npm run dev
```

### Using [Docker](https://www.docker.com/)

```sh
# fetch source
git clone https://github.com/solid-stack-solutions/terralux-frontend
cd terralux-frontend
# build image
docker build -t terralux-frontend:latest .
# run image
docker run -p 4173:4173 terralux-frontend:latest
```

### Using [Nix Flakes](https://wiki.nixos.org/wiki/Flakes)

```sh
# option 1: fully automatic
nix run github:solid-stack-solutions/terralux-frontend
# option 2: fetch source, build and run
git clone https://github.com/solid-stack-solutions/terralux-frontend
cd terralux-frontend
nix run
```

## Local release build

```sh
# building
npm run build
# run with env vars (on linux)
NODE_ENV=production PORT=4173 node build
# (on windowss)
set NODE_ENV=production && set PORT=4173 && node build
```
