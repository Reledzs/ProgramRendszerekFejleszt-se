#!/bin/bash

GRAYLOG_URL="http://localhost:9000"
USER="admin"
PASS="megoldas"

INPUT_PAYLOAD='{
  "title": "Docker GELF Input",
  "configuration": {
    "recv_buffer_size": 262144,
    "bind_address": "0.0.0.0",
    "port": 12201,
    "decompress_size_limit": 8388608
  },
  "type": "org.graylog2.inputs.gelf.udp.GELFUDPInput",
  "global": true
}'

echo "Várakozás a Graylog elindulására..."

until curl -s -u "$USER:$PASS" "$GRAYLOG_URL/api/system/cluster/node" > /dev/null; do
  echo "Graylog még töltődik... (5mp)"
  sleep 5
done

echo "Graylog elérhető! Input ellenőrzése..."

EXISTING_INPUTS=$(curl -s -u "$USER:$PASS" -H "Content-Type: application/json" "$GRAYLOG_URL/api/system/inputs")

if echo "$EXISTING_INPUTS" | grep -q '"port":12201'; then
  echo "Az Input Port 12201 már létezik."
else
  curl -s -X POST -u "$USER:$PASS" \
    -H "Content-Type: application/json" \
    -H "X-Requested-By: cli" \
    -d "$INPUT_PAYLOAD" \
    "$GRAYLOG_URL/api/system/inputs"
  echo -e " Input sikeresen létrehozva!"
fi