import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface DrinkOptions {
  categories: string[];
  alcoholicTypes: string[];
  glassTypes: string[];
  ingredients: string[];
}

interface UseDrinkApiReturn extends DrinkOptions {
  loading: boolean;
  error: string | null;
  refetch: () => Promise<any>;
}

type DrinkListItem = {
  [key: string]: string;
};

type ApiResponse = {
  drinks: DrinkListItem[];
};

const fetchApiList = async (param: string): Promise<string[]> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const response = await axios.get<ApiResponse>(`${baseUrl}/list.php`, {
    params: { [param]: "list" },
  });

  if (!response.data || !response.data.drinks) {
    return [];
  }

  return response.data.drinks.map((item) => Object.values(item)[0]);
};

const fetchAllDrinkOptions = async (): Promise<DrinkOptions> => {
  const [categories, alcoholicTypes, glassTypes, ingredients] =
    await Promise.all([
      fetchApiList("c"),
      fetchApiList("a"),
      fetchApiList("g"),
      fetchApiList("i"),
    ]);

  return { categories, alcoholicTypes, glassTypes, ingredients };
};

export const useDrinkApi = (): UseDrinkApiReturn => {
  const { data, isLoading, isError, refetch } = useQuery<DrinkOptions, Error>({
    queryKey: ["drinkOptions"],
    queryFn: fetchAllDrinkOptions,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    categories: data?.categories ?? [],
    alcoholicTypes: data?.alcoholicTypes ?? [],
    glassTypes: data?.glassTypes ?? [],
    ingredients: data?.ingredients ?? [],
    loading: isLoading,
    error: isError
      ? "Failed to load drink options. Please try again later."
      : null,
    refetch,
  };
};
