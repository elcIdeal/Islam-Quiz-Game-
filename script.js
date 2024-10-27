// Музыка
const music = document.getElementById("background-music");
const playButton = document.getElementById("volume");
const volumeUpButton = document.querySelector(".btn-s");
const volumeMuteButton = document.querySelector(".btn-n");

// Функция для переключения состояния музыки (воспроизведение/пауза)
function toggleMusic() {
    if (music.paused) {
        music.play().then(() => {
            volumeUpButton.style.display = "inline-block";
            volumeMuteButton.style.display = "none";
        }).catch(error => {
            console.log("Не удалось воспроизвести музыку:", error);
        });
    } else {
        music.pause();
        volumeUpButton.style.display = "none";
        volumeMuteButton.style.display = "inline-block";
    }
}

// Обработчик события для кнопки "Music"
playButton.addEventListener("click", toggleMusic);
// script.js
// script.js


  // Получаем элементы
  const rulesButton = document.getElementById("rules-button");
  const backButton = document.getElementById("back-button");
  const startScreen = document.querySelector(".start-screen");
  const rulesScreen = document.querySelector(".ruless");

  // Убедитесь, что начальный экран видим, а экран с правилами скрыт


  // Обработчик нажатия на кнопку "Rules"
  rulesButton.addEventListener("click", () => {
      startScreen.style.display = "none";
      rulesScreen.style.display = "flex";
  });

  // Обработчик нажатия на кнопку "Back"
  backButton.addEventListener("click", () => {
    startScreen.style.display = "flex";
    rulesScreen.style.display = "none";
  });

