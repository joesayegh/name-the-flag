// LOAD JSON FILE
const loadJSON = (path, callback) => {
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType('application/json');
	xobj.open('GET', path, true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == '200') {
			callback(xobj.responseText);
		}
	};
	xobj.send(null);
};

const addFlag = (country, rowDiv) => {
	// CREATE A DIV
	const parentDiv = document.createElement('div');
	// ASSIGN THE COUNTRY CODE AS AN ID TO THE DIV
	parentDiv.id = country.code;

	// CREATE ANOTHER DIV
	const flagDiv = document.createElement('div');
	// ASSIGN THE CLASS "FLAG" TO THE DIV
	flagDiv.classList.add('flag');

	// CODE - CREATE A SPAN
	const codeSpan = document.createElement('div');
	// ADD THE CLASS "FLAG-CODE" TO THE SPAN
	codeSpan.classList.add('flag-code');
	const code = document.createTextNode('Country Code: ' + country.code);
	codeSpan.appendChild(code);

	// COUNTRY - CREATE THE FLAG-COUNTRY DIV
	const countryInfo = document.createElement('div');
	countryInfo.classList.add('flag-info');
	// HIDE THE INFO BY DEFAULT
	countryInfo.classList.add('hide');
	countryInfo.title = country.name;

	// COUNTRY
	const countryDiv = document.createElement('div');
	countryDiv.classList.add('flag-name');
	const countryName = document.createTextNode('Name: ' + country.name);

	// CAPITAL
	const capitalDiv = document.createElement('div');
	capitalDiv.classList.add('flag-capital');
	const countryCapital = document.createTextNode('Capital: ' + country.capital);

	// CONTINENT
	const continentDiv = document.createElement('div');
	continentDiv.classList.add('flag-continent');
	const countryContinent = document.createTextNode('Continent: ' + country.continent);

	countryDiv.appendChild(countryName);
	capitalDiv.appendChild(countryCapital);
	continentDiv.appendChild(countryContinent);
	countryInfo.appendChild(codeSpan);

	countryInfo.appendChild(countryDiv);
	countryInfo.appendChild(capitalDiv);
	countryInfo.appendChild(continentDiv);

	// CREATE THE FLAG IMAGE
	const flagBtn = document.createElement('button');
	flagBtn.type = 'button';
	flagBtn.classList.add('flag-btn');

	const flagImg = document.createElement('img');
	// ADD THE CLASS FLAG-IMG
	flagImg.classList.add('flag-img');
	// RETRIEVE THE IMAGE PATH FROM THE JSON FILE
	flagImg.src = country.flag;
	// ADD THE COUNTRY NAME TO THE IMG ALT TAG
	flagImg.alt = `Flag of ${country.name}`;

	parentDiv.appendChild(flagDiv);
	flagDiv.appendChild(flagBtn);
	flagBtn.appendChild(flagImg);
	flagDiv.appendChild(countryInfo);
	rowDiv.appendChild(parentDiv);

	// SHOW THE INFO ON CLICK
	flagImg.addEventListener('click', () => {
		countryInfo.classList.toggle('hide');
	});

	// PRESS ENTER ON KEYBOARD
	flagBtn.addEventListener('keyup', function (event) {
		if (event.keyCode === 13) {
			countryInfo.classList.toggle('hide');
		}
	});
};

window.onload = function () {
	const isoFlagsRow = document.getElementById('iso-flags');
	loadJSON('country.json', (response) => {
		const countries = JSON.parse(response);
		for (country of countries) {
			addFlag(country, isoFlagsRow);
		}
	});
};
