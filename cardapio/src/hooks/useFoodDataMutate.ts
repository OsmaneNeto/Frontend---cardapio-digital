import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FoodData } from "../interface/FoodData";

const API_URL = "http://localhost:8081";

const postData = async (data: FoodData): Promise<any> => {
    const response = await axios.post(`${API_URL}/food`, data);
    return response.data; // Retorna os dados da resposta
};

export function useFoodDataMutate() {
    const queryClient = useQueryClient();
    
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['foodData'] }); // Usando o formato de objeto
        },
    });

    return mutate; // Retorna o objeto de mutação
}