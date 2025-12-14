# Felhő és DevOps alapok gyak projekt munka

docker compose file futtatásával

Elindulnak docker környezetben a következő alkalmazások:
mongodb szerver
nodejs deploy server
jenkins: user:admin pw:admin
nginx 
prometheus http://localhost:9090/
grafana http://localhost:3000/ Admin admin1
elasticsearch
graylog http://localhost:9000/ admin password

A deploy server alapból űres!!

A jenkinsben a CI-CD-pipeline telepíti ki a nodejs deploy serverre magát az alkalmazást.
Amely a localhoston lesz elérhető.
A Jenkinsfile tartalmazza a pipeline leírását!

Az weboldal felhasználók:
admin@admin.com
pw:asdasd
user@user.com
pw:asdasd


Bemutató videó: https://drive.google.com/file/d/1BKdhkagggp1NX0aHoyjLmoxPCMfyEAOw/view?usp=drive_link