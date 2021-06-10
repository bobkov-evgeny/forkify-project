'use strict';
import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
   _parentElement = document.querySelector('.pagination');

   _generateMarkup() {
      const numOfPages = Math.ceil(
         this._data.results.length / this._data.resultsPerPage
      );

      // Page 1, and there are other pages
      if (Number(this._data.currentPage) === 1 && numOfPages > 1) {
         console.log(`PAGE 1`);
         return `
			${this._generateMarkupButton(`next`)}`;
      }
      // Page 1, and there are NO other pages
      if (Number(this._data.currentPage) === 1 && numOfPages > 1) {
         return;
      }

      // Last page
      if (Number(this._data.currentPage) === numOfPages && numOfPages > 1) {
         console.log(`LAST PAGE`);
         return `
			${this._generateMarkupButton(`prev`)}`;
      }
      // Other page
      if (
         Number(this._data.currentPage) !== 1 &&
         Number(this._data.currentPage) !== numOfPages
      ) {
         return `
			${this._generateMarkupButton(`prev`)}
			${this._generateMarkupButton(`next`)}`;
      }
   }

   addHandlerClick(handler) {
      this._parentElement.addEventListener('click', function (e) {
         const btn = e.target.closest('.btn--inline');
         if (!btn) return;
         console.log(btn.id);
         handler(btn.id);
      });
   }

   _generateMarkupButton(nextOrPrev) {
      return `
		<button class="btn--inline pagination__btn--${nextOrPrev}" id="${
         nextOrPrev === 'prev'
            ? `${this._data.currentPage - 1}`
            : `${Number(this._data.currentPage) + 1}`
      }">
			<svg class="search__icon">
				<use href="${icons}#icon-arrow-${
         nextOrPrev === 'prev' ? 'left' : 'right'
      }"></use>
			</svg>
			<span>Page ${
            nextOrPrev === 'prev'
               ? `${this._data.currentPage - 1}`
               : `${Number(this._data.currentPage) + 1}`
         }</span>
		</button>		
		`;
   }
}

export default new PaginationView();

//
