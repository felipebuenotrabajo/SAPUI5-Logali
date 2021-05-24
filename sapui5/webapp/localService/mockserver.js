//@ts-nocheck
sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"
],
    /**
     * @param{ typeof sap.ui.core.util.MockServer} MockServer
     * @param{ typeof sap.ui.model.json.JSONModel} JSONModel
     * @param{ typeof sap.base.util.UriParameters} UriParameters
     * @param{ typeof sap.base.Log} Log
     *
     **/
    function (MockServer, JSONModel, UriParameters, Log) {
        'use strict';

        var oMockServer,
            _sAppPath = "logaligroupa21/sapui5/",
            _sJsonFilesPath = _sAppPath + "localService/mockdata";

        var oMockServerInterface = {

            /**
             * Initializes the mock server asynchronously
             * @protected
             * @param {object} oOptionsParameter
             * returns{Promise} a promise that is resolved when the mock has been started
             */

            init: function (oOptionsParameter) {

                var oOptions = oOptionsParameter || {};
                return new Promise(function (fnResolve, fnReject) {
                    var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                        oManifestModel = new JSONModel(sManifestUrl);

                    oManifestModel.attachRequestCompleted(function () {
                        var oUriParameters = new UriParameters(window.location.href);

                        //Parse manifest for local metadata URI
                        var sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath);
                        var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
                        var sMetadaUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);

                        //ensuere there is a trailing slash
                        var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();

                        // create a mock server instance or stop the exisitng on to reinitialize
                        if (!oMockServer) {
                            oMockServer = new MockServer({
                                rootUri: sMockServerUrl
                            });
                        } else {
                            oMockServer.stop();
                        }

                        //configure mock server with the given options or adefault delay of 0,5s
                        MockServer.config({
                            autoRespond: true,
                            autoRespondAfter: (oOptions.delay || oUriParameters.get("serverDelay") || 500)
                        });

                        //Simulate all request using mock data
                        oMockServer.simulate(sMetadaUrl, {
                            sMockdataBaseUrl : sJsonFilesUrl,
                            bGenerateMissingMockData : true
                        });

                        var aRequest = oMockServer.getRequests();

                        //compose an error response for each request
                        var fnResponse = function (iErrCode, sMessage, aRequest) {
                            aRequest.response = function(oXhr) {
                               oXhr.respond(iErrCode, {"Content-Type" : "text/plain;charset=utf-8"}, sMessage) ;
                            };
                        };

                        //Simulate metadata errors
                        if (oOptions.metadataError || oUriParameters.get("metadataError")) {
                            aRequest.forEach(function (aEntry) {
                                if(aEntry.path.toString().indezof("$metadata") > -1) {
                                    fbResponse(500, "metadara Error", aEntry);
                                }
                            });
                        };
                        //Simulate request errors

                        var sErrorParam = oOptions.errorType || oUriParameters.get("errorType");
                        var iErrorCode = sErrorParam ==="badRequest" ? 400 : 500;
                        if (sErrorParam) {
                            aRequest.forEach(function(aEntry){
                                fnResponse(iErrorCode, sErrorParam, aEntry);
                            });
                        };

                        //set request and start the server
                        oMockServer.setRequests(aRequest);
                        oMockServer.start();
                        Log.info("Running the app with the mock data");
                        fnResolve();
                     });

                     oManifestModel.attachRequestFailed(function() {
                         var sError = "failed to load the application manifest";
                         Log.error(sError);
                         fbReject( new Error(sError))
                     });

                });

            }

        };

        return oMockServerInterface;

    });