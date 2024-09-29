FROM node:18 as build

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18

WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/dist ./dist

EXPOSE 8081

# ENV NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register"

CMD ["npm", "run", "start:prod"]