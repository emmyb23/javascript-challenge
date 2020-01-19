// from data.js
var tableData = data;
var count = 0;
 
// DOM ref
var $tbody = document.querySelector("tbody");
var $dateTimeInput = document.querySelector("#date_time");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $recordCounter = document.querySelector("#recordCounter");
var $pages = document.querySelector("#pages");
var $loadBtn = document.querySelector("#load");
var $nextBtn = document.querySelector("#next");
var $prevBtn = document.querySelector("#prev");

// event listeners
$searchBtn.addEventListener("click", handleSearchButtonClick);
$loadBtn.addEventListener("click", handleReloadButtonClick);
$nextBtn.addEventListener("click", handleNextButtonClick);
$prevBtn.addEventListener("click", handlePrevButtonClick);
$pages.addEventListener("change", handlePagesChange);



// event handler function with increments
function handleNextButtonClick() {
    count++;
    renderTable();
}
function handlePrevButtonClick() {
    count--;
    renderTable();
}
function handlePagesChange() {
    renderTable();
}

// search button input and table render
function handleSearchButtonClick() {
    var filterDate = $dateTimeInput.value.trim();
    var filterCity = $cityInput.value.trim().toLowerCase();
    var filterState = $stateInput.value.trim().toLowerCase();
    var filterCountry = $countryInput.value.trim().toLowerCase();
    var filterShape = $shapeInput.value.trim().toLowerCase();

    if (filterDate != "") {
        tableData = tableData.filter(function (date) {
        var dataDate = date.datetime;
        return dataDate === filterDate;
    });

    }

    if (filterCity != "") {
        tableData = tableData.filter(function (city) {
        var dataCity = city.city;
        return dataCity === filterCity;
    });
    }

    if (filterState != "") {
        tableData = tableData.filter(function (state) {
            var dataState = state.state;
            return dataState === filterState;
        });
    }

    if (filterCountry != "") {
        tableData = tableData.filter(function (country) {
            var dataCountry = country.country;
            return dataCountry === filterCountry;
        });
    }

    if (filterShape != "") {
        tableData = tableData.filter(function (shape) {
            var dataShape = shape.shape;
            return dataShape === filterShape;
        });
    }

    renderTable();
}

// search reset
function handleReloadButtonClick() {
    count = 0;
    tableData = data;
    $dateTimeInput.value = '';
    $cityInput.value = '';
    $stateInput.value = '';
    $countryInput.value = '';
    $shapeInput.value = '';

    renderTable();
}

// clear previous table
function renderTable() {
    $tbody.innerHTML = "";

    var pages = Number(document.getElementById("pages").value);
    var start = count * pages + 1;
    var end = start + pages - 1;
    var btn;

    // loop and display
    if (end > tableData.length) {
      end = tableData.length;
      btn = document.getElementById("next");
      btn.disabled = true;
    }
    else {
      btn = document.getElementById("next");
      btn.disabled = false;
    }

    if (start == 1) {
      btn = document.getElementById("prev");
      btn.disabled = true;
    }
    else {
      btn = document.getElementById("prev");
      btn.disabled = false;
    }

    // load records into table
    $recordCounter.innerText = "From Record: " + start + " to: " + end + " of " + tableData.length;
    // Outer loop loads specified number of records
    for (var i = 0; i < pages; i++) {
        var item = tableData[i+(count * pages)];
        var fields = Object.keys(item);
        var $row = $tbody.insertRow(i);
        // Inner loop loads fields in record
        for (var j = 0; j < fields.length; j++) {
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = item[field];
        }
    }
}

renderTable();