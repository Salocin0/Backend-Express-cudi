FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production || npm install --production

ARG ENV_CONTENT=""

COPY . .

RUN if [ -n "$ENV_CONTENT" ]; then printf "%s" "$ENV_CONTENT" > .env; fi

ENV NODE_ENV=production
ENV PORT = 3000

EXPOSE 3000

CMD ["node", "src/index.js"]