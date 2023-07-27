import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient=useQueryClient()
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

  //PRE-FETCH
  // in this example fetching next page data already
  const pageCount=Math.ceil(page/PAGE_SIZE)
  if(page>pageCount) // THIS CONDITION TO AVOID UNWANTED FETCHING DATA EX: THERE IS 3 PAGES IF REACHING 3 RD PAGE THIS PREFECH METHOD TRY TO FETCH NEXT DATA FOR 4TH PAGE THAT DATA IS EMPTY ARRAY [] (BCZ 30 results divde 10 = 3 page ) WE DONT NEED THAT
  // the prefectch is usefull to fetch next data avoid loadig screen 
  queryClient.prefetchQuery({
      queryKey: ["bookings", filter,sortBy,page+1],
      queryFn: () => getBookings({filter,sortBy,page:page+1}),
    })

  if(page<pageCount)  
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter,sortBy,page-1],
      queryFn: () => getBookings({filter,sortBy,page:page-1}),
    })
  return { isLoading, bookings , count};
}
