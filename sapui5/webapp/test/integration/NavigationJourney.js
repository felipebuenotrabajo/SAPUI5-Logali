//@ts-nocheck
sap.ui.define([
    "logaligroupa21/sapui5/localService/mockserver",
    "sap/ui/test/opaQunit",
    "./pages/HelloPanel"
],

    /**
     * 
     * @param {typeof sap/ui/test/opaQunit} opaQunit 
     */
    function (mockserver, opaQunit) {
        QUnit.module("Navigation");
        opaQunit("Should open the Hello Dialog", function (Given, When, Then) {

            //Initialize the mock Server
            mockserver.init();

            //Arrangements
            Given.iStartMyUIComponent({
                componentConfig: {
                    name: "logaligroupa21.sapui5"
                }
            });

            //Acctions
            When.onTheAppPage.iSayHelloDialogButton();

            //Assertions
            Then.onTheAppPage.iSeeTheHelloDialog();

            //Cleanup
            Then.iTeardownMyApp();


        });

    });