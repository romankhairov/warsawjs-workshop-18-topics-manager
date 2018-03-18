require ('bulma');
const hello = require('hellojs');

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



