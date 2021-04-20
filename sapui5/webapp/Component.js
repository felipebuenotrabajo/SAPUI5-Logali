sap.ui.define([
    "sap/ui/core/UIComponent",
    "logaligroupa21/sapui5/model/models",
    "sap/ui/model/resource/ResourceModel"
],
    /**
     * @param {type of "sap.ui.model.resource.ResourceModel"} ResourceModel
     * @param {type of "sap.ui.core.UIComponent"} UIComponent
     * @param {type of "logaligroupa21.sapui5.models.models"} models
     */

    function (UIComponent, models, ResourceModel) {
        'use strict';
        return UIComponent.extend("logaligroupa21.sapui5.Component", {

            metadata: {
                manifest : "json"
            },

            init: function () {

                //Call the init function
                UIComponent.prototype.init.apply(this, arguments);

                // set data Model on the view
                this.setModel(models.createRecipient());

                // set i18n Model on the view
                var i18nModel = new ResourceModel({ bundleName: "logaligroupa21.sapui5.i18n.i18n" });
                this.setModel(i18nModel, "i18n");

            }
        });
    });