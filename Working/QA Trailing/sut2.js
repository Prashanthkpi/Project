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
    function onRequest(context) {
        
        var scriptObj = context.request.parameters;
        var recordId = scriptObj.recid;
        var recType= 'salesorder';
    
        if (context.request.method == 'GET') {
            var purRec = record.load({
                type: recType,
                id: 10797
            });
            var vendor =purRec.getValue({ //Get employee ID
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
            }    
        
var xml=' ';
xml+='<?xml version="1.0"?><!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">';
xml+='<pdf>';
xml+='<head>';
xml+='	<link name="NotoSans" type="font" subtype="truetype" src="${nsfont.NotoSans_Regular}" src-bold="${nsfont.NotoSans_Bold}" src-italic="${nsfont.NotoSans_Italic}" src-bolditalic="${nsfont.NotoSans_BoldItalic}" bytes="2" />';
xml+='	<#if .locale == "zh_CN">';
xml+='		<link name="NotoSansCJKsc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKsc_Regular}" src-bold="${nsfont.NotoSansCJKsc_Bold}" bytes="2" />';
xml+='	<#elseif .locale == "zh_TW">';
xml+='		<link name="NotoSansCJKtc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKtc_Regular}" src-bold="${nsfont.NotoSansCJKtc_Bold}" bytes="2" />';
xml+='	<#elseif .locale == "ja_JP">';
xml+='		<link name="NotoSansCJKjp" type="font" subtype="opentype" src="${nsfont.NotoSansCJKjp_Regular}" src-bold="${nsfont.NotoSansCJKjp_Bold}" bytes="2" />';
xml+='	<#elseif .locale == "ko_KR">';
xml+='		<link name="NotoSansCJKkr" type="font" subtype="opentype" src="${nsfont.NotoSansCJKkr_Regular}" src-bold="${nsfont.NotoSansCJKkr_Bold}" bytes="2" />';
xml+='	<#elseif .locale == "th_TH">';
xml+='		<link name="NotoSansThai" type="font" subtype="opentype" src="${nsfont.NotoSansThai_Regular}" src-bold="${nsfont.NotoSansThai_Bold}" bytes="2" />';
xml+='	</#if>';
xml+='    <macrolist>';
xml+='        <macro id="nlheader">';
xml+='            <table style="width: 100%; font-size: 10pt;"><tr>';
xml+='	<td rowspan="3" style="padding: 0;"><#if companyInformation.logoUrl?length != 0><img src="${companyInformation.logoUrl}" style="float: left; margin: 7px" /> </#if> ${companyInformation.companyName}<br />${companyInformation.addressText}</td>';
xml+='	<td align="right" style="padding: 0;"><span style="font-size: 28pt;">${record@title}</span></td>';
xml+='	</tr>';
xml+='	<tr>';
xml+='	<td align="right" style="padding: 0;"><span style="font-size: 16pt;">#${record.tranid}</span></td>';
xml+='	</tr>';
xml+='	<tr>';
xml+='	<td align="right" style="padding: 0;">${record.trandate}</td>';
xml+='	</tr></table>';
xml+='        </macro>';
xml+='        <macro id="nlfooter">';
xml+='            <table style="width: 100%; font-size: 8pt;"><tr>';
xml+='	<td style="padding: 0;"><barcode codetype="code128" showtext="true" value="${record.tranid}"/></td>';
xml+='	<td align="right" style="padding: 0;"><pagenumber/> of <totalpages/></td>';
xml+='	</tr></table>';
xml+='        </macro>';
xml+='    </macrolist>';
xml+='    <style type="text/css">* {';
xml+='		<#if .locale == "zh_CN">';
xml+='			font-family: NotoSans, NotoSansCJKsc, sans-serif;';
xml+='		<#elseif .locale == "zh_TW">';
xml+='			font-family: NotoSans, NotoSansCJKtc, sans-serif;';
xml+='		<#elseif .locale == "ja_JP">';
xml+='			font-family: NotoSans, NotoSansCJKjp, sans-serif;';
xml+='		<#elseif .locale == "ko_KR">';
xml+='			font-family: NotoSans, NotoSansCJKkr, sans-serif;';
xml+='		<#elseif .locale == "th_TH">';
xml+='			font-family: NotoSans, NotoSansThai, sans-serif;';
xml+='		<#else>';
xml+='			font-family: NotoSans, sans-serif;';
xml+='		</#if>';
xml+='		}';
xml+='		table {';
xml+='			font-size: 9pt;';
xml+='			table-layout: fixed;';
xml+='		}';
xml+='        th {';
xml+='            font-weight: bold;';
xml+='            font-size: 8pt;';
xml+='            vertical-align: middle;';
xml+='            padding: 5px 6px 3px;';
xml+='            background-color: #e3e3e3;';
xml+='            color: #333333;';
xml+='        }';
xml+='        td {';
xml+='            padding: 4px 6px;';
xml+='        }';
xml+='		td p { align:left }';
xml+='</style>';
xml+='</head>';
xml+='<body header="nlheader" header-height="10%" footer="nlfooter" footer-height="20pt" padding="0.5in 0.5in 0.5in 0.5in" size="Letter">';
xml+='<h1>hiiiiiiigddd</h1>';
xml+='/*    <table style="width: 100%; margin-top: 10px;"><tr>';
xml+='	<td colspan="3" style="font-size: 8pt; padding: 6px 0 2px; font-weight: bold; color: #333333;">${record.billaddress@label}</td>';
xml+='	<td colspan="3" style="font-size: 8pt; padding: 6px 0 2px; font-weight: bold; color: #333333;">${record.shipaddress@label}</td>';
xml+='	<td colspan="5" style="font-size: 12pt; background-color: #e3e3e3; font-weight: bold;">${record.total@label?upper_case}</td>';
xml+='	</tr>';
xml+='	<tr>';
xml+='	<td colspan="3" style="padding: 0;">${record.billaddress}</td>';
xml+='	<td colspan="3" style="padding: 0;">${record.shipaddress}</td>';
xml+='	<td align="right" colspan="5" style="font-size: 28pt; padding-top: 20px; background-color: #e3e3e3;">${record.total}</td>';
xml+='	</tr></table>';
xml+='';
xml+='<table style="width: 100%; margin-top: 10px;"><tr>';
xml+='	<th>${record.paymentmethod@label}</th>';
xml+='	<th>${record.otherrefnum@label}</th>';
xml+='	<th>${record.shipmethod@label}</th>';
xml+='	<th>${record.shipdate@label}</th>';
xml+='	</tr>';
xml+='	<tr>';
xml+='	<td style="padding-top: 2px;">${record.paymentmethod}</td>';
xml+='	<td style="padding-top: 2px;">${record.otherrefnum}</td>';
xml+='	<td style="padding-top: 2px;">${record.shipmethod}</td>';
xml+='	<td style="padding-top: 2px;">${record.shipdate}</td>';
xml+='	</tr></table>';
xml+='<#if record.item?has_content>';
xml+='';
xml+='<table style="width: 100%; margin-top: 10px;"><start items ><#list record.item as item><#if item_index==0>';
xml+='<thead>';
xml+='	<tr>';
xml+='	<th align="center" colspan="3" style="padding: 10px 6px;">${item.quantity@label}</th>';
xml+='	<th colspan="12" style="padding: 10px 6px;">${item.item@label}</th>';
xml+='	<th align="right" colspan="4" style="padding: 10px 6px;">${item.rate@label}</th>';
xml+='	<th align="right" colspan="4" style="padding: 10px 6px;">${item.amount@label}</th>';
xml+='	</tr>';
xml+='</thead>';
xml+='</#if><tr>';
xml+='	<td align="center" colspan="3" line-height="150%">${item.quantity}</td>';
xml+='	<td colspan="12"><span style="font-weight: bold; line-height: 150%; color: #333333;">${item.item}</span><br />${item.description}</td>';
xml+='	<td align="right" colspan="4">${item.rate}</td>';
xml+='	<td align="right" colspan="4">${item.amount}</td>';
xml+='	</tr>';
xml+='	</#list>< end items ></table>';
xml+='';
xml+='<hr style="width: 100%; color: #d3d3d3; background-color: #d3d3d3; height: 1px;" /></#if>';
xml+='<table style="page-break-inside: avoid; width: 100%; margin-top: 10px;"><tr>';
xml+='	<td colspan="4">&nbsp;</td>';
xml+='	<td align="right" style="font-weight: bold; color: #333333;">${record.subtotal@label}</td>';
xml+='	<td align="right">${record.subtotal}</td>';
xml+='	</tr>';
xml+='	<tr>';
xml+='	<td colspan="4">&nbsp;</td>';
xml+='	<td align="right" style="font-weight: bold; color: #333333;">${record.taxtotal@label} (${record.taxrate}%)</td>';
xml+='	<td align="right">${record.taxtotal}</td>';
xml+='	</tr>';
xml+='	<tr style="background-color: #e3e3e3; line-height: 200%;">';
xml+='	<td background-color="#ffffff" colspan="4">&nbsp;</td>';
xml+='	<td align="right" style="font-weight: bold; color: #333333;">${record.total@label}</td>';
xml+='	<td align="right">${record.total}</td>';
xml+='	</tr></table>*/';
xml+='</body>';
xml+='</pdf>';
context.response.renderPdf({
    xmlString: xml
});
}}
return {

onRequest: onRequest
};
});