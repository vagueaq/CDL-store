const btnItems = document.querySelector('.items-btn')
const checkout= document.querySelector('.checkout')

// items for sale
let pricesOfTheWeek = [
    {
        name: 'A',
        price: 0.50,
        applyDiscountAfter: 3,
        deduct: 0.20
    },
    {
        name: 'B',
        price: 0.30,
        applyDiscountAfter: 3,
        deduct: 0.20
    },
    {
        name: 'C',
        price: 0.20,
        applyDiscountAfter: 3,
        deduct: 0.20
    },
    {
        name: 'D',
        price: 0.10,
        applyDiscountAfter: 3,
        deduct: 0.20
    }
]


// CDL Store Section

let count = [0,0,0,0] // amount of single items
let batch = [0,0,0,0] // amount of batch items
let singlesPrice = [0,0,0,0] // price of the sum of single items
let batchPrice = [0,0,0,0] // price of all batches selected
let countTotal = [0,0,0,0]


const calcDiscopuntSum = function(){
    //using a for and not a forEach because i need the value of i
    for(let i = 0; i < count.length; i++){
        // if count of singles === 1 full batch, add 1 to batch
        if(count[i] / pricesOfTheWeek[i].applyDiscountAfter === 1){
            batch[i]++
            count[i] = 0
        }

        //calculating the amount of all Items
        countTotal[i] = count[i] + (batch[i] * pricesOfTheWeek[i].applyDiscountAfter)
        //calculating price of single Items
        singlesPrice[i] = count[i] * pricesOfTheWeek[i].price
        //calculating price of batches
        batchPrice[i] = batch[i] * ((pricesOfTheWeek[i].price * pricesOfTheWeek[i].applyDiscountAfter ) - pricesOfTheWeek[i].deduct)
    }
    
}

const printPrices = function(){
    //printing the price of singles + price of batches to the DOM
    checkout.innerHTML = `
    <h1>${countTotal[0]} A: £${singlesPrice[0] + batchPrice[0]}</h1>
    <h1>${countTotal[1]} B: £${singlesPrice[1] + batchPrice[1]}</h1>
    <h1>${countTotal[2]} C: £${singlesPrice[2] + batchPrice[2]}</h1>
    <h1>${countTotal[3]} D: £${singlesPrice[3] + batchPrice[3]}</h1>
    `
}


// check which button was clicked
btnItems.addEventListener('click', e =>{
    if(e.target.className === 'btn'){
        //add 1 to the count of the button that was clicked
        //calculate the price
        switch(e.target.id){
            case 'btn-a': 
                count[0]++
                singlesPrice[0] = count[0] * pricesOfTheWeek[0].price
                break
            case 'btn-b': 
                count[1]++
                singlesPrice[1] = count[1] * pricesOfTheWeek[1].price
                break 
            case 'btn-c': 
                count[2]++
                singlesPrice[2] = count[2] * pricesOfTheWeek[2].price
                break 
            case 'btn-d': 
                count[3]++
                singlesPrice[3] = count[3] * pricesOfTheWeek[3].price
        }
        calcDiscopuntSum()
        printPrices()
    }
})
