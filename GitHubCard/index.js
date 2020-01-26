/* Step 1: using axios, send a GET request to the following URL 
          (replacing the palceholder with your Github name):
          https://api.github.com/users/<your name>
*/
axios
  .get ('https://api.github.com/users/seth-nelson')
  .then (response => {
    console.log(response);
    cardsDiv.appendChild(createCard(response.data))
  })

  .catch = (error => {
    console.log(error);
  })


/* Step 2: Inspect and study the data coming back, this is YOUR 
  github info! You will need to understand the structure of this 
  data in order to use it to build your component function 

  Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
          create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];
const urlArray = [];

axios
  .get('https://api.github.com/users/seth-nelson/followers')
  .then(response => {
    console.log(response);
    response.data.forEach((element) => {
      urlArray.push(`${element.url}`)
    })
      urlArray.forEach((element) => {
        axios.get(element)
          .then(response => {
            cardsDiv.appendChild(createCard(response.data));
          })
          .catch(error => {
            console.log(error);
          })
      })
  })
  .catch(error => {
    console.log(error);
  })


const cardsDiv = document.querySelector('.cards')


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/


function createCard(user) {

  const cardsDiv = document.createElement('div'),
        img = document.createElement('img'),
        info = document.createElement('div'),
        name = document.createElement('h3'),
        username = document.createElement('p'),
        location = document.createElement('p'),
        profile = document.createElement('p'),
        profileUrl = document.createElement('a'),
        followers = document.createElement('p'),
        following = document.createElement('p'),
        repositories = document.createElement('p'),
        bio = document.createElement('p');

        img.src = user.avatar_url;
        name.textContent = user.name;
        username.textContent = user.login;
        location.textContent = `Location: ${user.location}`;
        profile.textContent = `Profile: `;
        profileUrl.href = user.html_url;
        profileUrl.textContent = user.html_user;
        followers.textContent = `Followers: ${user.followers}`;
        following.textContent = `Folowing: ${user.following}`;
        repositories.textContent = `Repositories: ${user.public_repos}`;
        bio.textContent = user.bio;

        cardsDiv.appendChild(img);
        cardsDiv.appendChild(info);
        info.appendChild(name);
        info.appendChild(username);
        info.appendChild(location);
        info.appendChild(profile);
        profile.appendChild(profileUrl);
        info.appendChild(followers);
        info.appendChild(following);
        info.appendChild(repositories);
        info.appendChild(bio);

    cardsDiv.classList.add('card');
    info.classList.add('card-info');
    name.classList.add('name');
    username.classList.add('username');

  return cardsDiv;
}