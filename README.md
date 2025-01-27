


# PC Builder Project

  

A full-stack PC builder app that recommends computer builds based on a user's budget and performance tier. A curated list of parts are saved in a SQL PostGres Database. ChatGPT API is used to assemble the pc build based on the budget, performance tier target and parts list provided from the database. After generating a PC build, the contents are then displayed and can be further searched via Google/Amazon.

  

This is a personal project of mine and therefore developed to run locally.

  

## Tech Stack

- Backend: Node.js, Express.js, PostgreSQL, OpenAI GPT API

- Frontend: React, TailwindCSS, Axios, Lucide-react

---  

## Installation

  

### Clone the Repository

```bash
git  clone  https://github.com/harriszia/pc-builder.git

cd  pcbuilder
```

  

### Backend Setup
1. **Install Node.js and npm**: [Download here](https://nodejs.org/).
---
2.  **Download and Install PostgreSQL**:
- Visit the [PostgreSQL Downloads page](https://www.postgresql.org/download/) and choose the version for your operating system.

- Follow the installation instructions for your platform:

-  **Windows**: Use the PostgreSQL installer and select `pgAdmin` during installation.

-  **Mac**: Install via [Homebrew](https://brew.sh/):

	```bash
	brew install postgresql
	```

-  **Linux**: Use your package manager (e.g., `apt` for Ubuntu):

	```bash
	sudo apt update
	sudo apt install postgresql postgresql-contrib
	```

  ---

3.  **Start PostgreSQL Server:**

-  **Windows/macOS**: PostgreSQL typically starts automatically after installation (pgAdmin).

-  **Linux**: Start the PostgreSQL service manually:

	```bash
	sudo service postgresql start
	```

 --- 
4.  **Verify Installation:**
Open a terminal and run:
	```bash
	psql --version
	```
---
5. **Install Dependencies:**
	 ```bash
	 cd pcbuilder\pc-builder-backend #Move to the backend directory
	 npm install
	 ```

---
6.  **Create and Initialize the Database**

	Create a Database:
	```bash
	psql -U <username> -c "CREATE DATABASE pc_builder;"
	```
	Replace `<username>` with the PostgreSQL username you set during installation 	(commonly 	`postgres`).

	Navigate to your backend `db/` folder and execute the setup and seed files to initalize db.
	 ```bash
	 cd db
	psql -U <username> -d pc_builder -f setup.sql
	psql -U <username> -d pc_builder -f seed.sql
	```
	Verify Database Initialization: You can list all tables to confirm the schema:
	```bash
	\dt
	```
	#### Optional Section: pgAdmin Steps
	If someone prefers pgAdmin over `psql` commands:
	1.  Open pgAdmin and connect to your PostgreSQL instance.
	2.  Create a new database called `pc_builder`.
	3.  Use the Query Tool to run the SQL files:
	    -   Open `setup.sql` and run its contents.
	    -   Open `seed.sql` and run its contents.

---
7. **Create a `.env` file:**
	Copy the `.env.example` file and update the values:
	```bash
	cp .env.example .env
	```
	
8. **Start your backend server:**
	Move back to pc_builder_backend directory and start server
	```bash
	cd ../pc_builder_backend
	npm start
	```

### Frontend Setup

1. **Install Dependencies:**
	In a new terminal move to your frontend directory and install packages
	```bash
	cd ../pcbuilder/pc_builder_frontend
	npm install
	```
2. **Run frontend development server:**
	```bash
	npm start
	```
3. **Access the frontend:**
	If your browser hasn't already opened a new tab, navigate to the following:
	```bash
	http://localhost:3000
	```

	You should now be able to interact with the web app, enter a budget (usually between 1,000 and 3,000). Select a target performance tier and click *Generate build*. After making the GPT api call, the frontend should display the parts. You can track the data flow through the backend cli's console logs. 

