const logOut = () => {
  localStorage.setItem("loggedIn", "false");
  localStorage.setItem("email", "");
  localStorage.setItem("password", "");
  location.href = "index.html";
};

const loggedIn = localStorage.getItem("loggedIn");

if (loggedIn != "true") {
  var registerNavItem = document.createElement("li"); // is a node
  registerNavItem.style = "margin-right: 10px";
  registerNavItem.classList.add("nav-item");
  registerNavItem.innerHTML = `
                    <a
                      href="register.html"
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
                    <a href="signin.html" class="nav-link active" aria-current="page"
                      >Login</a
                    >
                  `;

  document.getElementById("mynavbar").appendChild(loginNavItem);
} else {
  var myEventsItem = document.createElement("li"); // is a node
  myEventsItem.style = "margin-right: 10px";
  myEventsItem.classList.add("nav-item");
  myEventsItem.innerHTML = `
              <a href="my_events.html" class="nav-link">My Events</a>
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

    if (event_name.includes(query) || description.includes(query)) {
      allTds[i].style.display = "";
    } else {
      allTds[i].style.display = "none";
    }
  }
};

const queryTableType = (target_query, filterValue) => {
  let query = document.querySelector(filterValue).value;
  console.log("query " + query);
  let myTable = document.querySelector(target_query);
  let allTds = myTable.querySelectorAll("tr");
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < allTds.length; i++) {
    let type = allTds[i].querySelector("#event_type").innerHTML;
    console.log("type " + type);

    if (type.includes(query) || query == "all") {
      allTds[i].style.display = "";
    } else {
      allTds[i].style.display = "none";
    }
  }
};
