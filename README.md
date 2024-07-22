
# Mapbox Polygon Editor

## About

Mapbox Polygon Editor is a web application that allows users to interact with a Mapbox map to create, edit, and manage polygons. Users can add points to create a polygon, name the polygon, and edit its points and name. The application includes a Node.js backend with Express to handle data storage and retrieval, using PostgreSQL as the database.

## Features

- View and navigate the Mapbox map.
- Add a minimum of 3 points on the map to create a polygon.
- Save and name polygons.
- Edit previously created polygons by moving points and changing the name.
- Clear all points during creation/editing.
- Retrieve a list of all created polygons.
- Generate a sharable link to view polygons created in the current session.

## Technologies Used

- **Frontend**: React, Mapbox GL Javascript
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Others**: Redis (for caching), Jest (for unit testing)

## Getting Started

### Prerequisites

- Node.js
- npm
- PostgreSQL

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/OzairK/fullStackMapping.git
   cd mapbox-project
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables:**

   Create a `.env` file in the `backend` directory with the following contents:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
   ```

5. **Set up PostgreSQL database:**

   - Create a PostgreSQL database named `your_db_name`.
   - Update the `.env` file with your database credentials.

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend server:**
   ```bash
   cd frontend
   npm start
   ```

Alternatively, you can use `concurrently` to start both servers simultaneously:

1. **Install `concurrently` if not already installed:**
   ```bash
   npm install -g concurrently
   ```

2. **Start both servers:**
   ```bash
   npm start
   ```

This command will start the frontend on port 3000 and the backend on port 5000.

### Usage

- Open your browser and navigate to `http://localhost:3000`.
- Use the map interface to add points and create polygons.
- Save, edit, and manage polygons as needed.

