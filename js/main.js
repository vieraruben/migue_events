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
                      class="nav-link active"
                      aria-current="page"
                      >Register</a
                    >
                  `;
  document.getElementById("mynavbar").appendChild(registerNavItem);

  var loginNavItem = document.createElement("li"); // is a node
  loginNavItem.style = "margin-right: 10px";
  loginNavItem.classList.add("nav-item");
  loginNavItem.innerHTML = `
                    <a href="${index_prefix}signin.html" class="nav-link active" aria-current="page"
                      >Login</a
                    >
                  `;

  document.getElementById("mynavbar").appendChild(loginNavItem);
} else {
  var myEventsItem = document.createElement("li"); // is a node
  myEventsItem.style = "margin-right: 10px";
  myEventsItem.classList.add("nav-item");
  myEventsItem.innerHTML = `
              <a href="${index_prefix}my_events.html" class="nav-link">My Events</a>
            `;
  document.getElementById("mynavbar").appendChild(myEventsItem);

  var logoutNavItem = document.createElement("li"); // is a node
  logoutNavItem.style = "margin-right: 10px";
  logoutNavItem.classList.add("nav-item");
  logoutNavItem.innerHTML = `
              <a class="nav-link active" onclick="logOut()">Logout</a>
            `;
  document.getElementById("mynavbar").appendChild(logoutNavItem);
}

const queryTable = (target_query, filterValue) => {
  let query = document.querySelector(filterValue).value;
  let myTable = document.querySelector(target_query);
  let allTds = myTable.querySelectorAll("tr");
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < allTds.length; i++) {
    let event_name = allTds[i].querySelector("#event_name").innerHTML;
    let description = allTds[i].querySelector("#description").innerHTML;
    let typeFilter = document.getElementById("event_type_filter").value;
    let event_type = allTds[i].querySelector("#event_type").innerHTML;

    let type_search_value = event_type == typeFilter || typeFilter == "all";
    if (event_name.includes(query) || description.includes(query)) {
      allTds[i].style.display = type_search_value ? "" : "none";
    } else {
      allTds[i].style.display = "none";
    }
  }
};

var ascendingOrder = true;
function sortTableByDate(tableId, date_field_position) {
  ascendingOrder = !ascendingOrder;
  var table = document.getElementById(tableId);
  var tbody = table.getElementsByTagName("tbody")[0];
  var rows = [].slice.call(tbody.getElementsByTagName("tr"));
  rows.sort(function (a, b) {
    var dateA = new Date(a.cells[date_field_position].textContent);
    var dateB = new Date(b.cells[date_field_position].textContent);
    // Toggle the order based on the flag
    var order = ascendingOrder ? dateA - dateB : dateB - dateA;
    return order;
  });
  rows.forEach(function (row) {
    tbody.appendChild(row);
  });
}
