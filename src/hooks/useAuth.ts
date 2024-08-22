import { getUserLogin } from "@/api/authApi";
import { useQuery } from "@tanstack/react-query";

export const userAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserLogin(),
    retry: 1,
    refetchOnWindowFocus: false
  });

  return { data, isError, isLoading };
};
