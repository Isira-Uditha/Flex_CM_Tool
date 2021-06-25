var UserSession = (function() {
    var full_name = "";


    var setName = function(name) {
        console.log("pppp"+name)
        full_name = name;
        localStorage.setItem('user', name);

    };



    var getName = function() {

        const user =  localStorage.getItem('user')
        return user;    // Or pull this from cookie/localStorage
    };

    return {
        getName: getName,
        setName: setName
    }

})();

export default UserSession;