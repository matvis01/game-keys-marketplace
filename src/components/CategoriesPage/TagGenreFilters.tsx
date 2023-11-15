import { useState } from "react"

interface TagGenreFiltersProps {
  items: string[]
  onCheckedItemsChange: (checkedItems: string[]) => void
}

export default function TagGenreFilters({
  items,
  onCheckedItemsChange,
}: TagGenreFiltersProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState("")

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const item = event.target.value
    let checked = [...checkedItems]
    if (event.target.checked) {
      checked.push(item)
    } else {
      checked = checked.filter((checkedItem) => checkedItem !== item)
    }
    setCheckedItems(checked)
    onCheckedItemsChange(checked)
  }

  function filterItems() {
    return items.filter((item) =>
      item.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }
  function clearFilters() {
    setCheckedItems([])
    setSearchInput("")
    onCheckedItemsChange([])
  }

  return (
    <div className="max-w-full">
      <div className="join max-w-full">
        <input
          type="text"
          placeholder="Search"
          className="input join-item input-bordered input-primary input-sm w-full bg-base-100"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <button
          className="btn btn-primary join-item btn-sm"
          onClick={clearFilters}
        >
          clear
        </button>
      </div>

      <div className="custom-scrollbar h-48 overflow-y-scroll">
        {filterItems().map((item) => (
          <label
            className="label cursor-pointer justify-start gap-1"
            key={item}
          >
            <input
              type="checkbox"
              value={item}
              checked={checkedItems.includes(item)}
              onChange={handleCheckboxChange}
              className="checkbox-primary checkbox checkbox-sm"
            />
            <span className="label-text">{item}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
