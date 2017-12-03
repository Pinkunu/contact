var app = {
    init: function () {
        this.ng = angular.module("appContact", []);

        this.directives();
    },
    directives: function () {
        this.ng.directive("inputText", function () {
            return {
                restrict: 'A',
                link: function (scope, ele, attr) {
                    var pattern = attr.inputText||'[A-Za-z.]';
                    jQuery(ele).on("keypress", function (event) {
                        var inp = String.fromCharCode(event.keyCode);
                        var reg = new RegExp("^" + pattern + "+$", "i");
                        
                        if (reg.test(inp) || event.keyCode == 32 || event.keyCode == 13) {
                            
                        } else {
                            event.preventDefault();
                        }
                    });
                }
            };
        });
    }
};

app.init();









/**
 * Main Controller
 */
app.ng.controller("MainController", function ($scope) {
    $scope.searchText = "";
    $scope.colors = ["success", "info", "primary", "warning", "error"];

    $scope.contactList = [
        {
            "firstName": "Joe",
            "lastName": "Perry",
            "contactNumber": "444-888-1223",
            "contactEmail": "joe@cordis.us"
        },
        {
            "firstName": "Kate",
            "lastName": "Will",
            "contactNumber": "244-838-1213",
            "contactEmail": "kate@cordis.us"
        },
        {
            "firstName": "Harry",
            "lastName": "Robert",
            "contactNumber": "744-138-1292",
            "contactEmail": "harry@cordis.us"
        },
        {
            "firstName": "Tom",
            "lastName": "Bill",
            "contactNumber": "241-188-1191",
            "contactEmail": "tom@cordis.us"
        },
        {
            "firstName": "Roger",
            "lastName": "Steel",
            "contactNumber": "111-177-1231",
            "contactEmail": "roger@cordis.us"
        }
    ];

    $scope.getVCardQR = function (contact) {
        if (!contact)
            return "";

        var format = "BEGIN:VCARD\n" +
                "VERSION:3.0\n" +
                "N:" + contact.lastName + ";" + contact.firstName + "\n" +
                "FN:" + contact.firstName + " " + contact.lastName + "\n" +
                "ORG:\nTITLE:\nADR:;;;;;;\nTEL;WORK;VOICE:\n" +
                "TEL;CELL:" + contact.contactNumber + "\n" +
                "TEL;FAX:\n" +
                "EMAIL;WORK;INTERNET:" + contact.contactEmail + "\n" +
                "URL:\nBDAY:\nEND:VCARD";

        return "http://www.qr-code-generator.com/phpqrcode/getCode.php?cht=qr&chs=180x180&choe=UTF-8&chld=L|0&chl=" + encodeURI(format);
    };
    
    

    $scope.addContact = function () {
        $scope.newContact = {};
        $("#addContactModal").modal("show");
    };

    $scope.editContact = function () {
        $scope.selectedContactBack = angular.copy($scope.selectedContact);
        $("#editContactModal").modal("show");
    };

    $scope.calcelEditContact = function () {

        $scope.selectedContact.firstName = $scope.selectedContactBack.firstName;
        $scope.selectedContact.lastName = $scope.selectedContactBack.lastName;
        $scope.selectedContact.contactNumber = $scope.selectedContactBack.contactNumber;
        $scope.selectedContact.contactEmail = $scope.selectedContactBack.contactEmail;
        $("#editContactModal").modal("show");
    };


    $scope.saveContact = function () {
        $scope.contactList.push($scope.newContact);
        $scope.newContact = {};
        $("#addContactModal").modal("hide");
    };


    $scope.showContact = function (contact) {
        $scope.selectedContact = contact;
        $("#showContactModal").modal("show");
    };
});