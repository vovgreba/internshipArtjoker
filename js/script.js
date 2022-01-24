
function isCheck(promo) {
  if(typeof promo === "number") {
    return promo;
  } else {
    return console.error('error');
  }
}
const checkNumber = isCheck(48183376);

function isCurrentPromoBonus(promoCode) {

  let array = [];
  while(promoCode > 0) {
    let residue = promoCode % 10;
    let divide = promoCode / 10;
    array.unshift(residue);
    promoCode = Math.floor(divide);
  }
  return (array.length === 8) ? array : console.error('error');
}

let arrayPromoBonus = isCurrentPromoBonus(checkNumber);

function getNotMultiplesPair(promo) {
  
  let amountPair = 0;
  for(let i = 0; i < promo.length; i++) {
    
    let oddPair = false;
    let chekNumberOnUndefined = promo[i + 1] !== undefined && promo[i + 2] !== undefined;
     if(chekNumberOnUndefined) {
      oddPair = promo[i] % 2 !== 0 && promo[i + 1] % 2 !== 0 && promo[i + 2] % 2 !== 0;
     }
    if(oddPair) {
      amountPair++
      i += 2;
    }
  }
  return amountPair;
}

let notMultiplesPair = getNotMultiplesPair(arrayPromoBonus);

if(notMultiplesPair === 2) {
  getSearchPair(arrayPromoBonus);
} else {
  checkPromoBonus(arrayPromoBonus);
}

function getSearchPair(promo) {
  for(let i = 0; i < promo.length; i++) {
    let checkOneOdd = promo[i] % 2 !== 0 && promo[i + 1] % 2 !== 0;
    let chekEven = promo[i + 3] % 2 === 0;
    let chekNumberOnUndefined = promo[i + 4] % 2 !== undefined && promo[i + 5] % 2 !== undefined;
    let chekNumberOnUndefinedTwo = promo[i + 5] % 2 !== undefined && promo[i + 6] % 2 !== undefined;
    let chekTwoOdd = promo[i + 4] % 2 !== 0 && promo[i + 5] % 2 !== 0 || promo[i + 5] % 2 !== 0 && promo[i + 6] % 2 !== 0;
    let isChekPromo = checkOneOdd && chekEven && chekTwoOdd;
    let isChekUndefined = chekNumberOnUndefined || chekNumberOnUndefinedTwo;
    if(isChekUndefined && isChekPromo) {
      return isAscendingCheck(promo, i);
    }
    
    if(!isChekUndefined && !isChekPromo && i === promo.length - 1) {
      return checkPromoBonus100(promo);
    }
  }
  return 0;
}

function checkPromoBonus(promo) {
  
  for(let i = 0; i < promo.length; i++) {
    
    let promoResidue = promo[i] % 2 !== 0; 
    let promoResidueTotalNull = promo[i + 2] % 2 === 0; 
    let checkPromoOdd =  promoResidue  && checkNumberIsOdd(promo, i, 1);
    let checkPromoNext = checkNumberIsOdd(promo, i, 3) && checkNumberIsOdd(promo, i, 4) || checkNumberIsOdd(promo, i, 4) && checkNumberIsOdd(promo, i, 5) || checkNumberIsOdd(promo, i, 5) && checkNumberIsOdd(promo, i, 6) || checkNumberIsOdd(promo, i, 6) && checkNumberIsOdd(promo, i, 7);
    let checkPromoNextAndPrev = promoResidueTotalNull && checkPromoNext;
    
    if(checkPromoOdd && checkPromoNextAndPrev) {
      
      return isAscendingCheck(promo, i);
      
    }

    if(!checkPromoOdd && !checkPromoNextAndPrev && i === promo.length - 1) {
      return checkPromoBonus100(promo);
    }
    
  }
  return 0;
}

function checkPromoBonus100(promo) {

  let sumEven = 0;
  let sumOdd = 0;
  promo.forEach(element => {
    (element % 2 === 0) ? sumEven += element : sumOdd += element;
  });
  
  if(sumEven > sumOdd) {
    return 100;
  }
  return 0;
}

function isAscendingCheck(promo, i) {
    
  let pairAscending = promo[i] < promo[i + 1];
  let checkPromoNext = isConditionalNextPairCheck(promo, i, 3, 4) && isConditionalNextPairCheck(promo, i, 4) || isConditionalNextPairCheck(promo, i, 4, 5) && isConditionalNextPairCheck(promo, i, 5) || isConditionalNextPairCheck(promo, i, 5, 6) && isConditionalNextPairCheck(promo, i, 6) || isConditionalNextPairCheck(promo, i, 6, 7) && isConditionalNextPairCheck(promo, i, 7);
  if(pairAscending && checkPromoNext) {
    return 2000;
  }
  
  return 1000;
}

function isConditionalNextPairCheck(promo, i,  step, nextStep) {
  let odd = promo[i + step] % 2 !== 0;
  let ascending = false;

  if(nextStep) {
    ascending = promo[i + step] < promo[i + nextStep];
  } else {
    ascending = promo[i + step] > promo[i + step - 1]; 
  }

  return Boolean(i <= promo.length && odd && ascending);
  
  
}

function checkNumberIsOdd(promo, i,  step) {

  let position = i + step;
  if(position < promo.length ) {
    return promo[i + step] % 2 !== 0;
  } else {
    return false;
  }
  
}
let promoCheck = checkPromoBonus(arrayPromoBonus);
