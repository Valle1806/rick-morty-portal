# ETAPA 1: Build
FROM node:20.19.2-alpine AS build
WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./
RUN npm install

# Copiamos el código y generamos el build
COPY . .
RUN npm run build

# ETAPA 2: Ejecución
FROM node:20.19.2-alpine
WORKDIR /app

# Copiamos SOLO la carpeta de salida desde la etapa de build
COPY --from=build /app/dist/rick-morty-portal ./dist/rick-morty-portal

# Exponemos el puerto de SSR
EXPOSE 4000

CMD ["node", "dist/rick-morty-portal/server/server.mjs"]