FROM python:3.12.11-alpine3.22

WORKDIR /app

RUN apk add --no-cache \
    build-base \
    mariadb-dev \
    gcc \
    musl-dev \
    libffi-dev \
    openssl-dev \
    pkgconfig \
    cython \
    py3-numpy \
    py3-scipy \
    py3-pip

RUN pip install --upgrade pip setuptools wheel

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Collect static files and migrate DB (optional at entrypoint)
RUN python manage.py collectstatic --noinput

EXPOSE 7999

CMD ["gunicorn", "--bind", "0.0.0.0:7999", "myst_backend.wsgi:application"]