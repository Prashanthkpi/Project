function pageInit(type) {
    alert("Welcome to Our showroom");
}

function fieldChange(type,name) {
    if(name == "custrecord_customer_name1") {
        var eName = nlapiGetFieldValue("custrecord_customer_name1");
        if(eName!=0){
            
                nlapiSetFieldValue("custrecord_phone_number","12121212")
            
        }
    }
}

function saveRecord(type) {
    alert("Are you sure to Proceed");
    return true;
}

function lineInit(type) {

    var detType =  nlapiGetCurrentLineItemValue("recmachcustrecord_reference_1","custrecord_engine_type");
    if(detType!=0){
        alert("Enter the amount");
    }
      
    return true;
}

function validateLine(type) {

    var name =  nlapiGetCurrentLineItemValue("recmachcustrecord_reference_1","custrecord_price");
   var num=100;
    
    if (name>=1000){
        alert("Enter proper amount");
        //nlapiSetCurrentLineItemValue("recmachcustrecord_companyref","custrecord_custname","T");
        return false;
    }
    
   return true;
    
  }

