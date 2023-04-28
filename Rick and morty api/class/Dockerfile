FROM node:15-alpine

RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm install
# Si queremos utilizar bash en la consola de docker hay que descomentar el comando:
RUN apk update && apk add bash
COPY . /app

EXPOSE 4000

#Ya funciona con este comando, el error era la altura en la que estaba el Dockerfile
#Debía de estar a la altura de class no en src, ya que solamente estaba copiando a la imagen el contenido de src, lo cual no contenía el package.json
#Esto causaba que no se pudiera correr el comando "npm start", al moverlo a class todo quedó correctamente
CMD ["npm", "start"]



