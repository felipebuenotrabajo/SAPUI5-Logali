// @ts-nocheck
sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
],
    /**
     * @param {type of sap.ui.base.ManagedObject} ManagedObject
     * @param {type of sap.ui.core.Fragment} Fragment
     */
    function (ManageObject, Fragment) {
        'use strict';
        return ManageObject.extend("logaligroupa21.sapui5.controller.helloDialog", {
            //Añadimos un atributo
            constructor: function (oView) {
                this._oView = oView;
            },

            exit: function () {
                delete this._oView;
            },

            open: function () {

                const oView = this._oView;

                //Si no está instanciado, lo instanciamos
                //Create dialog lazili
                if (!oView.byId("helloDialog")) {
                    let oFragmentController = {
                        onCloseDialog: function () {
                            oView.byId("helloDialog").close();
                        }
                    };
                    
                    // Load asyntonous XML Fragment
                    Fragment.load({
                        id: oView.getId(),
                        name: "logaligroupa21.sapui5.view.HelloDialog",
                        controller: oFragmentController
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                } else {
                    oView.byId("helloDialog").open();
                }
            }

        });
    });