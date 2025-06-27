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

## Development

```sh
### building/running release
npm run build
# run with port env var (on linux, needs different syntax on windows)
PORT=4173 node build
```
