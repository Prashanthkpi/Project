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
function pageInitAction(context) {
        var currentRecord = context.currentRecord;
    
        currentRecord.setValue({
            fieldId: 'custrecord_e_mail',
            value:'prashanth@kpi.co'
            
        });
        window.alert("Welcome to bank details...")
       
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
                    currentRecord.setValue({
                    fieldId: 'custrecord_name_123',
                    value:carrier_value
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
        
         function lineInit(scriptContext) {
                // Code section : 1
    
                var currentRecord = scriptContext.currentRecord;
                var balance = currentRecord.getCurrentSublistValue({
    
                    sublistId: "recmachcustrecord_sl_number_cs",
    
                    fieldId: "custrecord_balance_cs",
    
                });
                if(balance){
    
                    var selectOpt = currentRecord.getSublistField({
    
                        sublistId: "recmachcustrecord_sl_number_cs",
    
                        fieldId: "custrecord_balance_cs",
    
                        line: currentRecord.getCurrentSublistIndex
                        
    
                    });
    
                    selectOpt.isDisabled = true;
                }
    
            }

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

            if(deposite>0 && balance==" "){
                balance=deposite;
                
                currentRecord.setCurrentSublistValue({

                    sublistId: scriptContext.sublistId,
                    fieldId: 'custrecord_balance_cs',
                    value: balance
                });   

                          }
                     else if(deposite>0 && balance>0){
                            balance=deposite+balance;
                            
                            currentRecord.setCurrentSublistValue({
            
                                sublistId: scriptContext.sublistId,
                                fieldId: 'custrecord_balance_cs',
                                value: balance
                            });   
                        }

         else if(credit>0){
                balance=credit-balance;
                
                currentRecord.setCurrentSublistValue({

                    sublistId: scriptContext.sublistId,
                    fieldId: 'custrecord_balance_cs',
                    value: balance
                });   
                          }
                          else{
                            
                          }
                return true;

        }
       
        function validateField(context) {
            var currentRecord = context.currentRecord;
    
            if (context.fieldId == 'custrecord_phone_number_1'){
                var jobTitle = currentRecord.getValue({
                    fieldId: 'custrecord_phone_number_1'
                });
                var jobTitleLength = jobTitle.length;
                console.log(jobTitleLength)
                if (jobTitleLength < 7){
                    return false;
                }
            }
            return true;
        }
        // function postSourcing(context) {
        //     var currentRecord = context.currentRecord;
        //     var sublistName = context.sublistId;
        //     var sublistFieldName = context.fieldId;
        //     var line = context.line;
           
        //         var value12=currentRecord.getValue({
        //             fieldId: 'custrecord_name_123'
        //         });

        //         var value13=currentRecord.getSublistvalue({
        //          sublistId: "recmachcustrecord_sl_number_cs",
        //          fieldId:'custrecord_sl_number_cs'
        //         });
        //         if(sublistName==value13)
        //         {
        //             currentRecord.getCurrentSublistValue({
        //                 sublistId: sublistName,
        //                 fieldId: value12
        //         });
        //     }
        //         if (currentRecord.getCurrentSublistValue({
        //                 sublistId: sublistName,
        //                 fieldId: sublistFieldName
        //             }) === '39')
        //             if (currentRecord.getCurrentSublistValue({
        //                     sublistId: sublistName,
        //                     fieldId: 'pricelevels'
        //                 }) !== '1-1')
        //                 currentRecord.setCurrentSublistValue({
        //                     sublistId: sublistName,
        //                     fieldId: 'pricelevels',
        //                     value: '1-1'
        //                 });
        //  }
        //  function sublistChanged(context) {
        //     var currentRecord = context.currentRecord;
        //     var sublistName = context.sublistId;
        //    // var op = context.operation;
        //     if (sublistName === 'custrecord_deposite_cs')
        //         currentRecord.setValue({
        //             fieldId: 'custrecord_deposite_cs'
                  
        //         });
        //         window.alert("The value is changed...")
        // }
        function sublistChanged(context) {
            var currentRecord = context.currentRecord;
            var sublistName = context.sublistId;
            //var op = context.operation;
            if ('custrecord_year_demo'!==null){
                console.log("hfhjghdg")
              var year=currentRecord.getCurrentSublistValue({
                sublistId:sublistName ,
                    fieldId: 'custrecord_year_demo',
                    //value:custrecord_balance_cs
                });
                currentRecord.setCurrentSublistValue({
                    sublistId:sublistName,
                    fieldId: 'custrecord_age_demo1',
                    value:year
                });
            }
            if(year===custrecord_age_demo1 )
            {
                alert("the field is changed...")
            }
        }
        return {
            pageInit: pageInitAction,
            fieldChanged: FieldChangedAction,
            saveRecord: SaveRecordAction,
           lineInit: lineInit,
            validateLine:validateLine,
            validateField:validateField,
           // postSourcing:postSourcing,
            sublistChanged:sublistChanged,
        };

    });