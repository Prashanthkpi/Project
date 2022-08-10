/**
* @NApiVersion 2.0
* @NScriptName
* @NScriptType ClientScript
* Module Description
* Version    Date            Author        Remarks
*      
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
            // var sublistName = scriptContext.sublistId;
            var name = scriptContext.fieldId;
            // var currentfieldId = scriptContext.fieldId;
            if (name == 'account') {
                jornalId = currentRecord.getValue({
                    fieldId: 'subsidiary'
                });
                if(jornalId=="14"){
                    var emirate = currentRecord.getCurrentSublistValue({
                        sublistId: 'lines',
                        fieldId: 'custcol_emirate',
                        // value: pricing_item.id
                    });
                    if(emirate == " " || emirate == null)
                    {
                        alert("Enter the emirates value..")
                        return false;
                    }
                    else{
                        return true;
                    }
                }
            }
            return true;
        }
        function validateLine(context) {
            var currentRecord = context.currentRecord;
            var name = context.sublistId;
            if (name === 'line')
            {
                jornalId = currentRecord.getValue({
                    fieldId: 'subsidiary'
                }); 
                if(jornalId=="14"){
                    var emirate = currentRecord.getCurrentSublistValue({
                        sublistId: 'line',
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
                validateLine:validateLine,
            };
        });

       