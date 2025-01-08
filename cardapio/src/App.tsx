import { useState } from 'react'; 
import './App.css';
import { Card } from './components/card/card';
import { FoodData } from './interface/FoodData';
import { useFoodData } from './hooks/useFoodData';
import { useFoodDataAlter } from './hooks/useFoodDataAlter';
import { useFoodDataDelete } from './hooks/useFoodDataDelete';
import { CreatModal } from './components/creat-modal/create-modal';
import { CreatModalAlter } from './components/creat-modal/CreatModalAlter'; 
import { DeleteModal } from './components/creat-modal/CreatModalDelete'; // Corrigido o nome do modal para DeleteModal

function App() {
  
  const { mutate: alterFood } = useFoodDataAlter();
  const { data } = useFoodData();
  const { mutate: deleteFood } = useFoodDataDelete();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodData | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
    setSelectedFood(null);
  };

  const handleEditFood = (food: FoodData) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const handleDeleteFood = (food: FoodData) => {
    setSelectedFood(food);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedFood && selectedFood.id !== undefined) { // Verificar se o ID está definido
      await deleteFood(selectedFood.id);
      setIsDeleteModalOpen(false);
      setSelectedFood(null);
    } else {
      console.error("Selected food is not valid.");
    }
  };

  return (
    <>
      <div className='container'>
        <h1>Cardápio</h1>
        <div className="card-grid">
          {data?.map(foodData => (
            <Card 
              key={foodData.id}
              price={foodData.price} 
              title={foodData.title}
              image={foodData.image}
              onClick={() => handleEditFood(foodData)} 
             
            />
          ))}
          {isDeleteModalOpen && selectedFood && (
            <DeleteModal // Atualizado para usar o componente DeleteModal
              closeModal={() => setIsDeleteModalOpen(false)} 
              foodData={selectedFood} 
            />
          )}
        </div>
        
        {isModalOpen && selectedFood ? (
          <CreatModalAlter 
            closeModal={handleOpenModal} 
            foodData={selectedFood} 
          />
        ) : (
          isModalOpen && <CreatModal closeModal={handleOpenModal} />
        )}

        <button onClick={handleOpenModal}>Cadastrar</button>
      </div>
    </>
  );
}

export default App;
