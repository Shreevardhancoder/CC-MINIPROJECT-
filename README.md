# 🧠 Function Execution API

A cloud-native mini platform for executing code snippets inside isolated containers using Docker. This project is built as part of the **Cloud Computing Mini Project (Week 1)**.

## 📌 Project Overview

The Function Execution API allows users to:
- Submit code in different languages (Python, JavaScript)
- Run it securely inside containers
- Store function metadata in a MySQL database
- Retrieve logs and output
- Extend support for other runtimes (future)

---

## ✅ Week 1 Deliverables

- Backend using **Node.js + Express**
- Sequelize setup with **MySQL**
- Docker containers for **Python** and **JavaScript**
- Docker-based function execution (`executeFunction.js`)
- API routes for:
  - Adding a function
  - Executing a function
  - Fetching all functions
  - Deleting a function
- `curl` tested endpoints

---

## ⚙️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MySQL, Sequelize ORM
- **Containerization:** Docker
- **Runtimes Supported:** Python, JavaScript
- **Execution Engine:** Docker CLI with custom wrapper

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Shreevardhancoder/CC-MINIPROJECT-.git
cd CC-MINIPROJECT-/function-execution-api2
