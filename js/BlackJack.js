var message;
var dealer;
var player;

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
function setCard (oneCard, div_id ) {
	var img = oneCard[1];
	document.getElementById(div_id).innerHTML = '<img src="img/'+img+'" alt="card" >';
	console.log('setCard end, имя картинки: ' + img);
}

// раздача карт, создание "рук" дилера и игрока
function getHand (){
	console.log("getHand() start  ");
	dealer = [getCard()];
	player = [getCard(), getCard(), getCard()];
	console.log("getHand() раздача завершена:  " + getStatus());
}

// отрисовка карт раздачи дилера и игрока
function drawHand (hand){
	console.log("drawHand() start  ");
	var id;
	var i;
	for (i=0; i<hand.length; i++){
		id = i.toString();
		console.log("id:  " + id);
		setCard(player[i],id );
		document.getElementById("player_cards").innerHTML =' <li id="pl_' + id+ '"><img src="img/' + setCard(player[i],id )+ '" alt="2d" ></li>';
		
	}
	console.log("drawHand() end  ");
}

function play (){
	console.log('play() start');
	getHand ();
	drawHand (player);
	console.log("play() end. getStatus:  " + getStatus());
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

// показывает названия карт игрока и диллера
function getStatus() {var dlr = [];
	var plr = [];
	for (i=0; i<dealer.length; i++){
		dlr.push(dealer[i][0]);
	}
	for (i=0; i<player.length; i++){
		plr.push(player[i][0]);
	}
	console.log ("getStatus() dlr: " + dlr + ' ' + "plr: " + plr );
	return 'Dealer has: ' + dlr.join(', ') + ' Игрок: ' + plr.join(' ');
} 

