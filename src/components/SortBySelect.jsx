import Select from "react-select";
import useProductListContext from "../contexts/ProductListContext";

const options = [
  { value: "a-z", label: "Alphabetically, A-Z" },
  { value: "z-a", label: "Alphabetically, Z-A" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
];

export default function SortBySelect() {
  const { sortBy, handleSortBy } = useProductListContext();
  return (
    <Select
      className="z-2"
      options={options}
      value={options.find((o) => o.value === sortBy)}
      onChange={handleSortBy}
      isSearchable={false}
      isClearable={false}
      placeholder="Sort by"
      styles={{
        control: (styles, { isFocused }) => ({
          ...styles,
          backgroundColor: "white",
          borderColor: "var(--bs-primary)",
          "&:hover": {
            borderColor: "var(--bs-primary)",
          },
          boxShadow: isFocused? "0 0 0 1px var(--bs-primary)": "none",
        }),
        option: (styles, { isDisabled, isFocused, isSelected }) => {
          return {
            ...styles,
            backgroundColor: isDisabled
              ? undefined
              : isSelected
              ? "var(--bs-primary)"
              : isFocused
              ? "#eee"
              : undefined,
            color: isDisabled
              ? "#ccc"
              : isSelected
              ? "white"
              : "var(--bs-primary)",
            cursor: isDisabled ? "not-allowed" : "default",
          };
        },
      }}
    />
  );
}
