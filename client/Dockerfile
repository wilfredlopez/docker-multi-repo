
# BUILD FACE
# Use an existing image as base
FROM node:alpine as builder

# speficy a working directory
WORKDIR /app

# Copy package.json
COPY package.json ./
# Download and install a dependency
RUN npm install
# Copy all other directories
COPY . .
# Build project
RUN npm run build


FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
## COPY BUILD TO NGINX PUBLIC FOLDER
# /app/build
COPY --from=builder /app/build /usr/share/nginx/html


# THE COMMAND WOULD BE THE DEFAULT FOR ngnx SO WE ARE NOT DEFINING IT