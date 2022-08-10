/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 
 * Module Description
 *
 * Version    Date            Author        Remarks
 * 1.0.0                      Arshitha MS          
 
 */
 define(['N/record', 'N/log', "N/file", 'N/search', './moment.js', 'N/ui/serverWidget', 'N/runtime', 'N/format','N/workbook'],

 function (record, log, file, search, moment, serverWidget, runtime, format,workbook) {


     /**
      * Definition of the Suitelet script trigger point.
      *
      * @param {Object} context
      * @param {ServerRequest} context.request - Encapsulation of the incoming request
      * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
      */

     function doRequiredAction(context) {


         if (context.request.method == "GET") {

             var dateFormat = runtime.getCurrentUser().getPreference('DATEFORMAT');
             log.debug("dateFormat", dateFormat)
             dateFormat = checkDateFormat(dateFormat);

             var custId = context.request.parameters["custscript_test_customer"];
             log.debug("custId", custId);
             var fromMonth = context.request.parameters["custscript_from_month"];
             log.debug("fromMonth", fromMonth);
             var toMonth = context.request.parameters["custscript_to_month"];
             log.debug("toMonth", toMonth);
             var yearName = context.request.parameters["custscript_year_name"];
             log.debug("yearName", yearName);

             // months start at index 0 in momentjs, so we subtract 1
             // month in moment is 0 based, so 0 is actually january, subtract 1 to compensate.
             // array is 'year', 'month', 'day', etc

             var fromDate = moment([yearName, fromMonth - 1]).format(dateFormat);
             log.debug("fromDate", fromDate);

             var toDate = new Date(yearName, toMonth, 0);
             toDate = moment(toDate).format(dateFormat);
             log.debug("toDate", toDate);

             var form = serverWidget.createForm({
                 title: "Revenue Recognition Schedule"
             });

             var sublist = form.addSublist({
                 id: "sublist",
                 type: serverWidget.SublistType.LIST,
                 label: "Revenue Recognition Report"
             });
            //  var a=sublist.addField({
            //      id: "custpage_invoice_list1",
            //      type: serverWidget.FieldType.TEXT,
            //      // source: "item",
            //      label:"<pre font-size=2rem><center><b>Invoice#</center> Posted Schedule </b></pre>"
            //  }).updateDisplayType({
            //      displayType: serverWidget.FieldDisplayType.INLINE
            //  });
            
             sublist.addField({
                 id: "custpage_invoice_list",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "Invoice#"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });

             sublist.addField({
                 id: "custpage_invoice_date",
                 type: serverWidget.FieldType.DATE,
                 // source: "item",
                 label: "Invoice Date"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });

             sublist.addField({
                 id: "custpage_invoice_amount",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "Invoice Amount"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });

             var schedule1 = sublist.addField({
                 id: "custpage_scheduled1",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "January<br/>Scheduled"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             // schedule1.defaultValue = 0;
             // field.updateDisplaySize({
             //     height : 60,
             //     width : 100
             // });
             var posted1 = sublist.addField({
                 id: "custpage_posted1",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "January<br/>Posted"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //  posted1.defaultValue = 0;

             var schedule2 = sublist.addField({
                 id: "custpage_scheduled2",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "February<br/>Scheduled"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //  schedule2.defaultValue = 0;

             var posted2 = sublist.addField({
                 id: "custpage_posted2",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "February<br/>Posted"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //   posted2.defaultValue = 0;

             var schedule3 = sublist.addField({
                 id: "custpage_scheduled3",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "March<br/>Scheduled"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //  schedule3.defaultValue = 0;

             var posted3 = sublist.addField({
                 id: "custpage_posted3",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "March<br/>Posted"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //   posted3.defaultValue = 0;

             var schedule4 = sublist.addField({
                 id: "custpage_scheduled4",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "April<br/>Scheduled"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    schedule4.defaultValue = 0;

             var posted4 = sublist.addField({
                 id: "custpage_posted4",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "April<br/>Posted"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    posted4.defaultValue = 0;

             var schedule5 = sublist.addField({
                 id: "custpage_scheduled5",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "May<br/>Scheduled"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    schedule5.defaultValue = 0;

             var posted5 = sublist.addField({
                 id: "custpage_posted5",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "May<br/>Posted"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //   posted5.defaultValue = 0;

             var schedule6 = sublist.addField({
                 id: "custpage_scheduled6",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "June<br/>Scheduled"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    schedule6.defaultValue = 0;

             var posted6 = sublist.addField({
                 id: "custpage_posted6",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "June<br/>Posted"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    posted6.defaultValue = 0;

             var schedule7 = sublist.addField({
                 id: "custpage_scheduled7",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "July<br/>Scheduled"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    schedule7.defaultValue = 0;

             var posted7 = sublist.addField({
                 id: "custpage_posted7",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "July<br/>Posted"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    posted7.defaultValue = 0;

             var schedule8 = sublist.addField({
                 id: "custpage_scheduled8",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "August<br/>Scheduled"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    schedule8.defaultValue = 0;

             var posted8 = sublist.addField({
                 id: "custpage_posted8",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "August<br/>Posted"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    posted8.defaultValue = 0;

             var schedule9 = sublist.addField({
                 id: "custpage_scheduled9",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "September<br/>Scheduled"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    schedule9.defaultValue = 0;

             var posted9 = sublist.addField({
                 id: "custpage_posted9",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "September<br/>Posted"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    posted9.defaultValue = 0;

             var schedule10 = sublist.addField({
                 id: "custpage_scheduled10",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "September<br/>Scheduled"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    schedule10.defaultValue = 0;

             var posted10 = sublist.addField({
                 id: "custpage_posted10",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "October<br/>Posted"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    posted10.defaultValue = 0;

             var schedule11 = sublist.addField({
                 id: "custpage_scheduled11",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "November<br/>Scheduled"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    schedule11.defaultValue = 0;

             var posted11 = sublist.addField({
                 id: "custpage_posted11",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "November<br/>Posted"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    posted11.defaultValue = 0;

             var schedule12 = sublist.addField({
                 id: "custpage_scheduled12",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "December<br/>Scheduled"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    schedule12.defaultValue = 0;

             var posted12 = sublist.addField({
                 id: "custpage_posted12",
                 type: serverWidget.FieldType.TEXT,
                 // source: "item",
                 label: "December<br/>Posted"
             }).updateDisplayType({
                 displayType: serverWidget.FieldDisplayType.INLINE
             });
             //    posted12.defaultValue = 0;

             var recType = "customrecord_revenue_recognition_schedul";

             var col = new Array();
             var filter = new Array();

             filter.push(search.createFilter({
                 name: "name",
                 join: "custrecord_invoice_reference_rr",
                 operator: search.Operator.ANYOF,
                 values: custId
             }));
             filter.push(search.createFilter({
                 name: "mainline",
                 join: "custrecord_invoice_reference_rr",
                 operator: search.Operator.IS,
                 values: true
             }));
             filter.push(search.createFilter({
                 name: "isinactive",
                 operator: search.Operator.IS,
                 values: false
             }));
             filter.push(search.createFilter({
                 name: "custrecord_posting_date_rr",
                 operator: search.Operator.WITHIN,
                 values: [fromDate, toDate]
             }));

             col.push(search.createColumn({
                 name: "custrecord_invoice_reference_rr"
             }));
             col.push(search.createColumn({
                 name: "trandate",
                 join: "CUSTRECORD_INVOICE_REFERENCE_RR",
                 label: "Date"
             }));
             col.push(search.createColumn({
                 name: "custrecord_total_amount_rr",
                 label: "Total Amount"
             }));
             col.push(search.createColumn({
                 name: "custrecord_recognizable_amount_rr",
                 label: "Recognizable Amount"
             }));
             col.push(search.createColumn({
                 name: "custrecord_posting_date_rr",
                 label: "Posting Date"
             }));
             col.push(search.createColumn({
                 name: "custrecord_journal_reference_rr",
                 label: "Journal Reference"
             }));

             var searchObj = {};

             searchObj.type = recType;
             searchObj.filters = filter;
             searchObj.columns = col;

             var revenueResSet = search.create(searchObj);
             var searchResultCount = revenueResSet.runPaged().count;
             log.debug("searchResultCount-------", searchResultCount);
             var j = searchResultCount;
             var i = 0;
             var invTotal = 0;
             var totalScheduled1 = 0;
             var totalScheduled2 = 0;
             var totalScheduled3 = 0;
             var totalScheduled4 = 0;
             var totalScheduled5 = 0;
             var totalScheduled6 = 0;
             var totalScheduled7 = 0;
             var totalScheduled8 = 0;
             var totalScheduled9 = 0;
             var totalScheduled10 = 0;
             var totalScheduled11 = 0;
             var totalScheduled12 = 0;

             var totalPosted1 = 0;
             var totalPosted2 = 0;
             var totalPosted3 = 0;
             var totalPosted4 = 0;
             var totalPosted5 = 0;
             var totalPosted6 = 0;
             var totalPosted7 = 0;
             var totalPosted8 = 0;
             var totalPosted9 = 0;
             var totalPosted10 = 0;
             var totalPosted11 = 0;
             var totalPosted12 = 0;

             revenueResSet.run().each(function (result) {
                 var invRef = result.getText(result.columns[0]);
                 var invDate = result.getValue(result.columns[1]);
                 var invAmt = result.getValue(result.columns[2])
                 var scheduleAmt = result.getValue(result.columns[3]);
                 scheduleAmt = Number(scheduleAmt).toFixed(2);
                 var postedAmt = result.getValue(result.columns[3]);
                 postedAmt = Number(postedAmt).toFixed(2);

                 var postDate = result.getValue(result.columns[4]);
                 var jvRef = result.getValue(result.columns[5]);

                 // var postMonth = postDate.getUTCMonth();
                 // log.debug("postMonth", postMonth)

                 sublist.setSublistValue({
                     id: "custpage_invoice_list",
                     line: i,
                     value: invRef
                 });
                 sublist.setSublistValue({
                     id: "custpage_invoice_date",
                     line: i,
                     value: invDate
                 });
                 sublist.setSublistValue({
                     id: "custpage_invoice_amount",
                     line: i,
                     value: invAmt
                 });
                 invTotal = invTotal + Number(invAmt);

                 var check = moment(postDate, 'YYYY/MM/DD');

                 var month = check.format('M');
                 log.debug("postMonth", month)

                 sublist.setSublistValue({
                     id: "custpage_scheduled1",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_scheduled2",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_scheduled3",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_scheduled4",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_scheduled5",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_scheduled6",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_scheduled7",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_scheduled8",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_scheduled9",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_scheduled10",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_scheduled11",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_scheduled12",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_posted1",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_posted2",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_posted3",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_posted4",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_posted5",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_posted6",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_posted7",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_posted8",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_posted9",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_posted10",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_posted11",
                     line: i,
                     value: "0"
                 });
                 sublist.setSublistValue({
                     id: "custpage_posted12",
                     line: i,
                     value: "0"
                 });

                 if (jvRef) {
                     if (month == 1) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled1",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled1 = totalScheduled1 + Number(scheduleAmt);

                         sublist.setSublistValue({
                             id: "custpage_posted1",
                             line: i,
                             value: "<b>" + postedAmt + "</b>"
                         });
                         totalPosted1 = totalPosted1 + Number(postedAmt);
                     }
                     else if (month == 2) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled2",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled2 = totalScheduled2 + Number(scheduleAmt);

                         sublist.setSublistValue({
                             id: "custpage_posted2",
                             line: i,
                             value: "<b>" + postedAmt + "</b>"
                         });
                         totalPosted2 = totalPosted2 + Number(postedAmt);

                     }
                     else if (month == 3) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled3",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled3 = totalScheduled3 + Number(scheduleAmt);


                         sublist.setSublistValue({
                             id: "custpage_posted3",
                             line: i,
                             value: "<b>" + postedAmt + "</b>"
                         });
                         totalPosted3 = totalPosted3 + Number(postedAmt);

                     }
                     else if (month == 4) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled4",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled4 = totalScheduled4 + Number(scheduleAmt);

                         sublist.setSublistValue({
                             id: "custpage_posted4",
                             line: i,
                             value: "<b>" + postedAmt + "</b>"
                         });
                         totalPosted5 = totalPosted4 + Number(postedAmt);

                     }

                     else if (month == 5) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled5",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled5 = totalScheduled5 + Number(scheduleAmt);

                         sublist.setSublistValue({
                             id: "custpage_posted5",
                             line: i,
                             value: "<b>" + postedAmt + "</b>"
                         });
                         totalPosted5 = totalPosted5 + Number(postedAmt);

                     }
                     else if (month == 6) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled6",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled6 = totalScheduled6 + Number(scheduleAmt);

                         sublist.setSublistValue({
                             id: "custpage_posted6",
                             line: i,
                             value: "<b>" + postedAmt + "</b>"
                         });
                         totalPosted6 = totalPosted6 + Number(postedAmt);

                     }
                     else if (month == 7) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled7",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled7 = totalScheduled7 + Number(scheduleAmt);

                         sublist.setSublistValue({
                             id: "custpage_posted7",
                             line: i,
                             value: "<b>" + postedAmt + "</b>"
                         });
                         totalPosted7 = totalPosted7 + Number(postedAmt);

                     }
                     else if (month == 8) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled8",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled8 = totalScheduled8 + Number(scheduleAmt);

                         sublist.setSublistValue({
                             id: "custpage_posted8",
                             line: i,
                             value: "<b>" + postedAmt + "</b>"
                         });
                         totalPosted8 = totalPosted8 + Number(postedAmt);

                     }
                     else if (month == 9) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled9",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled9 = totalScheduled9 + Number(scheduleAmt);

                         sublist.setSublistValue({
                             id: "custpage_posted9",
                             line: i,
                             value: "<b>" + postedAmt + "</b>"
                         });
                         totalPosted9 = totalPosted9 + Number(postedAmt);

                     }
                     else if (month == 10) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled10",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled10 = totalScheduled10 + Number(scheduleAmt);

                         sublist.setSublistValue({
                             id: "custpage_posted10",
                             line: i,
                             value: "<b>" + totalPosted10 + "</b>"
                         });
                         totalPosted10 = totalPosted10 + Number(postedAmt);

                     }
                     else if (month == 11) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled11",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled11 = totalScheduled11 + Number(scheduleAmt);

                         sublist.setSublistValue({
                             id: "custpage_posted11",
                             line: i,
                             value: "<b>" + postedAmt + "</b>"
                         });
                         totalPosted11 = totalPosted11 + Number(postedAmt);

                     }
                     else if (month == 12) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled12",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled12 = totalScheduled12 + Number(scheduleAmt);

                         sublist.setSublistValue({
                             id: "custpage_posted12",
                             line: i,
                             value: "<b>" + postedAmt + "</b>"
                         });
                         totalPosted12 = totalPosted12 + Number(postedAmt);

                     }

                 } else {
                     if (month == 1) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled1",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled1 = totalScheduled1 + Number(scheduleAmt);

                     }
                     else if (month == 2) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled2",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled2 = totalScheduled2 + Number(scheduleAmt);

                     }
                     else if (month == 3) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled3",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled3 = totalScheduled3 + Number(scheduleAmt);

                     }
                     else if (month == 4) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled4",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled4 = totalScheduled4 + Number(scheduleAmt);

                     }

                     else if (month == 5) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled5",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled5 = totalScheduled5 + Number(scheduleAmt);

                     }
                     else if (month == 6) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled6",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled6 = totalScheduled6 + Number(scheduleAmt);

                     }
                     else if (month == 7) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled7",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled7 = totalScheduled7 + Number(scheduleAmt);

                     }
                     else if (month == 8) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled8",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled8 = totalScheduled8 + Number(scheduleAmt);

                     }
                     else if (month == 9) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled9",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled9 = totalScheduled9 + Number(scheduleAmt);

                     }
                     else if (month == 10) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled10",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled10 = totalScheduled10 + Number(scheduleAmt);

                     }
                     else if (month == 11) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled11",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled11 = totalScheduled11 + Number(scheduleAmt);

                     }
                     else if (month == 12) {
                         sublist.setSublistValue({
                             id: "custpage_scheduled12",
                             line: i,
                             value: "<b>" + scheduleAmt + "</b>"
                         });
                         totalScheduled12 = totalScheduled12 + Number(scheduleAmt);

                     }
                 }

                 i++;
                 return true;
             });
             sublist.setSublistValue({
                 id: "custpage_invoice_list",
                 line: j,
                 value: "<b>Total</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_invoice_amount",
                 line: j,
                 value: "<b>" + Number(invTotal).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_scheduled1",
                 line: j,
                 value: "<b>" + Number(totalScheduled1).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_scheduled2",
                 line: j,
                 value: "<b>" + Number(totalScheduled2).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_scheduled3",
                 line: j,
                 value: "<b>" + Number(totalScheduled3).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_scheduled4",
                 line: j,
                 value: "<b>" + Number(totalScheduled4).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_scheduled2",
                 line: j,
                 value: "<b>" + Number(totalScheduled2).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_scheduled5",
                 line: j,
                 value: "<b>" + Number(totalScheduled5).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_scheduled6",
                 line: j,
                 value: "<b>" + Number(totalScheduled6).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_scheduled7",
                 line: j,
                 value: "<b>" + Number(totalScheduled7).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_scheduled8",
                 line: j,
                 value: "<b>" + Number(totalScheduled8).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_scheduled9",
                 line: j,
                 value: "<b>" + Number(totalScheduled9).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_scheduled10",
                 line: j,
                 value: "<b>" + Number(totalScheduled10).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_scheduled11",
                 line: j,
                 value: "<b>" + Number(totalScheduled11).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_scheduled12",
                 line: j,
                 value: "<b>" + Number(totalScheduled12).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_posted1",
                 line: j,
                 value: "<b>" + Number(totalPosted1).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_posted2",
                 line: j,
                 value: "<b>" + Number(totalPosted2).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_posted3",
                 line: j,
                 value: "<b>" + Number(totalPosted3).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_posted4",
                 line: j,
                 value: "<b>" + Number(totalPosted4).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_posted5",
                 line: j,
                 value: "<b>" + Number(totalPosted5).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_posted6",
                 line: j,
                 value: "<b>" + Number(totalPosted6).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_posted7",
                 line: j,
                 value: "<b>" + Number(totalPosted7).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_posted8",
                 line: j,
                 value: "<b>" + Number(totalPosted8).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_posted9",
                 line: j,
                 value: "<b>" + Number(totalPosted9).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_posted10",
                 line: j,
                 value: "<b>" + Number(totalPosted10).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_posted11",
                 line: j,
                 value: "<b>" + Number(totalPosted11).toFixed(2) + "</b>"
             });
             sublist.setSublistValue({
                 id: "custpage_posted12",
                 line: j,
                 value: "<b>" + Number(totalPosted12).toFixed(2) + "</b>"
             });

             context.response.writePage(form);
         }
     }
     return {
         onRequest: doRequiredAction
     };

 });
function checkDateFormat(dateformat) {
 var dateText = dateformat;
 // dateText.replace("MON","MMM")
 // dateText.replace("MONTH","MMMM")
 if (dateText == "D-Mon-YYYY") {
     dateText = "D-MMM-YYYY"
 } else if (dateText == "DD-Mon-YYYY") {
     dateText = "DD-MMM-YYYY"
 } else if (dateText == "D-MONTH-YYYY") {
     dateText = "D-MMMM-YYYY"
 } else if (dateText == "D MONTH, YYYY") {
     dateText = "D MMMM,YYYY"
 } else if (dateText == "DD-MONTH-YYYY") {
     dateText = "DD-MMMMM-YYYY"
 } else if (dateText == "DD MONTH,YYYY") {
     dateText = "DD MMMMM,YYYY"
 }
 log.debug("my  dateformat", dateText)
 return dateText;
}
function replaceCharector(charVal) {
 return charVal.replace(/&/g, "&amp;");
}

function removeNull(string) {
 if (string == null) {
     string = "";
 } else {
     string = string;
 }
 return string;
}
function numberWithCommas(x) {
 return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}