import { API_URL } from "@/constants/url";
import useSWR from "swr";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}

export const useReviews = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${API_URL}/allReviews`,
    fetcher
  );
  return {
    reviews: data,
    isLoading,
    error,
    mutate,
  };
};
