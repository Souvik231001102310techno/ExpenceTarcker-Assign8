import { useState } from "react";

function ExpenseForm({
  categories,
  onAdd
}) {
  const [
    formData,
    setFormData
  ] = useState({
    type: "Expense",
    title: "",
    amount: "",
    category: "Food",
    date: new Date()
      .toISOString()
      .split("T")[0],
    note: ""
  });

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError(
        "Transaction title is required."
      );

      return;
    }

    if (
      !formData.amount ||
      Number(formData.amount) <= 0
    ) {
      setError(
        "Please enter a valid amount."
      );

      return;
    }

    if (!formData.date) {
      setError(
        "Transaction date is required."
      );

      return;
    }

    onAdd({
      ...formData,
      amount: Number(
        formData.amount
      )
    });

    setFormData({
      type: "Expense",
      title: "",
      amount: "",
      category: "Food",
      date: new Date()
        .toISOString()
        .split("T")[0],
      note: ""
    });

    setError("");
  };

  return (
    <div className="form-card">

      <div className="card-title">

        <div className="card-title-icon">
          +
        </div>

        <div>
          <h2>
            Add Transaction
          </h2>

          <p>
            Record a new income or expense
          </p>
        </div>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="type-switch">

          <button
            type="button"
            className={
              formData.type ===
              "Expense"
                ? "type-btn active expense-type"
                : "type-btn"
            }
            onClick={() =>
              setFormData({
                ...formData,
                type: "Expense"
              })
            }
          >
            Expense
          </button>

          <button
            type="button"
            className={
              formData.type ===
              "Income"
                ? "type-btn active income-type"
                : "type-btn"
            }
            onClick={() =>
              setFormData({
                ...formData,
                type: "Income"
              })
            }
          >
            Income
          </button>

        </div>

        <div className="form-group">

          <label>
            Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="e.g. Grocery shopping"
            value={formData.title}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>
            Amount
          </label>

          <div className="amount-input">

            <span>
              ₹
            </span>

            <input
              type="number"
              name="amount"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={
                formData.amount
              }
              onChange={handleChange}
            />

          </div>

        </div>

        <div className="form-row">

          <div className="form-group">

            <label>
              Category
            </label>

            <select
              name="category"
              value={
                formData.category
              }
              onChange={handleChange}
            >

              {categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                )
              )}

            </select>

          </div>

          <div className="form-group">

            <label>
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

          </div>

        </div>

        <div className="form-group">

          <label>
            Note
          </label>

          <textarea
            name="note"
            rows="3"
            placeholder="Optional note..."
            value={formData.note}
            onChange={handleChange}
          />

        </div>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="add-btn"
        >
          + Add Transaction
        </button>

      </form>

    </div>
  );
}

export default ExpenseForm;