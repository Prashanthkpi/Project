/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */
 define(['N/record','N/email', 'N/format', 'N/task', 'N/ui/serverWidget', 'N/redirect', 'N/runtime', 'N/error', 'N/log'],
 function (record, email, format, task, serverWidget, redirect, runtime, error, log) {
     /**
      * Function definition to be triggered before record is loaded.
      *
      * @param {Object} scriptContext
      * @param {Record} scriptContext.newRecord - New record
      * @param {string} scriptContext.type - Trigger type
      * @param {Form} scriptContext.form - Current form
      * @Since 2015.2
      */
     function beforeload(scriptContext) {
        var NewRecord=scriptContext.newRecord;
         if (scriptContext.type == 'create' || scriptContext.type == 'copy') {

            NewRecord.setValue({
                fieldId:"name",
                value: "Sharath"   
                 
            })
            NewRecord.setValue({
            fieldId:"custrecord_mb_phone",
                value: "4545454545"
            })
         }
     }
     /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */
     function beforesubmit(scriptContext) {
        
        var NewRecord=scriptContext.newRecord;
         if (scriptContext.type == 'create' || scriptContext.type == 'copy') {
            var p_id = NewRecord.getValue({
                fieldId: "name"
            });
            NewRecord.setValue({
                fieldId:"name",
                value: p_id + " H K"  
            })
          
         }
     }
     /**
        * Function definition to be triggered before record is loaded.
        *
        * @param {Object} scriptContext
        * @param {Record} scriptContext.newRecord - New record
        * @param {Record} scriptContext.oldRecord - Old record
        * @param {string} scriptContext.type - Trigger type
        * @Since 2015.2
        */
     function aftersubmit(scriptContext) {
         
        var NewRecord = scriptContext.newRecord;
        // // var h_id = NewRecord.getValue({
        // //     fieldId: "custrecord_companyname"
        // });
        email.send({
            author: "1719",
            recipients: "prasahnth@kpi.co",
            subject: "This is 2.0 UE",
            body: "Your Data Submitted Successfully",
        });
     }

     return {
         beforeLoad: beforeload,
         beforeSubmit: beforesubmit,
         afterSubmit: aftersubmit
     };
 });