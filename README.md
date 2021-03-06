[![Build Status](https://travis-ci.org/telemark/minelev-logs.svg?branch=master)](https://travis-ci.org/telemark/minelev-logs)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# minelev-logs

logs service for minelev

## API

All API calls needs an Authorization header with valid jwt  

### ```PUT /loqs```

Add a new log

### ```GET /loqs/:id```

Get a spesific log

### ```DELETE /loqs/:id```

Deletes a spesific log

### ```POST /logs/search```

Search logs

### ```POST /loqs/:id/status```

Update a logs list of statuses

### ```GET /queue/next```

Get next log from queue

### ```DELETE /queue/:id```

Deletes log from queue

### ```GET /queue/count```

Get number of logs in queue

### ```GET /classes/:schoolId```

Get all classes for schoolId

### ```GET /ping```

Pong!

## Development

You'll need the [now-cli](https://zeit.co/now) installed

- clone the repo
- install dependencies
- add a `.env` file
- start the service with now-dev ```$ now dev```

.env

```
NODE_ENV=development
MONGODB_CONNECTION=connection-to-a-mongodb-compatible-api
MONGODB_COLLECTION=logs
MONGODB_NAME=minelev
JWT_SECRET=whatever-you-want
PAPERTRAIL_HOST=does-not-matter-in-dev-mode
PAPERTRAIL_PORT=does-not-matter-in-dev-mode
PAPERTRAIL_HOSTNAME=does-not-matter-in-dev-mode
```

## Deploy

This service is created to run on the [ZEIT/Now](https://zeit.co/now) serverless infrastructure.

Make sure the settings in [now.json](now.json) matches your environment.

Run the deploy script.

```
$ npm run deploy
```

or to deploy the demo version

```
$ npm run deploy-demo
```

### Related

- [minelev-web](https://github.com/telemark/minelev-web) web frontend for MinElev
- [minelev-buddy](https://github.com/telemark/minelev-buddy) buddy service for MinElev
- [minelev-tjommi-api](https://github.com/telemark/minelev-tjommi-api) buddy compatible api for MinElev
- [minelev-notifications](https://github.com/telemark/minelev-notifications) notifications service for MinElev
- [minelev-leder](https://github.com/telemark/minelev-leder) web frontend for MinElev - school administration
- [minelev-logs-stats](https://github.com/telemark/minelev-logs-stats) statistics service for MinElev logs
- [minelev-dashboard](https://github.com/telemark/minelev-dashboard) dashboard for MinElev

## License

[MIT](LICENSE)
