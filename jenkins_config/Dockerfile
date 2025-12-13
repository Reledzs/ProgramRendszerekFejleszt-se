FROM jenkins/jenkins:lts

USER root

RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \

    && apt-get install -y \
    python3 \
    python3-pip \
    docker.io \

    && pip3 install ansible --break-system-packages \

    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    
    && node -v \
    && npm -v \
    && ansible --version

USER jenkins