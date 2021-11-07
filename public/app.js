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
        applyDiscountAfter: 2,
        deduct: 0.15
    },
    {
        name: 'C',
        price: 0.20,
        applyDiscountAfter: 0,
        deduct: 0
    },
    {
        name: 'D',
        price: 0.15,
        applyDiscountAfter: 0,
        deduct: 0
    }
]

//Admin Section

//grabbing the forms and buttons from the DOM
const formA = document.querySelector('.form-a')
const formB = document.querySelector('.form-b')
const formC = document.querySelector('.form-c')
const formD = document.querySelector('.form-d')

// this function checks if Input is number
//if is number: update priceOfTheWeek object based on the last Argument passede to the function
const updatePrices = function(inp1, inp2, inp3, formNum){
    const newPrice = parseFloat(inp1)
    const applyDiscountAfter = parseInt(inp2)
    const discount = parseFloat(inp3)

    try{
    //checking if input is number
    if(isNaN(newPrice) || isNaN(applyDiscountAfter) ){ 
        throw new Error('NaN')
     }
     if(isNaN(discount)){
         throw new Error('NaN')
      } 
    }catch(err){
        //catch and return any errors so the previous value or the obj does not get updated
        return console.error(err)
    }

    //updating the default objects to the inputted values
     pricesOfTheWeek[formNum].price = newPrice
     pricesOfTheWeek[formNum].applyDiscountAfter = applyDiscountAfter
     pricesOfTheWeek[formNum].deduct = discount

}

// event listener for form A
formA.addEventListener('submit', e =>{
    e.preventDefault()

    updatePrices(
        e.target.children[0].value, 
        e.target.children[1].value, 
        e.target.children[2].value, 0)
})

// event listener for form B
formB.addEventListener('submit', e =>{
    e.preventDefault()
    updatePrices(
        e.target.children[0].value, 
        e.target.children[1].value, 
        e.target.children[2].value, 1)
})

// event listener for form C
formC.addEventListener('submit', e =>{
    e.preventDefault()
    updatePrices(
        e.target.children[0].value, 
        e.target.children[1].value, 
        e.target.children[2].value, 2)
})

// event listener for form C
formD.addEventListener('submit', e =>{
    e.preventDefault()
    updatePrices(
        e.target.children[0].value, 
        e.target.children[1].value, 
        e.target.children[2].value, 3)
})



// CDL Store Section

let count = [0,0,0,0] // amount of single items
let batch = [0,0,0,0] // amount of batch items
let singlesPrice = [0,0,0,0] // price of the sum of single items
let batchPrice = [0,0,0,0] // price of all batches selected
let countTotal = [0,0,0,0]


const calcPrices = function(){
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
    const totalPrice = singlesPrice[0] + batchPrice[0] + singlesPrice[1] + batchPrice[1] + singlesPrice[2] + batchPrice[2] + singlesPrice[3] + batchPrice[3]
    checkout.innerHTML = `
        <h1>${countTotal[0]} A: £${singlesPrice[0] + batchPrice[0]}</h1>
        <h1>${countTotal[1]} B: £${singlesPrice[1] + batchPrice[1]}</h1>
        <h1>${countTotal[2]} C: £${singlesPrice[2] + batchPrice[2]}</h1>
        <h1>${countTotal[3]} D: £${singlesPrice[3] + batchPrice[3]}</h1>
        <br />
        <h1>Total Price: £${totalPrice}</h1>
    `
}




// check which button was clicked
btnItems.addEventListener('click', e =>{
    if(e.target.name === 'btn'){
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
        //after checkingwhich button was clicked, we calculate with calcPrices() and print the price with printPrices()
        calcPrices()
        printPrices()

    }
})







