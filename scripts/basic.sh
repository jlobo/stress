#!/usr/bin/env sh
k6 run src/test.multipleDAuth.js --vus 1000 --duration 5m --compatibility-mode=base --no-thresholds
