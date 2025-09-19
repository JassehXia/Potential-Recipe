const ingredientList = document.getElementById("ingredientList");
const searchButton = document.getElementById("searchButton");
const resetButton = document.getElementById("resetButton");
const ingredientsAdded = document.getElementById("ingredientsAdded");
const recipeBox = document.getElementById("recipeBox");

let selectedIngredients = []; // This will store all user-selected ingredients
let recipes = [];
let foundRecipes = [];

//Search Button | Looks Up Recipes
searchButton.addEventListener("click", () => {
  const ingredient = ingredientList.value;

  if (ingredient !== "0" && !selectedIngredients.includes(ingredient)) {
    selectedIngredients.push(ingredient);
    ingredientsAdded.textContent = selectedIngredients.join(", ");
  }
  ingredientList.value = "0";

  checkIfRecipeExists();       // still checks your hardcoded list
  fetchRecipesFromAPI();       // NEW: fetch live recipes
});




// Reset button to clear ingredients added
resetButton.addEventListener("click", () => {
    selectedIngredients = [];
    foundRecipes = [];
    ingredientsAdded.textContent = "Ingredients Will Appear Here";
    recipeBox.innerHTML = "";
});


function checkIfRecipeExists() {
  const pantryItems = ["salt","pepper","oil","flour","water","sugar"];
  recipeBox.innerHTML = "";      // clear previous
  foundRecipes = [];

  recipes.forEach(recipe => {
    const match =
      recipe.ingredients.every(ing =>
        selectedIngredients.includes(ing) || pantryItems.includes(ing.toLowerCase())
      ) &&
      selectedIngredients.every(ing =>
        recipe.ingredients.includes(ing) || pantryItems.includes(ing.toLowerCase())
      );

    if (match && !foundRecipes.includes(recipe)) {
      foundRecipes.push(recipe);
      createRecipeCard(recipe);
    }
  });
}


//Recipe Cards
function createRecipeCard(recipe) {
  const card = document.createElement("div");
  card.className = "recipe-card";

  // wrap the card’s inner content in an <a> tag
  card.innerHTML = `
    <a href="${recipe.link || recipe.instructions}" target="_blank" class="recipe-link">
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h3>${recipe.title}</h3>
      <h4>Ingredients:</h4>
      <ul>
        ${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}
      </ul>
    </a>
  `;

  recipeBox.appendChild(card);
}

//API SHENANIGANS
async function fetchRecipesFromAPI(numRecipes = 5) {
  const apiKey = "API KEY"; // <-- Replace with your real key
  const query = selectedIngredients.join(",");
  const url =
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=50&apiKey=${apiKey}`;
    // ask for more (e.g., 50) so we have a pool to randomize

  try {
    const response = await fetch(url);
    const data = await response.json();

    // --- Shuffle results ---
    const shuffled = data.sort(() => Math.random() - 0.5);

    // --- Pick the first numRecipes after shuffle ---
    shuffled.slice(0, numRecipes).forEach(r => {
      const recipeObj = {
        title: r.title,
        image: r.image,
        ingredients: r.usedIngredients.map(i => i.name),
        link: `https://spoonacular.com/recipes/${r.title.replace(/\s+/g,'-')}-${r.id}`
    };


      if (!foundRecipes.find(fr => fr.title === recipeObj.title)) {
        foundRecipes.push(recipeObj);
        createRecipeCard(recipeObj);
      }
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};









