const app = document.querySelector("#app");
const loading = document.querySelector(".loading");
//todo 모달 이용하여 상세 페이지 만들기(토요일)

function getMovieList() {
  axios.get('https://yts.lt/api/v2/list_movies.json?sort_by=download_count')
    .then(function (response) {
      let jsonString = JSON.stringify(response.data.data.movies,
        ["title", "large_cover_image", "summary", "genres"]);
      const movies = JSON.parse(jsonString);
      componentMake(movies);
    })
    .catch(function (error) {
      console.log(error);
    })
}

function componentMake(arr) {
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {

    // element 만들기
    const movieDiv = document.createElement("div");
    const imgDiv = document.createElement("div");
    const contentDiv = document.createElement("div");

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
    img.src = arr[i].large_cover_image;
    title.innerText = arr[i].title;
    summary.innerText = arr[i].summary;

    // 장르 배열 가져와서 span에 넣기
    const genres = arr[i].genres;

    for (let n = 0; n < genres.length; n++) {
      const movieGenre = document.createElement("span");
      genreDiv.appendChild(movieGenre);
      movieGenre.innerText = genres[n];
    }

    // css클래스 추가
    movieDiv.classList.add("movieDiv");
    contentDiv.classList.add("contentDiv");
    imgDiv.classList.add("imgDiv");

    // 로딩 메시지 없애기
    loading.style.display = "none"
  }
}

function init() {
  getMovieList();
  window.onload = function() {
    loading.innerText = "Loading...";
    loading.style.display = "block"
  };
}

init();
