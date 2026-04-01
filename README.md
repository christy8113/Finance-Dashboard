# 💰 Finance Dashboard

A modern, responsive finance dashboard built using React and Tailwind CSS to help users track, analyze, and understand their financial activity.

---

## 📌 Overview

This project simulates a personal finance dashboard where users can:

- Monitor overall financial health
- Track income and expenses
- Analyze spending patterns
- View insights based on transaction data

The application is fully frontend-based and uses local storage for persistence.

---

## 🚀 Features

- 📊 Dashboard summary (Balance, Income, Expenses)
- 📈 Time-based chart (Spending trend)
- 🥧 Category-based chart (Expense breakdown)
- 📋 Transactions list with search
- 🔐 Role-based UI:
  - **Admin** → Add/Delete transactions
  - **Viewer** → Read-only access
- 💡 Insights section:
  - Highest spending category
  - Savings rate calculation
- 🌙 Dark mode support (with persistence)
- 📱 Responsive design (mobile + desktop)
- 💾 Local storage data persistence

---

## 🧠 Approach & Design Decisions

- Used **component-based architecture** for scalability
- Implemented **Context API** for centralized state management
- Used **Recharts** for data visualization
- Applied **Tailwind CSS** for rapid UI development and responsiveness
- Designed UI using a **card-based layout** for clarity and hierarchy
- Implemented **dark mode** using Tailwind's class strategy

---

## 🧱 Project Structure

src/
│
├── components/
│ ├── Header.js
│ ├── Dashboard.js
│ ├── TransactionsList.js
│ ├── Insights.js
│ ├── SummaryCard.js
│
├── context/
│ └── FinanceContext.js
│
├── App.js
├── index.js


---

## ⚙️ State Management

Managed using **React Context API**:

- `transactions` → financial data
- `role` → admin/viewer control
- `darkMode` → UI theme
- Functions:
  - `addTransaction`
  - `deleteTransaction`

---

## 🔐 Role-Based UI Behavior

| Role   | Permissions |
|--------|------------|
| Admin  | Add/Delete transactions |
| Viewer | Read-only access |

Role switching is simulated via dropdown in the UI.

---

## 💡 Insights Logic

- Highest expense is computed by sorting transactions
- Savings rate is calculated as:

Savings Rate = (Balance / Income) * 100


---

## 🧪 Edge Case Handling

- Empty transaction list → Displays fallback message
- No income → Savings rate defaults to 0
- Search with no results → Displays "No transactions found"

---

## 🛠 Tech Stack

- React.js
- Tailwind CSS
- Recharts
- Context API

---

## ⚙️ Setup Instructions

```bash
git clone <your-repo-link>
cd finance-dashboard
npm install
npm start
