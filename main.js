
const MoneyLabel = document.querySelector("#Money")
const WaterBuy = document.querySelector("#buywater")
const WaterAmount = document.querySelector("#wateramount")
const WaterEmptyAmount = document.querySelector("#emptywateramount")
const WaterSell = document.querySelector("#sellwater")
const WaterReturn = document.querySelector("#returnwater")
const WaterBottle = document.getElementById("waterbottle")
const WaterDrink = document.querySelector("#drinkwater")
const WaterDrinkCooldown = document.querySelector("#drinkwatercooldown")
const WaterCost = document.querySelector("#watercost")
const DeflationCost = document.querySelector("#deflationcost")
const DeflationButton = document.querySelector("#deflation")
const BetterBrandCost = document.querySelector("#betterbrandcost")
const BetterBrandButton = document.querySelector("#betterbrand")
const BetterConditionCost = document.querySelector("#betterconditioncost")
const BetterConditionButton = document.querySelector("#bettercondition")
const hardreset = document.querySelector("#hardreset")

let player = {
    money: new Decimal(0.30),
    water: {
        amount: new Decimal(0),
        cost: new Decimal(0.14),
        emptyamount: new Decimal(0),
        sell: new Decimal(0.15),
        waterbottleamount: new Decimal(0),
        waterbottleamountmax: new Decimal(205),
        drinkamount: new Decimal(41),
        drinkcooldown: new Decimal(0),
        drinkcooldownmax: new Decimal(1.5),
    },
    upgrade: {
        deflation: new Decimal(0),
        deflationcost: new Decimal(0.35),
        betterbrand: new Decimal(0),
        betterbrandcost: new Decimal(0.20),
        bettercondition: new Decimal(0),
        betterconditioncost: new Decimal(1.5),
    }
};
function checkifbelowcost() {
        player.money = player.water.cost
        const textElement = document.querySelector("#notice");
        textElement.style.transition = "none"
        textElement.style.color = "rgb(205,0,0)";
        setTimeout(() => {
            textElement.style.transition = "color 3s cubic-bezier(1,0,.35,.98)";
            textElement.style.color = "rgb(153, 153, 153)";
            Save()
        }, 2000)

}
setInterval(function() { // gametick
    player.money = new Decimal(Decimal.round(player.money.mul(100)).div(100)) // round money to 0.00
    MoneyLabel.textContent = formatupto2euro(player.money)
    WaterAmount.textContent = `You have  ${player.water.amount} full water bottle(s)`
    WaterEmptyAmount.textContent = `You have ${player.water.emptyamount} empty water bottle(s)`
    WaterDrinkCooldown.textContent = `Cooldown: ${parseFloat(format(player.water.drinkcooldown)).toFixed(2)}s`
    WaterReturn.textContent = `Returns: ${formatupto2euro(player.water.sell)}`
    if (parseFloat(format(Decimal.div(player.water.waterbottleamount, player.water.waterbottleamountmax).mul(205))) != parseFloat(WaterBottle.style.height)) {
    WaterBottle.style.height = parseFloat(format(Decimal.div(player.water.waterbottleamount, player.water.waterbottleamountmax).mul(205)))
    WaterBottle.style.top = (266*1.77 - parseFloat(WaterBottle.style.height));
    }
    WaterCost.textContent = `Cost: ${formatupto2euro(player.water.cost)}` // format is in shortcut.js
    player.water.sell = new Decimal(0.15)
    player.water.sell = player.water.sell.mul(new Decimal(1.2).pow(player.upgrade.betterbrand))
    player.water.cost = new Decimal(0.14)
    player.water.cost = player.water.cost.sub(new Decimal(0.01).mul(player.upgrade.deflation))
    player.water.drinkcooldownmax = new Decimal(1.5)
    player.water.drinkcooldownmax = player.water.drinkcooldownmax.div(new Decimal(1.3).pow(player.upgrade.bettercondition))
    if (player.upgrade.deflation.lte(12.9)) { // if deflation = 13 then maxed
    DeflationCost.textContent = `Cost: ${formatupto2euro(player.upgrade.deflationcost)}`;
    } else {
        DeflationCost.textContent = `Maxed`; 
    }
    BetterBrandCost.textContent = `Cost: ${formatupto2euro(player.upgrade.betterbrandcost)}`
    if (player.upgrade.bettercondition.lte(8.9)) { // if bettercondition = 9 then maxed
        BetterConditionCost.textContent = `Cost: ${formatupto2euro(player.upgrade.betterconditioncost)}`
    } else {
        BetterConditionCost.textContent = `Maxed`
    }
    if (player.water.drinkcooldown.gte(0.01)) {
        player.water.drinkcooldown = player.water.drinkcooldown.sub(new Decimal(1).div(50))
    }
    else {
        player.water.drinkcooldown = new Decimal(0)
    }
    
    if (player.money.lte(player.water.cost.sub(0.001)) && player.water.emptyamount == 0 && player.water.amount == 0) {
    checkifbelowcost() // in a function so it doesnt interrupt gametick
    }
    if (player.upgrade.deflation.gte(0.1)) {
        BetterBrandButton.style.display = "flex"
    } else {
        BetterBrandButton.style.display = "none"
    }
    if (BetterConditionButton.style.dispaly = "none") {
        if (player.money.gte(1.49)) {
            BetterConditionButton.style.display = "flex"
        }
    }
}, 20)

setInterval(function(){ //autosave
Save()
}, 10000)

WaterSell.addEventListener("click", function() {
    if (player.water.emptyamount.gte(new Decimal(0.1))) {
        player.water.emptyamount = player.water.emptyamount.sub(1)
        player.money = player.money.add(player.water.sell)
    }
    Save()
})

WaterBuy.addEventListener("click", function() {
    if (player.money.gte(player.water.cost.sub(0.001))) {
        player.money = player.money.sub(player.water.cost)
        player.water.amount = player.water.amount.add(1)
        if (player.water.waterbottleamount.lte(0.1)) {
            player.water.waterbottleamount = player.water.waterbottleamountmax
        }
    }
    Save()
})

WaterDrink.addEventListener("click", function() {
    if (player.water.drinkcooldown.lte(0.03)) {
        if (player.water.amount.gte(0.1)) {
            player.water.drinkcooldown = player.water.drinkcooldownmax;
                player.water.waterbottleamount = player.water.waterbottleamount.sub(player.water.drinkamount);
                if (player.water.waterbottleamount.lte(0.01)) {
                    player.water.waterbottleamount = new Decimal(0)
                    if (player.water.amount.sub(1).gte(0.5)) {
                    player.water.amount = player.water.amount.sub(1)
                    player.water.emptyamount = player.water.emptyamount.add(1)
                        if (player.water.amount.gte(new Decimal(0.1))) {
                            player.water.waterbottleamount = player.water.waterbottleamountmax
                        }
                }}
            if (player.water.waterbottleamount.lte(0.01)) {
                player.water.waterbottleamount = new Decimal(0)
                player.water.amount = player.water.amount.sub(1)
                player.water.emptyamount = player.water.emptyamount.add(1)
                    if (player.water.amount.gte(new Decimal(0.1))) {
                        player.water.waterbottleamount = player.water.waterbottleamountmax
                    }
            }
        }
    }
    Save()
})

DeflationButton.addEventListener("click", function(){
    if (player.upgrade.deflation != 13) { // check if upgrade isnt maxed out 
    if (player.money.sub(player.upgrade.deflationcost).gte(0)) {
        player.money = player.money.sub(player.upgrade.deflationcost)
        player.upgrade.deflationcost = player.upgrade.deflationcost.mul(1.9)
        player.upgrade.deflation = player.upgrade.deflation.add(1)
    }
    }
    Save()
})

BetterBrandButton.addEventListener("click", function(){
    if (player.money.sub(player.upgrade.betterbrandcost).gte(0)) {
        player.money = player.money.sub(player.upgrade.betterbrandcost)
        player.upgrade.betterbrandcost = player.upgrade.betterbrandcost.mul(2.2)
        player.upgrade.betterbrand = player.upgrade.betterbrand.add(1)
    }
    Save()
})

BetterConditionButton.addEventListener("click", function(){
    if (player.money.sub(player.upgrade.betterconditioncost).gte(0)) {
        player.money = player.money.sub(player.upgrade.betterconditioncost)
        player.upgrade.betterconditioncost = player.upgrade.betterconditioncost.mul(3)
        player.upgrade.bettercondition = player.upgrade.bettercondition.add(1)
    }
})

hardreset.addEventListener("click", function(){
    if (confirm('Are you sure you want to Hard Reset? (everything saved will be gone!)')) {
        HardReset()
    }
})
