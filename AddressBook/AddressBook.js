

var ABModule = (function (AddressBook) {

    var contactList = [];
    var groupList = ["Friends", "Family", "Legends", "Folks", "Giks", "Punks"];
    var nextId = 0;

    function getNextId() {
        return ++nextId;
    }
    function canCreate(firstName, lastName) {
        return (getContactIndex(firstName,lastName) > -1) ? false : true;
    }
    function getContactIndex(firstName, lastName) {
        var contactListLength, i;
        for (i = 0, contactListLength = contactList.length; i < contactListLength; i++) {
            if (contactList[i].firstName + contactList[i].lastName === firstName + lastName) {
                return i;
            }
        }
        return -1;
    }

    function getContactIndexById(id) {
        var contactListLength, i;
        for (i = 0, contactListLength = contactList.length; i < contactListLength; i++) {
            if (contactList[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    function getGroupIndexByName(Group) {
        var i;
        for (i = 0; i < groupList.length; i++) {
            if (Group === groupList[i]) { return i;}
        }
        return -1;
    }

    function renderContact(id, firstName, lastName, Group) {

        var d = document, tn, contactId;
        var contactDiv = d.createElement("div");
        var photoDiv = d.createElement("div");
        var dataDiv = d.createElement("div");
        var firstnameDiv = d.createElement("div");
        var lastnameDiv = d.createElement("div");
        var groupDiv = d.createElement("div");
        var actionsDiv = d.createElement("div");
        var deleteLink = d.createElement("a");
        var editLink = d.createElement("a");
        var selectDiv = d.createElement("div");

        contactDiv.setAttribute("id", "contact" + id);
        contactDiv.setAttribute("class", "contact");
        photoDiv.setAttribute("class", "contactphoto");
        tn = d.createTextNode("photo");
        photoDiv.appendChild(tn);
        contactDiv.appendChild(photoDiv);

        contactId = "contact" + id;
        actionsDiv.setAttribute("class", "actions");
        //deleteLink.setAttribute("deleteid", "contact" + id);
        deleteLink.onclick = function(){
            ABModule.DeleteContact(contactId, id);
        }

        tn = d.createTextNode("x");
        deleteLink.appendChild(tn);
        actionsDiv.appendChild(deleteLink);

        actionsDiv.appendChild(document.createElement("br"));

        editLink.setAttribute("editid", "contact" + id);
        editLink.onclick = function () {
            ABModule.beginEdit(contactId, id);
        };
        
        tn = d.createTextNode("e");
        editLink.appendChild(tn);
        actionsDiv.appendChild(editLink);

        contactDiv.appendChild(actionsDiv);

        firstnameDiv.setAttribute("class", "contactfirstname");
        lastnameDiv.setAttribute("class", "contactlastname");
        tn = d.createTextNode("Firstname: " + firstName);
        firstnameDiv.appendChild(tn);
        tn = d.createTextNode("Lastname: " + lastName);
        lastnameDiv.appendChild(tn);
        dataDiv.appendChild(firstnameDiv);
        dataDiv.appendChild(lastnameDiv);
        dataDiv.setAttribute("class", "contactdata");

    
        var selectElem = d.createElement("select");
        var selectItem, i;
        selectElem.setAttribute("name", "select" + id);
        selectElem.setAttribute("id", "select" + id);
        tn = document.createTextNode("Group: ");
        selectDiv.appendChild(tn);
        selectDiv.appendChild(selectElem);
        selectDiv.setAttribute("class", "contactgroup");
        dataDiv.appendChild(selectDiv);
        contactDiv.appendChild(dataDiv);

        document.getElementById("contacts").appendChild(contactDiv);
        var selectId = "select" + id;
        fillSelect(selectId, Group);

        selectDiv.onchange = function () {
            var selElem = document.getElementById("select" + id);
            ABModule.SetContactGroup(id, firstName, lastName, selElem.options[selElem.selectedIndex].value);
            renderAllContacts();
        }
    }

    function renderAllContacts() {
        var i,elementToRemove;
        var contactsDiv = document.getElementById("contacts");
        while(contactsDiv.firstChild){
            contactsDiv.removeChild(contactsDiv.firstChild);
        }

        var filterInGroup = document.getElementById("contactsingroup");
        var filterIngroupVal = filterInGroup.options[filterInGroup.selectedIndex].value;

        var criteria = document.getElementById("searchform").value;
        var filterCriteria = new RegExp(criteria, "i");
        var groupCriteria = new RegExp(document.getElementById("searchgroup").value, "i");

        for (i = 0; i < contactList.length; i++) {
            if (filterIngroupVal === "all" || filterIngroupVal === contactList[i].Group) {
                if (!criteria.length || (filterCriteria.test(contactList[i].firstName) ||
                filterCriteria.test(contactList[i].lastName)) ) {
                    if ( groupCriteria.test(contactList[i].Group) ){
                        renderContact(contactList[i].id, contactList[i].firstName, contactList[i].lastName, contactList[i].Group);
                    }
                }
            }
        }
    }

    function fillSelect(elementId,Group) {
        var elem, tn, i;
        for (i = 0; i < groupList.length; i++) {
            elem = document.createElement("option");
            tn = document.createTextNode(groupList[i]);
                        
            elem.setAttribute("value", groupList[i]);
            elem.appendChild(tn);
            if (!!Group && Group === groupList[i]){
                elem.setAttribute("selected","selected");
            }
            try{   
                document.getElementById(elementId).appendChild(elem);
            } catch (e) {
                alert(e.message + " / " + document.getElementById(elementId));
            }
        }
    };

    AddressBook.fillInitialData = function () {
       
        fillSelect("newGroup");
        fillSelect("contactsingroup");
        document.getElementById("editButton").disabled = true;
    
        /* test data */
        AddressBook.AddContact(1, "Alice", "Dog", "Family");
        AddressBook.AddContact(2, "Bonia", "Cat", "Family");
        AddressBook.AddContact(3, "Dmitry", "Baranovskiy", "Giks");
        AddressBook.AddContact(4, "Dmitry", "Soshnikov", "Giks");
        AddressBook.AddContact(5, "Addy", "Osmani", "Legends");
        AddressBook.AddContact(6, "Stoyan", "Stefanov", "Legends");
        AddressBook.AddContact(7, "Douglas", "Crockford", "Legends");
        AddressBook.AddContact(8, "Gray", "Wolf", "Folks");
    };

    AddressBook.toggleButtons = function() {
        var firstNameField = document.getElementById("firstname");
        var lastNameField = document.getElementById("lastname");
        var createButton = document.getElementById("createButton");
        var editButton = document.getElementById("editButton");

        createButton.disabled = true;

        if (getContactIndex(firstNameField.value, lastNameField.value) > -1) {
            createButton.disabled = true;
            editButton.disabled = false;
        } else {
            if(firstNameField.value.length || lastNameField.value.length){
                createButton.disabled = false;
            }
                editButton.disabled = true;
        }

    }

    AddressBook.AddContact = function (id, firstName, lastName, Group) {
        var contact;
        var nextId;
        // alert("create");
        var firstName = firstName || document.getElementById("firstname").value;
        var lastName = lastName || document.getElementById("lastname").value;
        var g = document.getElementById("newGroup");
        var Group = Group || g.options[g.selectedIndex].value;
        nextId = id || getNextId();
        if (canCreate(firstName, lastName) && (firstName.length || lastName.length)) {
            contact = {
                "id": nextId,
                "firstName": firstName,
                "lastName": lastName,
                "Group": Group
            };
            contactList.push(contact);
            renderContact(nextId, firstName, lastName, Group);
            document.getElementById("createButton").disabled = true;
            // alert(contactList.length);
        } else {
          //  alert("cannot create contact" + firstName);
        }

        
    };

    AddressBook.beginEdit = function(contactId,id) {

        var i = getContactIndexById(id);
        document.getElementById("firstname").value = contactList[i].firstName;
        document.getElementById("lastname").value = contactList[i].lastName;

        var g = document.getElementById("newGroup");
        var groupIndex = getGroupIndexByName(contactList[i].Group);
        g.selectedIndex = groupIndex;

        document.getElementById("editButton").disabled = false;
        document.getElementById("createButton").disabled = true;
        
    };

    AddressBook.EditContact = function () {

        var firstName = document.getElementById("firstname").value;
        var lastName = document.getElementById("lastname").value;
        var g = document.getElementById("newGroup");
        var Group = g.options[g.selectedIndex].value;

        var contactListLength, i;
        i = getContactIndex(firstName, lastName);
        var id = contactList[i].id;
        contactList[i].firstName = firstName;
        contactList[i].lastName = lastName;
        contactList[i].Group = Group;

        renderAllContacts();
        // alert(firstName + " " + lastName + " " + Group + " / " + id);
    };
    AddressBook.DeleteContact = function (contactId,id) {
        var i;
        var elementToDel = document.getElementById(contactId);
        elementToDel.parentElement.removeChild(elementToDel);
        i = getContactIndexById(id);
        contactList.splice(i,1);
    };
    AddressBook.SetContactGroup = function (id, firstName, lastName, Group){

        var i;
        i = getContactIndex(firstName, lastName);
        contactList[i].Group = Group;

        if(firstName === document.getElementById("firstname").value && lastName === document.getElementById("lastname").value){
            var g = document.getElementById("newGroup");
            var groupIndex = getGroupIndexByName(Group);
            g.selectedIndex = groupIndex;
            document.getElementById("editButton").disabled = true;
            
        }
    };
    AddressBook.FilterContacts = function () {
        renderAllContacts();
    };


    return AddressBook;
})(ABModule || {});



window.onload = function () {
    ABModule.fillInitialData();
    ABModule.toggleButtons();

    document.getElementById("firstname").onkeyup = function () {
        ABModule.toggleButtons();
    };
    document.getElementById("lastname").onkeyup = function () {
        ABModule.toggleButtons();
    };
    document.getElementById("editButton").onclick = function () {
        ABModule.EditContact();
    }
    document.getElementById("newGroup").onchange = function () {
        ABModule.EditContact();
    }
    document.getElementById("contactsingroup").onchange = function () {
        ABModule.FilterContacts();
    }

    document.getElementById("searchform").onkeyup = function () {
        ABModule.FilterContacts();
    }

    document.getElementById("searchgroup").onkeyup = function () {
        ABModule.FilterContacts();
    }

};
  