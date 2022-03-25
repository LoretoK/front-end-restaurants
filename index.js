import restaurants from "./data.js"; // allows us to acces my API

const app =document.querySelector('#app'); //this variable is able to access app id as the querySelector 
//returns the first Element within the document that matches the specified selector, or group of selectors.

function createRestaurant(form){
  const formData = new FormData(form.target) //FormData is used to capture HTML form and submit it using fetch or another network method
  // .target returns the element that triggered the event e.g  if A->B->C A would be returned even though B was the element that had the eventListener for C, A was the element that triggered it all
  const name = formData.get('name') // returns the name found in the HTML form submitted 
  const imageURL = formData.get('imageURL')//returns the imageURL found in the HTML submitted
  fetch('http://localhost:3000/restaurants', { // a fetch request for my server containing my database
    method: 'POST', // this allows the restaurant HTML information to be posted into the database
    headers: {
        "Content-Type": "application/json" //indicates the original media type of the resource as json
    },
    body: JSON.stringify({name, imageURL}) // converts a JavaScript object or value to a JSON string // remember when posting to the 
    //database the raw data has to be in JSON
})
.then(res => res.json()) //returns a promise which resolves with the result of parsing the data as JSON
.then(restaurant => {
    restaurants.push(restaurant) //adds the restaurant to the restaurants on the page
    window.location.reload() // this reloads the page which will now contain the new restaurant
})
.catch(console.error) // if the promise doesn't resolve, it's caught by this catch method and the browser returns an error
}

if (restaurants instanceof Error){
  app.textContent = 'There has been a problem. Please try again later'; // this is what actual webpage will say
  console.log(restaurants)
}else{
  console.log(restaurants);
  app.innerHTML = restaurants.map(function (restaurant){
    return`
        <article class="restaurant">
            <h2>
                <a href="restaurant.html?id=${restaurant.id}">${restaurant.name}</a>
            </h2>
            <img src="${restaurant.imageURL}" alt="${restaurant.name} restaurant"/>
          </article>`;
  }).join(""); // map method loops through each object so each time it runs we gain access to all the restaurant object
  //^based on each object we return a new array of html strings that we join together to make one big html string
  //^this big html string is what gets inserted back into the innerHTML
  document.querySelector('form').addEventListener('submit', createRestaurant)
}

