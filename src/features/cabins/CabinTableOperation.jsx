import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filteredValue="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "sort by name (A-Z)" },
          { value: "name-desc", label: "sort by name (Z-A)"  },
          { value: "regularPrice-asc", label: "sort by price (low-high)"},
          { value: "regularPrice-desc", label: "sort by price (high-low)"},
          { value: "maxCapacity-asc", label: "sort by capacity (low-high)"},
          { value: "maxCapacity-desc", label: "sort by capacity (high-low)"}
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;
