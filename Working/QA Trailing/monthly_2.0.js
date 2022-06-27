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
                fieldId: 'custrecord_phone_number',
                value:'452525485'
                
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
                fieldId: 'custrecord_customer_name1'

            });
             
            if(currentfieldId == "custrecord_customer_name1")
            {
                var name=currentRecord.setValue({
                    fieldId: 'custrecord_address1',
                    value:'Banglore'
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
            var city = currentRecord.getCurrentSublistValue({

                sublistId: "recmachcustrecord_reference_1",

                fieldId: "custrecord_bike_company",

            });
            if(city){

                var selectOpt = currentRecord.getSublistField({

                    sublistId: "recmachcustrecord_reference_1",

                    fieldId: "custrecord_bike_company",

                    line: currentRecord.getCurrentSublistIndex
                    

                });

                selectOpt.isDisabled = true;
            }

        }

        function validateLine(scriptContext) {
            var currentRecord = scriptContext.currentRecord;

            var product = currentRecord.getCurrentSublistValue({

                            sublistId: "recmachcustrecord_reference_1",

                            fieldId: "custrecord1446",

                        });
                        
            if(product>=2010){
                alert("Cannot select this product");  
                currentRecord.setCurrentSublistValue({

                    sublistId: scriptContext.sublistId,
                    fieldId: 'custrecord1446',
                    value: ""
                });   
                          }
         
                return true;

        }

        return {
            pageInit: pageInitAction,
            fieldChanged: FieldChangedAction,
            saveRecord: SaveRecordAction,
            lineInit: lineInit,
            validateLine:validateLine,
        };

    });