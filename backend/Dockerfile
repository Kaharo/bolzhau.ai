FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements early to cache dependencies
COPY requirements.txt .

# Copy models separately
COPY ./models ./models

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip in its own layer to avoid shell errors
RUN pip install --upgrade pip

# Install numpy first to control version
RUN pip install --no-cache-dir "numpy<2"

# Install Python dependencies
RUN pip install --no-cache-dir --timeout=100 -i https://pypi.org/simple -r requirements.txt

# Install PyTorch CPU-only version from official PyTorch index
RUN pip install --no-cache-dir torch==2.2.2+cpu -f https://download.pytorch.org/whl/torch_stable.html

# Copy the rest of the app source code
COPY . .

# Expose the default FastAPI port
EXPOSE 8000

# Start the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

