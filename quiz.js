document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const startScreen = document.querySelector(".start-screen");
  const quizScreen = document.querySelector(".section-2");
  const questionsElement = document.getElementById("questions");
  const optionButtons = [
    document.getElementById("option1"),
    document.getElementById("option2"),
    document.getElementById("option3"),
    document.getElementById("option4"),
  ];
  const timerElement = document.getElementById("timer");
  const totalResultElement = document.getElementById("total-result");
  const nameMember = document.getElementById("name-member");
  const totalScoreDisplay = document.getElementById("total");
  const inputName = document.getElementById("input-name");

  // Данные викторины
  const quizData = [
    {
      question: "What is the first pillar of Islam?",
      options: ["Shahada", "Salat", "Zakat", "Hajj"],
      correct: 0,
    },
    {
      question: "How many times do Muslims pray daily?",
      options: ["3", "5", "7", "9"],
      correct: 1,
    },
    {
      question: "What is the holy book of Islam?",
      options: ["Bible", "Torah", "Quran", "Vedas"],
      correct: 2,
    },
    {
      question: "During which month do Muslims fast from dawn until sunset?",
      options: ["Shawwal", "Ramadan", "Dhul-Hijjah", "Muharram"],
      correct: 1,
    },
    {
      question: "Who is the last prophet in Islam?",
      options: [
        "Prophet Moses",
        "Prophet Jesus",
        "Prophet Muhammad",
        "Prophet Abraham",
      ],
      correct: 2,
    },
  ];

  let currentQuestionIndex = 0;
  let count = 0; // Переменная для подсчета правильных ответов
  let userName = ""; // Переменная для хранения имени пользователя
  let timer; // Переменная для хранения интервала таймера
  const timeLimit = 10; // Лимит времени на каждый вопрос в секундах

  // Функция для начала викторины
  function startQuiz() {
    userName = inputName.value.trim(); // Получаем значение из текстового поля

    if (userName === "") {
      alert("Please enter your name before starting the quiz."); // Проверка на пустое значение
      return;
    }

    nameMember.textContent = "Member: " + userName;
    startScreen.style.display = "none";
    quizScreen.style.display = "flex";
    count = 0; // Сбросить счетчик правильных ответов при начале викторины
    totalResultElement.classList.add("hidden");
    currentQuestionIndex = 0; // Сбросить индекс вопроса
    loadQuestion();
  }

  // Функция для загрузки текущего вопроса
  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionsElement.textContent = currentQuestion.question;
    optionButtons.forEach((button, index) => {
      button.textContent = currentQuestion.options[index];
      button.onclick = () => handleAnswer(index);
    });

    // Запуск таймера для вопроса
    startTimer();
  }

  // Функция для запуска таймера
  function startTimer() {
    let timeRemaining = timeLimit;
    timerElement.textContent = "Time left: " + timeRemaining + " seconds";

    // Очистить предыдущий таймер, если он существует
    clearInterval(timer);

    // Запуск нового таймера
    timer = setInterval(() => {
      timeRemaining--;
      timerElement.textContent = "Time left: " + timeRemaining + " seconds";

      // Если время истекло, переход к следующему вопросу
      if (timeRemaining <= 0) {
        clearInterval(timer);
        handleAnswer(-1); // -1 означает, что ответ не был выбран
      }
    }, 1000);
  }

  // Функция для обработки ответа
  function handleAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    const selectedButton = optionButtons[selectedIndex];

    // Остановка таймера
    clearInterval(timer);

    // Проверка правильности ответа
    if (selectedIndex === currentQuestion.correct) {
      selectedButton?.classList.add("correct");
      count++;
    } else if (selectedIndex !== -1) {
      selectedButton?.classList.add("incorrect");
    }

    // Переход к следующему вопросу через небольшую задержку
    setTimeout(() => {
      if (selectedButton) {
        selectedButton.classList.remove("correct", "incorrect");
      }
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        loadQuestion();
      } else {
        showResult();
        resetQuiz();
      }
    }, 1000);
  }

  // Функция для показа результата
  function showResult() {
    totalResultElement.textContent = "Total correct answers: " + count;
    totalResultElement.classList.remove("hidden");
    totalScoreDisplay.textContent = "Total correct answers: " + count;
  }

  // Функция для сброса викторины
  function resetQuiz() {
    currentQuestionIndex = 0;
    count = 0;
    startScreen.style.display = "flex";
    quizScreen.style.display = "none";
    clearInterval(timer); // Очищаем таймер при сбросе
  }

  // Обработчик нажатия на кнопку "Start"
  startButton.addEventListener("click", startQuiz);
});
