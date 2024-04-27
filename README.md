### Installation
```bash
npm install
```

### migrate up
sometimes need to disable tls 
```bash
export NODE_TLS_REJECT_UNAUTHORIZED='0'
```

```bash
node node_modules/db-migrate/bin/db-migrate up --config database.json -e dev
```

### migrate down
```bash
node node_modules/db-migrate/bin/db-migrate down --config database.json -e dev
```
