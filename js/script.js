
//Настройки Gulp - проверка поддержки webp, добавление класса webp или no-webp для HTML

//Проверка поддержки webp
function testWebP(callback) {
	let webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
//Добавление класса webp или no-webp для HTML
testWebP(function (support) {
	let className = support === true ? 'webp' : 'no-webp';
	document.documentElement.classList.add(className);
});


//=======================================================

let formCalculator = document.forms[0];

formCalculator.addEventListener("focusin", function () {
	let buttonCalculator = formCalculator.button;

	buttonCalculator.addEventListener("click", function () {
		let billAmount = formCalculator.amount;
		let numberOfGuests = formCalculator.guests;
		let selectPercent = formCalculator.select;
		let calcTotal = document.querySelector('.calculator__total');
		let tipSumm = billAmount.value / numberOfGuests.value * selectPercent.value;

		//дальнейшая работа кода только при условии, что вычисленная сумма не NaN и не Infinity
		if (!isNaN(tipSumm) && isFinite(tipSumm)) {
			//если во поле "Number of Guests" введено нецелое число, исправляем его на целое
			if (!Number.isInteger(+numberOfGuests.value)) {
				numberOfGuests.value = Math.trunc(numberOfGuests.value);
			};
			//выводим в окно итогового результата сумму, округленную до 2-х знаков после запятой
			calcTotal.innerHTML = `Tip $ ${Math.round(tipSumm * 100) / 100} each`;
			//добавляем класс _active для работы стилей scss
			calcTotal.classList.add('_active');
			//класс будет убран автоматически через 3 сек
			setTimeout(() => {
				calcTotal.classList.remove('_active');
			}, 3000);
		}
	})
})

