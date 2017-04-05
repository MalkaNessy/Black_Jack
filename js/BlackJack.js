var message;
var dealer;
var player;
var player_ul="player_cards"; // id элемента, куда вставлять карты игрока
var dealer_ul="dealer_cards"; // id элемента, куда вставлять карты диллера

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

//забирает случайную карту из колоды и возвращает ее
function getCard() {
	var temp = cards[getRandomInt(0, cards.length - 1)];
	for (i=0; i<cards.length; i++){
		if (temp == cards[i]) {
			cards.splice(i,1);
		}
	} return temp;
	console.log('getCard забирает случайную карту из колоды: ' + temp);
}

//получает карту и возвращает имя картинки
function setCard (oneCard) {
	var img_name = oneCard[1];
	return img_name;
	console.log('setCard end, имя картинки: ' + img_name);
}

// раздача карт, создание "рук" дилера и игрока
function getHand (){
	console.log("getHand() start  ");
	dealer = [getCard()];
	player = [getCard(), getCard()];
	console.log("getHand() раздача завершена:  " + getStatus());
}

// отрисовка карт раздачи дилера и игрока
function drawHand (hand, ul_id){
	console.log("drawHand() start, hand =   " + hand );
	console.log("hand ul_id =   " + ul_id );
	var html='';
	for (var i=0; i<hand.length; i++){
		var img = setCard(hand[i]);
		html = html + ' <li><img src="img/' + img+ '" alt="2d" ></li>';
	}
	document.getElementById(ul_id).innerHTML = html;
		console.log("drawHand() end  ");
}

function addDealer(){
	console.log("addDealer() start, dealer: " + dealer)
	do {dealer.push(getCard());
	drawHand(dealer, dealer_ul)
	}while (getSum(dealer)<17)
		console.log("addDealer() end, dealer: " + dealer)
}

// показывает статус: названия карт игрока и диллера, очки, счет 
function getStatus() {
	var dlr = [];
	var plr = [];
	for (i=0; i<dealer.length; i++){
		dlr.push(dealer[i][0]);
	}
	for (i=0; i<player.length; i++){
		plr.push(player[i][0]);
	}
	console.log ("getStatus() dlr: " + dlr + ' ' + "plr: " + plr );
	return ' Карты игрока: ' + plr.join(' ') + ' Cумма очков игрока: ' + getSum(player)+ '<br> Карты диллера: ' + dlr.join(', ') + ' Cумма очков диллера: ' + getSum(dealer);
} 


//считает сумму карт
function getSum(hand) {
	var sum=0;
	//сначала считаем все карты, кроме тузов
	for (var i=0; i<hand.length;i++) {
		var card = hand[i];
		if (card[0].substring(0,1)!='A') {
			if (isNaN(parseInt(card[0])) ) {
				sum=sum+10;		
			} else {
				sum=sum + parseInt(card[0]);
			}
		}
	}
	// туз считается как 1, если текущая сумма меньше 21, если больше - то как 11	
	for (var i=0; i<hand.length; i++) {
		var card = hand[i];
		if (card[0].substring(0,1) == 'A'){
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

function play (){
	console.log('play() start');
	//перемешиваем колоду перед каждой новой раздачей
	cards = deck.slice(0);
	getHand ();
	drawHand (player, player_ul );
	drawHand (dealer, dealer_ul );
	if (getSum(player)== 21){
		setMessage("Дьявольское везение! Black Jack на раздаче!.. </br> To play again clkick on card deck.");
		
	} else {
		setMessage(getStatus() +  "</br>You have < 21. Do you want to add card?");
		document.getElementById("answer").innerHTML = '<button id="yes" onclick="yes()">Yes</button><button id="no" onclick="no()">No</button> ';
		
		/* if (getSum(player)<21){
			setMessage(getStatus() +  "</br>You have <21. Do you want to add card?");
			document.getElementById("answer").innerHTML = '<button id="yes" onclick="yes()">Yes</button><button id="no" onclick="no()">No</button> ';
		} else {
			setMessage('Ready. ' + getStatus());
			document.getElementById("answer").innerHTML = '<button id="end" onclick="checkScore()">to score</button>';
		} */
	}
	console.log('play() end');
}

function ifAdd() {
	console.log("ifAdd() start");
		if (getSum(player)<21){
			setMessage(getStatus() +  "You have <21. Do you want to add card?");
			document.getElementById("answer").innerHTML = '<button id="yes" onclick="yes()">Yes</button><button id="no" onclick="no()">No</button> ';
		}else{
			setMessage('Ready. ' + getStatus());
			document.getElementById("answer").innerHTML = '<button id="end" onclick="checkScore()">to score</button>';
		console.log('ifAdd() end. sum player: ' + getSum(player) + ' sum dealer: ' + getSum(dealer));
		}
}

function no(){
	console.log('no() start');
	//убираем кнопку "посчитать"
	document.getElementById("answer").innerHTML = '';
	//дилер добирает карты
	addDealer();
	//проверяем количество очков
	setMessage(getStatus());
	console.log('no() end');
}	

//сдаем карту игроку 
function yes(){
	console.log('yes() start');
	document.getElementById("answer").innerHTML = '';
		player.push(getCard());
		drawHand(player, player_ul);
	console.log('yes() end. player after push: ' + player);
		ifAdd();
	console.log('yes() end. sumPlayer after push: ' + getSum(player));
	
	
}