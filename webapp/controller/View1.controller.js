sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/syncStyleClass",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller,
	MessageToast,
	syncStyleClass,
	JSONModel,
	Filter,
	FilterOperator) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
            let oModelJson = new JSONModel();
            this.getView().setModel(oModelJson, "customer");
        },
        onPressSayHello() {
            MessageToast.show("OEEE Salude pues mijo");
        },
        onPressCreateCustom: function() {
            if(!this.pDialog) {
                this.pDialog = this.loadFragment({
                    name: "project1.view.fragments.Dialog"
                }).then(function(oDialog){
                    syncStyleClass(this.getOwnerComponent().getContentDensityClass(),this.getView(),oDialog);
                    return oDialog;
                }.bind(this));
            }
            this.pDialog.then(function(oDialog){
                oDialog.open();
            });
        },
        onOkCloseDialogButton:  function() {
            this.byId("idDialog").close();
        },
        onCustomerChange: function (oEvent) {
            var oBindingContext = oEvent.getParameter("listItem").getBindingContext();
            this.byId("idBookingsTable").setBindingContext(oBindingContext);
        },
        onFilterCustomers: function (oEvent) {
            let aFilter = [];
            let sQuery = oEvent.getParameter("query");
            if(sQuery && sQuery.length > 0) {

                aFilter.push(new Filter("CustomerName", FilterOperator.Contains, sQuery));
            }
            let oTable = this.byId("idCustomerTable");
            let oBinding = oTable.getBinding("items");
            oBinding.filter(aFilter);
        }


    });
});