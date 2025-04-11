# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 30001

CMD ["node", "index.js"]
