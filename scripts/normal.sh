#!/usr/bin/env sh
k6 run src/test.multipleDAuth.js -c cnf/normal.json --compatibility-mode=base --no-thresholds
