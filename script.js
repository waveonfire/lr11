$(document).ready(function () {
    let stepCounter = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    $("#checkbutton").on("click", checkAnswer);
    $("#close-modal").on("click", closeModal);
    const dictionary = [
        { word: "answer", translate: "Відповідь" },
        { word: "reliable", translate: "Надійний" },
        { word: "human", translate: "Людина" },
        { word: "school", translate: "Школа" },
        { word: "sun", translate: "Сонце" },
        { word: "will", translate: "Воля" },
        { word: "pen", translate: "Ручка" },
        { word: "thief", translate: "Крадій" },
        { word: "rival", translate: "Ворог" },
        { word: "disscuss", translate: "Обговорювати" },
    ];
    const randomdictionary = dictionary.sort(() => 0.5 - Math.random());

    function updateStatus() {
        $("#stat").html(`<h3>Step ${stepCounter + 1} of ${dictionary.length} | Correct answers: ${correctAnswers} | Wrong answers: ${wrongAnswers}</h3>`);
    }

    function newWord() {
        if (stepCounter < randomdictionary.length) {
            let currentWord = randomdictionary[stepCounter];
            $(".mainblock > p").text(currentWord.word);
            $("#inputtext").val("");
            updateStatus();
        } else {
            showModal();
        }
    }

    function checkAnswer() {
        let currentWord = randomdictionary[stepCounter];
        let userAnswer = $("#inputtext").val().trim();

        if (userAnswer.toLowerCase() === currentWord.translate.toLowerCase()) {
            correctAnswers++;
            alert("Correct!");
        } else {
            wrongAnswers++;
            alert(`Wrong! The correct answer is: ${currentWord.translate}`);
        }

        stepCounter++;
        newWord();
    }

    function showModal() {
        const totalWords = dictionary.length;
        const accuracy = ((correctAnswers / totalWords) * 100);

        $("#result-text").html(`You translated ${correctAnswers} out of ${totalWords} words correctly.<p>Your accuracy: ${accuracy}%.</p>`);
        $("#modal").fadeIn();
    }

    function closeModal() {
        $("#modal").fadeOut();
        restart();
    }

    function restart(){
        stepCounter = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        const randomdictionary = dictionary.sort(() => 0.5 - Math.random());
        updateStatus();
    }
    newWord();
});
