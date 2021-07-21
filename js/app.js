function StoreLocation(locationName, minCustHour, maxCustHour, avgPerCust){
  this.locationName = locationName;
  this.minCustHour = minCustHour;
  this.maxCustHour = maxCustHour;
  this.avgPerCust = avgPerCust;
  this.customersPerHour = [];
  this.cookiesPerHour = [];
  this.storeResults = [];
}

const Seattle = new StoreLocation('SEATTLE', 23, 65, 6.3);
const Tokyo = new StoreLocation('TOKYO', 3, 24, 1.2);
const Dubai = new StoreLocation('DUBAI', 11, 38, 3.7);
const Paris = new StoreLocation('PARIS', 20, 38, 2.3);
const Lima = new StoreLocation('LIMA', 2, 16, 4.6);

const locArray = [Seattle, Tokyo, Dubai, Paris, Lima];

const hoursArray = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM'];

StoreLocation.prototype.genData = function(){
  this.totalCookies = 0;
  for (let i = 0; i < hoursArray.length; i++){
    this.customersPerHour[i] = randCustPerHour(this.minCustHour, this.maxCustHour);
    this.cookiesPerHour[i] = Math.floor(this.customersPerHour[i] * this.avgPerCust);
    this.storeResults[i] = hoursArray[i] + ': ' + this.cookiesPerHour[i] + ' cookies';
    this.totalCookies += this.cookiesPerHour[i];
  }
};

function randCustPerHour(a, b) {
  const customersPerHour = Math.floor(Math.random() * (b - a + 1) + a);
  return customersPerHour;
}

function newElement(tagname, parent, text){
  const element = document.createElement(tagname);
  parent.appendChild(element);
  if (text){
    element.textContent = text;
  }
  return element;
}

const locDivElement = document.getElementById('locations');

function renderTable(){
  const tableElem = newElement('table', locDivElement, null);
  const theadElem = newElement('thead', tableElem, null);
  const trElem = newElement('tr', theadElem, null);
  newElement('th', trElem, null);
  for (let i=0; i < hoursArray.length; i++){
    newElement('th', trElem, hoursArray[i]);
  }
  newElement('th', trElem, 'DAILY LOCATION TOTAL');

  const tbodyElem = newElement('tbody', tableElem, null);
  for (let i=0; i < locArray.length; i++){
    locArray[i].renderRow(tbodyElem);
  }

  getTableFooter(tableElem);
}

StoreLocation.prototype.renderRow = function(tbodyElem){
  const trElem = newElement('tr', tbodyElem, null);
  newElement('th', trElem, this.locationName);
  for (let i=0; i < this.cookiesPerHour.length; i++){
    newElement('td', trElem, this.cookiesPerHour[i]);
  }
  newElement('td', trElem, this.totalCookies);
};

function getTableFooter(tableElem){
  const tfootElem = newElement('tfoot', tableElem, null);
  const trElem2 = newElement('tr', tfootElem, null);
  newElement('th', trElem2, 'HOURLY TOTAL');
  for(let i = 0; i < hoursArray.length; i++){
    let hourlyTotal = 0;
    for(let j = 0; j < locArray.length; j++){
      hourlyTotal += locArray[j].cookiesPerHour[i];
    }
    newElement('th', trElem2, hourlyTotal);
  }
}

// function renderStore(location) {
//   console.log(location);
//   const articleElem = newElement('article', locDivElement, null);
//   newElement('h3', articleElem, location.locationName);
//   const ulElem = newElement('ul', articleElem, null);
//   for (let i = 0; i < location.storeResults.length; i++){
//     newElement('li', ulElem, location.storeResults[i]);
//   }
// }

for (let i = 0; i < locArray.length; i++){
  locArray[i].genData();
  // renderStore(locArray[i]);
}

renderTable();
