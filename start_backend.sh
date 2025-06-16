#!/bin/bash

PYTHON=$(which python3)

if [ -f .venv/bin/activate ]; then
  source .venv/bin/activate
fi

"$PYTHON" "backend copy/app.py"