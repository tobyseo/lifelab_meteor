# clear
sudo docker rm -f lifelab_app
sudo docker rmi -f lifelab_image

# mongo
sudo docker run -d --name lifelab_db mongo

# meteor and app
sudo docker build -t lifelab_image .
sudo docker run -d --name lifelab_app --link lifelab_db -e ROOT_URL=http://0.0.0.0 -e MONGO_URL=mongodb://lifelab_db:27017/meteor -p 80:80 lifelab_image
