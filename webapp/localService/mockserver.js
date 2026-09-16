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
                rootUri: "/sap/opu/odata4/sap/ux_ui_customer_o4/srvd/sap/ux_ui_customer/0001/"
            });
            oMockServer.simulate("../../localService/metadata.xml", {
                sMockdataBaseUrl: "../../localService/mockdata",
                bGenerateMissingMockData: true
            });
            oMockServer.start();
            Log.info("Ejecutando MockSever")

        }
    };
});