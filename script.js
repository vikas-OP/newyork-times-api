let whole = document.createElement("div");
whole.setAttribute("class", "container bg-light");
whole.style.minHeight = "100vh";
let header = document.createElement("header");
header.setAttribute("class", "display-4 font-weight-bolder text-center");
header.innerText = "THE BEST TIMES";
let nav = document.createElement("nav");
nav.setAttribute(
  "class",
  "navbar sticky-top navbar-light bg-light navbar-expand-xl"
);
let toggle_button = document.createElement("button");
toggle_button.setAttribute("class", "navbar-toggler");
toggle_button.setAttribute("data-toggle", "collapse");
toggle_button.setAttribute("data-target", "#menu");
let span = document.createElement("span");
span.setAttribute("class", "navbar-toggler-icon");
toggle_button.append(span);
let collapse_div = document.createElement("div");
collapse_div.setAttribute("class", "collapse navbar-collapse");
collapse_div.id = "menu";
let nav_ul = document.createElement("ul");
nav_ul.setAttribute("class", "navbar-nav");
nav_ul.style.width = "100%";
let home_button = createButton("home", "HOME");
let world_button = createButton("world", "WORLD");
let politics_button = createButton("politics", "POLITICS");
let magazine_button = createButton("magazine", "MAGAZINE");
let technology_button = createButton("technology", "TECHNOLOGY");
let science_button = createButton("science", "SCIENCE");
let health_button = createButton("health", "HEALTH");
let sports_button = createButton("sports", "SPORTS");
let arts_button = createButton("arts", "ARTS");
let fashion_button = createButton("fashion", "FASHION");
let food_button = createButton("food", "FOOD");
let travel_button = createButton("travel", "TRAVEL");
nav_ul.append(
  home_button,
  world_button,
  politics_button,
  magazine_button,
  technology_button,
  science_button,
  health_button,
  sports_button,
  arts_button,
  fashion_button,
  food_button,
  travel_button
);
collapse_div.append(nav_ul);
nav.append(toggle_button, collapse_div);

//header and nav bar over
let data_div = document.createElement("div");
data_div.setAttribute("class", "row");
whole.append(header, nav, data_div);
document.body.append(whole);
home_button.addEventListener("click", () => {
  request("home");
});
world_button.addEventListener("click", () => {
  request("world");
});
politics_button.addEventListener("click", () => {
  request("politics");
});
magazine_button.addEventListener("click", () => {
  request("magazine");
});
technology_button.addEventListener("click", () => {
  request("technology");
});
science_button.addEventListener("click", () => {
  request("science");
});
health_button.addEventListener("click", () => {
  request("health");
});
sports_button.addEventListener("click", () => {
  request("sports");
});
arts_button.addEventListener("click", () => {
  request("arts");
});
fashion_button.addEventListener("click", () => {
  request("fashion");
});
food_button.addEventListener("click", () => {
  request("food");
});
travel_button.addEventListener("click", () => {
  request("travel");
});
request("home");
//nav bar buttons
function createButton(id, name) {
  let li = document.createElement("li");
  li.setAttribute("class", "nav-item");
  li.style.width = "100%";
  let button = document.createElement("button");
  button.id = id;
  button.setAttribute("class", "nav-link small text-warning btn-dark");
  button.innerText = name;
  button.style.width = "100%";
  li.append(button);
  return li;
}

//fetching data
async function request(section) {
  let url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=1Ac3y0s0JuhY7qzanDYi0X07hfI0StY1`;
  let data = await fetch(url);
  data = await data.json();
  data = data.results;
  data_div.innerHTML = "";
  data.forEach((val) => {
    let card = createCard(val);
    data_div.append(card);
  });
}

function createCard(info) {
  let card = document.createElement("div");
  card.setAttribute("class", "card p-3 m-3");
  card.style.width = "100%";
  let row = document.createElement("div");
  row.setAttribute("class", "row");
  let col_data = document.createElement("div");
  col_data.setAttribute("class", "col-md-9 order-md-first order-last");
  //section and item
  let sec_item = document.createElement("div");
  sec_item.setAttribute("class", "row my-2");
  let sec = document.createElement("div");
  sec.setAttribute("class", "col-6 h4 text-left text-uppercase sectioncard");
  sec.innerText = info.section;
  let item = document.createElement("div");
  item.setAttribute("class", "col-6 h6 text-right align-self-center");
  item.innerText = info.item_type;
  sec_item.append(sec, item);
  //title
  let title = document.createElement("div");
  title.setAttribute("class", "p titlecard my-2");
  title.innerHTML = `${info.title} &nbsp;&nbsp;-${info.byline}`;
  //date
  let date = document.createElement("div");
  date.setAttribute("class", "datecard p my-2");
  let date_data = info.created_date.split("");
  let month = getMonth(parseInt(date_data.slice(5, 7).join("")));
  let day = date_data.slice(8, 10).join("");
  date.innerText = month + " " + day;
  //abstract
  let abstract = document.createElement("div");
  abstract.setAttribute("class", "abstractcard p my-2");
  abstract.innerText = info.abstract;
  //continue reading
  let continue_read = document.createElement("div");
  continue_read.setAttribute("class", "continueReading p my-2");
  let a = document.createElement("a");
  a.href = info.short_url;
  a.target = "_blank";
  a.innerText = "Continue Reading";
  continue_read.append(a);
  col_data.append(sec_item, title, date, abstract, continue_read);

  //image
  let col_img = document.createElement("div");
  col_img.setAttribute("class", "col-md-3 order-1 order-md-2");
  let img = document.createElement("img");
  img.src = info.multimedia[4].url;
  img.setAttribute("class", "img-thumbnail h-100 w-100");
  img.alt = "Image";

  col_img.append(img);
  row.append(col_data, col_img);
  card.append(row);
  return card;
}

//get month function
function getMonth(a) {
  if (a == 1) {
    return "January";
  }
  if (a == 2) {
    return "February";
  }
  if (a == 3) {
    return "March";
  }
  if (a == 4) {
    return "April";
  }
  if (a == 5) {
    return "May";
  }
  if (a == 6) {
    return "June";
  }
  if (a == 7) {
    return "July";
  }
  if (a == 8) {
    return "August";
  }
  if (a == 9) {
    return "September";
  }
  if (a == 10) {
    return "October";
  }
  if (a == 11) {
    return "November";
  }
  if (a == 12) {
    return "December";
  }
}
