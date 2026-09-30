import {
  useEffect,
  useMemo,
  useState
} from "react";

import ExpenseForm
  from "./components/ExpenseForm";

import SummaryCards
  from "./components/SummaryCards";

import ExpenseTable
  from "./components/ExpenseTable";

import CategoryFilter
  from "./components/CategoryFilter";

import Charts
  from "./components/Charts";

const initialTransactions = [
  {
    id: 1,
    type: "Expense",
    title: "Groceries",
    amount: 2500,
    category: "Food",
    date: "2026-09-03",
    note: "Monthly groceries"
  },
  {
    id: 2,
    type: "Expense",
    title: "Internet Bill",
    amount: 899,
    category: "Bills",
    date: "2026-09-05",
    note: "Monthly internet bill"
  },
  {
    id: 3,
    type: "Income",
    title: "Freelance Work",
    amount: 8000,
    category: "Freelance",
    date: "2026-09-07",
    note: "Freelance project"
  },
  {
    id: 4,
    type: "Expense",
    title: "Bus & Metro",
    amount: 1200,
    category: "Transport",
    date: "2026-09-10",
    note: "Transportation"
  },
  {
    id: 5,
    type: "Expense",
    title: "Movie",
    amount: 600,
    category: "Entertainment",
    date: "2026-09-12",
    note: "Weekend movie"
  }
];

function ExpenseDashboard() {
  const [
    transactions,
    setTransactions
  ] = useState(() => {
    const saved =
      localStorage.getItem(
        "expenseTrackerData"
      );

    return saved
      ? JSON.parse(saved)
      : initialTransactions;
  });

  const [
    selectedCategory,
    setSelectedCategory
  ] = useState("All");

  const [
    selectedType,
    setSelectedType
  ] = useState("All");

  const [
    search,
    setSearch
  ] = useState("");

  const [
    selectedMonth,
    setSelectedMonth
  ] = useState("2026-09");

  const categories = [
    "Food",
    "Bills",
    "Transport",
    "Entertainment",
    "Shopping",
    "Health",
    "Education",
    "Salary",
    "Freelance",
    "Other"
  ];

  useEffect(() => {
    localStorage.setItem(
      "expenseTrackerData",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const addTransaction = (
    transactionData
  ) => {
    const newTransaction = {
      ...transactionData,
      id: Date.now()
    };

    setTransactions(
      (previous) => [
        newTransaction,
        ...previous
      ]
    );
  };

  const deleteTransaction = (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this transaction?"
      );

    if (!confirmed) {
      return;
    }

    setTransactions(
      (previous) =>
        previous.filter(
          (transaction) =>
            transaction.id !== id
        )
    );
  };

  const filteredTransactions =
    useMemo(() => {
      return transactions.filter(
        (transaction) => {
          const categoryMatch =
            selectedCategory ===
              "All" ||
            transaction.category ===
              selectedCategory;

          const typeMatch =
            selectedType === "All" ||
            transaction.type ===
              selectedType;

          const monthMatch =
            !selectedMonth ||
            transaction.date.startsWith(
              selectedMonth
            );

          const searchText =
            search.toLowerCase();

          const searchMatch =
            transaction.title
              .toLowerCase()
              .includes(searchText) ||
            transaction.category
              .toLowerCase()
              .includes(searchText) ||
            transaction.note
              .toLowerCase()
              .includes(searchText);

          return (
            categoryMatch &&
            typeMatch &&
            monthMatch &&
            searchMatch
          );
        }
      );
    }, [
      transactions,
      selectedCategory,
      selectedType,
      selectedMonth,
      search
    ]);

  const monthlyTransactions =
    useMemo(() => {
      return transactions.filter(
        (transaction) =>
          transaction.date.startsWith(
            selectedMonth
          )
      );
    }, [
      transactions,
      selectedMonth
    ]);

  const totalIncome =
    monthlyTransactions
      .filter(
        (transaction) =>
          transaction.type ===
          "Income"
      )
      .reduce(
        (total, transaction) =>
          total +
          Number(
            transaction.amount
          ),
        0
      );

  const totalExpense =
    monthlyTransactions
      .filter(
        (transaction) =>
          transaction.type ===
          "Expense"
      )
      .reduce(
        (total, transaction) =>
          total +
          Number(
            transaction.amount
          ),
        0
      );

  const balance =
    totalIncome - totalExpense;

  const exportCSV = () => {
    if (
      filteredTransactions.length ===
      0
    ) {
      alert(
        "There is no data to export."
      );

      return;
    }

    const headers = [
      "Title",
      "Type",
      "Amount",
      "Category",
      "Date",
      "Note"
    ];

    const rows =
      filteredTransactions.map(
        (transaction) => [
          transaction.title,
          transaction.type,
          transaction.amount,
          transaction.category,
          transaction.date,
          transaction.note
        ]
      );

    const csvContent = [
      headers,
      ...rows
    ]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(
                value
              ).replace(
                /"/g,
                '""'
              )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob =
      new Blob(
        [csvContent],
        {
          type:
            "text/csv;charset=utf-8;"
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      `expense-report-${selectedMonth}.csv`;

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );

    URL.revokeObjectURL(
      url
    );
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedType("All");
    setSearch("");
  };

  return (
    <div className="app">

      <main className="container">

        <section className="hero">

          <div>

            <span className="hero-label">
              FINANCIAL OVERVIEW
            </span>

            <h1>
              Expense Dashboard
            </h1>

            <p>
              Track your income, expenses
              and spending habits in
              one place.
            </p>

          </div>

          <div className="hero-actions">

            <div className="hero-month">

              <span>
                Current Balance
              </span>

              <strong>
                ₹
                {balance.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

          </div>

        </section>

        <div className="dashboard-toolbar">

          <div className="month-selector">

            <span>
              Month
            </span>

            <input
              type="month"
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(
                  e.target.value
                )
              }
            />

          </div>

          <button
            className="export-btn"
            onClick={exportCSV}
          >
            ↓ Export CSV
          </button>

        </div>

        <SummaryCards
          income={totalIncome}
          expense={totalExpense}
          balance={balance}
          count={
            monthlyTransactions.length
          }
        />

        <section className="content-grid">

          <div className="form-section">

            <ExpenseForm
              categories={categories}
              onAdd={addTransaction}
            />

          </div>

          <div className="chart-section">

            <Charts
              transactions={
                monthlyTransactions
              }
            />

          </div>

        </section>

        <section className="transactions-section">

          <div className="section-heading">

            <div>

              <h2>
                Transactions
              </h2>

              <p>
                Manage your income and
                expenses
              </p>

            </div>

            <span className="transaction-count">
              {
                filteredTransactions.length
              }{" "}
              records
            </span>

          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={
              selectedCategory
            }
            setSelectedCategory={
              setSelectedCategory
            }
            selectedType={
              selectedType
            }
            setSelectedType={
              setSelectedType
            }
            search={search}
            setSearch={setSearch}
            onClear={clearFilters}
          />

          <ExpenseTable
            transactions={
              filteredTransactions
            }
            onDelete={
              deleteTransaction
            }
          />

        </section>

      </main>

      <footer className="footer">
        © 2026 MoneyTrack ·
        React Expense Tracker
      </footer>

    </div>
  );
}

export default ExpenseDashboard;