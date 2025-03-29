# **Mini Data Query Simulation Engine**

## **Project Overview**

This project **Mini Data Query Simulation Engine** is developed to **translates natural language queries into pseudo-SQL statements**. It serves as a lightweight backend service to simulate the functionalities of a **Gen AI Analytics tool**.

---

## **Features**

✅ Accepts **natural language queries** via API  

✅ Converts queries into **pseudo-SQL**  

✅ Provides **mock query results** for predefined datasets  

✅ Includes **query explanation & validation** endpoints  

✅ Implements **basic error handling**  

✅ Supports **lightweight authentication**  

---


## **Tech Stack**

- **Backend:** Node.js + Express.js

- **Database:** In-memory mock data (JSON)

- **Deployment:** Render

- **API Testing:** Postman

---

## **Setup & Running Locally**

### **Clone the Repository**
```sh
git clone https://github.com/SurathulEmena/gen-ai-query-simulation.git

cd gen-ai-query-simulation
```

### **Install Dependencies**
```sh
npm install express cors
```

### **Run the Server**
```sh
node node.js
```

### **The API will be available at:**
```arduino
http://localhost:5000
```

---

## **API Endpoints**

### **1. /query** -Accept Natural Language

**Description:** Accepts a natural language query and returns a **pseudo-SQL query** along with mock results.

**Method:** POST  

**Request Body (JSON):**
```json
{
  "question": "Show the total revenue"
}
```

**Response**
```json
{
    "query": "show total revenue",

    "pseudoSQL": "SELECT SUM(revenue) FROM sales;",

    "result": {
        "total_revenue": 305000
    }
}
```

### **2. /explain** -Returns Simulated Query Breakdown

**Description:** **Returns a breakdown** of how the pseudo-SQL was generated.

**Method:** POST  

**Request Body (JSON):**
```json
{
  "question": "Which month got a highest revenue"
}
```

**Response**
```json
{
    "question": "Which month got a highest revenue",

    "pseudoSQL": "SELECT month FROM sales ORDER BY revenue DESC LIMIT 1;",

    "explanation": "Fetch the month with the highest revenue"
}
```

### **3. /validate - Check Query Feasibility**

**Description:** **Validates** whether the query can be processed based on available mock data.

**Method:** POST  

**Request Body (JSON):**
```json
{
 "question": "Show all the employees in the sales department"
}
```

**Response**
```json
{
    "question": "Show all the employees in the sales department",

    "pseudoSQL": "SELECT * FROM employees WHERE department = 'Sales';",

    "valid": true
}
```

---

## **Deployment on Render**

### **1. Push Code to GitHub**
```sh
git init

git add .

git commit -m "Initial commit"

git branch -M main

git remote add origin https://github.com/SurathulEmena/gen-ai-query-simulation.git

git push -u origin main
```

### **2. Deploy to Render**

 1. Create an account on **Render**

 2. Click **"New Web Service"** → Connect GitHub repo

 3. **Set configurations:**

  - **Runtime:** Node

  - **Build Command:** npm install express cors

  - **Start Command:** node node.js

  - **Environment Variables:**

```ini
PORT = 5000
```
4. Click **"Deploy"**

### **3. API Base URL**
```arduino
https://gen-ai-query-simulation-3.onrender.com
```

---

## **API Testing Using Postman**

1.**Open Postman**

2.**Create a New Request**

- **Method:** POST

- **URL:** https://gen-ai-query-simulation-3.onrender.com

Include the corresponding API atlast (E.g: https://gen-ai-query-simulation-3.onrender.com/query)

- **Headers:**

```pgsql
Key: Content-Type    Value: application/json

key: username        Value: admin

key: password        Value: 12345
```
The username and the password are for authentication.

- **Body (raw JSON):**

```json
{
  "question": "Show all the employees"
}
```
3.**Click "Send"**.

4.**Check the Response**.

---

## **Notes**

  ✔️ The project satisfies all **technical requirements**.

  ✔️ Code follows **modular structure** with **clear API routes**.

  ✔️ **Error handling** implemented for invalid queries.

  ✔️ **Authentication middleware** included (basic security).

  ✔️ Deployment completed on **Render with README & Postman collection**.

---

## **Contact**

Let me know if there are any additional details or clarifications needed.

**Email id:** surathulemenau@gmail.com
