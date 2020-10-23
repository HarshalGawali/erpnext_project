frappe.ui.form.on('Customer', {
	refresh: function(frm) {
		if (!frm.doc.__islocal){
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
						frappe.call({
							method: "dernetz.api.create_todo",
							args: {
								'task_details' : data.task_details,
								'priority': data.priority,
								'due_date': data.due_date
							},
							callback: function(r) {
								if(r.message == true) {
									frappe.show_alert({message:__("Task Added"), indicator:'blue'});
									cur_dialog.hide();
								}
							}
						});
					
					dialog.hide();
				},
				primary_action_label: __('Add Task')

			});
			dialog.show();
			})
			frm.add_custom_button("Add Contract Note", function() {
							frappe.route_options = { "customer": frm.doc.name };
							frappe.set_route("Form", "Contract Note", "New Contract Note 1")
			
			})
			frm.add_custom_button("Create Contract", function() {
				frappe.model.open_mapped_doc({
					method: "dernetz.api.make_contract",
					frm: cur_frm
				   })
			
			})
		}
	}
})