function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType,
  search,
  setSearch,
  onClear
}) {
  return (
    <div className="filter-panel">

      <div className="search-box">

        <span>
          🔍
        </span>

        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      <select
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(
            e.target.value
          )
        }
      >

        <option value="All">
          All Categories
        </option>

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

      <select
        value={selectedType}
        onChange={(e) =>
          setSelectedType(
            e.target.value
          )
        }
      >

        <option value="All">
          All Types
        </option>

        <option value="Expense">
          Expenses
        </option>

        <option value="Income">
          Income
        </option>

      </select>

      <button
        className="clear-btn"
        onClick={onClear}
      >
        Clear
      </button>

    </div>
  );
}

export default CategoryFilter;