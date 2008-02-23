/* For unittesting the arena and the bot stup */

function startTests() {
    $('testreports').innerHTML = "";
    for (i in window) {
        if (i.startsWith("test")) {
            try {
                eval(i + "()");
                reportStatus(true, i);
            } catch(e) {
                reportStatus(false, i, e);
            }
        }
    }
}

function reportStatus(status, testname, error) {
    var e = new Element('tr');
    $('testreports').insert(e);

    e.addClassName(status ? 'ok_test' : "failed_test");
    e.innerHTML = "<td>"+testname+"</td><td>"+ (status ? "OK" : error)+"</td>";

}

function fail(message) {
    throw("Fail:" + message);
}

function assertEquals(reason, a, b) {
    if(a != b) {
        throw ("AssertEquals failed:"+reason);        
    }
}

function assertTrue(condition) {
    if (!condition) {
        throw ("AssertTrue failed");
    }
}