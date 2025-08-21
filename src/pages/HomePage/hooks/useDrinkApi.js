import { useState, useEffect, useCallback } from "react";

const fetchApiList = async (param) => {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/list.php?${param}=list`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data.drinks.map((item) => Object.values(item)[0]);
  } catch (error) {
    console.error(`Failed to fetch ${param} list:`, error);
    return [];
  }
};

export const useDrinkApi = () => {
  const [options, setOptions] = useState({
    categories: [],
    alcoholicTypes: [],
    glassTypes: [],
    ingredients: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
