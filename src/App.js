import React, {useEffect,useState} from 'react';
import Receipe from './Receipe';
import './App.css';

const App = () => {
  const App_ID = '26d43ec3';
  const APP_KEY= 'c58b31c15f9bb9fe685db81617143914';
 
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  //useeffect will only runs when our query changes which is chicken
  useEffect(() => {
    getRecipes();
  }, [query]);
 
  //we can use normal promises instead of await
 const getRecipes = async () => {
   const response = await fetch(
     `https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${APP_KEY}`
     );
   const data = await response.json();
   setRecipes(data.hits);
   console.log(data.hits);
   /* 
   we can write code like below
   fetch(tps://api.edamam.com)
   .then(Response => {
     response.json (above code is much simplier to write code*/
  };

  const updateSearch = e => {
   setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
   <div className="App">
   <form onSubmit={getSearch} className="search-form">
   <input className="search-bar" type="text" value={search} onChange={updateSearch}
   />
   <button className="search-button" type="submit"> Search</button>
   </form>
   <div className="recipes">
   {recipes.map(recipe => (
<Receipe 
key={recipe.recipe.label}
title={recipe.recipe.label} 
calories={recipe.recipe.calories}
image={recipe.recipe.image}
ingredients={recipe.recipe.ingredients}
/>
   ))}
   </div>
   </div>
 );
};

export default App;

