# How to set-up FastAPI server

This guide will walk you through setting up and running a FastAPI application with Python 3.10.8.

## Prerequisites

- [Python 3.10.8](https://www.python.org/downloads/release/python-3108/)
- [Pip](https://pip.pypa.io/en/stable/installation/)
- [Uvicorn](https://www.uvicorn.org/)

## Setup

### 1. Clone the Repository

```bash
git clone link will add later
cd 
```

### 2. Create a Virtual Environment

```bash
# On Windows
python -m venv venv

# On macOS and Linux
python3 -m venv venv
```

### 3. Activate the Virtual Environment

```bash
# On Windows
venv\Scripts\activate

# On macOS and Linux
source venv/bin/activate
```

### 4. Install Required Packages

```bash
pip install -r requirements.txt
```

## Running the Application

### 1. Start the Uvicorn Server

Assuming your FastAPI application is in a file named `main.py`, you can start the Uvicorn server with the following command:

```bash
uvicorn main:app --reload
```

Replace `main` with the name of your FastAPI app and `app` with the instance name of your FastAPI application if they are named differently.

The `--reload` option is used for development, which will automatically reload the server when you make code changes. For production, you should remove `--reload`.

### 2. Access the Application

Your FastAPI application should now be running. You can access it in your web browser or using an API client, usually at `http://localhost:8000`.

## Application Structure

The documentation for FastAPI is avaliable on `http://localhost:8000/docs` and `http://localhost:8000/redoc`.