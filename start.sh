#!/bin/bash

/usr/sbin/sshd -D &

/usr/sbin/rsyslogd -n &

su deploy -c "pm2 start /app/server.js --name node-app --log-date-format 'YYYY-MM-DD HH:mm:ss.SSS'"

tail -f /dev/null