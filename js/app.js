	let card = document.getElementsByClassName("card");
	let cards = [...card];
	const deck = document.querySelector('.deck');
	let openedCards = [];
	let moves = 0;
	let moveCounter = document.querySelector(".moves");
	let matchedCard = document.getElementsByClassName("match");
	let second = 0;
	let minute = 0;
	let hour = 0;
	let timer = document.querySelector(".timer");
	let interval;
	let stars = document.querySelectorAll(".fa-star");
	let modal = document.querySelector('.modal');
	let closeicon = document.querySelector(".close");
	let restartGame = document.querySelector(".restart");
	let pAgain = document.querySelector(".btn.playagain");

	// Shuffle function from http://stackoverflow.com/a/2450976
	function shuffle(array) {

	    var currentIndex = array.length,
	        temporaryValue, randomIndex;

	    while (currentIndex !== 0) {
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }

	    return array;
	}

	document.body.onload = startGame();

	function startGame() {
	    openedCards = [];
	    cards = shuffle(cards);
	    for (let i = 0; i < cards.length; i++) {
	        deck.innerHTML = "";
	        [].forEach.call(cards, function(item) {
	            deck.appendChild(item);
	        });
	        cards[i].classList.remove("show", "open", "match", "disabled");
	    }

	    //reset moves 
	    moves = 0;
	    moveCounter.innerHTML = moves;

	    //reset rate star
	    for (var i = 0; i < stars.length; i++) {
	        stars[i].style.visibility = "visible";
	    }

	    //reset timer
	    second = 0, minute = 0;
	    hour = 0;
	    timer.innerHTML = minute + "mins" + " " + second + "secs";
	    clearInterval(interval);
	}

	var openCard = function() {
	    this.classList.toggle("open");
	    this.classList.toggle("show");
	    this.classList.toggle("disabled");
	}

	// Event Listener 
	for (var i = 0; i < cards.length; i++) {
	    card = cards[i];
	    card.addEventListener("click", openCard);
	    card.addEventListener("click", openCards);
	    card.addEventListener('click', openModal);
	}

	function openCards() {
	    openedCards.push(this);
	    let cardLength = openedCards.length;
	    if (cardLength === 1) {
	        movesCounter();
	    } else if (cardLength === 2) {
	        if (openedCards[0].innerHTML != openedCards[1].innerHTML || openedCards[0].isSameNode(openedCards[1])) {
	            unmatched();
	        } else {
	            matched();
	        }
	    }
	}

	function matched() {
	    openedCards[0].classList.add('match', 'disabled');
	    openedCards[1].classList.add('match', 'disabled');
	    openedCards[0].classList.remove("show", "open");
	    openedCards[1].classList.remove("show", "open");
	    openedCards = [];
	}

	//  when cards don't match
	function unmatched() {
	    openedCards[0].classList.add("unmatched");
	    openedCards[1].classList.add("unmatched");
	    disable();
	    setTimeout(function() {
	    openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
	    openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
	    enable();
	    openedCards = [];
	    }, 1000);
	}

	//  disable cards temporarily
	function disable() {
	    Array.prototype.filter.call(cards, function(card) {
	        card.classList.add('disabled');
	    });
	}

	// enable cards and disable matched cards
	function enable() {
	    Array.prototype.filter.call(cards, function(card) {
	        card.classList.remove('disabled');
	        for (var i = 0; i < matchedCard.length; i++) {
	            matchedCard[i].classList.add("disabled");
	        }
	    });
	}

	//Move Counter Function
	function movesCounter() {
	    moves++;
	    moveCounter.innerHTML = moves;
	    if (moves == 1) {
	        second = 0;
	        minute = 0;
	        hour = 0;
	        startTimer();
	    }
	    rating();
	}

	//Timer Function
	function timerFunc() {
	    second++;
	    timer.innerHTML = minute + "mins " + second + "secs";
	    if (second == 60) {
	        minute++;
	        second = 0;
	    }
	    if (minute == 60) {
	        hour++;
	        minute = 0;
	    }
	}

	function startTimer() {
	    timerFunc();
	    interval = setInterval(timerFunc, 1000);
	}

	//Rating Function
	function rating() {
	    if (moves > 8 && moves < 15) {
	        for (i = 0; i < 3; i++) {
	            if (i > 1) {
	                stars[i].style.visibility = "collapse";
	            }
	        }
	    } else if (moves > 16) {
	        for (i = 0; i < 3; i++) {
	            if (i > 0) {
	                stars[i].style.visibility = "collapse";
	            }
	        }
	    }

	}

	//Restart Button 
	restartGame.addEventListener("click", startGame);

	//show modal when finish the game
	function openModal() {
	    if (matchedCard.length == 16) {
	        clearInterval(interval);
	        modal.style.display = "block";

	        let starFinal = document.querySelector(".stars").innerHTML;
	        document.querySelector('.totalRating').innerHTML = starFinal;

	        let finalMove = document.querySelector(".moves").innerHTML;
	        document.querySelector('.totalMoves').innerHTML = finalMove;

	        let finalTime = document.querySelector(".timer").innerHTML;
	        document.querySelector('.totalTime').innerHTML = finalTime;
	        closeModal();
	        playAgain();
	    };
	}

	function closeModal() {
	    closeicon.addEventListener("click", function(e) {
	        modal.style.display = "none";
	        startGame();
	    });
	}

	function playAgain() {
	    pAgain.addEventListener("click", function(e) {
	        modal.style.display = "none";
	        startGame();
	    });
	}