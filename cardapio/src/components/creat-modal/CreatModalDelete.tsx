import { useEffect } from "react";
import { useFoodDataDelete } from "../../hooks/useFoodDataDelete"; // Hook para deletar
import { FoodData } from "../../interface/FoodData";
import "./modal.css";


interface DeleteModalProps {
    closeModal: () => void;
    foodData: FoodData; // Dados do item a ser deletado
}

export function DeleteModal({ closeModal, foodData }: DeleteModalProps) {
    const deleteMutation = useFoodDataDelete(); // Hook de deleção

    const handleDelete = () => {
        if (foodData.id) { // Verificar se o ID é válido
            deleteMutation.mutate(foodData.id); // Realiza a deleção
        } else {
            console.error("Food ID is not defined.");
        }
    };

    useEffect(() => {
        if (deleteMutation.isSuccess) {
            closeModal(); // Fecha o modal após a deleção
        }
    }, [deleteMutation.isSuccess, closeModal]); // Incluir closeModal na dependência

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Excluir item do cardápio</h2>
                <p>Tem certeza de que deseja excluir o item <b>{foodData.title}</b>?</p>
                <div className="button-group">
                    <button 
                        className="btn-delete" 
                        onClick={handleDelete}
                        disabled={deleteMutation.status === 'pending'} // Verificar o status 'pending' para carregamento
                    >
                        {deleteMutation.status === 'pending' ? 'Excluindo...' : 'Confirmar'}
                    </button>
                    <button className="btn-secondary" onClick={closeModal}>
                        Cancelar
                    </button>
                </div>
                {deleteMutation.isError && (
                    <p className="error-message">Erro ao excluir o item. Tente novamente.</p>
                )}
            </div>
        </div>
    );
}
