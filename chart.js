const {labels, datas} = [];
// const datas = [];
const data = {
    labels: labels,
    datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: datas,
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {}
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

//Calling API
//2020-01-24
const getHistory = async (country, date) => {
    const respond = await fetch(`https://covid-193.p.rapidapi.com/history?country=${country}&day=${date}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "509fd1eccemsh969732630b76558p1875cejsn6addd89c95ec"
        }
    })
    const data = await respond.json();
    return data;
}

// Date
Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }

for (let i = 0; i <= 30; i++) {
    let d = new Date();
    const todayDate = d.toISOString().substr(0,10);
    const last30Days = d.setDate(d.getDate() - i);
    // new Date(last30Days).toISOString().substr(0,10);
    getHistory('usa', new Date(last30Days).toISOString().substr(0,10)).then(d => {
        console.log(d.response[0].day);
        console.log(d.response[0].cases.new.substr(1));
    }).catch(e => {
        console.log(e);
    })
}


// const date1 = new Date().toISOString().substr(0,10);
// // console.log(date1);
// getHistory("cambodia", date1).then(d => {
//     console.log(d);
// }).catch(e => {
//     console.log(e);
// })

