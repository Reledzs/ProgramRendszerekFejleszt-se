
FROM node:lts

WORKDIR /app

COPY kliens/package*.json ./

# Globális Angular CLI telepítése
RUN npm install -g @angular/cli@19.2.0

RUN npm install --force

COPY kliens ./

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000"]
