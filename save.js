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
        saveitems("watercost", player.water.cost)
        saveitems("upgradedeflation", player.upgrade.deflation)
        saveitems("upgradedeflationcost", player.upgrade.deflationcost)
        saveitems("upgradebetterbrandcost", player.upgrade.betterbrandcost)
        saveitems("upgradebetterbrand", player.upgrade.betterbrand)
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
function isFirstVisit() {
    if (!localStorage.getItem('has_visited')) {
      localStorage.setItem('has_visited', 'true');
      return true; // First visit
    }
    return false; // Returning visitor
  }
function Get() {
    if (localStorage) {
    if (!isFirstVisit()) {
    player.money = GetItems("money", true);
    player.water.amount = GetItems("wateramount", true);
    player.water.emptyamount = GetItems("wateremptyamount", true);
    player.water.sell = GetItems("watersell", true);
    player.water.waterbottleamount = GetItems("waterbottleamount", true);
    player.water.waterbottleamountmax = GetItems("waterbottleamountmax", true);
    player.water.drinkamount = GetItems("waterdrinkamount", true);
    player.water.drinkcooldown = GetItems("waterdrinkcooldown", true);
    player.water.drinkcooldownmax = GetItems("waterdrinkcooldownmax", true);
    player.water.cost = GetItems("watercost", true)
    player.upgrade.deflation = GetItems("upgradedeflation", true);
    player.upgrade.deflationcost = GetItems("upgradedeflationcost", true);
    player.upgrade.betterbrand = GetItems("upgradebetterbrand", true);
    player.upgrade.betterbrandcost = GetItems("upgradebetterbrandcost", true);
    }}
}

function HardReset() {
    localStorage.clear(); // wipe localstorage
    location.reload(true)
}
