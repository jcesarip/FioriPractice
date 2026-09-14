sap.ui.define([
   "project1/localService/mockserver"
], function (
    mockserver
) {
    "use strict";

    mockserver.init();

    sap.ui.require(["sap/ui/core/ComponentSupport"]);
});