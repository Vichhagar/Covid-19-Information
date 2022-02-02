const information = document.querySelector(".mainDetail");
const search = document.querySelector('form');
const divGraph = document.querySelector('.chart');

let line = [];

const countryState = async(country) => {
	information.innerHTML = 
	`
	<div class="mainDetail">
		<h3>Loading...</h3>
	</div>
	`
	const respond = await fetch(`https://covid-193.p.rapidapi.com/statistics?country=${country}`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "covid-193.p.rapidapi.com",
			"x-rapidapi-key": "509fd1eccemsh969732630b76558p1875cejsn6addd89c95ec"
		}
	})
	const data = await respond.json()
	return data;
}

//Get History
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

search.addEventListener('submit', e => {
	e.preventDefault();
	line = [];
	process(search.country.value);
	divGraph.style.border = 'none';
	divGraph.innerHTML = '';
	for (let i = 1; i <= 10; i++) {
		
		let d = new Date();
		const last20Days = d.setDate(d.getDate() - i);
		getHistory(search.country.value, new Date(last20Days).toISOString().substr(0,10)).then(d => {
			// console.log(d.response[0].cases.new.substr(1));
			// console.log("hi");
			print(d.response[0].cases.new.substr(1));
		}).catch(e => {
			console.log(e);
		})
	}
	search.reset();
})

const process = (countryName) => {
	countryState(countryName).then(d => {
		console.log(d.response[0]);
		displayData(d.response[0]);
	}).catch(e => {
		information.innerHTML = 
		`
		<div class="mainDetail">
			<h3 style="color: red">Not available: Too many request.</h3>
		</div>
		`
	});
}

const displayData = (data) => {

	const formatNum = (num) => {
		if(data.cases.new != null) {
			return num.toLocaleString(undefined, { 
				minimumFractionDigits: 0, 
				maximumFractionDigits: 0 
			  });
		} else {
			return NaN;
		}
	}

	const date = new Date().toLocaleDateString("en-US", {day: 'numeric', month: 'short', year: 'numeric'});
	
	information.innerHTML =

	`
	<div class="mainDetail">
		<h3>${data.country} | ${date}</h3>
		<div class="case">
			<div class="newCase">
				<h4>New Case</h4>
				<h2>${formatNum(data.cases.new)}</h2>
			</div>
			<div class="allCase">
				<h4>Total Case</h4>
				<h2>${formatNum(data.cases.total)}</h2>
			</div>
			<div class="recovery">
				<h4>Recovery</h4>
				<h2>${formatNum(data.cases.recovered)}</h2>
			</div>
			<div class="death">
				<h4>Total Death</h4>
				<h2>${formatNum(data.deaths.total)}</h2>
			</div>
		</div>
	</div>
	`
}


//Chart

//Calling API
//2020-01-24


// Date
// Date.prototype.addDays = function (days) {
//     let date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
//   }

//let say 50,000 perday max
function largest(arr) {  

	let max = arr[0]; 
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] > max) 
			max = arr[i]; 
	} 
	return max; 
} 

const print = (data) => {
	line.push(parseInt(data));
	// console.log(line);
    
	if (line.length == 10) {
		let max = largest(line);
		// console.log(max);
		divGraph.style.border = '2px solid black';
		line.forEach(e => {
			const hight = e * 100 / max;
			divGraph.innerHTML += 
			`<div style="height:${hight}px"></div>`
		})
	}

}




// const date1 = new Date().toISOString().substr(0,10);
// // console.log(date1);
// getHistory("cambodia", date1).then(d => {
//     console.log(d);
// }).catch(e => {
//     console.log(e);
// })

