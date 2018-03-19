require ('bulma');


const hello = require('hellojs');
const config = require('./config').GITHUB;
console.log(config.CLIENT_ID)

const $form = document.querySelector(".js-form-add-topic");


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


var userCheck = hello('github').getAuthResponse();

if (userCheck) {
  
    hello('github').api('/me')
        .then(function (userProfile) {
        console.log(userProfile);
        renderUserDetails(userProfile)
    });
    
};

hello.init({
    github: 'c8917518020c7fc8f6a8'
});

//const $login = document.querySelector(".js-login-via-github");
//$login.onclick = function () {
//        console.log("Test");
//    };
//
//document.querySelector(".js-login-via-github");
// onclick = function () {
//        console.log("Test 2");
//    };

const $login = document.querySelector(".js-login-via-github");
const $logout = document.querySelector(".js-logout-via-github");
const $user = document.querySelector(".user");



$login.addEventListener('click', (e) => {

    e.preventDefault();
    hello('github').login()
        .then(function () { 
            return hello('github').api('/me');
        })
            .then(function (userProfile) {
                console.log(userProfile);
                renderUserDetails(userProfile)
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
    
}

$logout.addEventListener('click', () => {
        console.log("logout");
        hello.logout('github')
            .then(function () {
                location.reload(true);
            })
    });




