'use client';
import { useEffect, useState } from 'react';
import { Ingredient } from '@prisma/client';
import { Api } from '@/shared/services/api-clients';

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
}

export function useGetIngredients(): ReturnProps {
  const [loading, setLoading] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    setLoading(true);
    Api.ingredients
      .getAll()
      .then(res => setIngredients(res))
      .catch(() => setIngredients([]))
      .finally(() => setLoading(false));
  }, []);

  return {
    ingredients,
    loading,
  };
}
