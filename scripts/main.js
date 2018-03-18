require ('bulma');
const hello = require('hellojs');

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
const $user = document.querySelector(".js-user");

$login.addEventListener('click', (e) => {

    e.preventDefault();
    hello('github').login()
        .then(function () {
            return hello('github').api('/me');
        })
        .then(function (userProfile) {
            console.log(userProfile.login);
            console.log(userProfile.avatar_url);
            renderUserDetails(userProfile)
        })

});

function renderUserDetails(userProfile) {
    const template = `
        <div class="navbar-item">
            ${userProfile.login}
    
            <img src="${userProfile.avatar_url}" alt=""/>
        </div>  
`
    $user.innerHTML += template;
    $user.innerHTML += template;
    
}




//const $logout = document.querySelector(".js-logout-via-github");

//$logout.addEventListener('click', (e) => {
//    
//        e.preventDefault();
//        hello('github').login()
//        .then(function () {
//            return hello('github').api('/me');
//        })
//        .then(function (userProfile) {
//            console.log(userProfile);
//        })
//                
//    });



