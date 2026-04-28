# ---------- Estágio 1: Build ----------
FROM node:20-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Copia apenas arquivos de dependência primeiro (melhora cache)
COPY package.json package-lock.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Gera build de produção (Vite -> dist/)
RUN npm run build


# ---------- Estágio 2: NGINX ----------
FROM nginx:stable-alpine

# Remove configuração padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia build do estágio anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe porta 80
EXPOSE 80

# Inicia nginx
CMD ["nginx", "-g", "daemon off;"]