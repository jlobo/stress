FROM loadimpact/k6

USER root
RUN apk add --no-cache curl && apk add --no-cache nano
WORKDIR /test
COPY ["scripts", "/test"]
COPY ["configs", "/test/cnf"]
COPY ["dist", "/test/src"]

ENTRYPOINT ["sh"]
