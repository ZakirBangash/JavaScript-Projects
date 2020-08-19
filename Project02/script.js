const container = document.querySelector(".container:not(.occupied");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const select = document.querySelector("#movie");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const screen = document.querySelector(".screen");
let value = +select.value;


function embedYoutubeVedio(selectedIndex) {
  console.log(selectedIndex);
  let Src = "";
  if (selectedIndex == 0) {
    Src = "https://www.youtube.com/embed/qSqVVswa420";
  } else if (selectedIndex == 4) {
    Src = "https://www.youtube.com/embed/NSlUevhlmv0";
  }else if (selectedIndex == 1) {
    Src="https://www.youtube.com/embed/BIhNsAtPbPI";
  }else if (selectedIndex == 2) {
    Src="https://www.youtube.com/embed/7TavVZMewpY";
  }else if (selectedIndex == 3) {
    Src="https://www.youtube.com/embed/wb49-oV0F78"
  }

  screen.innerHTML = `<iframe
      width="300"
      height="100"
      src=${Src}
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe> `;

}

populateUI();
embedYoutubeVedio(select.selectedIndex);
function populateUI() {
  const seatindex = JSON.parse(localStorage.getItem("seatindex"));
  if (seatindex != null) {
    [...seats].map((seats, index) => {
      if (seatindex.indexOf(index) > -1) {
        seats.classList.add("selected");
      }
    });
  }

  const movieIndex = localStorage.getItem("MovieIndex");
  if (movieIndex !== null) {
    select.selectedIndex = movieIndex;
  }
  
}

function setMovieIndex(movieIndex, moviePrice) {
  localStorage.setItem("MovieIndex", movieIndex);
  localStorage.setItem('selectedMoviePrice',moviePrice);
}

function updateSelectCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("seatindex", JSON.stringify(seatsIndex));

  const countedSeats = selectedSeats.length;
  count.innerText = `${countedSeats}`;
  total.innerText = value * countedSeats;
}

select.addEventListener("change", (e) => {
  value = +e.target.value;
    console.log(value)
    updateSelectCount();
  setMovieIndex(e.target.selectedIndex, e.target.value);
  embedYoutubeVedio(e.target.selectedIndex);
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectCount();
  }
});

updateSelectCount();
