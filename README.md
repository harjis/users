How to run:

```shell script
docker-compose up
```

In other shell:
```shell script
docker-compose run backend bundle exec rake db:create
docker-compose run backend bundle exec rails db:migrate RAILS_ENV=development
```
