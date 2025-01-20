# Initial Setup

## Requirements

- Install [uv](https://docs.astral.sh/uv/getting-started/installation/) for development


## Setup

1. Clone the repository
2. Install the dependencies

```bash
uv venv
uv install
```

3. Create a `.env` file in the root directory and add the following environment variables

```bash
MONGO_URI=your mongodb connection uri
DB_NAME=your mongodb database name
```

# Run Server

```bash
uv run manage.py runserver
```

# Run Tests

```bash
uv run manage.py test
```