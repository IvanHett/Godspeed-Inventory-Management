Ivan H
Project Manager
Business Analyst
Software Developer 

Malini
Security Consultant
Database Analyst

# 📦 Inventory Management System

A simple web-based inventory management system designed for small businesses to manage stock efficiently. Built using **HTML, CSS, PHP**, and **MySQL** with **XAMPP** for local development.

---

## 🚀 Features

- 🔐 **User Authentication** (Login & Registration)
- 👤 **Role-Based Access Control** (Admin & Staff)
- 📋 **Inventory CRUD** (Add, Edit, Delete, View Stock)
- 🕓 **Session Management** with automatic logout
- 🛡️ **Security Measures** (SQL Injection Protection, Password Hashing)
- 📊 **Basic Dashboard Interface** for admins and staff

---

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, Javascript
- **Backend**: PHP
- **Database**: MySQL (via XAMPP)
- **Version Control**: Git + GitHub

---

## 📂 Folder Structure

```plaintext
/Inventory-System/
│
├── index.php              # Login page
├── register.php           # Registration page
├── dashboard.php          # Role-based user dashboard
├── add_item.php           # Add inventory item
├── edit_item.php          # Edit inventory item
├── delete_item.php        # Delete inventory item
├── logout.php             # Logout and destroy session
│
├── /includes/             # Config, DB connection, functions
│   ├── db.php
│   ├── auth.php
│
├── /css/                  # Stylesheets
│   └── style.css
│
└── README.md              # Project overview
