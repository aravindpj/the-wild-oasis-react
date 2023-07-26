import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParam] = useSearchParams();
  const filterValue = searchParam.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortByRow=searchParam.get("sortBy") || "startDate-asc"
  const [field,direction]=sortByRow.split("-")
  const sortBy={field,direction}

  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", filter,sortBy],
    queryFn: () => getBookings({filter,sortBy}),
  });
  return { isLoading, bookings };
}
