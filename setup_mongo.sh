#setup_mongo.sh
#!/bin/bash

echo "🚀 Removing any old MongoDB repo (safe if none exists)..."
sudo rm /etc/apt/sources.list.d/mongodb-org-6.0.list

echo "🚀 Adding the stable Jammy repo instead..."
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

echo "🚀 Adding the MongoDB public key the modern way..."
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo gpg -o /etc/apt/trusted.gpg.d/mongodb.gpg --dearmor

echo "🚀 Updating local package list..."
sudo apt-get update

echo "🚀 Installing MongoDB..."
sudo apt-get install -y mongodb-org

echo "🚀 Making sure the data folder exists..."
mkdir -p ~/data/db

echo "✅ All done!"
echo "To run MongoDB, use: mongod --dbpath ~/data/db"
echo "To run your Node app, open a NEW terminal and run: npm start"


