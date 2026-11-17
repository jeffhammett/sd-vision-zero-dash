# Code generation from openapi.yaml (the single source of truth for API types).
#
#   make generate   regenerate backend + frontend types
#   make check      fail if the committed generated files are stale (for CI / pre-commit)
#
# Backend generator lives in the Python env (see backend/requirements-dev.txt).
# Override PYTHON if your env's interpreter isn't the one on PATH:
#   make generate PYTHON=/path/to/env/bin/python

PYTHON ?= python
SPEC := openapi.yaml
BACKEND_OUT := backend/entity/generated.py
FRONTEND_OUT := frontend/src/api/schema.d.ts

.PHONY: generate generate-backend generate-frontend check

generate: generate-backend generate-frontend

generate-backend: $(SPEC)
	$(PYTHON) -m datamodel_code_generator \
		--input $(SPEC) --input-file-type openapi \
		--output $(BACKEND_OUT) \
		--output-model-type pydantic_v2.BaseModel \
		--target-python-version 3.11 \
		--snake-case-field \
		--allow-population-by-field-name \
		--use-annotated \
		--use-standard-collections \
		--use-union-operator \
		--enum-field-as-literal none \
		--output-datetime-class datetime \
		--use-schema-description \
		--disable-timestamp \
		--formatters ruff-check ruff-format

generate-frontend: $(SPEC)
	cd frontend && npm run --silent generate:api

check: generate
	@if [ -n "$$(git status --porcelain -- $(BACKEND_OUT) $(FRONTEND_OUT))" ]; then \
		echo "Generated API types are out of date. Run 'make generate' and commit."; \
		git status --short -- $(BACKEND_OUT) $(FRONTEND_OUT); \
		exit 1; \
	fi
