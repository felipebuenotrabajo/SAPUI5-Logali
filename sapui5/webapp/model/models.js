sap.ui.define([
    "sap/ui/model/json/JSONModel"
],
    /**55
      * @param {type of sap.ui.model.json.JSONModel} JSONModel
      */
    function (JSONModel) {
        'use strict';

        return {
            createRecipient: function () {
                var oData = {
                    recipient: {
                        name: "Word"
                    }
                };

                return new JSONModel(oData);

            }
        }
});