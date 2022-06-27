function beforeload(type) {
    //nlapiSetFieldValue("custrecord_name_1","Prashanth")
    nlapiSetFieldValue("name","Prashanth")
    var today= new Date();
    nlapiSetFieldValue("custrecord_da_te",today)
    nlapiSetFieldValue("custrecord_time",timeStamp)
   
}

function beforesubmit(type) {

   var name =  nlapiGetFieldValue("name");

   name = name+"K R";

   nlapiSetFieldValue("name",name);

}

function aftersubmit(type) {

     nlapiSendEmail('1699', 'anjali@kpi.co', 'After Submit', 'Data Submitted Successfully', null, null, null, null);

 }