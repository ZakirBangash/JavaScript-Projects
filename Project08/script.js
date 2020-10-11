const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const result__heading = document.getElementById('result__heading');
const mealContainer = document.getElementById('meals');



async function FormSubmission(e) {
        e.preventDefault();
        
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
                    <div class="meal__info"  data-mealId = ${idMeal}> 
                      <h3>  ${meal.strMeal} </h3>
                    </div>
                </div>`
            )).join(' ');
            
            search.value = ' ';
}

}

// event listner for form
submit.addEventListener('submit',FormSubmission);