# Pixel Truth 🖼️🔍

**Pixel Truth** is a modern AI-powered web app that detects the likelihood of an image being a deepfake. Using the Hive AI detection API, it analyzes uploaded images and provides a detailed probability score—helping users understand the authenticity of visual content.

🔗 [Live Demo](https://pixeltruth.netlify.app/)

## ✨ Features

- 📤 Upload any image to analyze
- 📊 See deepfake probability in percentage
- 🧠 Powered by Hive AI's deepfake detection model
- 💡 Informational section to educate users about deepfakes
- 🎨 Beautiful and responsive UI with a focus on user experience
- 🌙 Dark mode support for comfortable viewing
- 📱 Fully responsive design for all devices

## 🚀 Technologies Used

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express
- **AI Detection:** Hive AI
- **Deployment:** Netlify, Docker

## 🐳 Docker Setup

### Prerequisites
- Docker installed on your machine
- Git repository cloned locally

### Running with Docker

#### Option 1: Run Client and Server Separately

**Client:**
```bash
# Navigate to client directory
cd client

# Build the Docker image
docker build -t pixeltruth-client .

# Run the container
docker run -p 3000:80 pixeltruth-client
```

**Server:**
```bash
# Navigate to server directory
cd server

# Build the Docker image
docker build -t pixeltruth-server .

# Run the container
docker run -p 5000:5000 pixeltruth-server
```

#### Option 2: Using Docker Compose (recommended)

Create a `docker-compose.yml` file in the root directory with:

```yaml
version: '3'
services:
  client:
    build: ./client
    ports:
      - "3000:80"
    depends_on:
      - server
  server:
    build: ./server
    ports:
      - "5000:5000"
```

Then run:
```bash
docker-compose up
```

Visit `http://localhost:3000` in your browser to access the application.
