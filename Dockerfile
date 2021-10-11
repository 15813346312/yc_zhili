FROM nginx
COPY dist/ /sub/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf