FROM node:16-alpine as build
WORKDIR /app
EXPOSE 3000

COPY ["checklist-front/package.json", "."]
COPY ["checklist-front/yarn.lock", "."]
RUN yarn install

COPY checklist-front/. .
RUN yarn build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
