'use strict';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function (e) {
   try {
      const id = window.location.hash.slice(1);

      if (!id) return;
      recipeView.renderSpinner();

      // Update results view to mark selected search result
      resultsView.update(model.getSearchResultsPage());

      // loading recipe
      await model.loadRecipe(id);

      // rendering recipe
      recipeView.render(model.state.recipe);
   } catch (err) {
      recipeView.renderError();
   }
};

const controlSearchResults = async function () {
   try {
      const query = searchView.getQuery();
      if (!query) return;
      resultsView.renderSpinner();

      await model.loadSearchResults(query);

      resultsView.render(model.getSearchResultsPage(1));
      paginationView.render(model.state.search);
   } catch (err) {
      console.log(err);
   }
};
controlSearchResults();

const controlPagination = function (page) {
   resultsView.render(model.getSearchResultsPage(page));
   paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
   // update the recipe servings
   model.updateServings(newServing);

   // update the recipe view
   recipeView.update(model.state.recipe);
};

const init = function () {
   recipeView.addHandlerRender(controlRecipes);
   recipeView.addHandlerUpdateServings(controlServings);
   searchView.addHandlerSearch(controlSearchResults);
   paginationView.addHandlerClick(controlPagination);
};
init();
