// @ts-nocheck
/* eslint-disable no-undef */
/* gbloal QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict"

    sap.ui.require([
        "logaligroupa21/sapui5/test/integration/NavigationJourney"
    ], function () {
        QUnit.start();
    });
});
