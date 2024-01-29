FROM node:18-alpine as test-target
ENV NODE_ENV=development
ENV PATH $PATH:/usr/src/dashboard-deploy/node_modules/.bin

RUN apk --no-cache add git
WORKDIR /usr/src/dashboard-deploy

RUN git clone https://github.com/nohaxito/dashboard-deploy.git .


COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm with npm
RUN npm install -g pnpm

# # CI and release builds should use npm ci to fully respect the lockfile.
# # Local development may use npm install for opportunistic package updates.
# ARG npm_install_command=ci
# RUN pnpm $npm_install_command

COPY . .

# Build
FROM test-target as build-target
ENV NODE_ENV=production

# Use build tools, installed as development packages, to produce a release build.
RUN pnpm run build

# Reduce installed packages to production-only.
RUN pnpm prune --production

# Archive
FROM node:18-alpine as archive-target
ENV NODE_ENV=production
ENV PATH $PATH:/usr/src/dashboard-deploy/node_modules/.bin

WORKDIR /usr/src/dashboard-deploy

# Include only the release build and production packages.
COPY --from=build-target /usr/src/dashboard-deploy/node_modules node_modules
COPY --from=build-target /usr/src/dashboard-deploy/.next .next
CMD ["next", "start"]