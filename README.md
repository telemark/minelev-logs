[![Build Status](https://travis-ci.org/telemark/minelev-logs.svg?branch=master)](https://travis-ci.org/telemark/minelev-logs)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/minelev-logs.svg)](https://greenkeeper.io/)

# minelev-logs
logs service for minelev

## API

All API calls needs an Authorization header with valid jwt  

### ```PUT /loqs```

Add a new log

### ```GET /loqs/{id}```

Get a spesific log

### ```POST /logs/search```

Search logs

### ```POST /loqs/{id}/status```

Update a logs list of statuses

### ```GET /queue/next```

Get next log from queue

### ```DELETE /queue/{id}```

Deletes log from queue

### ```GET /queue/count```

Get number of logs in queue

### ```GET /stats/total```

Get stats for total of logs

### ```GET /stats/schools```

Get stats for schools

### ```GET /stats/categories```

Get stats for categories

### Related

## License

[MIT](LICENSE)

![Robohash image of minelev-logs](https://robots.kebabstudios.party/minelev-logs.png "Robohash image of minelev-logs")
