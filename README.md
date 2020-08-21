How to run:

```shell script
docker-compose up
```

In other shell:
```shell script
docker-compose run backend bundle exec rake db:setup
```

Navigate to `localhost:80` with browser

How to reset db:
```shell script
docker-compose run backend bundle exec rake db:reset
```
