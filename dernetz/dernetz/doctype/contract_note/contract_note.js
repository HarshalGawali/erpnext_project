// Copyright (c) 2020, Tech Innovators and contributors
// For license information, please see license.txt

/* ---------------------------------------------------------------------------
 * Doctype: Contract Note Calculations / Filters
 * --------------------------------------------------------------------------- */

frappe.ui.form.on('Contract Note', {

	 onload: function(frm) {
	   frm.trigger('contract_type')
	 },
	 validate: function(frm) {

	     if(frm.doc.contract_type == "MOP Contract"){
	        frm.trigger('total_for_mop_service')
            frm.trigger('mop_profit')
         }
         else if(frm.doc.contract_type == "Gas Contract"){
            frm.trigger('contract_cost_for_client')
            frm.trigger('sold_contract_start_date')
            frm.trigger('commission_amount')
         }
         else if(frm.doc.contract_type == "Electricity Contract"){

            if(frm.doc.uplift <= 0.01 || frm.doc.uplift >= 3)
            {
                frappe.throw("Uplift Number Should Be Between 0.01 Pence To 3 Pence.")
            }
            frm.trigger('sold_contract_start_date')
            frm.trigger('total_eac')
            frm.trigger('commission_amount')

//            if(frm.doc.commission_amount <= frm.doc.contract_cost_for_client)
//            {
//                frappe.throw("Commission Amount Should be Bigger Then Contract Cost.")
//            }

            if(frm.doc.mpan_topline.search("-") <= 0){
                var num = frm.doc.mpan_topline
                var parts = [num.slice(0,2),num.slice(2,5),num.slice(5,8)];
                //console.log(parts)
                var mpan_topline = parts[0]+"-"+parts[1]+"-"+parts[2];
                frm.set_value("mpan_topline",mpan_topline)
            }

            if(frm.doc.mpan_core.search("-") <= 0){
               var number = frm.doc.mpan_core
               var mpan = [number.slice(0,2),number.slice(2,10),number.slice(10,12)];
               //console.log(mpan)
               var mpan_core = mpan[0]+"-"+mpan[1]+"-"+mpan[2];
               //console.log(mpan_core)
               frm.set_value("mpan_core",mpan_core)
            }
         }


         // Clear The MOP Contract Fields If Contract Type Is Not MOP Contract
         /*if(frm.doc.contract_type != "MOP Contract"){
             frm.set_value("mop_site_address","")
             frm.set_value("mop_price","")
             frm.set_value("dc_price","")
             frm.set_value("da_price","")
             frm.set_value("mop_supplier_cost","")
         }*/

         // Clear The Water Contract Fields If Contract Type Is Not Water Contract
         /*if(frm.doc.contract_type != "Water Contract"){
             frm.set_value("water_site_address","")
             frm.set_value("water_consumption","")
             frm.set_value("waste_consumption","")
             frm.set_value("water_unit_rates","")
             frm.set_value("waste_unit_rates","")
             frm.set_value("water_fixed_rates","")
             frm.set_value("waste_fixed_rates","")
             frm.set_value("surface_drainage_fixed_rates","")
             frm.set_value("roads_drainage_fixed_rates","")
             frm.set_value("total_annual_wholesale_charge","")
         }*/

          // Clear The Electricity Contract Fields If Contract Type Is Not Electricity Contract
         /*if(frm.doc.contract_type != "Electricity Contract"){
             frm.set_value("mpan_site_address","")
             frm.set_value("mpan_topline","")
             frm.set_value("mpan_core","")
             frm.set_value("eac","")
             frm.set_value("current_supplier","")
             frm.set_value("new_supplier","")
             frm.set_value("current_contract_end_date","")
             frm.set_value("sold_contract_start_date","")
             frm.set_value("sold_contract_end_date","")
             frm.set_value("total_eac","")
             frm.set_value("day_eac_ussage","")
             frm.set_value("night_eac_ussage","")
             frm.set_value("day_rate_for_client","")
             frm.set_value("night_rate_for_client","")
             frm.set_value("standing_charge_for_client","")
             frm.set_value("kva_allocated","")
             frm.set_value("kva_charge_at","")
             frm.set_value("fit","")
             frm.set_value("ro","")
             frm.set_value("ccl","")
             frm.set_value("contract_cost_for_client","")
             frm.set_value("uplift","")
             frm.set_value("commission_amount","")
             //frm.set_value("loa","")
             //frm.set_value("signed_contract","")
         }*/

         /*if(frm.doc.contract_type != "Gas Contract"){
            frm.set_value("mprn","")
            frm.set_value("rate","")
         }*/

	 },
	 contract_type: function(frm) {

        if(frm.doc.contract_type == "Electricity Contract"){
           frm.toggle_display("mprn", false)
           frm.toggle_display("rate", false)
           frm.toggle_display("mpan_topline", true)
           frm.toggle_display("mpan_site_address", true)
           frm.toggle_display("mpan_core", true)
           frm.toggle_display("meter_type", true)
          // frm.toggle_display("total_eac", true)
           frm.toggle_display("day_eac_ussage", true)
           frm.toggle_display("night_eac_ussage", true)
           frm.toggle_display("day_rate_for_client", true)
           frm.toggle_display("night_rate_for_client", true)
           frm.toggle_display("kva_allocated", true)
           frm.toggle_display("kva_charge_at", true)
           //frm.toggle_display("fit", true)
           //frm.toggle_display("ro", true)
           //frm.toggle_display("ccl", true)
           frm.set_df_property("total_eac", "read_only", 1);

           /*frm.set_value("mprn","")
           frm.set_value("rate","")*/

           /*frm.set_value("mop_site_address","")
           frm.set_value("mop_price","")
           frm.set_value("dc_price","")
           frm.set_value("da_price","")
           frm.set_value("mop_supplier_cost","")

           frm.set_value("water_site_address","")
           frm.set_value("water_consumption","")
           frm.set_value("waste_consumption","")
           frm.set_value("water_unit_rates","")
           frm.set_value("waste_unit_rates","")
           frm.set_value("water_fixed_rates","")
           frm.set_value("waste_fixed_rates","")
           frm.set_value("surface_drainage_fixed_rates","")
           frm.set_value("roads_drainage_fixed_rates","")
           frm.set_value("total_annual_wholesale_charge","")*/
        }
        else if(frm.doc.contract_type == "Gas Contract"){
           frm.toggle_display("mprn", true)
           frm.toggle_display("rate", true)
           frm.toggle_display("rate", true)
           frm.toggle_display("mpan_topline", false)
           frm.toggle_display("mpan_site_address", false)
           frm.toggle_display("mpan_core", false)
           frm.toggle_display("meter_type", false)
          // frm.toggle_display("total_eac", false)
           frm.toggle_display("day_eac_ussage", false)
           frm.toggle_display("night_eac_ussage", false)
           frm.toggle_display("day_rate_for_client", false)
           frm.toggle_display("night_rate_for_client", false)
           frm.toggle_display("kva_allocated", false)
           frm.toggle_display("kva_charge_at", false)
           //frm.toggle_display("fit", false)
           //frm.toggle_display("ro", false)
           //frm.toggle_display("ccl", false)
           frm.set_df_property("total_eac", "read_only", 0);

           /*frm.set_value("mpan_site_address","")
           frm.set_value("mpan_topline","")
           frm.set_value("mpan_core","")
           frm.set_value("eac","")
           frm.set_value("current_supplier","")
           frm.set_value("new_supplier","")
           frm.set_value("current_contract_end_date","")
           frm.set_value("sold_contract_start_date","")
           frm.set_value("sold_contract_end_date","")
           frm.set_value("total_eac","")
           frm.set_value("day_eac_ussage","")
           frm.set_value("night_eac_ussage","")
           frm.set_value("day_rate_for_client","")
           frm.set_value("night_rate_for_client","")
           frm.set_value("standing_charge_for_client","")
           frm.set_value("kva_allocated","")
           frm.set_value("kva_charge_at","")
           frm.set_value("fit","")
           frm.set_value("ro","")
           frm.set_value("ccl","")
           frm.set_value("contract_cost_for_client","")
           frm.set_value("uplift","")
           frm.set_value("commission_amount","")*/

           /*frm.set_value("mop_site_address","")
           frm.set_value("mop_price","")
           frm.set_value("dc_price","")
           frm.set_value("da_price","")
           frm.set_value("mop_supplier_cost","")

           frm.set_value("water_site_address","")
           frm.set_value("water_consumption","")
           frm.set_value("waste_consumption","")
           frm.set_value("water_unit_rates","")
           frm.set_value("waste_unit_rates","")
           frm.set_value("water_fixed_rates","")
           frm.set_value("waste_fixed_rates","")
           frm.set_value("surface_drainage_fixed_rates","")
           frm.set_value("roads_drainage_fixed_rates","")
           frm.set_value("total_annual_wholesale_charge","")*/
        }
        /*else if(frm.doc.contract_type == "MOP Contract"){

           frm.set_value("water_site_address","")
           frm.set_value("water_consumption","")
           frm.set_value("waste_consumption","")
           frm.set_value("water_unit_rates","")
           frm.set_value("waste_unit_rates","")
           frm.set_value("water_fixed_rates","")
           frm.set_value("waste_fixed_rates","")
           frm.set_value("surface_drainage_fixed_rates","")
           frm.set_value("roads_drainage_fixed_rates","")
           frm.set_value("total_annual_wholesale_charge","")

           frm.set_value("mpan_site_address","")
           frm.set_value("mpan_topline","")
           frm.set_value("mpan_core","")
           frm.set_value("eac","")
           frm.set_value("current_supplier","")
           frm.set_value("new_supplier","")
           frm.set_value("current_contract_end_date","")
           frm.set_value("sold_contract_start_date","")
           frm.set_value("sold_contract_end_date","")
           frm.set_value("total_eac","")
           frm.set_value("day_eac_ussage","")
           frm.set_value("night_eac_ussage","")
           frm.set_value("day_rate_for_client","")
           frm.set_value("night_rate_for_client","")
           frm.set_value("standing_charge_for_client","")
           frm.set_value("kva_allocated","")
           frm.set_value("kva_charge_at","")
           frm.set_value("fit","")
           frm.set_value("ro","")
           frm.set_value("ccl","")
           frm.set_value("contract_cost_for_client","")
           frm.set_value("uplift","")
           frm.set_value("commission_amount","")

           frm.set_value("mprn","")
           frm.set_value("rate","")
        }
        else if(frm.doc.contract_type == "Water Contract"){

           frm.set_value("mprn","")
           frm.set_value("rate","")

           frm.set_value("mop_site_address","")
           frm.set_value("mop_price","")
           frm.set_value("dc_price","")
           frm.set_value("da_price","")
           frm.set_value("mop_supplier_cost","")

           frm.set_value("mpan_site_address","")
           frm.set_value("mpan_topline","")
           frm.set_value("mpan_core","")
           frm.set_value("eac","")
           frm.set_value("current_supplier","")
           frm.set_value("new_supplier","")
           frm.set_value("current_contract_end_date","")
           frm.set_value("sold_contract_start_date","")
           frm.set_value("sold_contract_end_date","")
           frm.set_value("total_eac","")
           frm.set_value("day_eac_ussage","")
           frm.set_value("night_eac_ussage","")
           frm.set_value("day_rate_for_client","")
           frm.set_value("night_rate_for_client","")
           frm.set_value("standing_charge_for_client","")
           frm.set_value("kva_allocated","")
           frm.set_value("kva_charge_at","")
           frm.set_value("fit","")
           frm.set_value("ro","")
           frm.set_value("ccl","")
           frm.set_value("contract_cost_for_client","")
           frm.set_value("uplift","")
           frm.set_value("commission_amount","")
        }*/
	 },
	 mop_price: function(frm) {
        frm.trigger('total_for_mop_service')
     },
     dc_price: function(frm) {
        frm.trigger('total_for_mop_service')
     },
     da_price: function(frm) {
        frm.trigger('total_for_mop_service')
     },
     total_for_mop_service: function(frm) {
        var total_for_mop_service = frm.doc.mop_price + frm.doc.dc_price + frm.doc.da_price
        frm.set_value("total_for_mop_service",total_for_mop_service)
        frm.trigger('mop_profit')
     },
     mop_supplier_cost: function(frm) {
        frm.trigger('mop_profit')
     },
     mop_profit: function(frm) {
        var mop_profit = frm.doc.total_for_mop_service - frm.doc.mop_supplier_cost
        frm.set_value("mop_profit",mop_profit)
     },
     eac: function(frm) {
        //if(frm.doc.contract_type == "Electricity Contract"){
        //frm.trigger('contract_cost_for_client')
        //frm.trigger('commission_amount')
        //}
     },
     total_eac: function(frm) {
        if(frm.doc.total_eac > 0){
            //var day_eac_ussage = frm.doc.total_eac * 0.7
            //var night_eac_ussage = frm.doc.total_eac * 0.3
            //frm.set_value("day_eac_ussage",day_eac_ussage)
            //frm.set_value("night_eac_ussage",night_eac_ussage)
            //frm.set_value("night_eac_ussage",night_eac_ussage)
            frm.trigger('contract_cost_for_client')
        }
        //frm.trigger('commission_amount')
    },
    day_eac_ussage: function(frm) {
        if(frm.doc.day_eac_ussage > 0){
            var total_eac = frm.doc.day_eac_ussage + frm.doc.night_eac_ussage
            frm.set_value("total_eac",total_eac)
            frm.trigger('contract_cost_for_client')
        }
    },
    night_eac_ussage: function(frm) {
        if(frm.doc.night_eac_ussage > 0){
            var total_eac = frm.doc.day_eac_ussage + frm.doc.night_eac_ussage
            frm.set_value("total_eac",total_eac)
            frm.trigger('contract_cost_for_client')
        }
    },
    sold_contract_start_date: function(frm) {
        var days = frm.doc.contract_period*365
        if(frm.doc.sold_contract_start_date && days){
            var sold_contract_end_date = frappe.datetime.add_days(frm.doc.sold_contract_start_date,days);
            frm.set_value("sold_contract_end_date", sold_contract_end_date);
            refresh_field("sold_contract_end_date");
        }
    },
    standing_charge_for_client: function(frm) {
        frm.trigger('contract_cost_for_client')
    },
   kva_charge_at: function(frm) {
        frm.trigger('contract_cost_for_client')
    },
    kva_allocated: function(frm) {
        frm.trigger('contract_cost_for_client')
   },
   ro: function(frm) {
       frm.trigger('contract_cost_for_client')
   },
    fit: function(frm) {
       frm.trigger('contract_cost_for_client')
    },
    day_rate_for_client: function(frm) {
        frm.trigger('contract_cost_for_client')
    },
    night_rate_for_client: function(frm) {
        frm.trigger('contract_cost_for_client')
    },
   ccl: function(frm) {
       frm.trigger('contract_cost_for_client')
    },
    contract_cost_for_client: function(frm) {
        if(frm.doc.contract_type == "Electricity Contract"){
            if(frm.doc.day_rate_for_client > 0 && frm.doc.day_eac_ussage > 0 && frm.doc.night_rate_for_client > 0
            && frm.doc.night_eac_ussage > 0 && frm.doc.standing_charge_for_client > 0 &&
            frm.doc.total_eac > 0 ) {
                var x1 = ( frm.doc.day_rate_for_client * frm.doc.day_eac_ussage )/ 100
                var x2 = ( frm.doc.night_rate_for_client * frm.doc.night_eac_ussage )/ 100
                var x3 = ( frm.doc.standing_charge_for_client * 365 )/ 100
                var x4 = ( frm.doc.kva_charge_at * frm.doc.kva_allocated * 365 )/ 100
                var x5 = ( frm.doc.ro / 100 ) * frm.doc.total_eac
                var x6 = ( frm.doc.fit / 100 ) * frm.doc.total_eac
                var x7 = ( frm.doc.total_eac * frm.doc.ccl )/ 100
                var contract_cost_for_client = ( x1 + x2 + x3 + x4 + x5 + x6 + x7 )
            }
        }
        else if(frm.doc.contract_type == "Gas Contract"){
            if(frm.doc.rate > 0 && frm.doc.standing_charge_for_client > 0 && frm.doc.total_eac > 0 ) {
                var x1 = ( frm.doc.total_eac / 100 )/ frm.doc.rate
                var x3 = ( frm.doc.standing_charge_for_client * 365 )/ 100
                var x5 = ( frm.doc.ro / 100 ) * frm.doc.total_eac
                var x6 = ( frm.doc.fit / 100 ) * frm.doc.total_eac
                var x7 = ( frm.doc.total_eac * frm.doc.ccl )/ 100
                var contract_cost_for_client = ( x1 + x3 + x5 + x6 + x7 )
           }
        }
        frm.set_value("contract_cost_for_client",contract_cost_for_client)
    },
    uplift: function(frm) {
        frm.trigger('commission_amount')
    },
    contract_period: function(frm) {
        frm.trigger('sold_contract_start_date')
        frm.trigger('commission_amount')
    },
    commission_amount: function(frm) {
        //if(frm.doc.contract_type == "Electricity Contract"){
        if(frm.doc.total_eac > 0 && frm.doc.uplift > 0 && frm.doc.contract_period > 0 ){
          var commission_amount = ( ( frm.doc.total_eac / 100 ) * frm.doc.uplift * frm.doc.contract_period )
          frm.set_value("commission_amount",commission_amount)
        }
    }
});

frappe.ui.form.on('Contract Note', {
	refresh(frm) {
		// your code here
		frm.add_custom_button("SEND SUPPLIER TERMINATION NOTICE", function() {
		  //  frm.email_doc();
		    localStorage.removeItem(frm.doc.doctype+frm.doc.name);
    		new frappe.views.CommunicationComposerCustom({
    			doc: frm.doc,
    			frm: frm,
    			subject: __("Contract Terminate"),
    			recipients: frm.doc.email || frm.doc.email_id,
    			attach_document_print: true,
    			email_template: "Contract Note Supplier"
    		});
		})
	}
})


frappe.last_edited_communication = {};
frappe.standard_replies = {};

frappe.views.CommunicationComposerCustom = Class.extend({
	init: function(opts) {
		$.extend(this, opts);
		this.make();
	},
	make: function() {
		var me = this;

		this.dialog = new frappe.ui.Dialog({
			title: (this.title || this.subject || __("New Email")),
			no_submit_on_enter: true,
			fields: this.get_fields(),
			primary_action_label: __("Send"),
			primary_action: function() {
				me.delete_saved_draft();
				me.send_action();
			},
			minimizable: true
		});

		['recipients', 'cc', 'bcc'].forEach(field => {
			this.dialog.fields_dict[field].get_data = function() {
				const data = me.dialog.fields_dict[field].get_value();
				const txt = data.match(/[^,\s*]*$/)[0] || '';
				let options = [];

				frappe.call({
					method: "frappe.email.get_contact_list",
					args: {
						txt: txt,
					},
					callback: (r) => {
						options = r.message;
						me.dialog.fields_dict[field].set_data(options);
					}
				});
				return options;
			}
		});

		this.prepare();
		this.dialog.show();

		if (this.frm) {
			$(document).trigger('form-typing', [this.frm]);
		}
	},

	get_fields: function() {
		let contactList = [];
		var fields= [
			{label:__("To"), fieldtype:"MultiSelect", reqd: 0, fieldname:"recipients",options:contactList},
			{fieldtype: "Section Break", collapsible: 1, label: __("CC, BCC & Email Template")},
			{label:__("CC"), fieldtype:"MultiSelect", fieldname:"cc",options:contactList},
			{label:__("BCC"), fieldtype:"MultiSelect", fieldname:"bcc",options:contactList},
			{label:__("Email Template"), fieldtype:"Link", options:"Email Template",
				fieldname:"email_template"},
			{fieldtype: "Section Break"},
			{label:__("Subject"), fieldtype:"Data", reqd: 1,
				fieldname:"subject", length:524288},
			{fieldtype: "Section Break"},
			{
				label:__("Message"),
				fieldtype:"Text Editor", reqd: 1,
				fieldname:"content",
				onchange: frappe.utils.debounce(this.save_as_draft.bind(this), 300)
			},

			{fieldtype: "Section Break"},
			{fieldtype: "Column Break"},
			{label:__("Send me a copy"), fieldtype:"Check",
				fieldname:"send_me_a_copy", 'default': frappe.boot.user.send_me_a_copy},
			{label:__("Send Read Receipt"), fieldtype:"Check",
				fieldname:"send_read_receipt"},
			{label:__("Attach Document Print"), fieldtype:"Check",
				fieldname:"attach_document_print"},
			{label:__("Select Print Format"), fieldtype:"Select",
				fieldname:"select_print_format"},
			{label:__("Select Languages"), fieldtype:"Select",
				fieldname:"language_sel"},
			{fieldtype: "Column Break"},
			{label:__("Select Attachments"), fieldtype:"HTML",
				fieldname:"select_attachments"}
		];

		// add from if user has access to multiple email accounts
		var email_accounts = frappe.boot.email_accounts.filter(function(account, idx){
			return !in_list(["All Accounts", "Sent", "Spam", "Trash"], account.email_account) &&
				account.enable_outgoing
		})
		if(frappe.boot.email_accounts && email_accounts.length > 1) {
			fields = [
				{label: __("From"), fieldtype: "Select", reqd: 1, fieldname: "sender",
					options: email_accounts.map(function(e) { return e.email_id; }) }
			].concat(fields);
		}

		return fields;
	},
	prepare: function() {
		this.setup_subject_and_recipients();
		this.setup_print_language();
		this.setup_print();
		this.setup_attach();
		this.setup_email();
		//this.setup_last_edited_communication();
		this.setup_email_template();

		this.dialog.set_value("recipients", this.recipients || '');
		this.dialog.set_value("cc", this.cc || '');
		this.dialog.set_value("bcc", this.bcc || '');
		this.dialog.set_value("email_template", this.email_template || '');

		if(this.dialog.fields_dict.sender) {
			this.dialog.fields_dict.sender.set_value(this.sender || '');
		}
		this.dialog.fields_dict.subject.set_value(this.subject || '');

		this.setup_earlier_reply();
	},

	setup_subject_and_recipients: function() {
		this.subject = this.subject || "";

		if(!this.forward && !this.recipients && this.last_email) {
			this.recipients = this.last_email.sender;
			this.cc = this.last_email.cc;
			this.bcc = this.last_email.bcc;
		}

		if(!this.forward && !this.recipients) {
			this.recipients = this.frm && this.frm.timeline.get_recipient();
		}

		if(!this.subject && this.frm) {
			// get subject from last communication
			var last = this.frm.timeline.get_last_email();

			if(last) {
				this.subject = last.subject;
				if(!this.recipients) {
					this.recipients = last.sender;
				}

				// prepend "Re:"
				if(strip(this.subject.toLowerCase().split(":")[0])!="re") {
					this.subject = __("Re: {0}", [this.subject]);
				}
			}

			if (!this.subject) {
				this.subject = this.frm.doc.name;
				if (this.frm.meta.subject_field && this.frm.doc[this.frm.meta.subject_field]) {
					this.subject = this.frm.doc[this.frm.meta.subject_field];
				} else if (this.frm.meta.title_field && this.frm.doc[this.frm.meta.title_field]) {
					this.subject = this.frm.doc[this.frm.meta.title_field];
				}
			}

			// always add an identifier to catch a reply
			// some email clients (outlook) may not send the message id to identify
			// the thread. So as a backup we use the name of the document as identifier
			let identifier = `#${this.frm.doc.name}`;
			if (!this.subject.includes(identifier)) {
				this.subject = `${this.subject} (${identifier})`;
			}
		}

		if (this.frm && !this.recipients) {
			this.recipients = this.frm.doc[this.frm.email_field];
		}
	},

	setup_email_template: function() {
		var me = this;

		this.dialog.fields_dict["email_template"].df.onchange = () => {
			var email_template = me.dialog.fields_dict.email_template.get_value();

			var prepend_reply = function(reply) {
				if(me.reply_added===email_template) {
					return;
				}
				var content_field = me.dialog.fields_dict.content;
				var subject_field = me.dialog.fields_dict.subject;
				var content = content_field.get_value() || "";
				var subject = subject_field.get_value() || "";

				var parts = content.split('<!-- salutation-ends -->');

				if(parts.length===2) {
					content = [reply.message, "<br>", parts[1]];
				} else {
					content = [reply.message, "<br>", content];
				}

				content_field.set_value(content.join(''));

				subject_field.set_value(reply.subject);

				me.reply_added = email_template;
			}

			frappe.call({
				method: 'frappe.email.doctype.email_template.email_template.get_email_template',
				args: {
					template_name: email_template,
					doc: me.frm.doc,
					_lang: me.dialog.get_value("language_sel")
				},
				callback: function(r) {
					prepend_reply(r.message);
				},
			});
		}
	},

	setup_last_edited_communication: function() {
		var me = this;
		if (!this.doc){
			if (cur_frm){
				this.doc = cur_frm.doctype;
			}else{
				this.doc = "Inbox";
			}
		}
		if (cur_frm && cur_frm.docname) {
			this.key = cur_frm.docname;
		} else {
			this.key = "Inbox";
		}
		if(this.last_email) {
			this.key = this.key + ":" + this.last_email.name;
		}
		if(this.subject){
			this.key = this.key + ":" + this.subject;
		}
		this.dialog.onhide = function() {
			var last_edited_communication = me.get_last_edited_communication();
			$.extend(last_edited_communication, {
				sender: me.dialog.get_value("sender"),
				recipients: me.dialog.get_value("recipients"),
				cc: me.dialog.get_value("cc"),
				bcc: me.dialog.get_value("bcc"),
				subject: me.dialog.get_value("subject"),
				content: me.dialog.get_value("content"),
			});

			if (me.frm) {
				$(document).trigger("form-stopped-typing", [me.frm]);
			}
		}

		this.dialog.on_page_show = function() {
			if (!me.txt) {
				var last_edited_communication = me.get_last_edited_communication();
				if(last_edited_communication.content) {
					me.dialog.set_value("sender", last_edited_communication.sender || "");
					me.dialog.set_value("subject", last_edited_communication.subject || "");
					me.dialog.set_value("recipients", last_edited_communication.recipients || "");
					me.dialog.set_value("cc", last_edited_communication.cc || "");
					me.dialog.set_value("bcc", last_edited_communication.bcc || "");
					me.dialog.set_value("content", last_edited_communication.content || "");
				}
			}

		}

	},

	get_last_edited_communication: function() {
		if (!frappe.last_edited_communication[this.doc]) {
			frappe.last_edited_communication[this.doc] = {};
		}

		if(!frappe.last_edited_communication[this.doc][this.key]) {
			frappe.last_edited_communication[this.doc][this.key] = {};
		}

		return frappe.last_edited_communication[this.doc][this.key];
	},

	selected_format: function() {
		return this.dialog.fields_dict.select_print_format.input.value || (this.frm && this.frm.meta.default_print_format) || "Standard";
	},

	get_print_format: function(format) {
		if (!format) {
			format = this.selected_format();
		}

		if (locals["Print Format"] && locals["Print Format"][format]) {
			return locals["Print Format"][format];
		} else {
			return {};
		}
	},

	setup_print_language: function() {
		var me = this;
		var doc = this.doc || cur_frm.doc;
		var fields = this.dialog.fields_dict;

		//Load default print language from doctype
		this.lang_code = doc.language

		if (this.get_print_format().default_print_language) {
			var default_print_language_code = this.get_print_format().default_print_language;
			me.lang_code = default_print_language_code;
		} else {
			var default_print_language_code = null;
		}

		//On selection of language retrieve language code
		$(fields.language_sel.input).change(function(){
			me.lang_code = this.value
		})

		// Load all languages in the select field language_sel
		$(fields.language_sel.input)
			.empty()
			.add_options(frappe.get_languages());

		if (default_print_language_code) {
			$(fields.language_sel.input).val(default_print_language_code);
		} else {
			$(fields.language_sel.input).val(doc.language);
		}
	},

	setup_print: function() {
		// print formats
		var fields = this.dialog.fields_dict;

		// toggle print format
		$(fields.attach_document_print.input).click(function() {
			$(fields.select_print_format.wrapper).toggle($(this).prop("checked"));
		});

		// select print format
		$(fields.select_print_format.wrapper).toggle(false);

		if (cur_frm) {
			$(fields.select_print_format.input)
				.empty()
				.add_options(cur_frm.print_preview.print_formats)
				.val(cur_frm.print_preview.print_formats[0]);
		} else {
			$(fields.attach_document_print.wrapper).toggle(false);
		}

	},
	setup_attach: function() {
		var fields = this.dialog.fields_dict;
		var attach = $(fields.select_attachments.wrapper);

		if (!this.attachments) {
			this.attachments = [];
		}

		let args = {
			folder: 'Home/Attachments',
			on_success: attachment => {
				this.attachments.push(attachment);
				this.render_attachment_rows(attachment);
			}
		};

		if (this.frm) {
			args = {
				doctype: this.frm.doctype,
				docname: this.frm.docname,
				folder: 'Home/Attachments',
				on_success: attachment => {
					this.frm.attachments.attachment_uploaded(attachment);
					this.render_attachment_rows(attachment);
				}
			};
		}

		$(`
			<h6 class='text-muted add-attachment' style='margin-top: 12px; cursor:pointer;'>
				${__("Select Attachments")}
			</h6>
			<div class='attach-list'></div>
			<p class='add-more-attachments'>
				<a class='text-muted small'>
					<i class='octicon octicon-plus' style='font-size: 12px'></i>
					${__("Add Attachment")}
				</a>
			</p>
		`).appendTo(attach.empty());

		attach
			.find(".add-more-attachments a")
			.on('click', () => new frappe.ui.FileUploader(args));
		this.render_attachment_rows();
	},

	render_attachment_rows: function(attachment) {
		const select_attachments = this.dialog.fields_dict.select_attachments;
		const attachment_rows = $(select_attachments.wrapper).find(".attach-list");
		if (attachment) {
			attachment_rows.append(this.get_attachment_row(attachment, true));
		} else {
			let files = [];
			if (this.attachments && this.attachments.length) {
				files = files.concat(this.attachments);
			}
			if (this.frm) {
				files = files.concat(this.frm.get_files());
			}

			if (files.length) {
				$.each(files, (i, f) => {
					if (!f.file_name) return;
					if (!attachment_rows.find(`[data-file-name="${f.name}"]`).length) {
						f.file_url = frappe.urllib.get_full_url(f.file_url);
						attachment_rows.append(this.get_attachment_row(f));
					}
				});
			}
		}
	},

	get_attachment_row(attachment, checked) {
		return $(`<p class="checkbox">
			<label>
				<span>
					<input
						type="checkbox"
						data-file-name="${attachment.name}"
						${checked ? 'checked': ''}>
					</input>
				</span>
				<span class="small">${attachment.file_name}</span>
				<a href="${attachment.file_url}" target="_blank" class="text-muted small">
				<i class="fa fa-share" style="vertical-align: middle; margin-left: 3px;"></i>
			</label>
		</p>`);
	},

	setup_email: function() {
		// email
		var fields = this.dialog.fields_dict;

		if(this.attach_document_print) {
			$(fields.attach_document_print.input).click();
			$(fields.select_print_format.wrapper).toggle(true);
		}

		$(fields.send_me_a_copy.input).on('click', () => {
			// update send me a copy (make it sticky)
			let val = fields.send_me_a_copy.get_value();
			frappe.db.set_value('User', frappe.session.user, 'send_me_a_copy', val);
			frappe.boot.user.send_me_a_copy = val;
		});

	},

	send_action: function() {
		var me = this;
		var btn = me.dialog.get_primary_btn();

		var form_values = this.get_values();
		if(!form_values) return;

		var selected_attachments =
			$.map($(me.dialog.wrapper).find("[data-file-name]:checked"), function (element) {
				return $(element).attr("data-file-name");
			});


		if(form_values.attach_document_print) {
			me.send_email(btn, form_values, selected_attachments, null, form_values.select_print_format || "");
		} else {
			me.send_email(btn, form_values, selected_attachments);
		}
	},

	get_values: function() {
		var form_values = this.dialog.get_values();

		// cc
		for ( var i=0, l=this.dialog.fields.length; i < l; i++ ) {
			var df = this.dialog.fields[i];

			if ( df.is_cc_checkbox ) {
				// concat in cc
				if ( form_values[df.fieldname] ) {
					form_values.cc = ( form_values.cc ? (form_values.cc + ", ") : "" ) + df.fieldname;
					form_values.bcc = ( form_values.bcc ? (form_values.bcc + ", ") : "" ) + df.fieldname;
				}

				delete form_values[df.fieldname];
			}
		}

		return form_values;
	},

	save_as_draft: function() {
		if (this.dialog && this.frm) {
			try {
				let message = this.dialog.get_value('content');
				message = message.split(frappe.separator_element)[0];
				localStorage.setItem(this.frm.doctype + this.frm.docname, message);
			} catch (e) {
				// silently fail
				console.log(e);
				console.warn('[Communication] localStorage is full. Cannot save message as draft');
			}
		}
	},

	delete_saved_draft() {
		if (this.dialog) {
			try {
				localStorage.removeItem(this.frm.doctype + this.frm.docname);
			} catch (e) {
				console.log(e);
				console.warn('[Communication] Cannot delete localStorage item'); // eslint-disable-line
			}
		}
	},

	send_email: function(btn, form_values, selected_attachments, print_html, print_format) {
		var me = this;
		me.dialog.hide();

		if(!form_values.recipients) {
			frappe.msgprint(__("Enter Email Recipient(s)"));
			return;
		}

		if(!form_values.attach_document_print) {
			print_html = null;
			print_format = null;
		}


		if(cur_frm && !frappe.model.can_email(me.doc.doctype, cur_frm)) {
			frappe.msgprint(__("You are not allowed to send emails related to this document"));
			return;
		}


		return frappe.call({
			method:"frappe.core.doctype.communication.email.make",
			args: {
				recipients: form_values.recipients,
				cc: form_values.cc,
				bcc: form_values.bcc,
				subject: form_values.subject,
				content: form_values.content,
				doctype: me.doc.doctype,
				name: me.doc.name,
				send_email: 1,
				print_html: print_html,
				send_me_a_copy: form_values.send_me_a_copy,
				print_format: print_format,
				sender: form_values.sender,
				sender_full_name: form_values.sender?frappe.user.full_name():undefined,
				email_template: form_values.email_template,
				attachments: selected_attachments,
				_lang : me.lang_code,
				read_receipt:form_values.send_read_receipt,
				print_letterhead: me.is_print_letterhead_checked(),
			},
			btn: btn,
			callback: function(r) {
				if(!r.exc) {
					frappe.utils.play_sound("email");

					if(r.message["emails_not_sent_to"]) {
						frappe.msgprint(__("Email not sent to {0} (unsubscribed / disabled)",
							[ frappe.utils.escape_html(r.message["emails_not_sent_to"]) ]) );
					}

					if ((frappe.last_edited_communication[me.doc] || {})[me.key]) {
						delete frappe.last_edited_communication[me.doc][me.key];
					}
					if (cur_frm) {
						// clear input
						cur_frm.timeline.input && cur_frm.timeline.input.val("");
						cur_frm.reload_doc();
					}

					// try the success callback if it exists
					if (me.success) {
						try {
							me.success(r);
						} catch (e) {
							console.log(e);
						}
					}

				} else {
					frappe.msgprint(__("There were errors while sending email. Please try again."));

					// try the error callback if it exists
					if (me.error) {
						try {
							me.error(r);
						} catch (e) {
							console.log(e);
						}
					}
				}
			}
		});
	},

	is_print_letterhead_checked: function() {
		if (this.frm && $(this.frm.wrapper).find('.form-print-wrapper').is(':visible')){
			return $(this.frm.wrapper).find('.print-letterhead').prop('checked') ? 1 : 0;
		} else {
			return (frappe.model.get_doc(":Print Settings", "Print Settings") ||
				{ with_letterhead: 1 }).with_letterhead ? 1 : 0;
		}
	},

	setup_earlier_reply: function() {
		let fields = this.dialog.fields_dict;
		let signature = frappe.boot.user.email_signature || "";

		if(!frappe.utils.is_html(signature)) {
			signature = signature.replace(/\n/g, "<br>");
		}

		if(this.txt) {
			this.message = this.txt + (this.message ? ("<br><br>" + this.message) : "");
		} else {
			// saved draft in localStorage
			const { doctype, docname } = this.frm || {};
			if (doctype && docname) {
				this.message = localStorage.getItem(doctype + docname) || '';
			}
		}

		if(this.real_name) {
			this.message = '<p>'+__('Dear') +' '
				+ this.real_name + ",</p><!-- salutation-ends --><br>" + (this.message || "");
		}

		if(this.message && signature && this.message.includes(signature)) {
			signature = "";
		}

		let reply = (this.message || "") + (signature ? ("<br>" + signature) : "");
		let content = '';

		if (this.is_a_reply === 'undefined') {
			this.is_a_reply = true;
		}

		if (this.is_a_reply) {
			let last_email = this.last_email;

			if (!last_email) {
				last_email = this.frm && this.frm.timeline.get_last_email(true);
			}

			if (!last_email) return;

			let last_email_content = last_email.original_comment || last_email.content;

			// convert the email context to text as we are enclosing
			// this inside <blockquote>
			last_email_content = this.html2text(last_email_content).replace(/\n/g, '<br>');

			// clip last email for a maximum of 20k characters
			// to prevent the email content from getting too large
			if (last_email_content.length > 20 * 1024) {
				last_email_content += '<div>' + __('Message clipped') + '</div>' + last_email_content;
				last_email_content = last_email_content.slice(0, 20 * 1024);
			}

			let communication_date = last_email.communication_date || last_email.creation;
			content = `
				<div><br></div>
				${reply}
				${frappe.separator_element}
				<p>${__("On {0}, {1} wrote:", [frappe.datetime.global_date_format(communication_date) , last_email.sender])}</p>
				<blockquote>
				${last_email_content}
				</blockquote>
			`;
		} else {
			content = "<div><br></div>" + reply;
		}
		fields.content.set_value(content);
	},

	html2text: function(html) {
		// convert HTML to text and try and preserve whitespace
		var d = document.createElement( 'div' );
		d.innerHTML = html.replace(/<\/div>/g, '<br></div>')  // replace end of blocks
			.replace(/<\/p>/g, '<br></p>') // replace end of paragraphs
			.replace(/<br>/g, '\n');
		let text = d.textContent;

		// replace multiple empty lines with just one
		return text.replace(/\n{3,}/g, '\n\n');
	}
});
