import axios, { AxiosPromise } from "axios"
import {useQuery} from "@tanstack/react-query"
import { FoodData } from "../interface/FoodData";
const API_URL ="http://localhost:8081"

const fetchData = async(): AxiosPromise<FoodData[]>=>{
    const response = axios.get(API_URL + '/food')
    
    return response;
}

export function useFoodData(){
    const query = useQuery({//pegar um dado
        queryFn: fetchData,
        queryKey: ["foodData"],
        retry:2
    })
    return{
        ...query,
        data:query.data?.data

    }
}