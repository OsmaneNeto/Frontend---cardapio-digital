import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FoodData } from "../interface/FoodData";
import { useFoodDataDelete } from "./useFoodDataDelete"; 

const API_URL = "http://localhost:8081";

const postData = async (data: FoodData): Promise<any> => {
    const response = await axios.post(`${API_URL}/food`, data);
    return response.data; // Retorna os dados da resposta
};

// Atualize a função para aceitar um objeto com id e data
const updateData = async ({ id, data }: { id: number; data: FoodData }): Promise<any> => {
    const response = await axios.put(`${API_URL}/food/${id}`, data);
    return response.data; // Retorna os dados da resposta
};

// Renomear a função
export function useFoodDataAlter() {
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['foodData'] });
        },
    });

    // Atualize a mutação para usar o novo formato
    const updateMutate = useMutation({
        mutationFn: updateData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['foodData'] });
        },
    });

    return { mutate, updateMutate }; // Retorna ambas as mutações
}