const app = document.querySelector("#app");

function getMovieList() {
	//todo json을 아예 가져올때 필터링으로 title, genre, summary, image만 갖고오기
    fetch("https://yts.lt/api/v2/list_movies.json?sort_by=download_count"
    ).then(function (response) {
        return response.json();
    }).then(function (json) {
		const movies = json.data.movies
		componentMake(movies);
	})
};

function componentMake(arr) {
	console.log(arr)
	for (let i = 0; i < arr.length; i++) {
		
		// element 만들기
		const movieDiv = document.createElement("div"); 
		const imgDiv = document.createElement("div");
		const contentDiv = document.createElement("div")

		const img = document.createElement("img"); 
		const title = document.createElement("div");
		const summary = document.createElement("div");
		const genreDiv = document.createElement("div"); 

		// element 자식으로 넣기
		app.appendChild(movieDiv);
		movieDiv.appendChild(imgDiv);
		movieDiv.appendChild(contentDiv);

		imgDiv.appendChild(img);
		contentDiv.appendChild(title);
		contentDiv.appendChild(genreDiv);
		contentDiv.appendChild(summary);

		// 포스터, 제목, 요약 가져와서 img, div에 넣기
		img.src = arr[i].medium_cover_image;
		title.innerText = arr[i].title;
		summary.innerText = arr[i].summary;

		// 장르 배열 가져와서 span에 넣기
		const genres = arr[i].genres;
		
		for (let n = 0; n < genres.length; n++) {
			const movieGenre = document.createElement("span");
			genreDiv.appendChild(movieGenre);
			movieGenre.innerText = genres[n]
		};

		// css클래스 추가
		movieDiv.classList.add("movieDiv");
		contentDiv.classList.add("contentDiv");
		imgDiv.classList.add("imgDiv")
		summary.classList.add("summary")
		title.classList.add("title")
	};
}

function init() {
	getMovieList();
};

init();
