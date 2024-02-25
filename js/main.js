let index_prefix = "";
if (window.location.href.includes("index.html")) {
  index_prefix = "pages/";
}

const logOut = () => {
  let prefix = "";
  localStorage.setItem("loggedIn", "false");
  localStorage.setItem("email", "");
  localStorage.setItem("password", "");
  if (!window.location.href.includes("index.html")) {
    prefix = "../";
  }

  location.href = `${prefix}index.html`;
};

const loggedIn = localStorage.getItem("loggedIn");

if (loggedIn != "true") {
  var registerNavItem = document.createElement("li"); // is a node
  registerNavItem.style = "margin-right: 10px";
  registerNavItem.classList.add("nav-item");
  registerNavItem.innerHTML = `
                    <a
                      href=${index_prefix}register.html
                      style="cursor: pointer;"
                      class="nav-link active link_button_style"
                      aria-current="page"
                      >Register</a
                    >
                  `;
  document.getElementById("mynavbar").appendChild(registerNavItem);

  var loginNavItem = document.createElement("li"); // is a node
  loginNavItem.style = "margin-right: 10px";
  loginNavItem.classList.add("nav-item");
  loginNavItem.innerHTML = `
                    <a href="${index_prefix}signin.html" style="cursor: pointer;" class="nav-link active link_button_style" aria-current="page"
                      >Log in</a
                    >
                  `;

  document.getElementById("mynavbar").appendChild(loginNavItem);
} else {
  var myEventsItem = document.createElement("li"); // is a node
  myEventsItem.style = "margin-right: 10px";
  myEventsItem.classList.add("nav-item");
  myEventsItem.innerHTML = `
              <a href="${index_prefix}my_events.html" class="nav-link link_event_style">My Events</a>
            `;
  document.getElementById("mynavbar").appendChild(myEventsItem);

  var logoutNavItem = document.createElement("li"); // is a node
  logoutNavItem.style = "margin-right: 10px";
  logoutNavItem.classList.add("nav-item");
  logoutNavItem.innerHTML = `
              <a class="nav-link active link_button_style" style="cursor: pointer;" onclick="logOut()">Log out</a>
            `;
  document.getElementById("mynavbar").appendChild(logoutNavItem);
}

const queryTable = (target_query, filterValue) => {
  let query = document.querySelector(filterValue).value;
  let myTable = document.querySelector(target_query);
  let allTds = myTable.querySelectorAll("tr");
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < allTds.length; i++) {
    let event_name = allTds[i]
      .querySelector("#event_name")
      .innerHTML.toLowerCase();
    let description = allTds[i].querySelector("#description");
    let event_campus = allTds[i]
      .querySelector("#event_campus")
      .innerHTML.toLowerCase();
    let campusSelected = document
      .getElementById("campus_filter")
      .value.toLowerCase();
    let typeFilter = document
      .getElementById("event_type_filter")
      .value.toLowerCase();

    let event_type = allTds[i]
      .querySelector("#event_type")
      .innerHTML.toLowerCase();

    let type_search_value = event_type == typeFilter || typeFilter == "all";
    console.log(event_campus != campusSelected);
    if (event_name.includes(query) || description.innerText.includes(query)) {
      console.log("event_campus " + event_campus);
      console.log("campusSelected " + campusSelected);
      allTds[i].style.display = type_search_value ? "" : "none";
      if (event_campus != campusSelected && campusSelected != "all")
        allTds[i].style.display = "none";
    } else {
      allTds[i].style.display = "none";
    }
  }
};

var ascendingOrder = true;

function sortTableByDate(tableId, date_field_position) {
  document.getElementById("sort_up").style.display = ascendingOrder
    ? ""
    : "none";
  document.getElementById("sort_down").style.display = ascendingOrder
    ? "none"
    : "";
  ascendingOrder = !ascendingOrder;
  var table = document.getElementById(tableId);
  var tbody = table.getElementsByTagName("tbody")[0];
  var rows = [].slice.call(tbody.getElementsByTagName("tr"));
  rows.sort(function (a, b) {
    let date1 = a.cells[date_field_position].innerText.split("/");
    let date2 = b.cells[date_field_position].innerText.split("/");
    var dateA = new Date(`${date1[0]}-${date1[1]}-${date1[2]}`);
    var dateB = new Date(`${date2[0]}-${date2[1]}-${date2[2]}`);
    // Toggle the order based on the flag
    var order = ascendingOrder ? dateA - dateB : dateB - dateA;
    return order;
  });
  rows.forEach(function (row) {
    tbody.appendChild(row);
  });
}

function convertTimeFormat(time) {
  let split_time = time.split(":");
  let formatted_time = time + " AM";
  if (parseInt(split_time[0]) > 12) {
    formatted_time = parseInt(split_time[0]) - 12 + ":" + split_time[1] + " PM";
  }
  return formatted_time;
}
function convertDateFormat(date) {
  let split_date = date.split("-");

  return split_date[1] + "/" + split_date[2] + "/" + split_date[0];
}

function selectCampus(campusName) {
  let campusesList = [
    "Macon",
    "Cochran",
    "Dublin",
    "Eastman",
    "Warner Robbins",
  ];

  campusesList.forEach((campus) => {
    let buttonSelected = document.getElementById(campus);
    if (campus == campusName) {
      buttonSelected.classList.add("event_rooms");
    } else {
      buttonSelected.classList.remove("event_rooms");
    }
  });

  let cards = document.querySelectorAll(".col");
  cards.forEach((card) => {
    console.log(card.id);
    card.style.display = card.id.startsWith(campusName) ? "" : "none";
  });
}
