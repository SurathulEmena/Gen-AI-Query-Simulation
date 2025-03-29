const express = require("express");
const app = express();
const PORT = 5000; 

// Middleware
app.use(express.json());
app.use(require("cors")());

// Mock Database (In-Memory JSON)
const mockDatabase = {
    employees: [
        { id: 1, name: "John", hire_date: "2024-01-05", department: "Sales" },
        { id: 2, name: "Smith", hire_date: "2024-02-10", department: "Marketing" },
        { id: 3, name: "Susi", hire_date: "2023-10-09", department: "Sales" },
        { id: 4, name: "Harsha", hire_date: "2023-05-05", department: "Sales" },
        { id: 5, name: "David", hire_date: "2024-07-04", department: "Marketing" },
    ],
    sales: [
        { month: "March", revenue: 50000 },
        { month: "April", revenue: 60000 },
        { month: "May", revenue: 90000 },
        { month: "June", revenue: 30000 },
        { month: "July", revenue: 75000 }     
    ]
};

// Middleware for Simple User Authentication
app.use((req, res, next) => {
    const { username, password } = req.headers;
    if (username !== "admin" || password !== "12345") {
        return res.status(401).json({ error: "Unauthorized: Invalid credentials" });
    }
    next();
});


// Function to Convert Natural Language Query to Pseudo-SQL
const convertToPseudoSQL = (question) => {
    question = question.toLowerCase().trim();

    if (/employees.*sales/.test(question)) {
        return "SELECT * FROM employees WHERE department = 'Sales';";
    }
    if (/highest revenue/.test(question)) {
        return "SELECT month FROM sales ORDER BY revenue DESC LIMIT 1;";
    }
    if (/hired after (\d{4}-\d{2}-\d{2})/.test(question)) {
        const date = question.match(/hired after (\d{4}-\d{2}-\d{2})/)[1];
        return `SELECT * FROM employees WHERE hire_date > '${date}';`;
    }
    if (/employees|list employees/.test(question)) {
        return "SELECT * FROM employees;";
    }
    if (/sales|list sales/.test(question)) {
        return "SELECT * FROM sales;";
    }
    if (/total revenue/.test(question)) {
        return "SELECT SUM(revenue) FROM sales;";
    }
    if (/name and hire date/.test(question)) {
        return "SELECT name, hire_date FROM employees;";
    }

    return "UNKNOWN QUERY"; // Default response for unrecognized queries
};

app.post("/query", (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "Question is required" });

    const pseudoSQL = convertToPseudoSQL(question);
    let response;

    switch (pseudoSQL) {
        case "SELECT * FROM employees;":
            response = mockDatabase.employees;
            break;
        case "SELECT * FROM sales;":
            response = mockDatabase.sales;
            break;
        case "SELECT SUM(revenue) FROM sales;":
            const totalRevenue = mockDatabase.sales.reduce((sum, record) => sum + record.revenue, 0);
            response = { total_revenue: totalRevenue };
            break;
        case "SELECT name, hire_date FROM employees;":
            response = mockDatabase.employees.map(emp => ({ name: emp.name, hire_date: emp.hire_date }));
            break;
        case "SELECT * FROM employees WHERE department = 'Sales';":
            response = mockDatabase.employees.filter(emp => emp.department === "Sales");
            break;
        case "SELECT month FROM sales ORDER BY revenue DESC LIMIT 1;":
            const highestRevenueMonth = mockDatabase.sales.reduce((prev, current) => (prev.revenue > current.revenue ? prev : current), mockDatabase.sales[0]);
            response = { highest_revenue_month: highestRevenueMonth.month };
            break;
        default:
        if (pseudoSQL.startsWith("SELECT * FROM employees WHERE hire_date >")) {
            const date = pseudoSQL.match(/'(\d{4}-\d{2}-\d{2})'/)[1];
            response = mockDatabase.employees.filter(emp => emp.hire_date > date);
        } else {
            response = { error: "Unable to process the query." };
        }
    }

    res.json({ query: question, pseudoSQL, result: response });
});

// 📌 Endpoint: `/explain` - Returns Query Breakdown
app.post("/explain", (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "Question is required" });

    const pseudoSQL = convertToPseudoSQL(question);
    let explanation = "";

    switch (pseudoSQL) {
        case "SELECT * FROM employees;":
            explanation = "Fetching all employee records from the database.";
            break;
        case "SELECT * FROM sales;":
            explanation = "Fetching all sales data.";
            break;
        case "SELECT SUM(revenue) FROM sales;":
            explanation = "Calculating the total revenue from sales data.";
            break;
        case "SELECT name, hire_date FROM employees;":
            explanation = "Fetching employee names along with their hire dates.";
            break;
        case "SELECT * FROM employees WHERE department = 'Sales';":
            explanation = "Fetching employee records from the sales department.";
            break;
        case "SELECT month FROM sales ORDER BY revenue DESC LIMIT 1;":
            explanation = "Fetch the month with the highest revenue"
            break;
        default:
            // Handle dynamic hire_date queries
            const hireDateMatch = pseudoSQL.match(/SELECT \* FROM employees WHERE hire_date > '(\d{4}-\d{2}-\d{2})'/);
            if (hireDateMatch) {
                explanation = `Fetching employees hired after ${hireDateMatch[1]}.`;
            } else {
                explanation = "No valid SQL translation found.";
            }
        }
    
    res.json({ question, pseudoSQL, explanation });
});

// 📌 `/validate` - Checks Query Feasibility
app.post("/validate", (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "Question is required" });

    const pseudoSQL = convertToPseudoSQL(question);
    res.json({ question, pseudoSQL, valid: pseudoSQL !== "UNKNOWN QUERY" });
});

// Start Server
app.listen(PORT, () => {
     console.log(`Server running on http://localhost:${PORT}`);
    });
