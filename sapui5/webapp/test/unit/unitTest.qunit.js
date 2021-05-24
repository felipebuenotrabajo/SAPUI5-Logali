// @ts-nocheck
/* eslint-disable no-undef */
/*global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require([
        "logaligroupa21/sapui5/test/unit/AllTests"
    ],
    function () {
        QUnit.start();
    })
});
