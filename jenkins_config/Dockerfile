FROM jenkins/jenkins:lts

USER root

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    docker.io \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install ansible --break-system-packages

RUN ansible --version
RUN docker --version
