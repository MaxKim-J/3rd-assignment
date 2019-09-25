const app = document.querySelector("#app");

function getMovieList() {
    fetch("https://yts.lt/api/v2/list_movies.json?sort_by=download_count"
    ).then(function (response) {
        return response.json();
    }).then(function (json) {
		const movies = json.data.movies
		componentMake(movies);
	})
}

function componentMake(arr) {
	// Json 데이터를 넣는 컴포넌트 만들기
	// genre, title, summary
	// for문으로
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

		console.log(arr[i])
	}
}

function init() {
	getMovieList();
};

init();
