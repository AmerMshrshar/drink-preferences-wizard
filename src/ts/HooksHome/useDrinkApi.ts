import { useState, useEffect, useCallback } from "react";

interface DrinkOptions {
  categories: string[];
  alcoholicTypes: string[];
  glassTypes: string[];
  ingredients: string[];
}

interface UseDrinkApiReturn extends DrinkOptions {
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

type DrinkListItem = {
  [key: string]: string;
};

type ApiResponse = {
  drinks: DrinkListItem[];
};

const fetchApiList = async (param: string): Promise<string[]> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  try {
    const response = await fetch(`${baseUrl}/list.php?${param}=list`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as ApiResponse;

    if (!data.drinks) {
      return [];
    }

    return data.drinks.map((item) => Object.values(item)[0]);
  } catch (error) {
    console.error(`Failed to fetch ${param} list:`, error);
    return [];
  }
};

export const useDrinkApi = (): UseDrinkApiReturn => {
  const [options, setOptions] = useState<DrinkOptions>({
    categories: [],
    alcoholicTypes: [],
    glassTypes: [],
    ingredients: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllOptions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [categories, alcoholicTypes, glassTypes, ingredients] =
        await Promise.all([
          fetchApiList("c"),
          fetchApiList("a"),
          fetchApiList("g"),
          fetchApiList("i"),
        ]);

      setOptions({ categories, alcoholicTypes, glassTypes, ingredients });
    } catch (err) {
      setError("Failed to load drink options. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllOptions();
  }, [fetchAllOptions]);

  return { ...options, loading, error, refetch: fetchAllOptions };
};
