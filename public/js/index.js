const access_token = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent('access_token').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"))
const url = '/stats'

fetch(`${url}?access_token=Bearer ${access_token}`)
    .then((res)=>{
        if(res.status !== 200){
            alert("Some Error Occurred !")
            return
        }

        res.json().then((data)=>{
            console.log(data)
        }).catch((e)=>{
            alert(e)
        })
    })
    .catch((e)=>{
        alert(`API Error : ${e}`)
    })




