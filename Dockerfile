# Alegem imaginea de bază
FROM node:18

# Setăm directorul de lucru în container
WORKDIR /app

# Copiem fișierele necesare
COPY package.json package-lock.json ./
RUN npm install

# Copiem restul fișierelor aplicației
COPY . .

# Setăm portul pe care rulează aplicația
EXPOSE 3000

# Pornim aplicația
CMD ["npm", "start"]
