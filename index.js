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
	console.log(arr)
}

function init() {
	getMovieList();
};

init();
