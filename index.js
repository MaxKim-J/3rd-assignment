const app = document.querySelector("#app");

function getMovieList() {
	//todo json을 아예 가져올때 필터링으로 title, genre, summary, image만 갖고오기
	// api fetch 더 공부
    fetch("https://yts.lt/api/v2/list_movies.json?sort_by=download_count"
    ).then(function (response) {
        return response.json();
    }).then(function (json) {
		const movies = json.data.movies
		componentMake(movies);
	})
}

function componentMake(arr) {
	console.log(arr)
	for (let i = 0; i < arr.length; i++) {
		const movieDiv = document.createElement("div"); 
		app.appendChild(movieDiv);

		const img = document.createElement("img"); 
		const title = document.createElement("p")
		const summary = document.createElement("p")

		const movieGenre = document.createElement("span");

		movieDiv.appendChild(img);
		movieDiv.appendChild(title);
		movieDiv.appendChild(summary);

		img.src = arr[i].medium_cover_image
		title.innerText = arr[i].title
		summary.innerText = arr[i].summary
	}
}

function init() {
	getMovieList();
};

init();
