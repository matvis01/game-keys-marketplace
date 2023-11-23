import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"

interface TagGenreFiltersProps {
  items: string[]
  name: string
}

export default function TagGenreFilters({ items, name }: TagGenreFiltersProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState("")

  const searchParams = useSearchParams().get("filters")
  const paramsFilters = searchParams
    ? JSON.parse(searchParams)
    : { tags: [], genres: [] }

  useEffect(() => {
    if (!paramsFilters) return
    setCheckedItems(paramsFilters[name] || [])
  }, [searchParams])

  const router = useRouter()

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const item = event.target.value
    let checked = [...checkedItems]
    if (event.target.checked) {
      checked.push(item)
    } else {
      checked = checked.filter((checkedItem) => checkedItem !== item)
    }
    setCheckedItems(checked)

    router.push({
      pathname: router.pathname,
      query: {
        filters: JSON.stringify({ ...paramsFilters, [name]: checked }),
      },
    })
  }

  function filterItems() {
    return items.filter((item) =>
      item.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }
  function clearFilters() {
    setCheckedItems([])
    setSearchInput("")
    router.push({
      pathname: router.pathname,
      query: {
        filters: JSON.stringify({ ...paramsFilters, [name]: [] }),
      },
    })
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
