function login() {
    var user = $('user').getValue();
    var params = 'action=login&user=' + user + "&password=" + $('password').getValue();
    new Ajax.Request('ajax/authenticate.php?' + params, {method:'get',
        onSuccess: function(transport) {
            if(transport.responseText.match('ok')) {
                $('loggedinuser').innerHTML = user;
                $('logout').toggle();
                $('login').toggle();
            } else {
            	new Effect.Shake('loginbutton');
            }
        }
    });
}

function logout() {
    new Ajax.Request('ajax/authenticate.php?action=logout', {method:'get',
        onSuccess: function(transport) {
            if(transport.responseText.match('1')) {
                $('loggedinuser').innerHTML = "";
                $('logout').toggle();
                $('login').toggle();
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
}