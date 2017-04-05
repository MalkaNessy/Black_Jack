var score;
var bet;
var message;
function setScore(newScore) {
	score = newScore;
	document.getElementById("innerScore").innerHTML = score+"";
}
function setBet(newBet) {
	bet = newBet;
	document.getElementById("innerBet").innerHTML = bet+"";
}
function setMessage(newMessage) {
	message = newMessage;
	document.getElementById("talk").innerHTML = message+"";
}

function getRandomInt(min,max) {
	return Math.floor(Math.random()*(max-min+1))+min;
}

var deck = [ ['6d', '6_d.jpg'], ['7d', '7_d.jpg'], ['8d', '8_d.jpg'], ['9d', '9_d.jpg'], ['A_d', 'ace_d.jpg'], ['J_d', 'j_d.jpg'], ['Q_d', 'q_d.jpg'], ['K_d', 'k_d.jpg'],
['6h', '6_h.jpg'], ['7h', '7_h.jpg'], ['8h', '8_h.jpg'], ['9h', '9_h.jpg'], ['A_h', 'ace_h.jpg'], ['J_h', 'j_h.jpg'], ['Q_h', 'q_h.jpg'], ['K_h', 'k_h.jpg'],
['6c', '6_c.jpg'], ['7c', '7_c.jpg'], ['8c', '8_c.jpg'], ['9c', '9_c.jpg'], ['A_c', 'ace_c.jpg'], ['J_c', 'j_c.jpg'], ['Q_c', 'q_c.jpg'], ['K_c', 'k_c.jpg'],
['6s', '6_s.jpg'], ['7s', '7_s.jpg'], ['8s', '8_s.jpg'], ['9s', '9_s.jpg'], ['A_s', 'ace_s.jpg'], ['J_s', 'j_s.jpg'], ['Q_s', 'q_s.jpg'], ['K_s', 'k_s.jpg'],
];
var cards = deck.slice(0);
//var cards1 = ['6', '7', '8', '9', 'J', 'Q', 'K', 'A'];


setScore(100);
setBet(50);
setMessage("hello");

//берет случайную карту из колоды, удаляет ее из колоды, возвращает карту
function getCard() {
	var temp = cards[getRandomInt(0, cards.length - 1)];
	for (i=0; i<cards.length; i++){
		if (temp == cards[i]) {
			cards.splice(i,1);
		}
	} return temp;
	console.log('getCard забирает случайную карту из колоды: ' + temp);
}
 
//отрисовывает полученную карту в полученный div_id 
function setCard (hand, div_id) {
	card = hand[1];
	document.getElementById(div_id).innerHTML = '<img src="img/'+card+'" alt="card" >';
	console.log('setCard end, отрисованная карта: ' + card);
}
 
//считает сумму карт
function getSum(hand) {
	var sum=0;
	//сначала считаем все карты, кроме тузов
	for (var i=0; i<hand.length;i++) {
		var card = hand[i];
		if (card[0]!='A') {
			if (card[0]=='J' || card[0] == 'Q' || card[0] == 'K') {
				sum=sum+10;			
			} else {
				sum=sum + parseInt(card[0]);
			}
		}
	}
	// туз считается как 1, если текущая сумма меньше 21, если больше - то как 11	
	for (var i=0; i<hand.length; i++) {
		var card = hand[i];
		if (card[0] == 'A'){
			if (sum>10) {
				sum = sum + 1;
			} else {
				sum = sum + 11;
			}
		}
	}
	// В случае двух тузов первый будет стоить 11, а второй - 1
	return sum;
} 
 
function getStatus() {var dlr = [];
	var plr = [];
	for (i=0; i<dealer.length; i++){
		dlr.push(dealer[i][0]);
	}
	for (i=0; i<player.length; i++){
		plr.push(player[i][0]);
	}
	console.log ("getStatus() dlr: " + dlr + ' ' + "plr: " + plr );
	return 'Dealer has: ' + dlr.join(', ') + ' Игрок: ' + plr.join(' ') + ' Score: ' + score;
	 //+ ' Игрок: ' + plr.join(' ') + ' Score: ' + score;} 
} 
 
var dealer;
var player;

// раздача карт, создание "рук" дилера и игрока
function getHand (){
	console.log("getHand() start  "
	dealer = [getCard()];
	player = [getCard(), getCard(), getCard()];
	console.log("getHand() раздача  " + getStatus());
}

// отрисовка карт раздачи дилера и игрока
function drawHand (hand, who){
	var ul;
	var id;
	var i;
		if (who=='p'){ul="player cards"}
		else if (who=='d'){ul="dealer cards"}
	for (i=0; i<hand.length; i++){
		id ="p"+ i.toString();
		setCard(player[i],id );
		document.getElementById(ul).innerHTML =' <li id="' + id+ '"><img src="img/' + setCard(player[i],id )+ '" alt="2d" ></li>';
	}
}

//дилер добирает карты
function addDealer(){
	do {dealer.push(getCard())
	}while (getSum(dealer)<17)
}

/* function drawHandPlayer (player){
	setCard(player[0],"p1_card" );
	setCard(player[1],"p2_card" );
	console.log("drawHandPlayer() отрисовка карт: " + getStatus());
} */


// первая функция, которой запускается игра, вызвается onljick-ом при нажатии на колоду
function play (){
	console.log('play() start');
	getHand ();
	drawHand (player, "p");
	drawHand (dealer, "d");
	if (getSum(player)== 21){
		//alert ('Дьявольское везение! Black Jack на раздаче!');
		setMessage("You're lucky! Black Jack!.. </br> To play again ckick on card deck.");
		setScore( score + score+200 );
	} else {
		setMessage(getStatus() +  "You have <21. Do you want to add card?");
		document.getElementById("answer").innerHTML = '<button id="yes" onclick="yes()">Yes</button><button id="no" onclick="no()">No</button> ';
	}
	console.log('play() end');
}
var add;

function ifAdd() {
	do{
		if (getSum(player)<21){
			setMessage(getStatus() +  "You have <21. Do you want to add card?");
			document.getElementById("answer").innerHTML = '<button id="yes" onclick="yes()">Yes</button><button id="no" onclick="no()">No</button> ';
		}else{
			add=false;
			setMessage('Ready. ' + getStatus());
			document.getElementById("answer").innerHTML = '<button id="end" onclick="checkScore()">to score</button>';

		}
	} while (add)
	
}


//сдаем карту игроку 
function yes(){
	console.log('yes() start');
	add=true;
	document.getElementById("answer").innerHTML = '';
	player.push(getCard());
	drawHand (player, p);
	ifAdd();
	console.log('yes() end = player: ' + player );
}



	
function no(){
	//отменяем возможность добавлять карты
	add=false;
	document.getElementById("answer").innerHTML = '';
	addDealer();
	drawHand (dealer, d);
	setMessage('Ready. ' + getStatus());
	document.getElementById("answer").innerHTML = '<button id="end" onclick="checkScore()">to score</button>';
}	


//проверяем результат после всех доборов карт
function checkScore (){
	//удаляем кнопку
	document.getElementById("answer").innerHTML = '';
	//отменяем возможность добавлять карты
	add=false;
	//проверяем результат
	var sumDealer = getSum(dealer);
	var sumPlayer = getSum(player);
			
	if (sumPlayer == 21) {
		setScore( score + 100 );
		setMessage('You has Black Jack!' + getStatus());
	} else if (sumDealer == 21) {
		setScore( score - 20 );
		setMessage('Dealer has Black Jack! ' + getStatus());
	} else if (sumPlayer == sumDealer) {
		setMessage('Dead heat! ' + getStatus());
	} else if (sumPlayer > sumDealer) {
		setScore( score + 50 );
		setMessage('You win! :) ' + getStatus());
	} else {
		setScore( score -100 );
		setMessage('You loos :( ' + getStatus());
	}
	console.log ("После подсчета очков - getStatus: " + getStatus() + " player: " + player);
			
}

 
 
