sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/base/Log"
], function (
    MockSever, Log
) {
    "use strict";

    return {
        init: function () {
            const oMockServer = new MockSever({
                rootUri: "/"
            });
            oMockServer.simulate("../localService/metadata.xml", {
                sMockdataBaseUrl: "../localService/mockdata",
                bGenerateMissingMockData: true
            });
            oMockServer.start();
            Log.info("Ejecutando MockSever")

        }
    };
});