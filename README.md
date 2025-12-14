# Felhő és DevOps alapok gyak projekt munka

docker compose up

Elindulnak docker környezetben a következő alkalmazások:
mongodb szerver
nodejs deploy server
jenkins: user:admin pw:admin
nginx 
prometheus http://localhost:9090/
grafana http://localhost:3000/ Admin admin1
elasticsearch
graylog http://localhost:9000/ admin password


A jenkinsben a CD-pipeline telepíti ki a nodejs deploy serverre magát az alkalmazást.
Amely a localhoston lesz elérhető.

Az weboldal felhasználók:
admin@admin.com
pw:asdasd
user@user.com
pw:asdasd

Bemutató videó: 