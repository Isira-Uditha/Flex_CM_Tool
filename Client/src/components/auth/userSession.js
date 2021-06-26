var UserSession = (function() {
    var full_name = "";
    var role_type = "";


    var setName = function(name) {
        console.log("pppp"+name)
        full_name = name;
        localStorage.setItem('user', name);

    };

    var getName = function() {

        const user =  localStorage.getItem('user')
        return user;    // Or pull this from cookie/localStorage
    };

    var setRole = function(role) {
        role_type = role;
        localStorage.setItem('role', role);
    };
    var getRole = function() {
       const role =  localStorage.getItem('role')
        return role;
    };


    return {
        getName: getName,
        setName: setName,
        setRole: setRole,
        getRole: getRole
    }

})();

export default UserSession;