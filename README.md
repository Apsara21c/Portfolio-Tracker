

This project is a full-stack application designed to help users track their investment portfolios. It features a React frontend, a Node.js backend, and a MongoDB database.

**Technologies Used**

- **Frontend**: React with Vite for fast development and bundling.
- **Backend**: Node.js with Express for building RESTful APIs.
- **Database**: MongoDB for storing user and portfolio data.
- **API Testing**: Postman for testing and documenting APIs.

**Assumptions and Limitations**

- **Assumptions**:
  - Node.js and MongoDB are installed on your machine.
  - You have a MongoDB Atlas account or a local MongoDB instance running.

**Steps to Run the Project Locally**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Apsara21c/Portfolio-Tracker.git
   cd Portfolio-Tracker
   ```
2. **Set Up the Backend**:
   - Navigate to the backend directory:
     
     cd project
     cd server
     ```
   - Install dependencies:
     
     npm install
     ```
   - Create a `.env` file and add your MongoDB URI:
     ```
     MONGODB_URI=mongodb://0.0.0.0:27017/portfolio-tracker
     PORT=5000
     VITE_API_KEY=your-api-key-here
     ```
   - Start the server:
     
     node server.js
     ```
3. **Set Up the Frontend**:
   - Navigate to the frontend directory:
     ```bash
     cd ../project
     ```
   - Install dependencies:
    
     npm install
     ```
   - Start the development server:
     
     npm run dev
     ```
   - Open `http://localhost:5173` in your browser to access the application.

**Links**

- **Deployed Application**: https://sensational-granita-1cc8c8.netlify.app/

**License**

This project is licensed under the MIT License.

**Contact**

For any questions or feedback, please contact [apsarac21cs@psnacet.edu.in].

This README provides a concise overview of setting up and running the project locally, along with assumptions and links to the deployed application.
