frappe.ui.form.on('Opportunity', {
	refresh(frm) {
		// your code here
	    setTimeout(function(){
	       frm.remove_custom_button('Lost');
	       frm.remove_custom_button('Close');
	       frm.remove_custom_button('Reopen');
	       frm.remove_custom_button('Quotation', "Create");	        
	        
	    },600);
		    if (!frm.doc.__islocal && frm.doc.contract_note && frm.doc.status == "Open"){
                frm.add_custom_button("Create Quotation", function() {
                    frappe.model.open_mapped_doc({
			            method: "dernetz.api.make_quotation_custom",
			            frm: cur_frm
	           	    })
                })
		    }

	}
})