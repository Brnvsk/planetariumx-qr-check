// const apiUrl = 'http://localhost:5050' //local
const apiUrl = 'https://pleasant-underwear-goat.cyclic.app'
const content = document.getElementById('content')

const query = new URLSearchParams(window.location.search)
const bookingId = query.get('q')
if (!bookingId) {
    content.innerHTML = 'No Data';
} else {
    fetch(`${apiUrl}/api/booking/qr/${bookingId}`)
        .then(res => res.json())
        .then(data => {
            content.innerHTML = `

			<div class="wrapper">
				<div class="info">
					<div class="header">
					<span>id билета: ${bookingId}</span>
						<h1 class="title">${data.title}</h1>
					</div>
					<img class="poster" src="${data.poster_src}" />
				</div>
				<p>Дата и время: ${data.date} ${data.time}</p>
				<p>Адрес: ${data.address}</p>
				
				<p>Рассадка:</p>
				<ul class="places">
					${JSON.parse(data.places).map(place => formatPlace(place)).join('')}
				</ul>
			</div>
			`
        })
}

function formatPlace(place) {
    return `<li>${place.side === 'left' ? 'Слева' : 'Справа'}, ряд ${place.row}, место ${place.place}</li>`
}