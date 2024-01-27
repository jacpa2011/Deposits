const MoneyLabel = document.querySelector("#Money")
const WaterBuy = document.querySelector("#buywater")
const WaterAmount = document.querySelector("#wateramount")
const WaterSell = document.querySelector("#sellwater")
const WaterReturn = document.querySelector("#returnwater")

let player = {
    money: new Decimal(0.5),
    water: {
        amount: new Decimal(0),
        sell: new Decimal(0.4)
    }
}

setInterval(function() {
    MoneyLabel.textContent = `\u20ac${parseFloat(format(player.money)).toFixed(2)}`
    WaterAmount.textContent = `You have  ${player.water.amount} water bottle(s)`
    WaterReturn.textContent = `Returns: \u20ac${player.water.sell}`
}, 20)

WaterSell.addEventListener("click", function() {
    if (player.water.amount.gte(new Decimal(0.1))) {
        player.water.amount = player.water.amount.sub(1)
        player.money = player.money.add(player.water.sell)
    }
})

WaterBuy.addEventListener("click", function() {
    if (player.money.gte(0.3)) {
        player.money = player.money.sub(0.3)
        player.water.amount = player.water.amount.add(1)
    }
})
a
