import React, { createContext, useContext, useState } from 'react';
import '../styles/App.css';

const MealsContext = createContext();

const App = () => {
  return (
    <div id="main">
      <MealsProvider>
        <MealsList />
        <Counter />
      </MealsProvider>
    </div>
  );
};

const Counter = () => {
  const { meals } = useContext(MealsContext);
  const remainingMeals = meals.filter((meal) => !meal.ticked);

  return (
    <div>
      <h3>Meals Remaining: {remainingMeals.length}</h3>
    </div>
  );
};

const MealsList = () => {
  const { meals, tickMeal } = useContext(MealsContext);

  const handleTick = (id) => {
    tickMeal(id);
  };

  return (
    <div>
      <h2>Meals:</h2>
      <ul>
        {meals.map((meal) => (
          <li key={meal.id}>
            <input type="checkbox" checked={meal.ticked} onChange={() => handleTick(meal.id)} />
            {meal.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const todaysMeals = [
  { id: 1, name: 'Baked Beans', ticked: false },
  { id: 2, name: 'Baked Sweet Potatoes', ticked: false },
  { id: 3, name: 'Baked Potatoes', ticked: false },
];

const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState(todaysMeals);

  const tickMeal = (id) => {
    const updatedMeals = meals.map((meal) => {
      if (meal.id === id) {
        return { ...meal, ticked: !meal.ticked };
      }
      return meal;
    });

    setMeals(updatedMeals);
  };

  return <MealsContext.Provider value={{ meals, tickMeal }}>{children}</MealsContext.Provider>;
};

export default App;
