/**
 *@NApiVersion 2.0
 *@NModuleScope Public
 *@NScriptType Suitelet
 
 * Module Description
 * Deployment for RENTEGRATE_BulkPreview_suitelet on ROBD Details action
 * Includes rentOnRequestAction
 *
 * Version    Date            Author        Remarks
 * 1.0.0      08 Jul 2020     Sanath        Created for employee profile
 */
 define(['N/email', 'N/runtime', 'N/ui/serverWidget'], function(email, runtime, serverWidget) {
    function onRequest(context) {
        if (context.request.method === 'GET') {
            var form = serverWidget.createForm({
                title: 'KPI Employee Registration'
            });

            var subject = form.addField({
                id: 'subject',
                type: serverWidget.FieldType.TEXT,
                label: 'Subject'});
            subject.layoutType = serverWidget.FieldLayoutType.NORMAL;
            subject.updateBreakType = serverWidget.FieldBreakType.STARTCOL;
            subject.isMandatory = true;

            var recipient = form.addField({
                id: 'recipient',
                type: serverWidget.FieldType.EMAIL,
                label: 'Recipient email'
            });
            recipient.isMandatory = true;
        }
    }
    context.response.writePage(form);
    return {
        onRequest: onRequest
    };
});