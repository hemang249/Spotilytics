const access_token = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent('access_token').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"))
const url = '/stats'

var http = new XMLHttpRequest()
http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       console.log("Success")
    }
};

http.open('GET',`/stats?access_token=Bearer ${access_token}`,true)
http.setRequestHeader("Content-type", "application/json")
http.send()

