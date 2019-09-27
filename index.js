const app = document.querySelector("#app");
const loading = document.querySelector(".loading");
const modal = document.querySelector(".modal")
const modalContent = document.querySelector(".modal__content")
const modalCancelBtn = document.querySelector(".modal__content > button")
//todo 모달 이용하여 상세 페이지 만들기(토요일)
//todo githubpages 배포

function getMovieList() {
  // axios와 JSON 메소드로 꼭 필요한 데이터만 파싱
  axios.get('https://yts.lt/api/v2/list_movies.json?sort_by=download_count')
    .then(function (response) {
      const jsonString = JSON.stringify(response.data.data.movies,
        ["title", "large_cover_image", "summary", "genres"]);
      const movies = JSON.parse(jsonString);
      componentMake(movies);
    })
    .catch(function (error) {
      console.log(error);
    })
}

function handleDetailBtn() { 
  modal.style.display = "block"
  const btnVal = document.querySelector(".modal")
  
  console.log(modalIndex);
}

function componentMake(movies) {
  console.log(movies);
  for (let movieIndex = 0; movieIndex < movies.length; movieIndex++) {

    // element 만들기
    const movieDiv = document.createElement("div");
    const imgDiv = document.createElement("div");
    const contentDiv = document.createElement("div");

    const img = document.createElement("img");
    const title = document.createElement("div");
    const summary = document.createElement("div");
    const genreDiv = document.createElement("div");
    const btnDiv = document.createElement("div");
    const detailBtn = document.createElement("button");
  
    // element 자식으로 넣기
    app.appendChild(movieDiv);
    movieDiv.appendChild(imgDiv);
    movieDiv.appendChild(contentDiv);
    imgDiv.appendChild(img);

    contentDiv.appendChild(title);
    contentDiv.appendChild(genreDiv);
    contentDiv.appendChild(summary);
    contentDiv.appendChild(detailBtn);
    contentDiv.appendChild(btnDiv);
    btnDiv.appendChild(detailBtn);

    // 포스터, 제목, 요약 가져와서 img, div에 넣기
    img.src = movies[movieIndex].large_cover_image;
    title.innerText = movies[movieIndex].title;
    summary.innerText = movies[movieIndex].summary;

    // 장르 배열 가져와서 span에 넣기
    const genres = movies[movieIndex].genres;

    for (let genreIndex = 0; genreIndex < genres.length; genreIndex++) {
      const movieGenre = document.createElement("span");
      genreDiv.appendChild(movieGenre);
      movieGenre.innerText = genres[genreIndex];
    }

    // button에 텍스트 넣기
    detailBtn.innerText = "Show Detail"
    detailBtn.id = `${movieIndex}`
    detailBtn.classList.add("modalbtn")

    // css클래스 추가
    movieDiv.classList.add("movieDiv");
    contentDiv.classList.add("contentDiv");
    imgDiv.classList.add("imgDiv");

    // 로딩 메시지 없애기
    loading.style.display = "none"

    // 디테일 버튼 이벤트 리스너
    detailBtn.addEventListener("click", handleDetailBtn);
    modalCancelBtn.addEventListener("click", function () {
    modal.style.display = "none"
    });
  }
}

function init() {
  getMovieList();
  //로딩 메시지 만들기
  window.onload = function() {
    loading.innerText = "Loading...";
    loading.style.display = "block"
  };
}

init();
