# Portfolio Website

This is a portfolio website built with React, Vite, and Shadcn UI for the frontend, and a Node.js/Express server for the backend.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.
This project also supports [Bun](https://bun.sh/).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/portfolio-website-main.git
   cd portfolio-website-main
   ```

2. **Install Frontend Dependencies:**
   Navigate to the root directory (`portfolio-website-main`) and run:

   ```bash
   npm install
   ```

   or if you are using Bun:

   ```bash
   bun install
   ```

3. **Install Backend Dependencies:**
   Navigate to the `server` directory and run:

   ```bash
   cd server
   npm install
   ```

### Environment Variables

The backend server requires environment variables to be set. Create a `.env` file in the `server` directory and add the following variables:

```text
GROQ_API_KEY=your_groq_api_key
GROQ_API_BASE=groq_api_base_url
GROQ_MODEL=groq_model_name
PORT=8082
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
EMAIL_RECEIVER=your_receiver_email
```

### Running the Application

1. **Start the Backend Server:**
   In the `server` directory, run:

   ```bash
   npm start
   ```

   This will start the server on the port specified in your `.env` file (default is 8082).
   For development with auto-reloading, you can use:

   ```bash
   npm run dev
   ```

2. **Start the Frontend Development Server:**
   In the root directory (`portfolio-website-main`), run:

   ```bash
   npm run dev
   ```

   or with Bun:

   ```bash
   bun run dev
   ```

   This will start the frontend application, and it will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Building for Production

To create a production build of the frontend, run the following command in the root directory:

```bash
npm run build
```

This will create a `dist` folder with the optimized and minified assets. You can then use the `preview` command to serve the built project:

```bash
npm run preview
```

## Linting

To check the code for any linting errors, run:

```bash
npm run lint
```
