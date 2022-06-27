/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount

 * Module Description
 * Deployment for RECRUITMENT Job Post
 * Includes rentFieldChangedAction
 *
 * Version    Date            Author        Remarks
 * 2.0.0      8 Aug 2021   Sanath       Created for RECRUITMENT Job Post
 
*/

define(['N/log', 'N/search', 'N/format', 'N/runtime'],
    function(log, search, format, runtime) {
        /**
         * Function to be executed after line is selected.
         *
         * @param {Object} scriptContext
         * @param {string} scriptContext.fieldId - Field name
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
      
[]
// function pageInitAction(context) {
//     var currentRecord = context.currentRecord;

//     // currentRecord.setValue({
//     //     fieldId: 'custrecord_e_mail',
//     //     value:'prashanth@kpi.co'
        
//     // });
//     window.alert("Welcome to ba nk details...")
   
// } 
   /**
         * Function to be executed after line is selected.
         *
         * @param {Object} scriptContext
         * @param {string} scriptContext.fieldId - Field name
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        //  function FieldChangedAction(context) {
        //     currentRecord= context.currentRecord;
        //     var currentfieldId= context.fieldId;

        //     carrier_value=context.currentRecord.getValue({
        //         fieldId: 'name'

        //     });
        //   console.log(carrier_value)
        //     if(currentfieldId=="name")
        //     {
        //         var name=currentRecord.setValue({
        //             fieldId: 'custrecord_name_123',
        //             value:carrier_value
        //         });
        //     }
           
            
        // }

        /**
         * Function to be executed after line is selected.
         *
         * @param {Object} scriptContext
         * @param {string} scriptContext.fieldId - Field name
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
        */
        function SaveRecordAction(scriptContext) {
            alert("Are you sure to Proceed...");
            window.alert("Welcome to ba nk details...")

            return true;
        }
        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */
        
        // function lineInit(scriptContext) {
        //     // Code section : 1

        //     var currentRecord = scriptContext.currentRecord;
        //     var balance = currentRecord.getCurrentSublistValue({

        //         sublistId: "recmachcustrecord_sl_number_cs",

        //         fieldId: "custrecord_balance_cs",

        //     });
        //     if(balance){

        //         var selectOpt = currentRecord.getSublistField({

        //             sublistId: "recmachcustrecord_sl_number_cs",

        //             fieldId: "custrecord_balance_cs",

        //             line: currentRecord.getCurrentSublistIndex
                    

        //         });

        //         selectOpt.isDisabled = true;
        //     }

        // }

        // function validateLine(scriptContext) {
        //     var currentRecord = scriptContext.currentRecord;

        //     var deposite = currentRecord.getCurrentSublistValue({

        //                     sublistId: "recmachcustrecord_sl_number_cs",

        //                     fieldId: "custrecord_sl_number_cs",

        //                 });
        //                 var credit = currentRecord.getCurrentSublistValue({

        //                     sublistId: "recmachcustrecord_sl_number_cs",

        //                     fieldId: "custrecord_credited_amount_cs",

        //                 });
        //                 var balance = currentRecord.getCurrentSublistValue({

        //                     sublistId: "recmachcustrecord_sl_number_cs",

        //                     fieldId: "custrecord_balance_cs",

        //                 });

        //     if(deposite>0){
        //         balance=deposite+balance;
                
        //         currentRecord.setCurrentSublistValue({

        //             sublistId: scriptContext.sublistId,
        //             fieldId: 'custrecord_balance_cs',
        //             value: balance
        //         })   
        //                   }

        //  else if(credit>0){
        //         balance=credit+balance;
                
        //         currentRecord.setCurrentSublistValue({

        //             sublistId: scriptContext.sublistId,
        //             fieldId: 'custrecord_balance_cs',
        //             value: balance
        //         }) 
        //                  }
        //                   else{
        //                     currentRecord.setCurrentSublistValue({

        //                         sublistId: scriptContext.sublistId,
        //                         fieldId: 'custrecord_balance_cs',
        //                         value: balance
        //                     });   
                            
        //                   }
        //         return true;
        //          //console.log(balance)
        // }
        // function validateDelete(context) {
        //     var currentRecord = context.currentRecord;
        //     var sublistName = context.sublistId;
        //     if (sublistName)
        //         if (currentRecord.getCurrentSublistValue({
        //                 sublistId: sublistName,
        //                 fieldId: 'custrecord_sl_number_cs'
        //             }) === '55')
        //             currentRecord.setValue({
        //                 fieldId: 'memo',
        //                 value: 'Removing partner sublist'
        //             });
        //     return true;
        // }
        // function validateInsert(context) {
        //     var currentRecord = context.currentRecord;
        //     var sublistName = context.sublistId;
        //     if (sublistName)
        //         if (currentRecord.getCurrentSublistValue({
        //                 sublistId: sublistName,
        //                 fieldId: 'custrecord_sl_number_cs'
        //             }))
        //             alert("Inserted");
        //             // currentRecord.setCurrentSublistValue({
        //             //     sublistId: sublistName,
        //             //     fieldId: 'custrecord_sl_number_cs',
        //             //     value: '100.0%'
        //             // });
        //     return true;
        // }
        
       
      
    //    function validateField(context) {
    //     var currentRecord = context.currentRecord;

    //     if (context.fieldId == 'custrecord_phone_number_1'){
    //         var phno = currentRecord.getValue({
    //             fieldId: 'custrecord_phone_number_1'
    //         });
    //         var phLength = phno.length;
    //         if (phLength < 7){
    //             return false;
    //         }
    //         else{
    //             return true;
    //         }
    //         }
    //     }
        
        
        return {
           // pageInit: pageInitAction,
          //  fieldChanged: FieldChangedAction,
         saveRecord: SaveRecordAction,
          // lineInit: lineInit,
           // validateLine:validateLine,
          //  validateDelete:validateDelete,
            //validateInsert:validateInsert,
           //validateField:validateField,
        };

    });