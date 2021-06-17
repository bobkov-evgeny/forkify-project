'use strict';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
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
      bookmarksView.update(model.state.bookmarks);

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

const controlAddBookmark = function () {
   // Add/remove bookmark
   if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
   else model.deleteBookmark(model.state.recipe.id);

   // Update recipe view
   recipeView.update(model.state.recipe);

   // Render bookmarks
   bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
   bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
   try {
      await model.uploadRecipe(newRecipe);
      console.log(model.state.recipe);
   } catch (err) {
      addRecipeView.renderError(err);
   }
};

const init = function () {
   bookmarksView.addHandlerRender(controlBookmarks);
   recipeView.addHandlerRender(controlRecipes);
   recipeView.addHandlerUpdateServings(controlServings);
   recipeView.addHandlerAddBookmark(controlAddBookmark);
   searchView.addHandlerSearch(controlSearchResults);
   paginationView.addHandlerClick(controlPagination);
   addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
