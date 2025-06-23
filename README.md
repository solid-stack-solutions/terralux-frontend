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
# building/running release
npm run build
node build
```
