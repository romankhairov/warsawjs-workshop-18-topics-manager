require ('bulma'); // css framework


const hello = require('hellojs'); // external package
const config = require('./config');// make data more organized with external package

const $form = document.querySelector(".js-form-add-topic"); //$+name - is for quicker indicate of query obj
const $login = document.querySelector(".js-login-via-github");
const $logout = document.querySelector(".js-logout-via-github");
const $user = document.querySelector(".user");



hello.init({
    github: config.GITHUB.CLIENT_ID
});


const getUserData = () => {
    
    hello('github').api('/me')
        .then(function (userProfile) {
             renderUserDetails(userProfile)
         })
    
};

const userAuthCheck = hello('github').getAuthResponse();

// check for login only once
if ( userAuthCheck !== null) {
    
    getUserData(); 
    
}



$login.addEventListener('click', (e) => {
    console.log("login");
    e.preventDefault();
    hello('github').login()
        .then(function () { 
            getUserData();
        
});
   
    


$form.addEventListener('submit', (e) => {
    e.preventDefault();
    const $form = document.querySelector('.js-form-add-topic');
    const data = new FormData($form);
    const map = new Map(data.entries());
    console.log(map);
    
    $form.reset();
    renderTopics(map)

});

function renderTopics(map) {
    
    const template2 = `
    <div class="column is-3">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        "Temat nr. 1"
                    </p>
                </header>
                <div class="card-content">
                    <div class="content">
                        Opis tematu...
                    </div>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item">Zagłosuj</a>
                    <a href="#" class="card-footer-item">Chcę być trenerem</a>
                </footer>
            </div>
        </div>

`
    
}


('submit', (e) => {
    
});





$login.addEventListener('click', (e) => {

    e.preventDefault();
    hello('github').login()
        .then(function () { 
            return hello('github').api('/me');
        })
            .then(function (userProfile) {
                renderUserDetails(userProfile);
            })

});


function renderUserDetails(userProfile) {
    const template = `
        <div class="navbar-item">
            ${userProfile.login}
            ${userProfile.location}
    
            <img src="${userProfile.avatar_url}" alt=""/>
        </div>  
`
    $user.innerHTML += template;
    
};


$logout.addEventListener('click', () => {
        console.log("logout");
        hello.logout('github')
            .then(() => location.reload(true))
    });