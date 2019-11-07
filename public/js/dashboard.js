const access_token = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent('access_token').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"))
const url = '/stats'
let userGenreHistory = null

fetch(`${url}?access_token=Bearer ${access_token}`)
    .then((res)=>{
        if(res.status !== 200){
            alert("Some Error Occurred !")
            return
        }

        res.json().then((data)=>{
            userGenreHistory = data
            let chartConfig = gatherChartData(userGenreHistory)
            displayCategoryChart(chartConfig)
            
        }).catch((e)=>{
            alert( "An Error Occured : " + e)
        })
    })
    .catch((e)=>{
        alert(`API Error : ${e}`)
})


const gatherChartData = (userGenreHistory)=>{
    let labels = [] , data = []
    userGenreHistory.forEach((genre)=>{
        labels.push(genre[0])
        data.push(genre[1])
    })
    
    return {
        type: 'pie',
        labels,
        data
    }
}


const displayCategoryChart = (chartConfig)=>{

    var categoryChartContext = document.getElementById('chart-category').getContext('2d')
    var categoryChart = new Chart(categoryChartContext, {
        type: chartConfig.type,
        data: {
            labels: chartConfig.labels,
            datasets: [{
                label: '# of Votes',
                data: chartConfig.data,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                    'rgb(113, 102, 255)',
                    'rgb(103, 102, 255)',
                    'rgb(183, 102, 255)',
                    
                ],
                
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}