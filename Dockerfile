FROM nginx
ARG BUILD_DIR
COPY ./${BUILD_DIR} /usr/share/nginx/html