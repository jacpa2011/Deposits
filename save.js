function saveitems(name, location) {
    localStorage.setItem(name, JSON.stringify((location)));
}

function Save() {
    if (localStorage) {
        saveitems("money", player.money)
        saveitems("wateramount", player.water.amount)
        saveitems("wateremptyamount", player.water.emptyamount)
        saveitems("watersell", player.water.sell)
        saveitems("waterbottleamount", player.water.waterbottleamount)
        saveitems("waterbottleamountmax", player.water.waterbottleamountmax)
        saveitems("waterdrinkamount", player.water.drinkamount)
        saveitems("waterdrinkcooldown", player.water.drinkcooldown)
        saveitems("waterdrinkcooldownmax", player.water.drinkcooldownmax)
    }
}

function GetItems(saved, location, newdecimal) {
    if (saved) {
        if (newdecimal) {
            location = new Decimal(JSON.parse(saved));
        } else {
            location = JSON.parse(saved);
        }
    }
    return location;
}

function Get() {
    if (localStorage) {
    player.money = GetItems(localStorage.getItem("money"), player.money, true);
    player.water.amount = GetItems(localStorage.getItem("wateramount"), player.water.amount, true);
    player.water.emptyamount = GetItems(localStorage.getItem("wateremptyamount"), player.water.emptyamount, true);
    player.water.sell = GetItems(localStorage.getItem("watersell"), player.water.sell, true);
    player.water.waterbottleamount = GetItems(localStorage.getItem("waterbottleamount"), player.water.waterbottleamount, true);
    player.water.waterbottleamountmax = GetItems(localStorage.getItem("waterbottleamountmax"), player.water.waterbottleamountmax, true);
    player.water.drinkamount = GetItems(localStorage.getItem("waterdrinkamount"), player.water.drinkamount, true);
    player.water.drinkcooldown = GetItems(localStorage.getItem("waterdrinkcooldown"), player.water.drinkcooldown, true);
    player.water.drinkcooldownmax = GetItems(localStorage.getItem("waterdrinkcooldownmax"), player.water.drinkcooldownmax, true);
    }
}

function HardReset() {
    localStorage.clear();
    location.reload(true)
}
