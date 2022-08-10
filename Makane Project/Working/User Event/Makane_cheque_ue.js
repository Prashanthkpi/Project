/**

 * @NApiVersion 2.x

 * @NScriptType UserEventScript

 * @NModuleScope SameAccount

 */

define(['N/record', 'N/search', 'N/format', 'N/task', 'N/ui/serverWidget', 'N/redirect', 'N/runtime', 'N/error', 'N/log', 'N/url'],
    function (record, search, format, task, serverWidget, redirect, runtime, error, log, url) {
        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type
         * @param {Form} scriptContext.form - Current form
         * @param {Form} scriptContext.form - Current form
         * @Since 2015.2
         */
        function beforeLoadAction(scriptContext) {
            if (scriptContext.type == 'view') {
                currentRecord = scriptContext.newRecord;
                var recId = scriptContext.newRecord.id;
                log.debug("recId", recId);
                scriptContext.form.addButton({
                    id: 'custpage_print_button',
                    label: 'Print',
                    functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=316&deploy=3&recID=' + recId+ '&end=true\')'
                });
            }
        }
        return {
            beforeLoad: beforeLoadAction,
        };
    });

