const ingredientList = document.getElementById("ingredientList");
const searchButton = document.getElementById("searchButton");
const resetButton = document.getElementById("resetButton");
const ingredientsAdded = document.getElementById("ingredientsAdded");
const recipeBox = document.getElementById("recipeBox");

let selectedIngredients = []; // This will store all user-selected ingredients
let recipes = [];
let foundRecipes = [];
//Sample recipe
let chickenFriedRice = {
    title: "Chicken Fried Rice",
    image: "https://via.placeholder.com/250x150",
    ingredients: ["Chicken", "Rice"],
    instructions: "Cook rice. Fry chicken."
};

let sampleRecipe = {
    title: "Sample Recipe",
    image: "https://via.placeholder.com/250x150",
    ingredients: ["Chicken", "Beef"],
    instructions: "Sample Instructions"
};
recipes.push(chickenFriedRice);
recipes.push(sampleRecipe);

//Search button | Adds an ingredient to the list and displays it
searchButton.addEventListener("click", () => {
    const ingredient = ingredientList.value;
    
    

    // Ignore the default "Select an ingredient" option
    if (ingredient !== "0" && !selectedIngredients.includes(ingredient)) {
        selectedIngredients.push(ingredient);
        ingredientsAdded.textContent = selectedIngredients.join(", ");
    }
    ingredientList.value = "0";

    checkIfRecipeExists();
    
});

// Reset button to clear ingredients added
resetButton.addEventListener("click", () => {
    selectedIngredients = [];
    foundRecipes = [];
    ingredientsAdded.textContent = "Ingredients Will Appear Here";
    const placeholder = document.createElement("p");
    placeholder.className = "recipePlaceHolder";
    placeholder.textContent = "Recipes Will Appear Here";
    recipeBox.innerHTML = "";
    recipeBox.appendChild(placeholder);
    
});


function checkIfRecipeExists() {
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        if (recipe.ingredients.every((ingredient) => selectedIngredients.includes(ingredient)) && !foundRecipes.includes(recipe)) {
            foundRecipes.push(recipe);
            createRecipeCard(recipe)
            const placeholder = recipeBox.querySelector(".recipePlaceHolder");
            if (placeholder) {
                placeholder.remove();
            }
            return;
        }
        else{
            //recipeBox.textContent = "No matching recipe found.";
        }
    }  
}

//Recipe Cards
function createRecipeCard(recipe) {
  const card = document.createElement("div");
  card.className = "recipe-card";

  card.innerHTML = `
    <!--<img src="${recipe.image}" alt="${recipe.name}">--!>
    <h3>${recipe.title}</h3>
    <h4>Ingredients:</h4>
    <ul>
      ${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}
    </ul>
    <h4>Instructions:</h4>
    <p>${recipe.instructions}</p>
  `;

  recipeBox.appendChild(card);
}






