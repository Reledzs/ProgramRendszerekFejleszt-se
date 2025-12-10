# Használjunk LTS Node verziót
FROM node:lts

# Munka könyvtár a konténeren belül
WORKDIR /app

# Csak a package.json és package-lock.json másolása (cache kihasználásához)
COPY kliens/package*.json ./

# Globális Angular CLI telepítése
RUN npm install -g @angular/cli@19.2.0

# Telepítés npm optional dependency problémák kezelésével
RUN npm install --force

# Projekt fájlok másolása
COPY kliens ./

# Port megnyitása az Angular szerverhez
EXPOSE 4200

# Angular dev szerver futtatása konténer indításakor
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000"]
