FROM jenkins/jenkins:lts

# Root felhasználóra váltunk a telepítésekhez
USER root

# 1. Rendszer frissítése
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    
# TÖRÖLTÜK: software-properties-common

# 2. Node.js (és NPM) telepítése
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \

# 3. Python/PIP és Docker kliens telepítése
    && apt-get install -y \
    python3 \
    python3-pip \
    docker.io \
    
# 4. Ansible telepítése Python PIP segítségével
    && pip3 install ansible --break-system-packages \

# Takarítás
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    
# Ellenőrzés
    && node -v \
    && npm -v \
    && ansible --version

# Visszatérés a Jenkins felhasználóhoz
USER jenkins