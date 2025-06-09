FROM python:3.13.4-alpine3.22

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

EXPOSE 7999

CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn myst_backend.wsgi:application --bind 0.0.0.0:7999"]