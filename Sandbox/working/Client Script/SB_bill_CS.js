/**
* @NApiVersion 2.0
* @NScriptName
* @NScriptType ClientScript
* Module Description For cheque record
* Version    Date            Author        Remarks
*   2.0     26/07/2022      Prashanth      
*/
define(['N/record', 'N/ui/dialog', 'N/log', 'N/currentRecord', 'N/search','N/error'],
    function (record, dialog, log, currentRecord, search,error) {
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


         function FieldChangedAction(scriptContext) { 

            var currentRecord = scriptContext.currentRecord;
            var sublistName = scriptContext.sublistId;
            var name = scriptContext.fieldId;
            // var currentfieldId = scriptContext.fieldId;
            if(sublistName=='item')
            {
                console.log("hello i am in")
                if (name == 'item') {
                    jornalId = currentRecord.getValue({
                        fieldId: 'subsidiary'
                    });
                    if(jornalId=="14"){
                        var emirate = currentRecord.getCurrentSublistValue({
                            sublistId: 'items',
                            fieldId: 'custcol_emirate',
                            // value: pricing_item.id
                        });
                        if(emirate == " " || emirate == null)
                        {
                            alert("Enter the emirate value..")
                            return false;
                        }
                        else{
                            return true;
                        }
                    }
                }
                return true;
            }
                    }
         
                    function validateLine(context) {
                        var currentRecord = context.currentRecord;
                        var name = context.sublistId;
                        if (name === 'item')
                        {
                            jornalId = currentRecord.getValue({
                                fieldId: 'subsidiary'
                            }); 
                            if(jornalId=="14"){
                                var emirate = currentRecord.getCurrentSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'custcol_emirate',
                                    // value: pricing_item.id
                                });
                                if(emirate == "" || emirate == null)
                                {
                                    alert("Please enter value(s) for: Emirates")
                                    return false;
                                }
                                else{
                                    return true;
                                }
                            }
            
                        }
                        return true;
                    }
            return {
                // fieldChanged: FieldChangedAction,
                validateLine:validateLine
            };
        });
       