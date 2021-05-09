// @ts-nocheck
sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    '../model/InvoicesFormatter'
],
    /**
     * 
     * @param {sap.ui.core.mvc.Controller} Controller 
     * @param {sap.ui.model.json.JSONModel'} JSONModel 
     */

    function (Controller, JSONModel, InvoicesFormatter) {
        'use strict';
        return Controller.extend("logaligroupa21.sapui5.controller.InvoicesList", {

            formateador: InvoicesFormatter,

            onInit: function () {
                var oViewModel = new JSONModel({
                    usd: "USD",
                    eur: "EUR"
                });
                this.getView().setModel(oViewModel, "currency");
            }

        })
    });