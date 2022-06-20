const APIURL = 'https://api.github.com/users/';

const form = document.querySelector('.user-form');
const user = document.getElementById("search");

form.addEventListener( "submit", function (evt) {
    evt.preventDefault();

    getUser();
  });

async function getUser() {
  try {
    destroyCard();
    const userData = await fetch (APIURL + user.value, {
        headers: {
            'Accept': 'application/json',
        }
    });
      if (!userData.ok) {
          createCard(true);   
      }
      
  } catch (error) {
    console.error("error");
  }
}

async function getUser(){
    destroyCard();
    const userData = await fetch (APIURL + user.value, {
        headers: {
            'Accept': 'application/json',
        }
    });
      if (!userData.ok) {
          createCard(true);   
      }
    else{
       const userObj = await userData.json();
    
        createCard(false);
        const avatarDiv = document.createElement("div"); 
        const avatar = document.createElement("img");
        const userInfo = document.createElement("div");
        const userInfoList = document.createElement("ul");
        const userInfoListNodes = [document.createElement("li"), document.createElement("li"), document.createElement("li")];
        const username = document.createElement("h2");
        const bio = document.createElement("p");
        const repoListNode = [];
        const repoList = document.createElement("ul");

        // Append to main:


        document.querySelector('.card').appendChild(avatarDiv);
        avatarDiv.setAttribute('class', 'avatarDiv');

        document.querySelector('.avatarDiv').appendChild(avatar);
        avatar.setAttribute('class', 'avatar');
        avatar.setAttribute('src', userObj.avatar_url);

        document.querySelector('.card').appendChild(userInfo);
        userInfo.setAttribute('class', 'user-info');

        document.querySelector('.user-info').appendChild(username);
        username.innerHTML = userObj.login;

        document.querySelector('.user-info').appendChild(bio);
        bio.innerHTML = userObj.bio;

        document.querySelector('.user-info').appendChild(userInfoList);

        for(let i = 0; i < userInfoListNodes.length; i++){
            document.querySelector('.user-info ul').appendChild(userInfoListNodes[i]);
            switch (i){
                case 0:
                    userInfoListNodes[i].innerHTML = userObj.followers + " Followers";
                break;
                case 1:
                    userInfoListNodes[i].innerHTML = userObj.following + " Following";
                break;
                case 2:
                    userInfoListNodes[i].innerHTML = userObj.public_repos + " Repos";
                break;
            }
        }
        console.log();
        const reposData = await fetch (userObj.repos_url, {
            headers: {
                'Accept': 'application/json',
            }
        });
        const reposObj = await reposData.json();
        const repositories = reposObj.map(item => item.name);
        const reposLink = reposObj.map(item => item.name);


        document.querySelector('.user-info').appendChild(repoList);
        repoList.setAttribute('id', 'repos');
        repoList.setAttribute('class', 'row');

        for(let i = 1; i < repositories.length; i++){
            repoListNode[i] = document.createElement("li");
            document.getElementById('repos').appendChild(repoListNode[i]);
            repoListNode[i].setAttribute('class', 'repo');
            let a = document.createElement("a");
            repoListNode[i].appendChild(a);
            a.setAttribute('href', 'https://github.com/adriansunye/' + repositories[i]);
            a.setAttribute('class', 'noDecoration');
            a.innerHTML = repositories[i];      
        } 
    }   
}

function createCard(bool){
    const card = document.createElement("card");
    
    document.getElementById('main').appendChild(card);
    card.setAttribute('class', 'card');  
    if (bool){
        const noExist = document.createElement("h2");
        document.querySelector('.card').appendChild(noExist);
        noExist.innerHTML = "L'usuari introduit no existeix.";
        }
}

function destroyCard(){
    let main =document.getElementById('main');
    if(main.hasChildNodes()){
        main.removeChild(main.childNodes[0]);
       }
}