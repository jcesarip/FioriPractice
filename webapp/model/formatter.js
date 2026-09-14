sap.ui.define([
    "sap/base/i18n/ResourceBundle"
], function (
	ResourceBundle){

    "use strict";

    return {
        classText: function(sClass) {
            var oResourceBunle = ResourceBundle.create({url:"i18n/i18n.properties"});
            switch(sClass){
                case "C":
                    return oResourceBunle.getText("flightClassC");
                    case "Y":
                        return oResourceBunle.getText("flightClassY");
                        case "F":
                            return oResourceBunle.getText("flightClassF");
                            default:
                                return sClass;
            }
        }
    };
});