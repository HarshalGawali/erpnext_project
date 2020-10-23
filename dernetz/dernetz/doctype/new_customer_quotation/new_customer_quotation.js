// Copyright (c) 2020, Tech Innovators and contributors
// For license information, please see license.txt

// frappe.ui.form.on('NEW CUSTOMER QUOTATION', {
// 	// refresh: function(frm) {

// 	// }
// });

frappe.ui.form.on('NEW CUSTOMER QUOTATION', {
	supplier_rate(frm,cdt,cdn) {
	    calculate_total(frm,cdt,cdn)
	},
	commission(frm,cdt,cdn) {
	    calculate_total(frm,cdt,cdn)
	}
	
})
function calculate_total(frm,cdt,cdn){
    if(frm.doc.supplier_rate){
        var customer_rate = frm.doc.supplier_rate
        if(frm.doc.commission){
            customer_rate = frm.doc.supplier_rate + frm.doc.commission;
        }
        frappe.model.set_value(cdt,cdn,"customer_rate",customer_rate)
    }
}