sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (
    Controller,
    History

) {
    "use strict";

    return Controller.extend("project1.controller.Details", {

        onInit: function () {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteView1").attachPatternMatched(this._onObjectMatched, this);


        },
        _onObjectMatched: function (oEvent) {
            this.getView().bindElement("/UX_Customer" + oEvent.getParameter("arguments").customerId);
        },
        onNavButtonBack: function () {
            let oHistory = History.getInstance();
            let sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteView1");
            }
        }
    });
});