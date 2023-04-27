FROM node:15-alpine

RUN mkdir /app
WORKDIR /app
COPY **/package.json **/package-lock.json ./
RUN npm install
COPY . /app
CMD ["npm", "start"]

#Queremos abrir una terminal en la imagen de docker para ver el directorio
# docker run --rm -it --entrypoint bash <image-name-or-id>

# docker exec -it 3148b73a4286c04405d2502e872ebfd3ca597958a5d87519e33bdb493201ea58 /bin/bash
