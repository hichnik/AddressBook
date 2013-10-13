///<reference path="../lib/jasmine.js"/>
///<reference path="../AddressBook.js"/>

describe("AddressBook Application", function () {
    describe("I want to have contacts pool to store my contacts", function () {
        it("I must have AddressBook namespace", function () {
            expect( ABModule ).toBeDefined();
        });
        
    });
    describe("I want to be able to add contacts", function () {
        it("I want to be able to add contact", function () {
            expect( ABModule.AddContact ).toBeDefined();
        });
    });
    describe("I want to be able to edit contacts", function () {
        it("I want to be able to edit contact", function () {
            expect( ABModule.EditContact ).toBeDefined();
        });
    });
    describe("I want to be able to delete contacts", function () {
        it("I want to be able to delete contact", function () {
            expect( ABModule.DeleteContact ).toBeDefined();
        });
    }); 
    describe("I want to be able to search by name/surname match through my contacts", function () {
        it("I want to filter contacts", function () {
            expect( ABModule.FilterContacts ).toBeDefined();
        });
    });
    describe("I want to be able to group my contacts", function () {
        it("I want to set a group on each contact", function () {
            expect( ABModule.SetContactGroup ).toBeDefined(); 
        });
    });
    describe("I want to be able to search by group through my contacts", function () {
        it("I want to list contacts im partucular group", function () {
            expect( ABModule.ListContacts ).toBeDefined();
        });
   });
    describe("I want to be able to put any contact in any group (contact can be in only one group)", function () {
        it("I want to change a group on each contact", function () {
            expect( ABModule.SetContactGroup).toBeDefined();

        });
    });
});

describe("AddressBook optional features", function () {
    describe("It should be web application", function () {
    });
    describe("It should work like one page WEB application and should use AJAX technology, load and submit data without reloading a page.", function () {
    });
    describe("It should have client side and server side validation", function () {
    });
    describe("It should have user authentication solution and a user should only have access to their own contacts", function () {
    });
    describe("It should have automated tests for all functionality", function () {
            it("It should have automated tests ...", function () {
            expect(true).toBe(true); // test jasmine
        });
    });

});



/*
Adress book

I’m really absent-minded person, who have got a lot of  acquaintances, which I have to keep info about.
Functional requirements:
•I want to be able to add/edit/delete contacts
•I want to be able to search by name/surname match through my contacts
•I want to be able to group my contacts
•I want to be able to search by group through my contacts
•I want to be able to put any contact in any group (contact can be in only one group)


Technical requirements
● It should be WEB application
○ For the client side must be used: HTML, CSS (any libs as Twitter Bootstrap,Blueprint ...), JavaScript (any libs as jQuery, Prototype ...)
○ Server side is not required

Additional requirements(optional)
● For server side any language as Ruby, PHP, Python, JavaScript, C#, Java ...    
● It should work like one page WEB application and should use AJAX technology, load and submit data without reloading a page.
● It should have client side and server side validation.    
● It should have user authentication solution and a user should only have access to their own contacts. 
● It should have automated tests for all functionality.    

*/
