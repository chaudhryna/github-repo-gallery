// Div where profile info appears
const overview = document.querySelector(".overview");
const username = "chaudhryna";
const repoList = document.querySelector(".repo-list");
const repoInformation = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToReposBtn = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const getUserData = async function () {
  const request = await fetch(
    `https://api.github.com/users/${username}`
  );
  const data = await request.json();
  displayUserData(data);
};

getUserData();

function displayUserData(data) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    
    userInfo.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
    <p><strong>Name: </strong> ${data.name}</p>
    <p><strong>Bio: </strong> ${data.bio}</p>
    <p><strong>Location: </strong> ${data.location}</p>
    <p><strong>Number of public repos: </strong> ${data.public_repos}</p>
    </div> 
    `
    overview.append(userInfo); 
    getRepoData(username); 
};

const getRepoData = async function (username) {
  const request = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&&per_page=100`
  );
  const repos = await request.json();
  repoDetail(repos);
};

function repoDetail(repos) {
    filterInput.classList.remove("hide");

    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `
        <h3>${repo.name}</h3>
        `;
        repoList.append(repoItem);
    }
};

repoList.addEventListener('click', function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getSingleRepo(repoName);
    }
});


const getSingleRepo = async function (repoName) {
    const request = await fetch(
        `https://api.github.com/repos/${username}/${repoName}`
    );
    const repoInfo = await request.json();
    
    const fetchLanguages = await fetch(
        repoInfo.languages_url
        );
    const languageData = await fetchLanguages.json();
    // Make a list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    specificRepo(repoInfo, languages);
};

function specificRepo(repoInfo, languages) {
    repoData.innerHTML = "";
    const selectRepo = document.createElement("div");

    selectRepo.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(selectRepo);

    repoData.classList.remove("hide");
    repoInformation.classList.add("hide");
    backToReposBtn.classList.remove("hide");
};

backToReposBtn.addEventListener('click', function() {
    repoData.classList.add("hide");
    repoInformation.classList.remove("hide");
    backToReposBtn.classList.add("hide");
});

filterInput.addEventListener('input', function(e) {
    const searchInput = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchFor = searchInput.toLowerCase();

    console.log(repos);

    for (const repo of repos) {
        const targetRepo = repo.innerText.toLowerCase();
        
        if (targetRepo.includes(searchFor)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});