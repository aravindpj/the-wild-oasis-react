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

  const page=!searchParam.get("page") ? 1 : Number(searchParam.get("page"))

  const { isLoading, data: {data:bookings,count}={} } = useQuery({
    queryKey: ["bookings", filter,sortBy,page],
    queryFn: () => getBookings({filter,sortBy,page}),
  });
  return { isLoading, bookings , count};
}
