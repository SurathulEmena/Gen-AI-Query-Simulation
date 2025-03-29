# **Mini Data Query Simulation Engine**

## **Project Overview**

This project is a **mini data query simulation engine** that **translates natural language queries into pseudo-SQL statements**. It serves as a lightweight backend service to simulate the functionalities of a **Gen AI Analytics tool**.

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
node server.js
```

### **The API will be available at:**
```arduino
http://localhost:3000
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

### **2. /explain** - Explain Query Logic

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

## **API Testing Using Postman**

1.**Open Postman**

2.**Create a New Request**

- **Method:** POST

- **URL:** https://gen-ai-backend.onrender.com/query

- **Headers:**

```pgsql
Key: Content-Type    Value: application/json
```
- **Body (raw JSON):**

```json
{
  "question": "total sales for January"
}
```
3.**Click "Send"**

4.**Check the Response**

---

## **Deployment on Render**

### **1. Push Code to GitHub**
```sh
git init

git add .

git commit -m "Initial commit"

git branch -M main

git remote add origin https://github.com/yourusername/gen-ai-query-simulation.git

git push -u origin main
```

### **2. Deploy to Render**

 1. Create an account on **Render**

 2. Click **"New Web Service"** → Connect GitHub repo

 3. **Set configurations:**

  - **Runtime:** Node

  - **Build Command:** npm install

  - **Start Command:** node server.js

  - **Environment Variables:**

```ini
PORT = 3000
```
4. Click **"Deploy"**

### **3. API Base URL**
```arduino
https://gen-ai-backend.onrender.com
```

---


## **Notes**

  ✔️ The project satisfies all **technical requirements**

  ✔️ Code follows **modular structure** with **clear API routes**

  ✔️ **Error handling** implemented for invalid queries

  ✔️ **Authentication middleware** included (basic security)

  ✔️ Deployment completed on **Render with README & Postman collection**

---

## **Contact**

Contact me if there are any additional details or clarifications needed.

**Email id:** surathulemenau@gmail.com
