Below is a comprehensive "how-to-build-docker-app" guide that we used for our birthday-reminder-app. This guide outlines the process from setting up your Node.js application through creating a Docker image, testing it locally, and preparing it for deployment.

---

## Step 1: Set Up the Node.js Application

1. **Create a Project Directory:**
   ```bash
   mkdir birthday-reminder-app
   cd birthday-reminder-app
   ```

2. **Initialize a Node.js Project:**
   ```bash
   npm init -y
   ```

3. **Install Dependencies:**
   For our example, we used Express. You can install it (and body-parser if needed) as follows:
   ```bash
   npm install express
   ```
   *(Note: For Express versions 4.16 and later, you can use the built-in JSON parser instead of the external body-parser.)*

4. **Create the Application File:**
   Create a file named `index.js` with the following content:
   ```javascript
   const express = require('express');
   const app = express();
   const PORT = process.env.PORT || 30001;

   // Use Express's built-in JSON parser
   app.use(express.json());

   // In-memory storage for demonstration
   let birthdays = [];

   // Default route for a welcome message
   app.get('/', (req, res) => {
     res.send('Welcome to the Automated Birthday Reminder App!');
   });

   // Endpoint to get all birthday entries
   app.get('/birthdays', (req, res) => {
     res.json(birthdays);
   });

   // Endpoint to create a new birthday entry
   app.post('/birthdays', (req, res) => {
     const { name, date } = req.body;
     if (!name || !date) {
       return res.status(400).json({ error: 'Name and date are required.' });
     }
     const entry = { id: birthdays.length + 1, name, date };
     birthdays.push(entry);
     res.status(201).json(entry);
   });

   // Endpoint to simulate reminder processing
   app.get('/check-reminders', (req, res) => {
     res.json({ message: 'Reminder checked. Notifications sent if any birthdays are near.' });
   });

   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });
   ```
   This code creates an Express-based web API that can add, view, and simulate birthday reminders.

---

## Step 2: Create the Dockerfile

1. **Create a File Named `Dockerfile`:**

   In the root of your project directory, create a file called `Dockerfile` with the following content:
   ```Dockerfile
   # Use an official Node.js runtime as a parent image
   FROM node:16-alpine

   # Set the working directory in the container
   WORKDIR /usr/src/app

   # Copy package files and install dependencies
   COPY package*.json ./
   RUN npm install --production

   # Copy the rest of the application source code
   COPY . .

   # Expose the port the app is listening on
   EXPOSE 30001

   # Define the command to run the app
   CMD [ "node", "index.js" ]
   ```

2. **Explanation:**
   - **FROM node:16-alpine:** A lightweight Node.js image.
   - **WORKDIR:** Sets the working directory inside the container.
   - **COPY & RUN:** Copies the package files, installs production dependencies, then copies the remaining source code.
   - **EXPOSE 30001:** Exposes port 30001 (which our app uses).
   - **CMD:** Runs the application.

---

## Step 3: Build and Test the Docker Image Locally

1. **Build the Docker Image:**
   In your terminal, run:
   ```bash
   docker build -t birthday-reminder-app .
   ```

2. **Run the Container Locally:**
   To test the image on your local machine, run:
   ```bash
   docker run -p 30001:30001 birthday-reminder-app
   ```
   This maps container port 30001 to your host’s port 30001. Open your browser to [http://localhost:30001](http://localhost:30001) and you should see the welcome message.

---

## Step 4: Tag and Push the Docker Image to a Registry

Since we are using DigitalOcean Container Registry (named `ttadeo`):

1. **Tag the Image:**
   ```bash
   docker tag birthday-reminder-app registry.digitalocean.com/ttadeo/birthday-reminder-app:latest
   ```

2. **Push the Image:**
   ```bash
   docker push registry.digitalocean.com/ttadeo/birthday-reminder-app:latest
   ```
   The output should confirm that each layer is successfully pushed and display the image digest.

---

## Final Notes

- **Local Testing:**  
  Before deploying to Kubernetes, ensure your container runs correctly locally using `docker run`.

- **Image Consistency:**  
  By pushing your image to the registry, you guarantee that the exact same image will be used during Kubernetes deployment.

- **Next Steps:**  
  Once your Docker image is verified and pushed, you'll integrate it into your Kubernetes manifests (Deployment, Service, HPA) and deploy them to your DigitalOcean Kubernetes cluster.

This guide covers the complete process of building, containerizing, and pushing your Node.js application as a Docker image. Later, these steps serve as the foundation before you deploy your image to a cloud Kubernetes environment.

