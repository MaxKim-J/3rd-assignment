const app = document.querySelector("#app");
const loading = document.querySelector(".loading");

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const col1 = document.querySelector(".modal__column1");
const col2 = document.querySelector(".modal__column2");

function getMovieList() {
  // axios와 JSON 메소드로 꼭 필요한 데이터만 파싱
  axios
    .get("https://yts.lt/api/v2/list_movies.json?sort_by=download_count")
    .then(function(response) {
      console.log(response);
      const jsonString = JSON.stringify(response.data.data.movies, [
        "title",
        "large_cover_image",
        "summary",
        "genres",
        "rating",
        "runtime",
        "title_long",
        "url",
        "yt_trailer_code"
      ]);
      const movies = JSON.parse(jsonString);
      componentMake(movies);
      modalPopUp(movies);
    })
    .catch(function(error) {
      console.log(error);
    });
}

// 모달 함수
function modalPopUp(movies) {
  const buttons = document.querySelectorAll(".modalbtn");
  const modalImg = document.createElement("img");
  const modalTitle = document.createElement("div");
  const modalSummary = document.createElement("div");
  const modalCancelBtn = document.createElement("button");
  const modalDownloadBtn = document.createElement("button");
  const modalYoutubeBtn = document.createElement("button");
  const modalRuntime = document.createElement("div");
  const modalRating = document.createElement("div");

  // show detail 버튼이벤트
  buttons.forEach(function(button) {
    button.addEventListener("click", function(e) {
      modal.style.display = "block";
      app.style.display = "none"
      app.classList.add("stop-scrolling")
      const indexNum = e.currentTarget.value;

      col1.appendChild(modalImg);
      col2.appendChild(modalTitle);
      col2.appendChild(modalRuntime);
      col2.appendChild(modalRating);
      col2.appendChild(modalSummary);
      col1.appendChild(modalDownloadBtn);
      col1.appendChild(modalYoutubeBtn);
      col2.appendChild(modalCancelBtn);

      modalImg.src = movies[indexNum].large_cover_image;
      modalTitle.innerHTML = `<p class="modal__mainhead">${movies[indexNum].title_long}</h2>`;
      modalSummary.innerHTML = `<p class="modal__head">summary</p>\n<hr/>${movies[indexNum].summary}`;
      modalRating.innerHTML = `<p class="modal__head">rating</p>\n<hr/>${movies[indexNum].rating}/10`;
      modalRuntime.innerHTML = `<p class="modal__head">runtime</p>\n<hr/>${movies[indexNum].runtime}m`;
      modalCancelBtn.innerHTML = "Back to Movie list"
      modalDownloadBtn.innerHTML = `<a href="${movies[indexNum].url}" target="_blank">Download Link</a>`
      modalYoutubeBtn.innerHTML = `<a href="https://www.youtube.com/watch?v=${movies[indexNum].yt_trailer_code}" target="_blank">Youtube Trailer Link</a>`
    });
  });

  //cancel 버튼 눌렀을 때 모달 삭제
  modalCancelBtn.addEventListener("click", function () {
      modal.style.display = "none";
      app.style.display = "flex";
      col1.removeChild(modalImg);
      col2.removeChild(modalTitle);
      col2.removeChild(modalSummary);
      col2.removeChild(modalRuntime);
  });
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
    title.innerHTML = `title:\n ${movies[movieIndex].title}`;
    summary.innerText = movies[movieIndex].summary;

    // 장르 배열 가져와서 span에 넣기
    const genres = movies[movieIndex].genres;

    for (let genreIndex = 0; genreIndex < genres.length; genreIndex++) {
      const movieGenre = document.createElement("span");
      genreDiv.appendChild(movieGenre);
      movieGenre.innerText = genres[genreIndex];
    }

    // button에 텍스트 넣기
    detailBtn.innerText = "Show Detail";
    detailBtn.value = `${movieIndex}`;
    detailBtn.classList.add("modalbtn");

    // css클래스 추가
    movieDiv.classList.add("movieDiv");
    contentDiv.classList.add("contentDiv");
    imgDiv.classList.add("imgDiv");

    // 로딩 메시지 없애기
    loading.style.display = "none";
  }
}

function init() {
  getMovieList();
  //로딩 메시지 만들기
  window.onload = function() {
    loading.innerText = "Loading...";
    loading.style.display = "block";
  };
}

init();