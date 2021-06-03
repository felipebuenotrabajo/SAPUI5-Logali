//@ts-nocheck
sap.ui.define([
    "sap/ui/core/UIComponent",
    "logaligroupa21/sapui5/model/models",
    "sap/ui/model/resource/ResourceModel",
    "./controller/helloDialog",
    "sap/ui/Device"
],
    /**
     * @param {typeof sap.ui.model.resource.ResourceModel } ResourceModel
     * @param {typeof sap.ui.core.UIComponent } UIComponent
     * @param {typeof logaligroupa21.sapui5.model.models } models
     * @param {typeof sap.ui.Device } Device
     */

    function (UIComponent, models, ResourceModel, helloDialog, Device) {
        'use strict';
        return UIComponent.extend("logaligroupa21.sapui5.Component", {

            metadata: {
                manifest: "json"
            },

            init: function () {

                //Call the init function
                UIComponent.prototype.init.apply(this, arguments);

                // set data Model on the view
                this.setModel(models.createRecipient());

                //Comentamos la instancia del i18n porque ya se carga en el manifest
                // set i18n Model on the view
                //var i18nModel = new ResourceModel({ bundleName: "logaligroupa21.sapui5.i18n.i18n" });
                //this.setModel(i18nModel, "i18n");

                //Set the Device model
                this.setModel(models.createDeviceModel(), "device");

                this._helloDialog = new helloDialog(this.getRootControl());

                //Create the views based on the url/hash
                this.getRouter().initialize();

            },

            exit: function () {
                this._helloDialog.destroy();
                delete this._helloDialog;
            },

            openHelloDialog: function () {
                this._helloDialog.open();
            },

            getContentDensityClass: function () {
                if  (!Device.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCompact"
                }else {
                    this._sContentDensityClass = "sapUiSizeCozi"
                }
                return this._sContentDensityClass;
            }

        });
    });