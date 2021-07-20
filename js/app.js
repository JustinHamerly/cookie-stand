const Seattle = {
  locationName: 'SEATTLE',
  minCustHour: 23,
  maxCustHour: 65,
  avgPerCust: 6.3,
  customersPerHour: [],
  cookiesPerHour: [],
  storeResults: [],
  genCustPerHour: function(){
    for (let i = 0; i < hoursArray.length; i++){
      this.customersPerHour[i] = randCustPerHour(this.minCustHour, this.maxCustHour);
    }
  },
  genCookiesPerHour: function(){
    for (let i = 0; i < hoursArray.length; i++){
      this.cookiesPerHour[i] = Math.floor(this.customersPerHour[i] * this.avgPerCust);
    }
  },
  genStoreResults: function(){
    for (let i = 0; i < hoursArray.length; i++){
      this.storeResults[i] = hoursArray[i] + ': ' + this.cookiesPerHour[i];
    }
  },
};

const Tokyo = {
  locationName: 'TOKYO',
  minCustHour: 3,
  maxCustHour: 24,
  avgPerCust: 1.2,
  customersPerHour: [],
  cookiesPerHour: [],
  storeResults: [],
  genCustPerHour: function(){
    for (let i = 0; i < hoursArray.length; i++){
      this.customersPerHour[i] = randCustPerHour(this.minCustHour, this.maxCustHour);
    }
  },
  genCookiesPerHour: function(){
    for (let i = 0; i < hoursArray.length; i++){
      this.cookiesPerHour[i] = Math.floor(this.customersPerHour[i] * this.avgPerCust);
    }
  },
  genStoreResults: function(){
    for (let i = 0; i < hoursArray.length; i++){
      this.storeResults[i] = hoursArray[i] + ': ' + this.cookiesPerHour[i];
    }
  },
};

const Dubai = {
  locationName: 'DUBAI',
  minCustHour: 11,
  maxCustHour: 38,
  avgPerCust: 3.7,
  customersPerHour: [],
  cookiesPerHour: [],
  storeResults: [],
  genCustPerHour: function(){
    for (let i = 0; i < hoursArray.length; i++){
      this.customersPerHour[i] = randCustPerHour(this.minCustHour, this.maxCustHour);
    }
  },
  genCookiesPerHour: function(){
    for (let i = 0; i < hoursArray.length; i++){
      this.cookiesPerHour[i] = Math.floor(this.customersPerHour[i] * this.avgPerCust);
    }
  },
  genStoreResults: function(){
    for (let i = 0; i < hoursArray.length; i++){
      this.storeResults[i] = hoursArray[i] + ': ' + this.cookiesPerHour[i];
    }
  },
};

const Paris = {
  locationName: 'PARIS',
  minCustHour: 20,
  maxCustHour: 38,
  avgPerCust: 2.3,
  customersPerHour: [],
  cookiesPerHour: [],
  storeResults: [],
  genCustPerHour: function(){
    for (let i = 0; i < hoursArray.length; i++){
      this.customersPerHour[i] = randCustPerHour(this.minCustHour, this.maxCustHour);
    }
  },
  genCookiesPerHour: function(){
    for (let i = 0; i < hoursArray.length; i++){
      this.cookiesPerHour[i] = Math.floor(this.customersPerHour[i] * this.avgPerCust);
    }
  },
  genStoreResults: function(){
    for (let i = 0; i < hoursArray.length; i++){
      this.storeResults[i] = hoursArray[i] + ': ' + this.cookiesPerHour[i];
    }
  },
};

const Lima = {
  locationName: 'LIMA',
  minCustHour: 2,
  maxCustHour: 16,
  avgPerCust: 4.6,
  customersPerHour: [],
  cookiesPerHour: [],
  storeResults: [],
  genCustPerHour: function(){
    for (let i = 0; i < hoursArray.length; i++){
      this.customersPerHour[i] = randCustPerHour(this.minCustHour, this.maxCustHour);
    }
  },
  genCookiesPerHour: function(){
    for (let i = 0; i < hoursArray.length; i++){
      this.cookiesPerHour[i] = Math.floor(this.customersPerHour[i] * this.avgPerCust);
    }
  },
  genStoreResults: function(){
    for (let i = 0; i < hoursArray.length; i++){
      this.storeResults[i] = hoursArray[i] + ': ' + this.cookiesPerHour[i];
    }
  },
};

function randCustPerHour(a, b) {
  let customersPerHour = Math.floor(Math.random() * (b - a + 1) + a);
  return customersPerHour;
}

const locArray = [Seattle, Tokyo, Dubai, Paris, Lima];

const hoursArray = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM'];

const locDivElement = document.getElementById('locations');

function renderStore(location) {
  location.genCustPerHour();
  location.genCookiesPerHour();
  location.genStoreResults();
  console.log(location);

  let articleElem = document.createElement('article');
  locDivElement.appendChild(articleElem);
  let h3Elem = document.createElement('h3');
  articleElem.appendChild(h3Elem);
  h3Elem.textContent = location.locationName;
  let ulElem = document.createElement('ul');
  articleElem.appendChild(ulElem);
  for (let i = 0; i < location.storeResults.length; i++){
    let liElem = document.createElement('li');
    liElem.textContent = location.storeResults[i];
    ulElem.appendChild(liElem);
  }
}

for (let i = 0; i < locArray.length; i++){
  renderStore(locArray[i]);
}
