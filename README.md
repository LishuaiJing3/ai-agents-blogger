# ai-agents-blogger
Use AI agents to write cooperative bloggers 

## backend buid on render

### using poetry to deploy 
build command: 

bash -c 'export POETRY_HOME=/tmp/poetry && wget -qO- https://install.python-poetry.org | python - --version 2.0.1 && export PATH="/tmp/poetry/bin:$PATH" && poetry --version && poetry install'


start command: 

poetry run uvicorn ai_agents_blogger_backend.main:app --host 0.0.0.0 --port $PORT