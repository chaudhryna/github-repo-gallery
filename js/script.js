// Div where profile info appears
const overview = document.querySelector(".overview");
const username = "chaudhryna";
const repoList = document.querySelector(".repo-list");

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
};

const getRepoData = async function () {
  const request = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&&per_page=100`
  );
  const repos = await request.json();
  repoInfo(repos);
  };

getRepoData();

  function repoInfo(repos) {
      for (let repo of repos) {
          let repoItem = document.createElement("li");
          repoItem.innerHTML = `
          <h3>${repo.name}</h3>
          `;
          console.log(repoItem);
          repoList.append(repoItem);
      }
  }