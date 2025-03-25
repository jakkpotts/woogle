# Woogle Deployment Guide

This guide outlines the steps to deploy the Woogle application to an Nginx server at the path `/woogle`.

## Prerequisites

- Access to your server via SSH
- Nginx installed on your server
- Ability to modify Nginx configuration

## Deployment Steps

### 1. Build the Application Locally

```bash
# Navigate to the project directory
cd /path/to/woogle

# Install dependencies (if needed)
npm install

# Build the application
npm run build
```

### 2. Transfer Files to Server

Use SCP, SFTP, or another file transfer method to copy the generated `out` directory to your server:

```bash
# Example using SCP
scp -r out/* user@your-server:/var/www/mobilewireless.tech/woogle/
```

### 3. Configure Nginx

1. Copy the provided Nginx configuration to your server:

```bash
scp woogle-nginx.conf user@your-server:/etc/nginx/sites-available/woogle-nginx.conf
```

2. If you already have a configuration for mobilewireless.tech, modify it instead to include the `/woogle` location block:

```
location /woogle {
    alias /var/www/mobilewireless.tech/woogle;
    index index.html;
    try_files $uri $uri/ /woogle/index.html;

    # Enable browser caching for static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
    }
}
```

3. Test and apply the Nginx configuration:

```bash
# Test configuration
sudo nginx -t

# Reload Nginx if the test is successful
sudo systemctl reload nginx
```

### 4. Set Proper Permissions

Ensure that Nginx can read the files:

```bash
sudo chown -R www-data:www-data /var/www/mobilewireless.tech/woogle
sudo chmod -R 755 /var/www/mobilewireless.tech/woogle
```

### 5. Verify Deployment

Visit https://mobilewireless.tech/woogle in your browser to confirm that the application is properly deployed.

## Troubleshooting

- If you see a 404 error, check that the directory path in your Nginx configuration matches where you uploaded the files.
- If you see a blank page, check the browser console for error messages which might indicate missing assets.
- If you see CORS errors, you might need to add appropriate headers in the Nginx configuration.

## Notes for Next.js Static Export

Since this app uses Next.js static export (`output: 'export'` in next.config.ts), all pages are pre-rendered as static HTML. Server-side features like API routes will not work without additional setup.

For static exports, you may need to adjust page links to include the base path `/woogle` if they're not working correctly. 