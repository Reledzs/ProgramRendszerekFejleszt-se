#!/bin/bash

/usr/sbin/sshd -D &

/usr/sbin/rsyslogd -n &

tail -f /dev/null