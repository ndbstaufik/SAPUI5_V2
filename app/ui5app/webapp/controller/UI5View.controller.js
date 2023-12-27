sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/ColumnListItem",
    "sap/m/Input",
    "sap/m/Label",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, ColumnListItem, Input, Label, JSONModel) {
        "use strict";

        return Controller.extend("ui5.ui5app.controller.UI5View", {
            onInit: function () {
                this._oTable = this.byId("table");
                this._createReadOnlyTemplates();
                this.rebindTable(this.oReadOnlyTemplate, "Navigation");

                this.oEditableTemplate = new ColumnListItem({
                    cells: [
                        new Label({
                            text: "{mainModel>ID}",
                            //change: [this.onInputChange, this]
                        }),
                        new Input({
                            value: "{mainModel>first_name}",
                            change: [this.onInputChange, this]
                        }), new Input({
                            value: "{mainModel>last_name}",
                            change: [this.onInputChange, this]
                        }), new Input({
                            value: "{mainModel>position}",
                            change: [this.onInputChange, this]
                        }), new Input({
                            value: "{mainModel>Experience}",
                            change: [this.onInputChange, this]
                        })
                    ]
                });
                //     // alert("UI5 ready to go");
                // var oViewModel;

                // oViewModel = this.getOwnerComponent().getModel();
                //     this.getView().setModel(oViewModel);
                //     console.log(this.getView().setModel(oViewModel));
            },

            onOpenAddDialog: function () {
                this.getView().byId("OpenDialog").open();
            },

            onCancelDialog: function (oEvent) {
                oEvent.getSource().getParent().close();
            },

            onCreate: function () {
                var idInput = this.getView().byId("idInput").getValue();
                const idCheck = `/Employees('${idInput}')`;
                if (idInput !== "") {
                    const oList = this._oTable;
                    const oBinding = oList.getBinding("items");
                    const oIDList = oList.getBinding("items").aPreviousData;
                    const oIDIndex = oIDList.indexOf(idCheck);
                    console.log(oIDIndex);
                    
                    if (oIDIndex >= 0) {
                        const errorMsg = `Employee ID ${idInput} is already exist!`;
                        this.getView().byId("OpenDialog").close();
                        MessageToast.show(errorMsg);
                    } else {
                        const oContext = oBinding.create({
                            "ID": this.byId("idInput").getValue(),
                            "first_name": this.byId("firstNameInput").getValue(),
                            "last_name": this.byId("lastNameInput").getValue(),
                            "position": this.byId("positionInput").getValue(),
                            "Experience": this.byId("experienceInput").getValue()
                        });
                        console.log(oContext);
                        oContext.created()
                            .then(() => {
                                this.getView().byId("OpenDialog").close();
                                //this.refreshModel("mainModel");
                            });
                    };
                } else {
                    MessageToast.show("ID cannot be blank");
                }

            },

            onPress: function () {
                alert("UI5 ready to go");
            },

            onDelete: function () {
                var oSelected = this.byId("table").getSelectedItem();
                if (oSelected) {
                    var oEmployee = oSelected.getBindingContext("mainModel").getObject().ID;

                    oSelected.getBindingContext("mainModel").delete("$auto").then(function () {
                        MessageToast.show(oEmployee + " SuccessFully Deleted");
                    }.bind(this), function (oError) {
                        MessageToast.show("Deletion Error: ", oError);
                    });
                } else {
                    MessageToast.show("Please Select a Row to Delete");
                }
            },

            onEdit: function () {
                this.byId("editButton").setVisible(false);
                this.byId("saveButton").setVisible(true);
                this.rebindTable(this.oEditableTemplate, "Edit");
            },

            rebindTable: function (oTemplate, sKeyboardMode) {
                this._oTable.bindItems({
                    path: "mainModel>/Employees",
                    template: oTemplate,
                    templateShareable: true
                }).setKeyboardMode(sKeyboardMode);
            },

            onInputChange: function () {
                this.refreshModel("mainModel");

            },

            refreshModel: function (sModelName, sGroup) {
                return new Promise((resolve, reject) => {
                    this.makeChangesAndSubmit.call(this, resolve, reject,
                        sModelName, sGroup);
                });

            },

            makeChangesAndSubmit: function (resolve, reject, sModelName, sGroup) {
                const that = this;
                sModelName = "mainModel";
                sGroup = "$auto";
                if (that.getView().getModel(sModelName).hasPendingChanges(sGroup)) {
                    that.getView().getModel(sModelName).submitBatch(sGroup).then(oSuccess => {
                        that.makeChangesAndSubmit(resolve, reject, sModelName, sGroup);
                        MessageToast.show("Record updated Successfully");
                    }, reject)
                        .catch(function errorHandler(err) {
                            MessageToast.show("Something Went Wrong ", err.message); // 'Oops!'
                        });
                } else {
                    that.getView().getModel(sModelName).refresh(sGroup);
                    resolve();
                }
            },

            onSave: function () {
                this.getView().byId("editButton").setVisible(true);
                this.getView().byId("saveButton").setVisible(false);
                this._oTable.setMode(sap.m.ListMode.None);
                this.getView().byId("table").setMode("SingleSelectLeft");
                this.rebindTable(this.oReadOnlyTemplate, "Navigation");

            },

            _createReadOnlyTemplates: function () {
                this.oReadOnlyTemplate = new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({
                            text: "{mainModel>ID}"
                        }),
                        new sap.m.Text({
                            text: "{mainModel>first_name}"
                        }),
                        new sap.m.Text({
                            text: "{mainModel>last_name}"
                        }),
                        new sap.m.Text({
                            text: "{mainModel>position}"
                        }),
                        new sap.m.Text({
                            text: "{mainModel>Experience}"
                        })
                    ]
                });
            },
        });
    });
