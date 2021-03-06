const regExpNumbers = /^\d+$/;
const regExpText = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;

let sentinelCardNumber = false;
let sentinelName = false;
let sentinelVerificationCode = false;
let sentinelDueDate = false;
let isValidCardNumber = (cardNumber) => {
  if (regExpNumbers.test(cardNumber) && cardNumber.length === 16) {
    let cardNumbersUpsideDown = cardNumber.split('').reverse(); // array de numeros al revés
    let counterOfEvenNumbers = 1; // contador de posiciones pares (impares en js)
    let sum = 0; // almacenar la suma de los numeros de la tarjeta  
    cardNumbersUpsideDown.forEach((number, index) => {
      number = parseInt(number);
      if (index === counterOfEvenNumbers) {
        cardNumbersUpsideDown[index] *= 2; // multiplicar por 2 los numeros de las posiciones pares(impares en js)
        if (cardNumbersUpsideDown[index] >= 10) {
          cardNumbersUpsideDown[index] = cardNumbersUpsideDown[index].toString(); // convertir el numero en string
          let separateNumbers = cardNumbersUpsideDown[index].split('');
          separateNumbers[0] = parseInt(separateNumbers[0]);
          separateNumbers[1] = parseInt(separateNumbers[1]);
          cardNumbersUpsideDown[index] = separateNumbers[0] + separateNumbers[1]; // sumar las cifras
        }
        counterOfEvenNumbers += 2; // De lo contrario si la multiplicación es menor que 10 aumentar j en 2
      }
      sum += cardNumbersUpsideDown[index]; // suma de numeros en posiciones impares y nuevos numeros en posiciones pares
    });
    sum % 10 === 0 ? sentinelCardNumber = true : sentinelCardNumber = false;
  } else
    sentinelCardNumber = false;
	return sentinelCardNumber;
};

console.log(isValidCardNumber('4544766226348242'));

let isValidName = (name) => {
  if (regExpText.test(name) && name.length === 12) 
    sentinelName = true;
  else 
    sentinelName = false;
};
