const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const result__heading = document.getElementById('result__heading');
const mealContainer = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');


async function FormSubmission(e) {
        e.preventDefault();
        mealContainer.innerHTML=" ";
      // Clear Selected Meal
       selectedMeal.innerHTML = '';
    // Get the Search value from input field
    let term = search.value;
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        const {meals} = await response.json();
        result__heading.innerHTML = `<h2>Search result for '${term}' :</h2>`;

        // cheking if meal is null then override the above statement
        if(meals === null){
            result__heading.innerHTML = `<p>There are no search results for  ${term}.Please try a different search </p>`;
        } else {
            console.log(meals);
            mealContainer.innerHTML = meals.map( meal => (
                
                ` 
                <div class="meal">
                    <img src=${meal.strMealThumb} alt=${meal.strMeal} />
                    <div class="meal__info"  data-mealId = ${meal.idMeal}> 
                      <h3>  ${meal.strMeal} </h3>
                    </div>
                </div>`
            )).join(' ');
            
            search.value = ' ';
}
}

function getMealById(mealID){
    
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then( res => res.json())
    .then( data => {
        const meal = data.meals[0];
        addMealToDOM(meal);
    })

  


}

// function to add a meal to DOM
function addMealToDOM(meal) {
    const ingredients = [];
    console.log(meal);
    console.log(meal['strIngredient1']);
    for(let i=1; i<=20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
         
        } else {
            break;
        }
    }
    
    selectedMeal.innerHTML = `
    <div class="selected-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="selected-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : '' }
            ${meal.strArea ? `<p>${meal.strArea}</p>` : '' }
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map( ingredient => `<li>${ingredient}</li>` ).join('')}
            </ul>
        </div>
    </div>
`;

}

async function randomMeal(){
    mealContainer.innerHTML = ' ';
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const {meals} = await response.json();
    addMealToDOM(meals[0])





}



// event listner for form
submit.addEventListener('submit',FormSubmission);

// event listner for showing additional of meal when click on it
mealContainer.addEventListener('click',(e)=>{
    console.log(e.target)
    let mealId = e.target;
    let meal__info = mealId.getAttribute('data-mealId');
    getMealById(meal__info);
});

// event listner for random meal
random.addEventListener('click',randomMeal);




