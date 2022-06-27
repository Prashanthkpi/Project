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
function pageInit(context) {
    var currentRecord = context.currentRecord;
    
    dialog.alert({
        title: 'Announcement',
        message: 'Welcome to bank details...' 
    });
}
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
         function FieldChangedAction(context) {
            currentRecord= context.currentRecord;
            var currentfieldId= context.fieldId;

            carrier_value=context.currentRecord.getValue({
                fieldId: 'name'

            });
             
            if(currentfieldId == "name")
            {
                var name=currentRecord.setValue({
                    fieldId: 'custrecord_name_123',
                    value:'name'
                });
            }
           
            
        }

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

        //         fieldId: "custrecord_vist_place",

        //     });
        //     if(balance==0){

        //         var selectOpt = currentRecord.getSublistField({

        //             sublistId: "recmachcustrecord_ref_0",

        //             fieldId: "custrecord_vist_place",

        //             line: currentRecord.getCurrentSublistIndex
                    

        //         });

        //         selectOpt.isDisabled = true;
        //     }

        //}

        function validateLine(scriptContext) {
            var currentRecord = scriptContext.currentRecord;

            var deposite = currentRecord.getCurrentSublistValue({

                            sublistId: "recmachcustrecord_sl_number_cs",

                            fieldId: "custrecord_sl_number_cs",

                        });
                        var credit = currentRecord.getCurrentSublistValue({

                            sublistId: "recmachcustrecord_sl_number_cs",

                            fieldId: "custrecord_credited_amount_cs",

                        });
                        var balance = currentRecord.getCurrentSublistValue({

                            sublistId: "recmachcustrecord_sl_number_cs",

                            fieldId: "custrecord_balance_cs",

                        });

            if(deposite>0){
                balance=deposite+balance;
                
                currentRecord.setCurrentSublistValue({

                    sublistId: scriptContext.sublistId,
                    fieldId: 'custrecord_balance_cs',
                    value: 'balance'
                });   
                          }

         else if(credit>0){
                balance=credit+balance;
                
                currentRecord.setCurrentSublistValue({

                    sublistId: scriptContext.sublistId,
                    fieldId: 'custrecord_balance_cs',
                    value: 'balance'
                });   
                          }
                          else{
                            
                          }
                return true;

        }

        return {
            pageInit: pageInitAction,
            fieldChanged: FieldChangedAction,
            saveRecord: SaveRecordAction,
           // lineInit: lineInit,
            validateLine:validateLine,
        };

    });