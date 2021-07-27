let cards = ["ciri.png", "geralt.png", "jaskier.png", "iorweth.png", "triss.png", "yen.png"];

// funkcja, która dubluje tablice oraz sortuje ją w losowej kolejności
let shuffleArray = function(array) {
	return $.map(array, function(element) {
		return [element, element];
	}).sort(function() {
		return 0.5 - Math.random();
	});
}

cards = shuffleArray(cards);

var cardsByjQuery = $('.card');

function addListenersByjQuery(indexOfCard)
{
	cardsByjQuery.eq(indexOfCard).on('click', () => revealCard(indexOfCard));
}

for(i=0; i<cards.length; i++)
{
	addListenersByjQuery(i);
}

var oneVisible = false;
var turnCounter = 0;
var visible_nr = -1;
var lock = false;
var pairsLeft = cards.length / 2;

function revealCard(nr)
{
	var opacityValue = cardsByjQuery.eq(nr).css('opacity');
	
	if(opacityValue != 0 && !lock)
	{
		lock = true;
		
		var image = 'url(img/'+cards[nr]+')';
		
		cardsByjQuery.eq(nr).css('background-image', image);
		cardsByjQuery.eq(nr).addClass('cardA');
		cardsByjQuery.eq(nr).removeClass('card');
		
		if(!oneVisible)
		{
			//first card
			oneVisible = true;
			visible_nr = nr;
			lock = false;
		}
		else
		{
			//second card
			if(cards[visible_nr] == cards[nr] && visible_nr != nr)
			{
				//alert('para');
				setTimeout(function() { hide2Cards(nr, visible_nr); }, 750);
				turnCounterFunction();
			}
			else if(cards[visible_nr] != cards[nr])
			{
				//alert('pudło');
				setTimeout(function() { restore2Cards(nr, visible_nr); }, 1000);
				turnCounterFunction();
			}
			else
			{
				lock = false;
			}
		}
	}
}

function turnCounterFunction()
{
	turnCounter++;
	$('.score').html('Turn counter: '+turnCounter);
	oneVisible = false;
}

function hide2Cards(nr1, nr2)
{
	cardsByjQuery.eq(nr1).css('opacity','0');
	cardsByjQuery.eq(nr2).css('opacity','0');
	
	pairsLeft--;
	if(pairsLeft == 0)
	{
		$('.board').html('<h1>You win!<br>Done in '+turnCounter+' turns <br> <span class="reload" onclick="location.reload()">Play again!</span> </h1>');
	}
	
	lock = false;
}

function restore2Cards(nr1, nr2)
{
	cardsByjQuery.eq(nr1).css('background-image', 'url(img/karta.png)');
	cardsByjQuery.eq(nr1).addClass('card');
	cardsByjQuery.eq(nr1).removeClass('cardA');
	
	cardsByjQuery.eq(nr2).css('background-image', 'url(img/karta.png)');
	cardsByjQuery.eq(nr2).addClass('card');
	cardsByjQuery.eq(nr2).removeClass('cardA');
	
	lock = false;
}



