FROM loadimpact/k6

USER root
RUN apk add --no-cache curl
WORKDIR /test
COPY ["dist", "/test"]

ENTRYPOINT ["k6"]
