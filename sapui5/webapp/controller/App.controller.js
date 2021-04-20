sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {type of sap.ui.core.mvc.Controller } Controller 
     * @param {type of sap.m.MessageToast} MessageToast
     */
    function (Controller, MessageToast) {

        return nd("logaligroupa21.sapui5.controller.App", {

            onInit: function() {
                
            },

            onShowHello: function () {
                //read text from i18n Model
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                //read property from data model
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                
                var sMsg = oBundle.getText("helloMsg", [sRecipient]);
                MessageToast.show(sMsg);
            }
        });
    });