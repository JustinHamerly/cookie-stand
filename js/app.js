'use strict';

// -------------------- GLOBAL VARIABLES --------------------//
const Seattle = new StoreLocation('SEATTLE', 23, 65, 6.3);
const Tokyo = new StoreLocation('TOKYO', 3, 24, 1.2);
const Dubai = new StoreLocation('DUBAI', 11, 38, 3.7);
const Paris = new StoreLocation('PARIS', 20, 38, 2.3);
const Lima = new StoreLocation('LIMA', 2, 16, 4.6);

const locArray = [Seattle, Tokyo, Dubai, Paris, Lima];
const hoursArray = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM'];
const locDivElement = document.getElementById('locations');
const formElem = document.getElementById('addStoreForm');

// -------------------- CONSTRUCTOR FUNCTION --------------------//
function StoreLocation(locationName, minCustHour, maxCustHour, avgPerCust){
  this.locationName = locationName;
  this.minCustHour = minCustHour;
  this.maxCustHour = maxCustHour;
  this.avgPerCust = avgPerCust;
  this.customersPerHour = [];
  this.cookiesPerHour = [];
  this.storeResults = [];
}

// -------------------- CONSTUCTOR TOOLS / PROTOTYPE METHODS --------------------//
StoreLocation.prototype.renderRow = function(tbodyElem){
  const trElem = newElement('tr', tbodyElem, null);
  newElement('th', trElem, this.locationName);
  for (let i=0; i < this.cookiesPerHour.length; i++){
    newElement('td', trElem, this.cookiesPerHour[i]);
  }
  newElement('th', trElem, this.totalCookies);
};

StoreLocation.prototype.genData = function(){
  this.totalCookies = 0;
  for (let i = 0; i < hoursArray.length; i++){
    this.customersPerHour[i] = randCustPerHour(this.minCustHour, this.maxCustHour);
    this.cookiesPerHour[i] = Math.floor(this.customersPerHour[i] * this.avgPerCust);
    this.storeResults[i] = hoursArray[i] + ': ' + this.cookiesPerHour[i] + ' cookies';
    this.totalCookies += this.cookiesPerHour[i];
  }
};

// -------------------- GLOBAL FUNCTIONS --------------------//
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

function renderTable(){
  const tableElem = newElement('table', locDivElement, null);
  tableElem.id = 'salestable';
  const theadElem = newElement('thead', tableElem, null);
  const trElem = newElement('tr', theadElem, null);
  newElement('th', trElem, null);
  for (let i=0; i < hoursArray.length; i++){
    newElement('th', trElem, hoursArray[i]);
  }
  newElement('th', trElem, 'DAILY TOTALS');

  const tbodyElem = newElement('tbody', tableElem, null);
  tbodyElem.id = 'storerows';
  for (let i=0; i < locArray.length; i++){
    locArray[i].renderRow(tbodyElem);
  }

  getTableFooter(tableElem);
}

function getTableFooter(tableElem){
  const tfootElem = newElement('tfoot', tableElem, null);
  const trElem2 = newElement('tr', tfootElem, null);
  newElement('th', trElem2, 'HOURLY TOTAL');
  let dailyTotal=0;
  for(let i = 0; i < hoursArray.length; i++){
    let hourlyTotal = 0;
    for(let j = 0; j < locArray.length; j++){
      hourlyTotal += locArray[j].cookiesPerHour[i];
    }
    newElement('th', trElem2, hourlyTotal);
    dailyTotal += hourlyTotal;
  }
  newElement('th', trElem2, dailyTotal);
}

function handleSubmit(e){
  e.preventDefault();
  console.log(e);

  let locationName = e.target.locationName.value;
  let minCustHour = parseInt(e.target.minCustHour.value);
  let maxCustHour = parseInt(e.target.maxCustHour.value);
  let avgPerCust = parseInt(e.target.avgPerCust.value);

  let newStore = new StoreLocation(locationName, minCustHour, maxCustHour, avgPerCust);

  locArray.push(newStore);
  newStore.genData();
  const tableBodyElem = document.getElementById('storerows');
  newStore.renderRow(tableBodyElem);
  const tableElem = document.getElementById('salestable');
  getTableFooter(tableElem);
  tableElem.removeChild(tableElem.lastChild.previousSibling);
}

formElem.addEventListener('submit', handleSubmit);

// function renderStore(location) {
//   console.log(location);
//   const articleElem = newElement('article', locDivElement, null);
//   newElement('h3', articleElem, location.locationName);
//   const ulElem = newElement('ul', articleElem, null);
//   for (let i = 0; i < location.storeResults.length; i++){
//     newElement('li', ulElem, location.storeResults[i]);
//   }
// }

// -------------------- CALL FUNCTIONS --------------------//
for (let i = 0; i < locArray.length; i++){
  locArray[i].genData();
}

renderTable();

// for (let i = 0; i < locArray.length; i++){
//   renderStore(locArray[i]);
// }


