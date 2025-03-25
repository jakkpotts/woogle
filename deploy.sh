#!/bin/bash

# Deployment script for Woogle application
# Replace these variables with your actual server information
SERVER_USER="your-username"
SERVER_HOST="your-server-ip"
SERVER_PATH="/var/www/mobilewireless.tech/woogle"
NGINX_CONFIG_PATH="/etc/nginx/sites-available/mobilewireless.tech"

# Build the application
echo "Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "Build failed. Exiting."
    exit 1
fi

# Create directory on server if it doesn't exist
echo "Ensuring target directory exists on server..."
ssh $SERVER_USER@$SERVER_HOST "mkdir -p $SERVER_PATH"

# Copy files to server
echo "Copying files to server..."
scp -r out/* $SERVER_USER@$SERVER_HOST:$SERVER_PATH/

# Upload Nginx configuration if needed (first-time setup only)
# Uncomment the following line for first-time setup
# scp woogle-nginx.conf $SERVER_USER@$SERVER_HOST:/tmp/woogle-nginx.conf

# For first-time setup, you'd need to apply the configuration
# Uncomment these lines for first-time setup
# echo "Applying Nginx configuration (first-time setup)..."
# ssh $SERVER_USER@$SERVER_HOST "sudo mv /tmp/woogle-nginx.conf $NGINX_CONFIG_PATH && sudo ln -sf $NGINX_CONFIG_PATH /etc/nginx/sites-enabled/"

# For existing setup, merge the /woogle location into existing config
# This requires manual editing or use the provided woogle-nginx.conf as reference

# Set proper permissions
echo "Setting proper permissions..."
ssh $SERVER_USER@$SERVER_HOST "sudo chown -R www-data:www-data $SERVER_PATH && sudo chmod -R 755 $SERVER_PATH"

# Reload Nginx
echo "Reloading Nginx..."
ssh $SERVER_USER@$SERVER_HOST "sudo nginx -t && sudo systemctl reload nginx"

echo "Deployment completed. Visit https://mobilewireless.tech/woogle to verify." 