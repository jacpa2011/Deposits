function saveitems(name, location) { // this basically just removes the localstorage.setitem and json.stringify
    localStorage.setItem(name, JSON.stringify((location)));
}

function Save() {
    if (localStorage) {
        saveitems("firstload", false)
        saveitems("money", player.money);
        saveitems("wateramount", player.water.amount)
        saveitems("wateremptyamount", player.water.emptyamount)
        saveitems("watersell", player.water.sell)
        saveitems("waterbottleamount", player.water.waterbottleamount)
        saveitems("waterbottleamountmax", player.water.waterbottleamountmax)
        saveitems("waterdrinkamount", player.water.drinkamount)
        saveitems("waterdrinkcooldown", player.water.drinkcooldown)
        saveitems("waterdrinkcooldownmax", player.water.drinkcooldownmax)
        saveitems("upgradedeflation", player.upgrade.deflation)
        saveitems("upgradedeflationcost", player.upgrade.deflationcost)
    }
}

function GetItems(saved, newdecimal) { //removes json.parse and localstorage
    let location = "Error" // placeholder
    if (saved) {
        if (newdecimal) { // checks if the value your setting to needs to be in newdecimal or not
            location = new Decimal(JSON.parse(localStorage.getItem(saved)));
        } else {
            location = JSON.parse(localStorage.getItem(saved));
        }
    }
    return location;
}

function Get() {
    let firstload = Getitems("firstload", false)
    if (!firstload) {
    if (localStorage) {
    player.money = GetItems("money", true);
    player.water.amount = GetItems("wateramount", true);
    player.water.emptyamount = GetItems("wateremptyamount", true);
    player.water.sell = GetItems("watersell", true);
    player.water.waterbottleamount = GetItems("waterbottleamount", true);
    player.water.waterbottleamountmax = GetItems("waterbottleamountmax", true);
    player.water.drinkamount = GetItems("waterdrinkamount", true);
    player.water.drinkcooldown = GetItems("waterdrinkcooldown", true);
    player.water.drinkcooldownmax = GetItems("waterdrinkcooldownmax", true);
    player.upgrade.deflation = GetItems("upgradedeflation", true);
    player.upgrade.deflationcost = GetItems("upgradedeflationcost", true);
    }}
}

function HardReset() {
    localStorage.clear(); // wipe localstorage
    saveitems("firstload", true)
    location.reload(true)
}
