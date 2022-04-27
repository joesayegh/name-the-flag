// PATH TO THE JSON FILE
url = 'country.json';

// PATH TO WHERE YOU WANT THE JSON DATA TO APPEAR
let placeholder = document.querySelector('#iso-flags');

fetch(url)
	.then(function (response) {
		return response.json();
	})
	.then(function (countries) {
		let out = '';
		for (let country of countries) {
			out += `
			<div id=${country.code}>
				<button type="button" class="flag-btn">
					<img class="flag-img" src="${country.flag}" alt="Flag of ${country.name}" loading="lazy">
				</button>
				<div class="flag-info hide" data-country="${country.code}">
					<div class="flag-code">Country Code: ${country.code}</div>
					<div class="flag-name">Name: ${country.name}</div>
					<div class="flag-capital">Capital: ${country.capital}</div>
					<div class="flag-continent">Continent: ${country.continent}</div>
				</div>
			</div>
		`;
		}

		placeholder.innerHTML = out;

		// SELECTORS
		let flagBtn = document.querySelectorAll('.flag-btn');

		for (i of flagBtn) {
			i.addEventListener('click', function () {
				// console.log(this);

				// GET THE ID OF THE PARENT
				flagId = this.parentElement.id;
				// console.log(flagId);

				// TARGET THE DIV WITH THE MATCHING DATA ATTRIBUTE COUNTRY ID
				let flagInfo = document.querySelector('[data-country=' + flagId);

				// TOGGLE THE HIDE CLASS
				flagInfo.classList.toggle('hide');
			});
		}
	});
