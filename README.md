# banderole-server
[![Build Status](https://travis-ci.org/lcallarec/banderole-server.svg?branch=master)](https://travis-ci.org/lcallarec/banderole-server)
[![codecov](https://codecov.io/gh/lcallarec/banderole-server/branch/master/graph/badge.svg)](https://codecov.io/gh/lcallarec/banderole-server)

Banderole server is a monorepository that contains banderole feature-flags servers

## Usage

### Configuration banderole
```js
//Boot banderole
const banderole = require('banderole');
const banderoleServer = require('banderole-server');
const Koa = require('koa');

const featureFlags = {
    "features": {
        "switchboard": false,
        "clock": true,
        "send-slack-message-on-error": {
            "enabled": false
        }
    }
};

banderole.boot(featureFlags);

```

Start the server on port `3000`:
```js
const server = banderoleServer.http(banderole, new Koa(), 3000);
```

Request the server on `/is-enabled/:feature-name` route:
```js
const response = fetch('http://banderole.server.dev/is-enabled/clock');
console.log(response.text) //true
```