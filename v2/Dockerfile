FROM node:12-alpine AS base
WORKDIR /usr/src/stress

COPY package*.json ./
COPY tmp/tide-js/package*.json ../tide-js/
RUN npm rm -S tide-js --only=production && \
    npm i -S ../tide-js --only=production && \
    cd ../tide-js && \
    npm ci --only=production && \
    cd ../stress && \
    npm ci --only=production

COPY *.js ./
COPY tests tests
COPY tmp/tide-js ../tide-js

FROM node:12-alpine
COPY --from=base /usr/src /usr/src
WORKDIR /usr/src/stress
USER node
CMD [ "sh" ]
