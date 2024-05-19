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
        deflationcost: new Decimal(0.35)
    }
};

const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay*1000))

setInterval(function() { // gametick
    player.money = new Decimal(Decimal.round(player.money.mul(100)).div(100)) // round money to 0.00
    MoneyLabel.textContent = `\u20ac${parseFloat(format(player.money)).toFixed(2)}`
    WaterAmount.textContent = `You have  ${player.water.amount} full water bottle(s)`
    WaterEmptyAmount.textContent = `You have ${player.water.emptyamount} empty water bottle(s)`
    WaterDrinkCooldown.textContent = `Cooldown: ${parseFloat(format(player.water.drinkcooldown)).toFixed(2)}s`
    WaterReturn.textContent = `Returns: \u20ac${parseFloat(format(player.water.sell)).toFixed(2)}`
    if (parseFloat(format(Decimal.div(player.water.waterbottleamount, player.water.waterbottleamountmax).mul(205))) != parseFloat(WaterBottle.style.height)) {
    WaterBottle.style.height = parseFloat(format(Decimal.div(player.water.waterbottleamount, player.water.waterbottleamountmax).mul(205)))
    WaterBottle.style.top = (266*1.77 - parseFloat(WaterBottle.style.height));
    }
    WaterCost.textContent = `Cost: \u20ac${parseFloat(format(player.water.cost)).toFixed(2)}`;
    if (DeflationCost.textContent != "Maxed") {
    DeflationCost.textContent = `Cost: \u20ac${parseFloat(format(player.upgrade.deflationcost)).toFixed(2)}`;
    }
    if (player.water.drinkcooldown.gte(0.01)) {
        player.water.drinkcooldown = player.water.drinkcooldown.sub(new Decimal(1).div(50))
    }
    else {
        player.water.drinkcooldown = new Decimal(0)
    }
    if (player.money.lte(player.water.cost) && player.water.emptyamount == 0 && player.water.amount == 0) {
        player.money = player.water.cost
    }
}, 20)

setInterval(function(){ //autosave
Save()
}, 20000)

WaterSell.addEventListener("click", function() {
    if (player.water.emptyamount.gte(new Decimal(0.1))) {
        player.water.emptyamount = player.water.emptyamount.sub(1)
        player.money = player.money.add(player.water.sell)
    }
})

WaterBuy.addEventListener("click", function() {
    if (player.money.gte(player.water.cost)) {
        player.money = player.money.sub(player.water.cost)
        player.water.amount = player.water.amount.add(1)
        if (player.water.waterbottleamount.lte(0.1)) {
            player.water.waterbottleamount = player.water.waterbottleamountmax
        }
    }
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
})

DeflationButton.addEventListener("click", function(){
    if (DeflationCost.textContent != "Maxed") {
    if (player.money.sub(player.upgrade.deflationcost).gte(0)) {
        player.money = player.money.sub(player.upgrade.deflationcost)
        player.water.cost = player.water.cost.sub(0.01)
        player.upgrade.deflationcost = player.upgrade.deflationcost.mul(2.1)
        if (new Decimal(Decimal.round(player.water.cost.mul(100)).div(100)) == 0.01) {
            DeflationCost.textContent = "Maxed"
        }
    }}
})

hardreset.addEventListener("click", function(){
    if (confirm('Are you sure you want to Hard Reset? (everything saved will be gone!)')) {
        HardReset()
    }
})
