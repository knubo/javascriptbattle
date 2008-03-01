function doUpload() {
    $('uploadform').request();
}

function login() {
    var user = $('user').getValue();
    var pass = $('password').getValue();

    if (user.length == 0 || pass.length == 0) {
        alert("Please provide user name and password.");
        return;
    }

    var params = 'action=login&user=' + user + "&password=" + pass;
    new Ajax.Request('ajax/authenticate.php?' + params, {method:'get',
        onSuccess: function(transport) {
            if (transport.responseText.match('ok')) {
                $('loggedinuser').innerHTML = user;
                $$('div.loginControlled').invoke("toggle");
            } else {
                new Effect.Shake('loginbutton');
            }
        }
    });
}

function newUser() {
    var user = $('user').getValue();
    var pass = $('password').getValue();

    if (user.length == 0 || pass.length == 0) {
        alert("Please provide wanted user name and password for new user.");
        return;
    }


    var params = 'user=' + user + "&password=" + pass;
    new Ajax.Request('ajax/users.php?' + params, {method:'get',
        onSuccess: function(transport) {
            var response = transport.responseJSON;

            if (response.taken) {
                alert("Requested user name is already been taken. Pick another username");
                return;
            }
            if (response.result) {
                login();
            } else {
                alert("Failed to create new user.");
            }
        }
    });
}

function logout() {
    new Ajax.Request('ajax/authenticate.php?action=logout', {method:'get',
        onSuccess: function(transport) {
            if (transport.responseText.match('1')) {
                $('loggedinuser').innerHTML = "";
                $$('div.loginControlled').invoke("toggle");
            } else {
                new Effect.Shake('logoutbutton');
            }
        }
    });
}

function setup() {

    $('loginbutton').observe('click', function() {
        login();
    });

    $('logoutbutton').observe('click', function() {
        logout();
    });

    $('uploadButton').observe('click', function() {
        doUpload();
    });

    $('newuserbutton').observe('click', function() {
        newUser();
    })

}