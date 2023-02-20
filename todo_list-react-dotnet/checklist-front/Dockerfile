FROM node:16-alpine as build
WORKDIR /app
EXPOSE 80

COPY checklist-front/. .
RUN yarn install
RUN yarn build

FROM nginx:1.21.0-alpine as final
COPY --from=build /app/build /usr/share/nginx/html
COPY checklist-front/nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
