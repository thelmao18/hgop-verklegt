#This text documents contains the commands to assemble the docker 
#image (essentially the production environment)

#specifies the Parent docker image from which we build.
FROM node:erbium

#Sets the working directory to /code.
WORKDIR /code

#copies package.json from the source and pastes it with the same name inside the 
#image (recipe for a container) we are creating
COPY package.json package.json

#RUN sends the parameter to the default shell, so "npm install" 
#is called before the image is ready
RUN npm install

#The next two lines copy database.js and app.js from our source folder 
#into the image just like before
COPY database.js database.js

COPY app.js app.js

#When a container is initialized from this image, it will execute 
#this line when ready (run app.js).
CMD node app.js
