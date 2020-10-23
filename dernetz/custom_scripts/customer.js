// Copyright (c) 2020, Tech Innovators and contributors
// For license information, please see license.txt

/* ---------------------------------------------------------------------------
 * Doctype: Customer Calculations / Filters
 * --------------------------------------------------------------------------- */

 frappe.ui.form.on('Customer', {
        refresh: function(frm) {
            frm.add_custom_button("Create Task", function() {
            let dialog = new frappe.ui.Dialog({
				title: __("Create Task"),
				fields: [
					{
						fieldname: 'task_details',
						label: __('Task Detail'),
						fieldtype: 'Small Text',
						reqd: 1
					},
					{
						label: __("Priority"),
						fieldtype: "Select",
						fieldname: "priority",
						options: ["High","Medium","Low"],
						reqd: 1
					},
					{
						label: __("Due Date"),
						fieldtype: "Date",
						fieldname: "due_date",
						reqd: 1

					},
				],
				primary_action(data){
                        console.log(data)
						// frappe.call({
						// 	method: "erpnext.hr.doctype.attendance.attendance.mark_bulk_attendance",
						// 	args: {
						// 		data : data
						// 	},
						// 	callback: function(r) {
						// 		if(r.message === 1) {
						// 			frappe.show_alert({message:__("Attendance Marked"), indicator:'blue'});
						// 			cur_dialog.hide();
						// 		}
						// 	}
						// });
					
					dialog.hide();
				},
				primary_action_label: __('Add Task')

			});
            dialog.show();
            })
        },
        onload: function(frm) {
            frm.doc.uplift = 0
        },
        validate: function(frm) {

            if(frm.doc.uplift <= 0.01 || frm.doc.uplift >= 3)
            {
                frappe.throw("Uplift Number Should Be Between 0.01 Pence To 3 Pence.")
            }
            frm.trigger('total_for_mop_service')
            frm.trigger('mop_profit')
            frm.trigger('sold_contract_start_date')
            frm.trigger('total_eac')
            frm.trigger('commission_amount')
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
        total_eac: function(frm) {
            var day_eac_ussage = frm.doc.total_eac * 0.7
            var night_eac_ussage = frm.doc.total_eac * 0.3
            frm.set_value("day_eac_ussage",day_eac_ussage)
            frm.set_value("night_eac_ussage",night_eac_ussage)
            frm.trigger('contract_cost_for_client')
            frm.trigger('commission_amount')
        },
        sold_contract_start_date: function(frm) {
            var days = frm.doc.contract_period_for_client*365
            var sold_contract_end_date = frappe.datetime.add_days(frm.doc.sold_contract_start_date,days);
            frm.set_value("sold_contract_end_date", sold_contract_end_date);
            refresh_field("sold_contract_end_date");
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
        contract_cost_for_client: function(frm) {
            var x1 = ( frm.doc.day_rate_for_client * frm.doc.day_eac_ussage )/ 100
            var x2 = ( frm.doc.night_rate_for_client * frm.doc.night_eac_ussage )/ 100
            var x3 = ( frm.doc.standing_charge_for_client * 365 )/ 100
            var x4 = ( frm.doc.kva_charge_at * frm.doc.kva_allocated * 365 )/ 100
            var x5 = ( frm.doc.ro / 100 ) * frm.doc.total_eac
            var x6 = ( frm.doc.fit / 100 ) * frm.doc.total_eac
            var contract_cost_for_client = ( x1 + x2 + x3 + x4 + x5 + x6 )
            frm.set_value("contract_cost_for_client",contract_cost_for_client)
        },
        uplift: function(frm) {
            frm.trigger('commission_amount')
        },
        contract_period_for_client: function(frm) {
            frm.trigger('sold_contract_start_date')
            frm.trigger('commission_amount')
        },
        commission_amount: function(frm) {
            var commission_amount = ( ( frm.doc.total_eac / 100 ) * frm.doc.uplift * frm.doc.contract_period_for_client )
            frm.set_value("commission_amount",commission_amount)
        }
});