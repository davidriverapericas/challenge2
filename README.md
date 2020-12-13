# Node.js APP - Game of Life (challenge #2)
A Game of Life nodejs App coded in Node.js and dockerized

This version of the Game of Life, created in nodejs has been created as a challenge for Habitissimo.

## Installation

I have packed the Game of Life app in a docker. In order to run up the docker you just have to execute the below command on the console:
```bash
docker-compose up
```

The docker will be mounted and execute, and so the Game of Life will be started inmediatly. The Game of Life will display something like this on the console:
```bash
node-docker-challenge2 | --------------------------------------------------------------
node-docker-challenge2 | Current tick: 35
node-docker-challenge2 | 000 |  ██         ███   ██  23220000000133310233
node-docker-challenge2 | 001 | █ █        █   █  ██  36320000001356531233
node-docker-challenge2 | 002 | ██        █           23210000013567642122
node-docker-challenge2 | 003 |           █    █      22100000012445432000
node-docker-challenge2 | 004 |            █          00000000012322221000
node-docker-challenge2 | 005 |                       00000000000000000000
node-docker-challenge2 | 006 |                       00000000000000000000
node-docker-challenge2 | 007 |                       00001110000122100000
node-docker-challenge2 | 008 |      █                00124220000111100000
node-docker-challenge2 | 009 |    ███                01223220000122100000
node-docker-challenge2 | 010 |   ██ █                12234320000000000000
node-docker-challenge2 | 011 |  ██                   22312120000000000000
node-docker-challenge2 | 012 |  █ █ █                22434342211000000000
node-docker-challenge2 | 013 |   █      ██           12344544533100000000
node-docker-challenge2 | 014 |   █       █           01344655443200000000
node-docker-challenge2 | 015 |     ██                00123346675410000000
node-docker-challenge2 | 016 |        ███  █         00001243334431000000
node-docker-challenge2 | 017 |        █    █         00000022545432000000
node-docker-challenge2 | 018 |         ██  █         00000011325532000000
node-docker-challenge2 | 019 |          ███          00000000223221000000
node-docker-challenge2 | ----------------------------------------------
node-docker-challenge2 | Area: 20x20
node-docker-challenge2 | Alive: 50
node-docker-challenge2 | Will survive: 50, Will dead: 0, Will resurrect: 0
```

## Development

### Node.js
Install the Javascript runtine [node.js](https://nodejs.org/es/download/package-manager/). The installation process of this package depends on the host environment, so read the documentation carefully. For example, for Ubuntu 18, the process is really simple:

```bash
sudo apt update
sudo apt install nodejs
sudo apt install npm
```


### Dependences
Install all dependencies of the app with:

```bash
npm install
```
### Running the app
You can start updating the nodejs code and start playing while checking the updated results in the docker with:
```bash
docker run -it -v $(pwd):/app node-docker-challenge2
```
or you can execute on your local environment with:
```bash
npm run start
```

### Testing
Several Tests have been developed to check that all code works properly:
 - Functions with test cases
 - Expected results due the game rules

All the tests have been coded at /test/life.test.js. In order to execute these tests and check that all works fine, execute:
```bash
npm run test
```

Remember:
 - Before coding any new feature, code the test.
 - After coding, execute the complete set of tests.
 - Enjoy it!
## License
[MIT](https://choosealicense.com/licenses/mit/)