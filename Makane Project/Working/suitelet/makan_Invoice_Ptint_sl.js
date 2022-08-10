/**
* @NApiVersion 2.0
* @NScriptType Suitelet
* @NModuleScope SameAccount                                                                                                                                                                                                                                   
* Module Description
* Deployment for Invoice Print
* Includes poPrint
*
* Version    Date            Author        Remarks
        * 1.0.0      23 Jun 2021     Arshitha MS        Created for po print                                
* */
//  define(['N/log','N/ui/serverWidget', 'N/record', 'N/search', 'N/https', 'N/url', 'N/redirect', 'N/task', 'N/runtime'],
define(['N/log', 'N/ui/serverWidget', 'N/record', 'N/format', 'N/config', 'N/search', 'N/https', 'N/url', 'N/redirect', 'N/task', "N/runtime", "N/file", , 'N/render'],
    function (log, serverWidget, record, format, config, search, http, url, redirect, task, runtime, render, file) {
        /**
         * Definition of the Suitelet script trigger point.
         *
         * @param {Object} context
         * @param {ServerRequest} context.request - Encapsulation of the incoming request
         * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
         * @Since 2015.2
         */
        function onRequest(context) {
            var scriptObj = context.request.parameters;
            var myid = scriptObj.recordId;

            log.debug("myid", myid);

            // loading invoice record 
            var printRecord = record.load({
                type: 'invoice',
                id: myid,
                isDynamic: false
            });

            var qrcodeData = printRecord.getValue({
                fieldId: "custbody_qr_code_data"
            });
            log.debug("qrcodeData", qrcodeData);

            var customerlist = printRecord.getValue({
                fieldId: 'entity'
            });

            log.debug("customerlist", customerlist);

            //loading customer record 
            var printCustomer = record.load({
                type: 'customer',
                id: customerlist,
                isDynamic: true
            });

var taxreg = printCustomer.getValue({
                fieldId: 'vatregnumber'
            });
            // seller's name 
            var salesrep = printRecord.getText({
                fieldId: 'salesrep'
            });

            log.debug("salesrep", salesrep);

            // company informaion loading using a config Load 
            // var companyInfo = config.load({
            //     type: config.Type.COMPANY_INFORMATION
            // });

            // var comname = companyInfo.getValue({
            //     fieldId: 'companyname'
            // });

            // var addresssublist = companyInfo.getSublist({
            //     sublistId: 'addresses'
            // });

            // log.debug("addresssublist", addresssublist);

            // var ObjField = companyInfo.getValue({
            //     sublistId: 'addresses',
            //     fieldId: 'mainaddress_text'
            // });
            // log.debug("ObjField", ObjField);



            //loading subsidiary 
            var subsidiaryName = printRecord.getValue({
                fieldId: 'subsidiary'
            });

            var subsidiaryInfo = record.load({
                type: 'Subsidiary',
                id: subsidiaryName,
                isDynamic: false
            });

            var subname = subsidiaryInfo.getValue({
                fieldId: 'name'
            });
            var addr = subsidiaryInfo.getSublist({
                sublistId: 'addresses'
            });
            var subadd = subsidiaryInfo.getValue({
                sublistId: 'addresses',
                fieldId: 'mainaddress_text'
            });
            var subTRN = subsidiaryInfo.getValue({
                fieldId: 'federalidnumber'
            });
            var arabicAdd = subsidiaryInfo.getValue({
                fieldId: 'custrecord_arabic_address'
            });
            //curency currencyname
            var currencytype = printRecord.getValue({
                fieldId: 'currencysymbol'
            });
            log.debug("currencytype", currencytype);



            var vatnum = printCustomer.getValue({
                fieldId: "vatregnumber"
            });
            log.debug("vatnum", vatnum);
            //billaddressee
            var customer = printCustomer.getValue({
                fieldId: "altname"
            });
            log.debug("customer", customer);

            var city = printCustomer.getValue({
                fieldId: "shipcity"
            });
            log.debug("city", city);

            var addressSubrecord = printCustomer.getCurrentSublistSubrecord({
                sublistId: 'addressbook',
                fieldId: 'addressbookaddress'
            });
            var country = addressSubrecord.getText({
                fieldId: 'country'
            })
            // var country = printCustomer.getValue({
            //     fieldId: "shipcountry"
            // });
            log.debug("country", country);

            var invnum = printRecord.getValue({
                fieldId: "tranid"
            });
            log.debug("invnum", invnum);

            //tranid
            var transaction = printRecord.getValue({
                fieldId: "tranid"
            });
            log.debug("transaction", transaction);

            //trandate
            var date = printRecord.getValue({
                fieldId: "trandate"
            });
            log.debug("date", date);
            var parsedDate = format.format({
                value: date,
                type: format.Type.DATE
            });
            log.debug("parsedDate", parsedDate);
            // end trandate

            //start duedate
            var duedate = printRecord.getValue({
                fieldId: "duedate"
            });
            log.debug("duedate", duedate);

            var parsedduedate = "";

            if (duedate) {
                parsedduedate = format.format({
                    value: duedate,
                    type: format.Type.DATE
                });
                log.debug("parsedduedate", parsedduedate);
            }


            //end duedate

            // subtotal table starts
            var subtotal1 = printRecord.getValue({
                fieldId: "subtotal"
            });
            var subtotal = format.format({
                value: subtotal1,
                type: format.Type.CURRENCY
            });

            log.debug("subtotal", subtotal);

            //taxtotal
            var totalVat = printRecord.getValue({
                fieldId: "custbody_stc_tax_after_discount"
            });
            log.debug("totalVat", totalVat);

            //total
            var tlAmtDue = printRecord.getValue({
                fieldId: "total"
            });
            var totalAmtDue = format.format({
                value: tlAmtDue,
                type: format.Type.CURRENCY
            });
            log.debug("totalAmtDue", totalAmtDue);

            //amountremaining
            var amotDue = printRecord.getValue({
                fieldId: "amountremaining"
            });
            var amountDue = format.format({
                value: amotDue,
                type: format.Type.CURRENCY
            });
            log.debug("amountDue", amountDue);


            var xml = '<?xml version="1.0"?>';
            xml += '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">';
            xml += '<pdf>';
            xml += '<head>';
            xml += '<link name="arabic-font" type="font" subtype="truetype" src="https://8034419.app.netsuite.com/core/media/media.nl?id=2509&amp;c=8034419&amp;h=QpUJZXdemvnO6vMYdCcEjgl_zwWQjlx10QHFXcrDibzSW-9i&amp;_xt=.ttf" src-bold="https://8034419.app.netsuite.com/core/media/media.nl?id=2509&amp;c=8034419&amp;h=QpUJZXdemvnO6vMYdCcEjgl_zwWQjlx10QHFXcrDibzSW-9i&amp;_xt=.ttf"  bytes="2" />';//src-italic="${nsfont.NotoSans_Italic}" src-bolditalic="${nsfont.NotoSans_BoldItalic}"
            xml += '    <style type="text/css">span, table {';
            xml += '     font-family: stsong, sans-serif;';
            xml += '    font-family: msung, sans-serif;';
            xml += '    font-family: heiseimin, sans-serif;';
            xml += '     font-family: hygothic, sans-serif;';
            xml += '    font-family: verdana;';
            xml += '    font-family: sans-serif;';
            xml += '     font-size: 9pt;';
            xml += '     table-layout: fixed;';
            xml += '     }';
            xml += '     td.headerB {';
            xml += '       font-size: 9px;';
            xml += '     }';
            xml += '     td.headerM {';
            xml += '       font-size: 9px;';
            xml += '     }';
            xml += '     span.headerM {';
            xml += '       font-size: 9px;';
            xml += '     }';
            xml += '     td.headerR {';
            xml += '       font-size: 10px;';
            xml += '     }';
            xml += '     td.headerRB {';
            xml += '       font-size: 12px;';
            xml += '       font-weight: bold;';
            xml += '     }';
            xml += '     th {';
            xml += '     font-weight: bold;';
            xml += '     font-size: 8.5pt;';
            xml += '     padding-top: 2px;';
            xml += '     vertical-align: middle;';
            xml += '         }';
            xml += '     b {';
            xml += '     font-weight: bold;';
            xml += '     color: #333333;';
            xml += '     }';
            xml += '     table.header td {';
            xml += '     padding: 0;';
            xml += '     font-size: 10pt;';
            xml += '     }';
            xml += '     table.footer td {';
            xml += '     padding: 0;';
            xml += '     font-size: 8pt;';
            xml += '     }';
            xml += '     #itemtable th p{';
            xml += '     vertical-align: text-top !important;';
            xml += '     text-align: center !important;';
            xml += '     }';
            xml += '     #itemtable{';
            xml += '     font-size: 8.5pt !important;';
            xml += '     border: 0.5px solid #000000';
            xml += '     }';
            xml += '     table.total {';
            xml += '     page-break-inside: avoid;';
            xml += '     }';
            xml += '     tr.totalrow {';
            xml += '     background-color: #e3e3e3;';
            xml += '     line-height: 200%;';
            xml += '     }';
            xml += '     td.totalboxtop {';
            xml += '     font-size: 12pt;';
            xml += '     background-color: #e3e3e3;';
            xml += '     }';
            xml += '     span.title {';
            xml += '     font-size: 28pt;';
            xml += '     }';
            xml += '     .smallTitle {';
            xml += '     font-size: 9pt;';
            xml += '     }';
            xml += '     span.number {';
            xml += '     font-size: 16pt;';
            xml += '     text-align:center;';
            xml += '     }';
            xml += '     span.itemname {';
            xml += '     font-weight: bold;';
            xml += '     line-height: 150%;';
            xml += '     }';
            xml += '     hr {';
            xml += '     width: 100%;';
            xml += '     color: #d3d3d3;';
            xml += '     background-color: #d3d3d3;';
            xml += '     height: 1px;';
            xml += '     }';
            xml += '     table.smalltext tr td {';
            xml += '     font-size: 8pt;';
            xml += '     }';
            xml += '       p.alignR {';
            xml += '     text-align: right !important;';
            xml += '     }';
            xml += '     p.alignL {';
            xml += '     text-align: left !important;';
            xml += '     }';
            xml += '     p.alignC {';
            xml += '     text-align: center !important;';
            xml += '     }';
            xml += '     .td_right_line{';
            xml += '     border-right :0.5px solid #000000;';
            xml += '     }';
            xml += '     .td_bottom_line{';
            xml += '     border-bottom: 0.5px solid #000000;';
            xml += '     }';
            xml += '    .td_bottom_line{ border-bottom: none;  }';
            xml += '     .td_top_line{';
            xml += '     border-top :0.5px solid #000000;';
            xml += '     }';
            xml += '     .title{';
            xml += '     font-weight: bold;';
            xml += '         font-size:16pt;';
            xml += '     line-height: 150%;';
            xml += '     }';
            xml += '     .footer-img{';
            xml += '        top: 0px;';
            xml += '     right: 0px;';
            xml += '     left: 0px;';
            xml += '     bottom: 5px;';
            xml += '     }';
            xml += '     .footer{';
            xml += '     margin-left:-45px; margin-right:-60px; margin-bottom:-115px;';
            xml += '     }';
            xml += '     .td_left_line{';
            xml += '     border-left :0.5px solid #000000;';
            xml += '     }';
            xml += '     .maintbl{';
            xml += '     border:0.5px solid #000000;';
            xml += '     }';
            xml += '     .footertbl{';
            xml += '     border:0.5px solid #000000;';
            xml += '     border-top: 0px !important;';
            xml += '     }';
            xml += '     .footertbl2{';
            xml += '         border-left: 0.5px solid #000000;';
            xml += '     border-right: 0.5px solid #000000;';
            xml += '     border-top: 0px !important;';
            xml += '     }';
            xml += '     .pad_left{';
            xml += '     padding-left: 5px!important;';
            xml += '     }';
            xml += '     th,td{';
            xml += '     padding:4px;';
            xml += '     }';
            xml += ' .custstamp{';
            xml += ' color:#d3d3d3;';
            xml += '     font-weight: bold;';
            xml += '         }';
            xml += 'span.arabicfont{';
                xml += '    font-family: arabic-font, sans-serif;';
                xml += '  font-size: 10pt;';
                xml += '  table-layout: fixed;';
                xml += ' direction:rtl;';
                xml += ' }';
            xml += '     </style>';
            xml += '        <macrolist>';
            xml += '        <macro id="nlheader" >';
            xml += '<table class="header" width="100%" border-bottom="1" border-color="#DEE2E6">';

            xml += '<tr >';
            xml += '<td width="33%" height="80%">';
            xml += '  <img style="width:30%;height:30%;"   src="https://8034419.app.netsuite.com/core/media/media.nl?id=2513&amp;c=8034419&amp;h=vh5OcX9uLKF-KG9RUPXueZbLGbtkHM5KaY1n7qJYZIB76YJv" /> ';
          //xml+=' <span color="rgb(59, 7, 163)" class="arabicfont" dir="rtl" style="height:50%">'+ relaceSlashN(arabicAdd) +'</span>';
            xml += '</td>';
            xml += '<td padding-top="40%" height="80" font-size="20px" width="34%" align= "center"></td>';//<b>TAX Invoice</b>
            xml += '<td padding-top="40%" height="80" width="33%">';
            xml += '<table  >';
            xml += '<tr>';
            xml += '<td align="left" font-size="13px" color="#555555"><p align="left"><b>' + subname + '</b></p></td>';
            xml += '</tr>';


            xml += '<tr>';
            // xml += '<td font-size="13px" background-color="red" align="left" margin-right="100px"><p><b><span color="rgb(90, 7, 163)" class="arabicfont" dir="rtl">'+ relaceSlashN(arabicAdd) +'</span> </b></p></td>';
            xml += '<td align="left" font-size="13px" color="#555555"><p><b>' + subadd + '</b></p></td>';
            xml += '</tr>';

            xml += '<tr>';
            xml += '<td align="left" font-size="13px" color="#555555"><p><b>' + subTRN + '</b></p></td>';
            xml += '</tr>';

            xml += '</table>';
            xml += '</td>';

            xml += '</tr>';
            xml += '</table>';
            xml += '</macro>';

            xml += ' <macro id="nlfooter">';
            xml += '<table padding-top="55%" border-top="1" border-bottom="1" width="100%">';
            xml += '<tr ><td font-size="15px" align="center">Tax ID:' + vatnum + '</td></tr>';
            xml += '</table>'
            xml += ' <table class="footer" style="width: 100%; font-size: 8pt;"   padding-bottom="55px">';
            xml += '     <tr><td align="center">(Page <pagenumber/> of <totalpages/>)</td></tr>';
            xml += '  </table>';
            xml += '  </macro>';
            xml += '     </macrolist>';
            xml += '</head>';
            xml += '   <body header="nlheader" footer="nlfooter" header-height="10%" footer-height="6%" padding="0.25in 0.5in 0.25in 0.5in" size="A4">';


            xml += '<br/>';
            xml += '<br/>';
            xml += '<br/>';
             //Invoice Number Table color="#555555"
             xml += '<table width="100%">';
             xml += '  <tr>';
             xml += '       <td style="align:right;width:100%;">';
             xml += '<p font-size="25px">'
             xml += '<b>Invoice &nbsp;' + invnum + '</b>';
             xml += '</p>'
             xml += '</td>';
             xml += '</tr>';
             xml += '</table>';
            xml += '<table width="100%"  background-color="#F8F5F7">';

            xml += '<tr>';
            xml += '<td width="70%"  >';
            xml += '<table height="140" padding-top="0%">';
            xml += '<tr>';
            xml += '<td font-size="13px">';
            xml += '<p >Customer Name/&nbsp;<span class="arabicfont" dir="rtl">اسم العميل</span>&nbsp; : &nbsp;' + customer + '</p>';
            xml += '</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td font-size="13px">';
            xml += '<p>City/&nbsp;<span class="arabicfont" dir="rtl">مدينة</span>&nbsp; : &nbsp;' + city + '</p>';
            xml += '</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td font-size="13px">';
            xml += '<p>Country/&nbsp;<span class="arabicfont" dir="rtl">بلد</span>&nbsp; : &nbsp;' + country + '</p>';
            xml += '</td>';
            xml += '</tr>';
                 xml += '<tr>';
            xml += '<td font-size="13px">';
            xml += '<p>VAT No:&nbsp;' + taxreg + '</p>';
            xml += '</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td font-size="13px">';
            // xml += '<p>VAT No:&nbsp;' + taxreg + '</p>';
            xml += '</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td font-size="13px">';
            // xml += '<p>VAT No:&nbsp;' + taxreg + '</p>';
            xml += '</td>';
            xml += '</tr>';
            xml += '<tr>';
            xml += '<td font-size="13px">';
            // xml += '<p>VAT No:&nbsp;' + taxreg + '</p>';
            xml += '</td>';
            xml += '</tr>';
            xml += '</table>';
            xml += '</td>';

            xml += '<td border-left="1" border-color="#DEE2E6" width="30%">';
            xml += '<table align="right">';
            xml += '<tr>';
            xml += '<td >';
            if(!qrcodeData){
                qrcodeData = "";
            }
          //  xml += '<barcode codetype="qrcode" showtext="false" align="right" height="140" width="130" value="  Sellers name:' + salesrep + '          VAT registration number:  ' + vatnum + '             Invoice Date: ' + parsedDate + '              Invoice total: ' + subtotal + '' + currencytype + '              VAT total: ' + totalVat + '' + currencytype + ' " />';
            xml += '<barcode codetype="qrcode" showtext="false" align="right" height="140" width="130" value="'+qrcodeData+'" />';

            xml += '</td>';
            xml += '</tr>';
            xml += '</table>';
            xml += '</td>';
            xml += '</tr>';

            xml += '</table>';
            //end table

           



            // table date starts
            xml += '<table width="100%" style="font-size:14px;">';
            xml += '<tr width="50%" text-align="left">';
            xml += '<th font-size="15px"><span class="arabicfont" dir="rtl">تاريخ الفاتورة</span><br/>Invoice Date: </th>';
            xml += '<th font-size="15px"><span class="arabicfont" dir="rtl">تاريخ الاستحقاق</span><br/> Due Date: </th>'
            xml += '</tr>';

            xml += '<tr width="50%" text-align="left" border-bottom="1px" border-color="#DEE2E6">';
            xml += '<td font-size="15px" color="#555555">' + parsedDate + '</td>';
            xml += '<td font-size="15px" color="#555555">' + parsedduedate + '</td>';

            xml += '</tr>';

            xml += '</table>';

            //table date ends here 


            //table starts here 
            xml += '<table width="100%" padding="2">';
            xml += '<tr>';
            xml += '<th width="20%" font-size="13px" colspan="2">Description<br/> <span class="arabicfont" dir="rtl">وصف</span></th>';
            xml += '<th width="8" font-size="13px" align="right"  colspan="4">Quantity<br/> <span class="arabicfont" dir="rtl">كمية</span> </th>';
            xml += '<th width="8" font-size="13px" align="right"  colspan="4">Unit Price <br/> <span class="arabicfont" dir="rtl">سعر الوحدة</span></th>';
            xml += '<th width="8" font-size="13px" colspan="4" align="right">Taxes <br/> <span class="arabicfont" dir="rtl">الضرائب</span></th>';
            xml += '<th width="38" font-size="13px" align="right" colspan="12">Amount Subtotal - Excluding VAT<br/> <span class="arabicfont" dir="rtl">المبلغ الإجمالي الفرعي - باستثناء ضريبة القيمة المضافة</span> </th>';
            xml += '</tr>';


            //********** Line item starts here ***********
            var count = printRecord.getLineCount({
                sublistId: "item"
            });
            log.debug("count", count);

            for (var i = 0; i < count; i++) {

                var itemdes = printRecord.getSublistValue({
                    sublistId: "item",
                    fieldId: "item_display",
                    value: itemdes,
                    line: i
                });
                log.debug("itemdes", itemdes);

                var qty = printRecord.getSublistValue({
                    sublistId: "item",
                    fieldId: "quantity",
                    value: quantity,
                    line: i
                });
                var quantity = format.format({
                    value: qty,
                    type: format.Type.CURRENCY
                });
                log.debug("quantity", quantity);


                var unitpr = printRecord.getSublistValue({
                    sublistId: "item",
                    fieldId: "rate",
                    value: unitprice,
                    line: i
                });
                var unitprice = format.format({
                    value: unitpr,
                    type: format.Type.CURRENCY
                });
                log.debug("unitprice", unitprice);

                var taxeRate = printRecord.getSublistValue({
                    sublistId: "item",
                    fieldId: "taxrate1",
                    value: taxes,
                    line: i
                });
                var taxes = "";
                if (taxeRate) {
                    var taxes = format.format({
                        value: taxeRate,
                        type: format.Type.PERCENT
                    });
                    log.debug("taxes", taxes);
                }


                var amount = printRecord.getSublistValue({
                    //sublistid
                    sublistId: "item",
                    //fieldid
                    fieldId: "amount",
                    value: amount,
                    line: i
                });
                var mycurrency = format.format({
                    value: amount,
                    type: format.Type.CURRENCY
                });

                log.debug("mycurrency", mycurrency);


                xml += '<tr background-color="#F8F5F7">';
                xml += '<td width="20%" font-size="13px" colspan="2">' + itemdes + '<br/><span class="arabicfont" dir="rtl">'+ itemdes +'</span></td>';
                log.debug("Discrption", itemdes);
                xml += '<td width="8" align="right" font-size="13px" colspan="4">' + quantity + '</td>';
                xml += '<td width="8" align="right" font-size="13px" colspan="4">' + unitprice + '</td>';
                if (taxes != null) {
                    xml += '<td width="8" font-size="13px" colspan="4" align="right">' + taxes + '</td>';
                }
                xml += '<td width="38" align="right" padding-right="0%" font-size="13px" colspan="12">' + mycurrency + '&nbsp;' + currencytype + '</td>';
                xml += '</tr>';
            }
            xml += '</table>';


            //total amount table 
            xml += '<table width="50%" align="right" padding-top="25">';
            xml += '<tr border-bottom="1" border-color="#DEE2E6">';
            xml += '<th width="70%" font-size="13px" align="right"> Total amount </th>';
            xml += '</tr>';

            xml += '<tr>';
            xml += '<td font-size="13px" width="80%" align="right">';
            xml += '<p>Total Taxable Amount -Excluding VAT<br/> <span class="arabicfont" dir="rtl">إجمالي المبلغ الخاضع للضريبة - باستثناء ضريبة القيمة المضافة</span></p>';
            xml += '</td>';
            xml += '<td align="right" width="30%" font-size="13px">' + subtotal + '&nbsp;' + currencytype + '</td>';
            xml += '</tr>';

            xml += '<tr border-bottom="1" border-color="#DEE2E6">';
            xml += '<td font-size="13px" width="70%"  align="right" padding-top="15">Total VAT<br/> <span class="arabicfont" dir="rtl">إجمالي ضريبة القيمة المضافة</span></td>';
            xml += '<td align="right" padding-top="15" width="30%" font-size="13px">' + totalVat + '&nbsp;' + currencytype + '</td>';
            xml += '</tr>';

            xml += '<tr border-bottom="1" border-color="#DEE2E6">';
            xml += '<td align="right" font-size="13px" width="70%" >Total Amount Due<br/> <span class="arabicfont" dir="rtl">إجمالي المبلغ المستحق</span></td>';
            xml += '<td align="right" width="30%"  font-size="13px">' + totalAmtDue + '&nbsp;' + currencytype + '</td>';
            xml += '</tr>';


            xml += '</table>';


            var saleno = printRecord.getText({
                fieldId: 'createdfrom'
            });
            if (!saleno) {
                saleno = "1"
            }
            xml += '<p>Contract:&nbsp;' + saleno + '</p>';

            xml += ' </body>';
            xml += '</pdf>';

            context.response.renderPdf({
                xmlString: xml
            });
        }
        return {

            onRequest: onRequest
        };
    });


function relaceSlashN(charVal) {
    if (charVal) {
        return charVal.replace("\n", "<br />", "g");
    } else {
        return "";
    }
}

function replaceCharector(charVal) {
    return charVal.replace(/&/g, "&amp;");
}