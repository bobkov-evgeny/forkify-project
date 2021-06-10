'use strict';
import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `Рецептов по вашему запросу не найдено, попробуйте другой!`;
  _message = ``;

  _generateMarkup() {
    return this._data
      .map(recipe => this._generateMarkupPreview(recipe))
      .join('');
  }

  _generateMarkupPreview(recipe) {
    return `
		<li class="preview">
			<a class="preview__link preview__link--active" href="#${recipe.id}">
				<figure class="preview__fig">
					<img src="${recipe.image}" alt="Test" />
				</figure>
				<div class="preview__data">
					<h4 class="preview__title">${recipe.title}</h4>
					<p class="preview__publisher">${recipe.publisher}</p>
				</div>
			</a>
		</li>`;
  }
}

export default new ResultsView();