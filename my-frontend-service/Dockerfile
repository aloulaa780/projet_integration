# Étape 1 : Construction de l'application
FROM node:20-alpine AS front

WORKDIR /app

# Copier les fichiers nécessaires
COPY package.json package-lock.json* ./
COPY tsconfig.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Désactiver ESLint et construire l'application Next.js
ENV NEXT_DISABLE_ESLINT=1
RUN npm run build

# Étape 2 : Exécution de l'application
FROM node:20-alpine

WORKDIR /app

# Copier uniquement le build et les dépendances nécessaires
COPY --from=front /app/.next .next
COPY --from=front /app/public public
COPY --from=front /app/package.json package.json
COPY --from=front /app/node_modules node_modules

# Exposer le port Next.js
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "run", "start"]
