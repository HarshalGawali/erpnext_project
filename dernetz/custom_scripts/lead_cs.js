frappe.ui.form.on('Lead', {
	onload(frm,cdt,cdn) {

	},
	refresh(frm,cdt,cdn) {
	    setTimeout(function(){
	       frm.remove_custom_button('Customer', "Create");
	       frm.remove_custom_button('Opportunity', "Create");
	       frm.remove_custom_button('Quotation', "Create");	        
	        
	    },600);

		    if (!frm.doc.__islocal && !frm.doc.customer){
                frm.add_custom_button("Create Customer", function() {
                    frappe.call({
                        method:"dernetz.api.create_customer",
                        args:{
                            doc: frm.doc.name
                        },
                        callback:function(r){
                            if(r.message){
                                frappe.msgprint("Customer Created")
                                cur_frm.reload_doc();
                            }
                        }
                    })
                
                })
		    }
		    if(frm.doc.customer && !frm.doc.contract_note){
		        frm.add_custom_button(__('Contract Note'), function() {
			         frappe.route_options = { "customer": frm.doc.customer, "lead": frm.doc.name };
                	frappe.set_route("Form", "Contract Note", "New Contract Note 1")
			    },"Make");
		    }
            if(frm.doc.contract_note){
			frm.add_custom_button(__('Opportunity'), function() {
				frappe.model.open_mapped_doc({
			        method: "erpnext.crm.doctype.lead.lead.make_opportunity",
			        frm: cur_frm
	           	})
			},"Make");
            }
	}
})