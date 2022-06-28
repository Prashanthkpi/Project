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
                fieldId: 'custrecord_prashanth_contact_nm_las_form',
                value:'H K'
                
            });
            alert("Welcome to to this form!.....")
           
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

           var carrier_value=context.currentRecord.getValue({
                fieldId: 'name'

            });
           // console.log(name1)
             
            if(currentfieldId== "name")
            {
                currentRecord.setValue({
                    fieldId: 'custrecord_prashanth_contact_name_form',
                    value:carrier_value
                });
               // alert(name1)
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
        //     var city = currentRecord.getCurrentSublistValue({

        //         sublistId: "recmachcustrecord_reference_1",

        //         fieldId: "custrecord_bike_company",

        //     });
        //     if(city){

        //         var selectOpt = currentRecord.getSublistField({

        //             sublistId: "recmachcustrecord_reference_1",

        //             fieldId: "custrecord_bike_company",

        //             line: currentRecord.getCurrentSublistIndex
                    

        //         });

        //         selectOpt.isDisabled = true;
        //     }

        // }

        // function validateLine(scriptContext) {
        //     var currentRecord = scriptContext.currentRecord;

        //     var product = currentRecord.getCurrentSublistValue({

        //                     sublistId: "recmachcustrecord_reference_1",

        //                     fieldId: "custrecord1446",

        //                 });
                        
        //     if(product>=2010){
        //         alert("Cannot select this product");  
        //         currentRecord.setCurrentSublistValue({

        //             sublistId: scriptContext.sublistId,
        //             fieldId: 'custrecord1446',
        //             value: ""
        //         });   
        //                   }
         
        //         return true;

        // }
        // function validateField(context) {
        //     var currentRecord = context.currentRecord;
        
        //     if (context.fieldId == 'custrecord_prashanth_adhar_number_form'){
        //         var lenghtad = currentRecord.getValue({
        //             fieldId: 'custrecord_prashanth_adhar_number_form'
        //         });
        //         var adharLength = lenghtad.length;
        //         console.log(+adharLength)
        //     }
        // if(adharLength<12)
        // {
        //     return false
        // }
        //     return true
        // }
        function validateField(context) {
            var currentRecord = context.currentRecord;
    
            if (context.fieldId == 'custrecord_prashanth_adhar_number_form'){
                var jobTitle = currentRecord.getValue({
                    fieldId: 'custrecord_prashanth_adhar_number_form'
                });
                var jobTitleLength = jobTitle.toString().length
                
               // console.log(+jobTitleLength)
                if (jobTitleLength < 12){
                    return false;
                }
                console.log(+jobTitleLength)   
            }
            return true;
        }
    

        return {
            pageInit: pageInitAction,
            fieldChanged: FieldChangedAction,
            saveRecord: SaveRecordAction,
            validateField:validateField,
            // lineInit: lineInit,
            // validateLine:validateLine,
        };

    });