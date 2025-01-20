# Setup Server in Heroku

## Requirements

- Install [uv](https://docs.astral.sh/uv/getting-started/installation/) for development
- Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)


## Config Vars

- `DB_NAME`: MongoDB Database name
- `DISABLE_COLLECTSTATIC`: Set to `1` to disable collectstatic
- `DJANGO_SETTINGS_MODULE`: `project.settings.production`
- `MONGO_URI1`: MongoDB Connection URI
- `TOKEN_KEY`: JWT Secret key


## Domains 

[Configuring DNS](https://devcenter.heroku.com/articles/custom-domains) and add the domain in `ALLOWED_HOSTS` in `project/settings/production.py`.

## Prepare Deployment

update `requirements.txt` with the latest dependencies.

```bash
uv export > requirements.txt
```

## Deploy

Merge the changes to the `product` branch and it will automatically deploy to Heroku.


## Check Logs

```bash
heroku logs -a lexiai-server -t
```

## Restart Server

```bash 
heroku restart -a lexiai-server
```