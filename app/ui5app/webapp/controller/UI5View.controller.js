sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("ui5.ui5app.controller.UI5View", {
            onInit: function () {
               // alert("UI5 ready to go");
                var oViewModel;

                // keeps the search state
                //this._aTableSearchState = [];

                // Model used to manipulate control states
                // oViewModel = new JSONModel({
                //     worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
                //     //shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
                //     //shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
                //     //tableNoDataText: this.getResourceBundle().getText("tableNoDataText")
                // });
                oViewModel = this.getOwnerComponent().getModel();
                //this.setModel(oViewModel); //, "UI5View"
                this.getView().setModel(oViewModel);
            },

            onPress: function () {
                alert("UI5 ready to go");
            }
        });
    });
