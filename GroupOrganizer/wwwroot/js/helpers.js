//Examples:

groupOrganizer = newGroupOgranizer();

//GroupOrganizer = addGroup(GroupOrganizer, "sports");
//GroupOrganizer = addGroup(GroupOrganizer, "games");

//GroupOrganizer = addItem(GroupOrganizer, "sports", "soccer", "brad");

////lock item, locked by brad, only brad can modify

//GroupOrganizer = lockItem(GroupOrganizer, "sports", "soccer", "brad")

//// should work, invisible, locked, only owner can modify:
//GroupOrganizer = addText(GroupOrganizer, "sports", "soccer", "brad", "lots of running");

////unlock item, unlocked by brad
//GroupOrganizer = unlockItem(GroupOrganizer, "sports", "soccer", "brad");

////make visible, owner, brad, makes visible
//GroupOrganizer = makeVisible(GroupOrganizer, "sports", "soccer", "brad");

////make invisible, owner, brad, makes invisible
//GroupOrganizer = makeinVisible(GroupOrganizer, "sports", "soccer", "brad");

////turn to json
//var jsonString2 = JSON.stringify(GroupOrganizer);

////show json
//document.writeln(jsonString2);



function newGroupOgranizer() {
    groupOrganizer = [];
    return groupOrganizer;
}

//add new group
function addGroup(groupName) {

    newGroup = {
        groupName: groupName,
        selected: true,
        items: [],
    } 
    groupOrganizer.push(newGroup);

}

//select group
function selectGroup(groupName) {
    for (var i = 0; i < groupOrganizer.length; i++) {
        if (groupOrganizer[i].groupName == groupName) {
            //found
            groupOrganizer[i].selected = true;
        } else {
            groupOrganizer[i].selected = false;
        }
    }
    //was not found
}

//deselect group
function deSelectGroup(groupName) {
    for (var i = 0; i < groupOrganizer.length; i++) {
        if (groupOrganizer[i].groupName == groupName) {
            //found
            groupOrganizer[i].selected = false;
        } 
    }
    //was not found
}

//check if group exists in dropdown - pass in dropdown id
function checkGroupExistsDD(DD,newText) {
    var dropDownItems = document.getElementById(DD), item, i;

    for (i = 0; i < dropDownItems.length; i++) {
        if (dropDownItems[i].value == newText) {
            return true;
        }
    }
    return false;
}

//check if the item already exists:
function checkItemExists(newText) {
    var items = document.getElementById("itemArea").children;
     
    for (var i = 0; i < items.length; i++) {
        if (typeof (items[i].children[1].children[0]) != "undefined") {
            var divTitle = items[i].children[1].children[0].innerHTML;

            if (divTitle == newText) {
                return true;
            }
        
        }
    }
    return false;
}


//check if group exists in data struture:
function checkGroupExistsDS(groupName) {

    for (var i = 0; i < groupOrganizer.length; i++) {
        if (groupOrganizer[i].groupName == groupName) {
            //found
            return true;
        }
    }
    //was not found
    return false;
}



function addItem(groupName, itemName, vis,ownerName) {
    
    newItem = {
        itemName: itemName,
        ownerName: ownerName,
        modifyingUserName: "",
        visible: vis,
        locked:"no",
        texts: [],
    }
    
    for (var i = 0; i < groupOrganizer.length; i++) {
        //find the group
        if (groupOrganizer[i].groupName == groupName) {
            //add to the group
            groupOrganizer[i].items.push(newItem);
        }
    }
    
}

function addText(groupName, itemName, newText) {
    //must be locked first
    //find the item
    //verify if not visible that only the owner can modify
    //verify if locked and visible, check that only the modifyingUserName can modify

    for (var i = 0; i < groupOrganizer.length; i++) {

        if (groupOrganizer[i].groupName == groupName) {
            for (var j = 0; j < groupOrganizer[i].items.length; j++) {

                if (groupOrganizer[i].items[j].itemName == itemName) {

                    groupOrganizer[i].items[j].texts.push(newText);


                    //if (groupOrganizer[i].items[j].visible == "no" &&
                    //    groupOrganizer[i].items[j].ownerName == userName) {
                    //    //modifyingUser = user
                    //    //owner = user
                    //    //visiblity = no
                    //    //locked = yes
                    //    groupOrganizer[i].items[j].texts.push(newText)

                    //} else if (groupOrganizer[i].items[j].visible == "yes") {
                    //    //modifyingUser = user
                    //    //visibility = yes
                    //    //locked = yes
                    //    groupOrganizer[i].items[j].texts.push(newText)
                    //}
                }
            }
        }
    }
    
}


//locks the item if its not locked and adds the modifying username
function lockItem(groupName, itemName, userName) {
    for (var i = 0; i < groupOrganizer.length; i++) {
        if (groupOrganizer[i].groupName == groupName) {
            for (var j = 0; j < groupOrganizer[i].items.length; j++) {
                if (groupOrganizer[i].items[j].itemName == itemName) {
                    groupOrganizer[i].items[j].locked = "yes";
                    groupOrganizer[i].items[j].modifyingUserName = userName;
                    
                }
            }
        }
    }
}

//remove item
function removeItem(groupName, itemName) {
    for (var i = 0; i < groupOrganizer.length; i++) {
        if (groupOrganizer[i].groupName == groupName) {
            for (var j = 0; j < groupOrganizer[i].items.length; j++) {
                if (groupOrganizer[i].items[j].itemName == itemName) {
                    groupOrganizer[i].items.splice(j, 1);
                }
            }
        }
    }
}


//unlocks item if the username matches the modifying username
function unlockItem(groupName, itemName) {
    for (var i = 0; i < groupOrganizer.length; i++) {
        if (groupOrganizer[i].groupName == groupName) {
            for (var j = 0; j < groupOrganizer[i].items.length; j++) {
                if (groupOrganizer[i].items[j].itemName == itemName) {
                    groupOrganizer[i].items[j].locked = "no";
                }
            }
        }
    }
    
}

//make item visible
function makeVisible(groupName, itemName) {
    for (var i = 0; i < groupOrganizer.length; i++) {
        if (groupOrganizer[i].groupName == groupName) {
            for (var j = 0; j < groupOrganizer[i].items.length; j++) {
                if (groupOrganizer[i].items[j].itemName == itemName) {
                    
                    groupOrganizer[i].items[j].visible = "yes";
                }
            }
        }
    }
    
}

//make item invisible
function makeinVisible(groupName, itemName) {
    for (var i = 0; i < groupOrganizer.length; i++) {
        if (groupOrganizer[i].groupName == groupName) {
            for (var j = 0; j < groupOrganizer[i].items.length; j++) {
                if (groupOrganizer[i].items[j].itemName == itemName) {
                    groupOrganizer[i].items[j].visible = "no";
                }
            }
        }
    }
    
}

//return the owner of an item
//owner = getOwner(GroupOrganizer, "sports", "soccer");
function getOwner(groupName, itemName) {
    var tempOwner;
    for (var i = 0; i < groupOrganizer.length; i++) {
        if (groupOrganizer[i].groupName == groupName) {
            for (var j = 0; j < groupOrganizer[i].items.length; j++) {
                if (groupOrganizer[i].items[j].itemName == itemName) {
                    tempOwner = groupOrganizer[i].items[j].ownerName;
                }
            }
        }
    }
    return tempOwner;
}


function getModUser(groupName, itemName) {
    var modUser;
    for (var i = 0; i < groupOrganizer.length; i++) {
        if (groupOrganizer[i].groupName == groupName) {
            for (var j = 0; j < groupOrganizer[i].items.length; j++) {
                if (groupOrganizer[i].items[j].itemName == itemName) {
                    modUser = groupOrganizer[i].items[j].modifyingUserName;
                }
            }
        }
    }
    return modUser;
}