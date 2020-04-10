//Examples:

//GroupOrganizer = newGroupOgranizer();

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

function addGroup(groupOrganizer, groupName) {

    newGroup = {
        groupName: groupName,
        items: [],
    } 
    groupOrganizer.push(newGroup);

    return groupOrganizer;
}

function addItem(groupOrganizer, groupName, itemName, ownerName) {
    
    newItem = {
        itemName: itemName,
        ownerName: ownerName,
        modifyingUserName: "",
        visible: "no",
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
    return groupOrganizer;
}

function addText(groupOrganizer, groupName, itemName, userName, newText) {
    //must be locked first
    //find the item
    //verify if not visible that only the owner can modify
    //verify if locked and visible, check that only the modifyingUserName can modify

    for (var i = 0; i < groupOrganizer.length; i++) {

        if (groupOrganizer[i].groupName == groupName) {
            for (var j = 0; j < groupOrganizer[i].items.length; j++) {

                if (groupOrganizer[i].items[j].itemName == itemName &&
                    groupOrganizer[i].items[j].locked == "yes" &&
                    groupOrganizer[i].items[j].modifyingUserName == userName) {

                    if (groupOrganizer[i].items[j].visible == "no" &&
                        groupOrganizer[i].items[j].ownerName == userName) {
                        //modifyingUser = user
                        //owner = user
                        //visiblity = no
                        //locked = yes
                        groupOrganizer[i].items[j].texts.push(newText)

                    } else if (groupOrganizer[i].items[j].visible == "yes") {
                        //modifyingUser = user
                        //visibility = yes
                        //locked = yes
                        groupOrganizer[i].items[j].texts.push(newText)
                    }
                }
            }
        }
    }
    return groupOrganizer;
}


//locks the item if its not locked and adds the modifying username
function lockItem(groupOrganizer, groupName, itemName,userName) {
    for (var i = 0; i < groupOrganizer.length; i++) {
        if (groupOrganizer[i].groupName == groupName) {
            for (var j = 0; j < groupOrganizer[i].items.length; j++) {
                if (groupOrganizer[i].items[j].itemName == itemName &&
                    groupOrganizer[i].items[j].locked == "no") {

                    groupOrganizer[i].items[j].locked = "yes";
                    groupOrganizer[i].items[j].modifyingUserName = userName;
                    
                }
            }
        }
    }
    return groupOrganizer;
}

//unlocks item if the username matches the modifying username
function unlockItem(groupOrganizer, groupName, itemName,userName) {
    for (var i = 0; i < groupOrganizer.length; i++) {
        if (groupOrganizer[i].groupName == groupName) {
            for (var j = 0; j < groupOrganizer[i].items.length; j++) {
                if (groupOrganizer[i].items[j].itemName == itemName &&
                    groupOrganizer[i].items[j].modifyingUserName == userName) {
                    groupOrganizer[i].items[j].locked = "no";
                }
            }
        }
    }
    return groupOrganizer;
}

//make item visible
function makeVisible(groupOrganizer, groupName, itemName, userName) {
    for (var i = 0; i < groupOrganizer.length; i++) {
        if (groupOrganizer[i].groupName == groupName) {
            for (var j = 0; j < groupOrganizer[i].items.length; j++) {
                if (groupOrganizer[i].items[j].itemName == itemName &&
                    groupOrganizer[i].items[j].ownerName == userName) {
                    
                    groupOrganizer[i].items[j].visible = "yes";
                }
            }
        }
    }
    return groupOrganizer;
}

//make item invisible
function makeinVisible(groupOrganizer, groupName, itemName, userName) {
    for (var i = 0; i < groupOrganizer.length; i++) {
        if (groupOrganizer[i].groupName == groupName) {
            for (var j = 0; j < groupOrganizer[i].items.length; j++) {
                if (groupOrganizer[i].items[j].itemName == itemName &&
                    groupOrganizer[i].items[j].ownerName == userName) {
                    groupOrganizer[i].items[j].visible = "no";
                }
            }
        }
    }
    return groupOrganizer;
}

