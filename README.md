# ArkanoidJS [![Build Status](https://travis-ci.org/bastilimbach/ArkanoidJS.svg?branch=master)](https://travis-ci.org/bastilimbach/ArkanoidJS)
> :warning: This is a work in progress project! It may not represent the finished product or work at all.

ArkanoidJS is the result of a college project with the subject of trying to recreate retro games in modern JavaScript.

## Try it out
- On the project website: [https://sebastianlimbach.com/ArkanoidJS](https://sebastianlimbach.com/ArkanoidJS)

- Using the [docker image](https://hub.docker.com/r/bastilimbach/arkanoidjs/): `docker run -d -p 80:80 --name arkanoidjs bastilimbach/arkanoidjs`

## How to play
- Move paddle/platform: `Mouse X-axis`
- Detach ball from paddle: `Left click`
- Pause game: `ESC` `Space` `P`

## Build from source
To build this project from source you need to install [nodejs](https://nodejs.org/en/) and preferably [yarn](https://yarnpkg.com/en/).
1. Clone the project: `git clone https://github.com/bastilimbach/ArkanoidJS.git`
2. Install dependencies: `yarn install` or `npm install`
3. Start the development server: `yarn start` or `npm start`
4. Or build the files for deployment: `yarn build` or `npm run-script build` (Compiled files are located in the `dist` folder.)

## License
[MIT](https://github.com/bastilimbach/ArkanoidJS/blob/master/LICENSE) :heart:
