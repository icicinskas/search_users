"use strict";

const API_URL = "https://api.github.com/users/";
const app = document.getElementById("app");
const form = document.querySelector("form");
const search = document.querySelector("input");

// Load github users
function loadGitHubUser(name) {
  return fetch(API_URL + name).then((response) => response.json());
}

function loadCardData(data) {
  app.innerHTML = `
    <div class="card">
        <div>
          <img
            class="avatar"
            src="${data.avatar_url}"
            alt="${data.name}"
          />
        </div>
        <div class="user-info">
          <h2>${data.name}</h2>
          <p>${data.bio}</p>
          <ul>
            <li>${data.followers}<strong>Followers</strong></li>
            <li>${data.following}<strong>Following</strong></li>
            <li>${data.public_repos}<strong>repos</strong></li>
          </ul>
          <div id="repos"></div>
        </div>
    </div>
      `;
  console.log(data);
}

// Load github users repositories
function loadRepos(name) {
  return fetch(API_URL + name + "/repos").then((response) => response.json());
}

function addReposToCard(repos) {
  var allRepos = document.getElementById("repos");
  var reposSlice = repos.slice(0, 10);
  reposSlice.forEach((x) => {
    var reposEl = document.createElement("a");
    reposEl.classList.add("repo");

    reposEl.innerText = x.name;
    reposEl.href = x.html_url;
    reposEl.target = "_blank";
    allRepos.append(reposEl);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var user = search.value;
  if (user) {
    loadGitHubUser(user).then(loadCardData);
    loadRepos(user).then(addReposToCard);
  }

  search.value = "";
});

// loadGitHubUser(icicinskas).then(loadCardData);
// loadRepos(icicinskas).then(addReposToCard);
