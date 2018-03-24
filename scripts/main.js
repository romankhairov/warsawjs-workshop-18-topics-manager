require ('bulma'); // 1) css framework


const hello = require('hellojs'); // 2) external package for auth
const config = require('./config');// make data more organized with external package

const $form = document.querySelector(".js-form-add-topic"); //$+name - is for quicker indicate of query obj
const $login = document.querySelector(".js-login-via-github");
const $logout = document.querySelector(".js-logout-via-github");
const $user = document.querySelector(".user");
const $mapElement = new Set();
const $jstopics = document.querySelector(".js-topics");
const $jsaddform = document.querySelector(".js-add-form");


// 12) prevent the lack of data
const userAuthCheck = hello('github').getAuthResponse();

if (userAuthCheck) {  
    hello('github').api('/me')
        .then(function (userProfile) {
             renderUserDetails(userProfile);
             $jsaddform.classList.remove("is-hidden");// unhide form for logged user
             $logout.classList.remove("is-hidden");// unhide logout button
         }); 
} 



// 3) config hellojs
hello.init({
    github: config.GITHUB.CLIENT_ID
});



$login.addEventListener('click', (evt) => { 
    evt.preventDefault(); // 5) turn off default act links 
    hello('github').login() // 4) log in
        // 6) function for automatic getting profile
        .then(function () {  
            return hello('github').api('/me');
        })  
            // 7) listener of getting user prof
            .then((userProfile) => renderUserDetails(userProfile));
                
});



// 9) template 
function renderUserDetails(userProfile) {
    const template = ` 
        <div class="navbar-item">
            ${userProfile.login}
            ${userProfile.location}
    
            <img src="${userProfile.avatar_url}" alt=""/>
        </div>  
`
    // 10) insert html element
    $user.innerHTML += template;
    
};


$logout.addEventListener('click', () => {
        console.log("logout");
        hello.logout('github')
            .then(() => location.reload(true)) // 11) refresh page after logout
    });






// 14) write "in-memory storage" data 
$form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData($form);
    const map = new Map(data.entries());
    console.log(map);
    
    // 15) clear fields
    $form.reset();
    
    // 16) refresh list of templates
    renderTopics(map)

});

function renderTopics(mapElement) {
    
    const template2 = `
    <div class="column is-3">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        ${mapElement.get("topic")}
                    </p>
                </header>
                <div class="card-content">
                    <div class="content">
                        ${mapElement.get("description")}
                    </div>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item">Zagłosuj</a>
                    <a href="#" class="card-footer-item">Chcę być trenerem</a>
                </footer>
            </div>
        </div>

`;
    // 18) add element
    $jstopics.innerHTML += template2;
    
};