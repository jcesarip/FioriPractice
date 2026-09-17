sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/ui/core/syncStyleClass",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller,
    UIComponent,
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
        onPressCreateCustom: function () {
            if (!this.pDialog) {
                this.pDialog = this.loadFragment({
                    name: "project1.view.fragments.Dialog"
                }).then(function (oDialog) {
                    syncStyleClass(this.getOwnerComponent().getContentDensityClass(), this.getView(), oDialog);
                    return oDialog;
                }.bind(this));
            }
            this.pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },
        onOkCloseDialogButton: function () {
            this.byId("idDialog").close();
        },
        onCustomerChange: function (oEvent) {
            var oBindingContext = oEvent.getParameter("listItem").getBindingContext();
            this.byId("idBookingsTable").setBindingContext(oBindingContext);
        },
        onFilterCustomers: function (oEvent) {
            let aFilter = [];
            let sQuery = oEvent.getParameter("query");
            if (sQuery && sQuery.length > 0) {

                aFilter.push(new Filter("CustomerName", FilterOperator.Contains, sQuery));
            }
            let oTable = this.byId("idCustomerTable");
            let oBinding = oTable.getBinding("items");
            oBinding.filter(aFilter);
        },
        onSaveCreateCustom: function () {
            let oModelData = this.getView().getModel("customer").getData();
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            if (oModelData.Discount === undefined) { oModelData.Discount = 0; }
            this.byId("idCustomerTable").getBinding("items").create({
                "Form": oModelData.Form,
                "CustomerName": oModelData.CustomerName,
                "Discount": oModelData.Discount + "",
                "Street": oModelData.Street,
                "PostCode": oModelData.PostCode,
                "City": oModelData.City,
                "Country": oModelData.Country,
                "Email": oModelData.Email,
                "Phone": oModelData.Phone
            }).created().then(function () {
                MessageToast.show(oResourceBundle.getText("customerCreatedMessage"));
            });
        },
        onNavToDetails: function (oEvent) {
            let oItem = oEvent.getSource();
            let oRouter = this.getOwnerComponent().getRouter();
            
            oRouter.navTo("RouteDetails",{
                customerId: oItem.getBindingContext().getPath().substring("/UX_Customer".length)
            });
        },
        ongotosecondpage: function() {
        
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetails");
                MessageToast.show("Va para details");
        }
    });
});