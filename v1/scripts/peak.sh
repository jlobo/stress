#!/usr/bin/env sh
k6 run src/test.multipleDAuth.js -c cnf/peak.json --compatibility-mode=base --no-thresholds
