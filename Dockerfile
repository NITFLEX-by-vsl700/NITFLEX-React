# DEV ################################################
FROM node:20-alpine3.17 as dev
EXPOSE 3000

# Copy the project to the image
WORKDIR /usr/src
COPY . .

# Install dependencies and build the project in the image
RUN npm install

ENTRYPOINT [ "npm", "start" ]

# PROD ###############################################
FROM node:20-alpine3.17 as prod
EXPOSE 3000

# Copy the project to the image (from the build stage)
WORKDIR /usr/src
COPY --from=dev /usr/src .

# Build the project
RUN npm run build
RUN npm install -g serve

ENTRYPOINT [ "serve", "-s", "build" ]
