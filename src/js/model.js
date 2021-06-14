'use strict';
import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
import { RECIPES_PER_PAGE } from './config.js';

export const state = {
   recipe: {},
   search: {
      query: '',
      results: [],
      currentPage: 1,
      resultsPerPage: RECIPES_PER_PAGE,
   },
};

export const loadRecipe = async function (id) {
   try {
      const data = await getJSON(`${API_URL}${id}`);

      const { recipe } = data.data;
      state.recipe = {
         id: recipe.id,
         title: recipe.title,
         publisher: recipe.publisher,
         sourceUrl: recipe.source_url,
         image: recipe.image_url,
         servings: recipe.servings,
         cookingTime: recipe.cooking_time,
         ingredients: recipe.ingredients,
      };
   } catch (err) {
      throw err;
   }
};

export const loadSearchResults = async function (query) {
   try {
      state.search.query = query;
      const data = await getJSON(`${API_URL}?search=${query}`);
      state.search.results = data.data.recipes.map(recipe => {
         return {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            image: recipe.image_url,
         };
      });
   } catch (err) {
      throw err;
   }
};
loadSearchResults('pasta');

export const getSearchResultsPage = function (page = state.search.currentPage) {
   state.search.currentPage = page;

   const start = (page - 1) * state.search.resultsPerPage; // 0;
   const end = page * state.search.resultsPerPage; // 0;

   return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
   state.recipe.ingredients.forEach(ing => {
      ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
   });

   state.recipe.servings = newServings;
};
