//@ts-nocheck
sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
],
    /**55
      * @param {typeof sap.ui.model.json.JSONModel} JSONModel
      * @param {typeof sap.ui.Device} Device
      */
    function (JSONModel, Device) {
        'use strict';

        return {
            createRecipient: function () {
                var oData = {
                    recipient: {
                        name: "Word"
                    }
                };

                return new JSONModel(oData);

            },

            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            }
        }
});