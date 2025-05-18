# ProgramRendszerekFejleszt-se
Beadandó feladat - Autóbérlés szolgáltató platform

A Dockerfile MongoDB image-t indít, ami a 27017es Porton fut!

Adatbázis indítási parancs:
a dockerfile helyéről kiadni:
server-mappájában
docker run -d -p 6000:27017 -v ../database:/data/db --name my-mongo mongo

Frontend
A client/src/index.html-t ng serve-el futtatni

Server
server/index.ts futtatása

Admin felhasználó:
admin@admin.com
pw: asdasd
user@user.com
pw: asdasd