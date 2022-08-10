function printBillPayment(request,response){




    var ifid = request.getParameter('recID');

      var file = nlapiPrintRecord('TRANSACTION', ifid, 'PDF', {formnumber: '123'});

       response.setContentType('PDF', 'Cheque', 'INLINE');

       response.write(file.getValue());

 

 }