const information = document.querySelector(".mainDetail");
const search = document.querySelector('form');

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

search.addEventListener('submit', e => {
	e.preventDefault();
	console.log(search.country.value);
	process(search.country.value);
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
			<h3 style="color: red">Not available: ${e}</h3>
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