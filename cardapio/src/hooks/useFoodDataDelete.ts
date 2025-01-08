import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8081";


const deleteData = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(`${API_URL}/food/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting food:", error); // Verifique se há erro
        throw error; // Para o React Query poder tratar o erro
    }
};


export function useFoodDataDelete() {
    const queryClient = useQueryClient();
    
    const mutate = useMutation({
        mutationFn: deleteData, 
        retry: 2, 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['foodData'] }); 
        },
    });

    return mutate; 
}
