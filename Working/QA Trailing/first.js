/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 
 * Module Description
 * Deployment for Invoice Print
 * Includes invoicePrint
 *
 * Version    Date            Author        Remarks
 * 1.0.0      17 Nov 2021     Arshitha MS        Created for GRN print
 
 */
//  define(['N/log','N/ui/serverWidget', 'N/record', 'N/search', 'N/https', 'N/url', 'N/redirect', 'N/task', 'N/runtime'],
define(['N/log', 'N/ui/serverWidget', 'N/record','N/format', 'N/config','N/search', 'N/https', 'N/url', 'N/redirect', 'N/task', "N/runtime", "N/file", , 'N/render'],
function (log, serverWidget, record, format,config,search, http, url, redirect, task, runtime, render, file) {
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2
     */
    /*function onRequest(context) {
        
        var scriptObj = context.request.parameters;
        var recordId = scriptObj.recid;
        var recType= 'salesorder';
    
        if (context.request.method == 'GET') {
            var purRec = record.load({
                type: recType,
                id: 10797
            });*/ function onRequest(context) {
            
                var scriptObj = context.request.parameters;
                var recordId = scriptObj.recid;
                var recType= 'salesorder';
            
                if (context.request.method == 'GET') {
                    var purRec = record.load({
                        type: recType,
                        id: 10797
                    });
                  /*  var vendor =purRec.getValue({ //Get employee ID
                        fieldId: "entity"
                    });*/
        
                    /*if (vendor) {
                        //load employee record
                        var venRec = record.load({
                            type: 'vendor',
                            id: vendor
                        });
                        empFname = venRec.getValue({
                            fieldId: "entityid"
                        });
                    }  */  
          
          /*   var vendor =purRec.getValue({ //Get employee ID
                fieldId: "entity"
            });

           if (vendor) {
                //load employee record
                var venRec = record.load({
                    type: 'vendor',
                    id: vendor
                });
                empFname = venRec.getValue({
                    fieldId: "entityid"
                });
            }*/    
        
var xml='<? xml version = "1.0" ?>';
xml += '< !DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd" >';
 xml += '<pdf>';
 xml += '<head>';
 xml += '	<link name="NotoSans" type="font" subtype="truetype" src="${nsfont.NotoSans_Regular}" src-bold="${nsfont.NotoSans_Bold}" src-italic="${nsfont.NotoSans_Italic}" src-bolditalic="${nsfont.NotoSans_BoldItalic}" bytes="2" />';
 xml += '	<#if .locale == "zh_CN">';
 xml += '		<link name="NotoSansCJKsc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKsc_Regular}" src-bold="${nsfont.NotoSansCJKsc_Bold}" bytes="2" />';
 xml += '	<#elseif .locale == "zh_TW">';
 xml += '		<link name="NotoSansCJKtc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKtc_Regular}" src-bold="${nsfont.NotoSansCJKtc_Bold}" bytes="2" />';
 xml += '	<#elseif .locale == "ja_JP">';
 xml += '		<link name="NotoSansCJKjp" type="font" subtype="opentype" src="${nsfont.NotoSansCJKjp_Regular}" src-bold="${nsfont.NotoSansCJKjp_Bold}" bytes="2" />';
 xml += '	<#elseif .locale == "ko_KR">';
 xml += '		<link name="NotoSansCJKkr" type="font" subtype="opentype" src="${nsfont.NotoSansCJKkr_Regular}" src-bold="${nsfont.NotoSansCJKkr_Bold}" bytes="2" />';
 xml += '	<#elseif .locale == "th_TH">';
 xml += '		<link name="NotoSansThai" type="font" subtype="opentype" src="${nsfont.NotoSansThai_Regular}" src-bold="${nsfont.NotoSansThai_Bold}" bytes="2" />';
 xml += '	</#if>';
 xml += '    <macrolist>';
 xml += '        <macro id="nlheader">';
 xml += '            <table style="width: 100%; font-size: 8pt;"><tr>';
 xml += '              <td rowspan="3" style="padding: 0;width:40%;"><#if companyInformation.logoUrl?length != 0><img src="${companyInformation.logoUrl}" style="float: left; margin: 7px;width:150px;height:100px;"/></#if></td>';
 xml += '              <td align="right" style="width:20%;" >#${record.tranid}<br/> ${companyInformation.companyName}<br />${companyInformation.addressText}<br/> ${record.trandate}</td>';
 xml += '             <!-- <td align="right" style="padding: 0;width:15%;"><span >${record@title}</span></td>';
 xml += '        <td align="right" style="padding: 0;width:15%;"><span>#${record.tranid}</span></td>';
 xml += '              <td align="right" style="padding: 0;width:15%;">${record.trandate}</td>-->';
 xml += '	</tr>';
 xml += '	</table>';
 xml += '        </macro>';
 xml += '        <macro id="nlfooter">';
 xml += '            <table style="width: 100%; font-size: 8pt;"><tr>';
 xml += '	<td style="padding: 0;"><barcode codetype="code128" showtext="true" value="${record.tranid}"/></td>';
 xml += '	<td align="right" style="padding: 0;"><pagenumber/> of <totalpages/></td>';
 xml += '	</tr></table>';
 xml += '        </macro>';
 xml += '    </macrolist>';
 xml += '    <style type="text/css">* {';
 xml += '		<#if .locale == "zh_CN">';
 xml += '			font-family: NotoSans, NotoSansCJKsc, sans-serif;';
 xml += '		<#elseif .locale == "zh_TW">';
 xml += '			font-family: NotoSans, NotoSansCJKtc, sans-serif;';
 xml += '		<#elseif .locale == "ja_JP">';
 xml += '			font-family: NotoSans, NotoSansCJKjp, sans-serif;';
 xml += '		<#elseif .locale == "ko_KR">';
 xml += '			font-family: NotoSans, NotoSansCJKkr, sans-serif;';
 xml += '		<#elseif .locale == "th_TH">';
 xml += '			font-family: NotoSans, NotoSansThai, sans-serif;';
 xml += '		<#else>';
 xml += '			font-family: NotoSans, sans-serif;';
 xml += '		</#if>';
 xml += '		}';
 xml += '		table {';
 xml += '			font-size: 9px;';
 xml += '			table-layout: fixed;';
 xml += '		}';
 xml += '        th {';
 xml += '            font-weight: bold;';
 xml += '            font-size: 8pt;';
 xml += '            vertical-align: middle;';
 xml += '            padding: 7px;';
 xml += '            background-color: #e3e3e3;';
 xml += '            color: #333333;';
 xml += '        }';
 xml += '        td {';
 xml += '            padding:7px;';
 xml += '        }';
 xml += '		td p { align:left }';
 xml += '</style>';
 xml += '';
 xml += '</head >';
 xml += '<body  style="margin-top:20px;" header="nlheader" header-height="10%" footer="nlfooter" footer-height="20pt" padding="0.5in 0.5in 0.5in 0.5in" size="Letter">';
 xml += '';
 xml += '<h4 style="width:100%;  text-align: center;padding-top:40px;"> <strong><u>SALES ORDER</u></strong></h4>';
 xml += '<table  style="border: 1px solid black;">';
 xml += '        <tr  style="border-bottom: 1px solid black;">';
 xml += '            <th style="text-align:center" colspan="6">Customer Information </th>';
 xml += '            <th colspan="7"> Sales Rep</th>';
 xml += '        </tr>';
 xml += '        <tr >';
 xml += '            <td  colspan="3"> Name:</td>';
 xml += '			<td style="border-right:1px solid black;" colspan="3">${record.entity}</td>';
 xml += '           <td colspan="3">Sales Rep:</td>';
 xml += '		   <td colspan="4">${record.salesrep}</td>';
 xml += '        </tr>';
 xml += '        <tr  >';
 xml += '            <td  colspan="3">Contact:</td>';
 xml += '			<td style="border-right: 1px solid black;" colspan="3">${record.entity.isperson}</td>';
 xml += '            <td colspan="3">Email:</td>';
 xml += '			<td colspan="4">${record.email}</td>';
 xml += '        </tr>';
 xml += '        <tr >';
 xml += '            <td  colspan="3">Address:</td>';
 xml += '		<td style="border-right:1px solid black;" colspan="3"></td>';
 xml += '            <td colspan="3">Mobile:</td>';
 xml += '         <td colspan="4">${record.entity.isperson}</td>';
 xml += '        </tr>';
 xml += '';
 xml += '        <tr>';
 xml += '            <td   colspan="3">City, ST, Zip:</td>';
 xml += '			<td style="border-right:1px solid black;" colspan="3">${record.location}</td>';
 xml += '          <td Colspan="3"> Date:</td>';
 xml += '          <td colspan="3">${record.trandate?string("yyyy/MM/dd")}</td>';
 xml += '        </tr>';
 xml += '        <tr>';
 xml += '            <td  colspan="3">Phone:</td>';
 xml += '				<td style="border-right:1px solid black;"  colspan="3">${record.location}</td>';
 xml += '          <td>${"abcdef"?remove_ending("def")}</td>';
 xml += '        </tr>';
 xml += '';
 xml += '        <tr>';
 xml += '            <td  colspan="3">Fax:</td>';
 xml += '			<td style="border-right:1px solid black;" colspan="3">${record.entity.fax}</td>';
 xml += '        </tr>';
 xml += '        <tr>';
 xml += '            <td    colspan="3">Email:</td>';
 xml += '			<td style="border-right:1px solid black;" colspan="3">${record.email}</td>';
 xml += '        </tr>';
 xml += '';
 xml += '        <tr style="border-bottom: 1px solid black;" >';
 xml += '            <td  colspan="3">VAT #:</td>';
 xml += '			<td style="border-right:1px solid black;" colspan="3"></td>';
 xml += '        </tr>';
 xml += '        <tr >';
 xml += '            <th  style="border-bottom: 1px solid black;">SL# </th>';
 xml += '            <th  style="border-bottom: 1px solid black;">Item</th>';
 xml += '            <th  style="border-bottom: 1px solid black;">Description</th>';
 xml += '            <th  style="border-bottom: 1px solid black;" colspan="2">Rental Type</th>';
 xml += '            <th  style="border-bottom: 1px solid black;">No.of H/D/W/M</th>';
 xml += '            <th  style="border-bottom: 1px solid black;">Qty</th>';
 xml += '            <th  style="border-bottom: 1px solid black;">Rate </th>';
 xml += '            <th  style="border-bottom: 1px solid black;"> Amount</th>';
 xml += '            <th  style="border-bottom: 1px solid black;">Tax%</th>';
 xml += '            <th  style="border-bottom: 1px solid black;"> Tax Amt</th>';
 xml += '            <th  style="border-bottom: 1px solid black;"  colspan="2">Gross Amt</th>';
 xml += '        </tr>';
 xml += '		<#assign SL=0>';
 xml += '          <#assign subtotal=0.00>';
 xml += '	<#if record.item?has_content>';
 xml += '	<#list record.item as item>';
 xml += '		<#assign SL=SL+1/>';
 xml += '		<tr  style="border-bottom:1px solid black;" >';
 xml += '		<td>${SL?is_nan}</td>';
 xml += '		<td>${item.item}</td>';
 xml += '		<td>${item.description}</td>';
 xml += '		<td colspan="2">${item.custcol_rent_from_date}</td>';
 xml += '		<td>${item.custcol_rent_no_of_hdwm}</td>';
 xml += '		<td>${item.quantity}</td>';
 xml += '		<td>${item.rate}</td>';
 xml += '		<td>${item.amount}</td>';
 xml += '		<td>${item.taxcodeem}</td>';
 xml += '		<td>${item.taxcode_display}</td>';
 xml += '		<td  colspan="2">${item.amount?string.currency}</td>';
 xml += '		</tr>';
 xml += '      <#assign subtotal=subtotal+item.amount>';
 xml += '		</#list>';
 xml += '		</#if>';
 xml += '        <tr>';
 xml += '            <td  style="border-right:1px solid black;" rowspan="4" colspan="6">${"comments:"?cap_first} (Optional if any) </td>';
 xml += '		</tr>';
 xml += '      <#assign total=subtotal>';
 xml += '		<tr >';
 xml += '		<td  colspan="3">Sub Total</td>';
 xml += '          <td colspan="4">${subtotal?string["#,##0.00"]}</td>';
 xml += '		</tr>';
 xml += '		<tr >';
 xml += '		<td  colspan="3" style="border-bottom:1px solid black;">${"total VAT Amount"?cap_first}</td>';
 xml += '          <td colspan="4" style="border-bottom:1px solid black;">${00?string.percent}</td>';
 xml += '		</tr>';
 xml += '		<tr>';
 xml += '		<td colspan="3">Total (Including Taxes)</td>';
 xml += '          <td colspan="4">${subtotal?string["#,##0.00"]}</td>';
 xml += '		</tr>';
 xml += '    </table>';
 xml += '';
 xml += '<p style="font-size:10px;">Note:Total Amount Excluding VAT';
 xml += '  </p>';
 xml += '';
 xml += '    <table style="width:100%;margin-top:50px;">';
 xml += '        <tr>';
 xml += '            <td style="width:43%;text-align: center;">_________________</td>';
 xml += '            <td style="width:43%;text-align: center">___________________</td>';
 xml += '            <td style="width:14%;text-align: center">____________________</td>';
 xml += '        </tr>';
 xml += '      <tr>';
 xml += '      <td style="width:43%;text-align: center;margin-left:10px;">Created By</td>';
 xml += '      <td  style="width:43%;text-align: center;margin-left:10px;">Approved By</td>';
 xml += '      <td  style="width:14%;text-align: center;margin-left:6px;">Acknowledge By</td></tr>';
 xml += '    </table>';
 xml += '      <#assign testlist=[';
 xml += '    0, 1, -1, 0.5, 1.5, -0.5,';
 xml += '    -1.5, 0.25, -0.25, 1.75, -1.75] >';
 xml += '<#list testlist as result>';
 xml += '    ${result} floor=${result?floor} &nbsp;&nbsp;ceiling=${result?ceiling} &nbsp;&nbsp;round=${result?round}<br/>';
 xml += '</#list>';
 xml += '<!--< table >';
 xml += '';
 xml += '</table >';
 xml += '    <table style="width: 100%; margin-top: 10px;"><tr>-->';
 xml += '	<!--<td colspan="3" style="font-size: 8pt; padding: 6px 0 2px; font-weight: bold; color: #333333;">${record.billaddress@label}</td>';
 xml += '	<td colspan="3" style="font-size: 8pt; padding: 6px 0 2px; font-weight: bold; color: #333333;">${record.shipaddress@label}</td>';
 xml += '	<td colspan="5" style="font-size: 12pt; background-color: #e3e3e3; font-weight: bold;">${record.total@label?upper_case}</td>';
 xml += '	</tr>';
 xml += '	<tr>';
 xml += '	<td colspan="3" style="padding: 0;">${record.billaddress}</td>';
 xml += '	<td colspan="3" style="padding: 0;">${record.shipaddress}</td>';
 xml += '	<td align="right" colspan="5" style="font-size: 28pt; padding-top: 20px; background-color: #e3e3e3;">${record.total}</td>';
 xml += '	</tr></table>';
 xml += '';
 xml += '	<th>${record.paymentmethod@label}</th>';
 xml += '	<th>${record.otherrefnum@label}</th>';
 xml += '	<th>${record.shipmethod@label}</th>';
 xml += '	<th>${record.shipdate@label}</th>';
 xml += '	</tr >';
 xml += '    <tr>';
 xml += '        <td style="padding-top: 2px;">${record.paymentmethod}</td>';
 xml += '        <td style="padding-top: 2px;">${record.otherrefnum}</td>';
 xml += '        <td style="padding-top: 2px;">${record.shipmethod}</td>';
 xml += '        <td style="padding-top: 2px;">${record.shipdate}</td>';
 xml += '    </tr></table >';
 xml += '        <#if record.item?has_content>-->';
 xml += '';
 xml += '            <!--<table style="width: 100%; margin-top: 10px;"><start items ><#list record.item as item><#if item_index==0>';
 xml += '                <thead>';
 xml += '                    <tr>';
 xml += '                        <th align="center" colspan="3" style="padding: 10px 6px;">${item.quantity@label}</th>';
 xml += '                        <th colspan="12" style="padding: 10px 6px;">${item.item@label}</th>';
 xml += '                        <th align="right" colspan="4" style="padding: 10px 6px;">${item.rate@label}</th>';
 xml += '                        <th align="right" colspan="4" style="padding: 10px 6px;">${item.amount@label}</th>';
 xml += '                    </tr>';
 xml += '                </thead>';
 xml += '            </#if><tr>';
 xml += '                    <td align="center" colspan="3" line-height="150%">${item.quantity}</td>';
 xml += '                    <td colspan="12"><span style="font-weight: bold; line-height: 150%; color: #333333;">${item.item}</span><br />${item.description}</td>';
 xml += '                    <td align="right" colspan="4">${item.rate}</td>';
 xml += '                    <td align="right" colspan="4">${item.amount}</td>';
 xml += '                </tr>';
 xml += '            </#list>< end items></table>';
 xml += '';
 xml += '            <hr style="width: 100%; color: #d3d3d3; background-color: #d3d3d3; height: 1px;" /></#if>-->';
 xml += '< !--< table style = "page-break-inside: avoid; width: 100%; margin-top: 10px;" ><tr>';
 xml += '	<td colspan="4">&nbsp;</td>';
 xml += '	<td align="right" style="font-weight: bold; color: #333333;">${record.subtotal@label}</td>';
 xml += '	<td align="right">${record.subtotal}</td>';
 xml += '	</tr>';
 xml += '	<tr>';
 xml += '	<td colspan="4">&nbsp;</td>';
 xml += '	<td align="right" style="font-weight: bold; color: #333333;">${record.taxtotal@label} (${record.taxrate}%)</td>';
 xml += '	<td align="right">${record.taxtotal}</td>';
 xml += '	</tr>';
 xml += '	<tr style="background-color: #e3e3e3; line-height: 200%;">';
 xml += '	<td background-color="#ffffff" colspan="4">&nbsp;</td>';
 xml += '	<td align="right" style="font-weight: bold; color: #333333;">${record.total@label}</td>';
 xml += '	<td align="right">${record.total}</td>';
 xml += '	</tr></table > -->';
 xml += '</body >';
 xml += '</pdf >';
 context.response.renderPdf({
    xmlString: xml
});
}}
return {

onRequest: onRequest
};
});
