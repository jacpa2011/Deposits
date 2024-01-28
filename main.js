const MoneyLabel = document.querySelector("#Money")
const WaterBuy = document.querySelector("#buywater")
const WaterAmount = document.querySelector("#wateramount")
const WaterEmptyAmount = document.querySelector("#emptywateramount")
const WaterSell = document.querySelector("#sellwater")
const WaterReturn = document.querySelector("#returnwater")
const WaterBottle = document.getElementById("waterbottle")
const WaterDrink = document.querySelector("#drinkwater")
const WaterDrinkCooldown = document.querySelector("#drinkwatercooldown")

let player = {
    money: new Decimal(0.5),
    water: {
        amount: new Decimal(0),
        emptyamount: new Decimal(0),
        sell: new Decimal(0.4),
        waterbottleamount: new Decimal(0),
        waterbottleamountmax: new Decimal(205),
        drinkamount: new Decimal(41),
        drinkcooldown: new Decimal(0),
        drinkcooldownmax: new Decimal(1.5),
    }
}

const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay*1000))

setInterval(function() {
    MoneyLabel.textContent = `\u20ac${parseFloat(format(player.money)).toFixed(2)}`
    WaterAmount.textContent = `You have  ${player.water.amount} full water bottle(s)`
    WaterEmptyAmount.textContent = `You have ${player.water.emptyamount} empty water bottle(s)`
    WaterDrinkCooldown.textContent = `Cooldown: ${parseFloat(format(player.water.drinkcooldown)).toFixed(2)}s`
    WaterReturn.textContent = `Returns: \u20ac${parseFloat(format(player.water.sell)).toFixed(2)}`
    WaterBottle.style.height = parseFloat(format(Decimal.div(player.water.waterbottleamount, player.water.waterbottleamountmax).mul(205)))
    if (player.water.drinkcooldown.gte(0.01)) {
        player.water.drinkcooldown = player.water.drinkcooldown.sub(new Decimal(1).div(50))
    }
    else {
        player.water.drinkcooldown = new Decimal(0)
    }
}, 20)

WaterSell.addEventListener("click", function() {
    if (player.water.emptyamount.gte(new Decimal(0.1))) {
        player.water.emptyamount = player.water.emptyamount.sub(1)
        player.money = player.money.add(player.water.sell)
    }
})

WaterBuy.addEventListener("click", function() {
    if (player.money.gte(0.3)) {
        player.money = player.money.sub(0.3)
        player.water.amount = player.water.amount.add(1)
        player.water.waterbottleamount = player.water.waterbottleamountmax
    }
})

WaterDrink.addEventListener("click", function() {
    if (player.water.drinkcooldown.lte(0.03)) {
        if (player.water.amount.gte(0.1)) {
            player.water.drinkcooldown = player.water.drinkcooldownmax;
            let i = 1
            var wateranimation = setInterval(function() {
                player.water.waterbottleamount = player.water.waterbottleamount.sub(player.water.drinkamount.div(Math.pow(2, i)));
                i += 1;
                if (i == 51) {
                    clearInterval(wateranimation)
                }
                if (player.water.waterbottleamount.lte(0.01)) {
                    player.water.waterbottleamount = new Decimal(0)
                    player.water.amount = player.water.amount.sub(1)
                    player.water.emptyamount = player.water.emptyamount.add(1)
                        if (player.water.amount.gte(new Decimal(0.1))) {
                            player.water.waterbottleamount = player.water.waterbottleamountmax
                        }
                    clearInterval(wateranimation)
                }
            }, 20);
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
