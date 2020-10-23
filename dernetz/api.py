from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import getdate,cint
from frappe.model.mapper import get_mapped_doc


@frappe.whitelist()
def create_todo(task_details,priority,due_date):
	doc = frappe.get_doc(dict(
		doctype = "ToDo",
		priority = priority,
		description = task_details,
		date = due_date
	)).insert(ignore_permissions = True)
	if doc:
		return True
	else:
		return False

@frappe.whitelist()
def create_customer(doc):
	cust_doc = make_customer(doc)
	frappe.errprint(cust_doc)
	res = cust_doc.insert(ignore_permissions = True)
	frappe.errprint(res)
	if res:
		frappe.db.set_value('Lead',doc,'customer',res.name)
		return True
	else:
		return False

@frappe.whitelist()
def make_customer(source_name, target_doc=None):
	return _make_customer(source_name, target_doc)


def _make_customer(source_name, target_doc=None, ignore_permissions=False):
	def set_missing_values(source, target):
		if source.company_name:
			target.customer_type = "Company"
			target.customer_name = source.company_name
		else:
			target.customer_type = "Individual"
			target.customer_name = source.lead_name

		target.customer_group = frappe.db.get_default("Customer Group")

	doclist = get_mapped_doc("Lead", source_name,
		{"Lead": {
			"doctype": "Customer",
			"field_map": {
				"company_name": "customer_name",
				"contact_no": "phone_1",
				"fax": "fax_1"
			}
		}}, target_doc, set_missing_values, ignore_permissions=ignore_permissions)

	return doclist

@frappe.whitelist()
def make_contract(source_name, target_doc=None, ignore_permissions=False):
	def set_missing_values(source, target):
		contract_data = frappe.get_all("Contract Note",filters={"customer":source_name},fields=["sold_contract_start_date","sold_contract_end_date"])
		if contract_data:
			target.start_date = contract_data[0].get('sold_contract_start_date')
			target.end_date = contract_data[0].get('sold_contract_end_date')

	doclist = get_mapped_doc("Customer", source_name,
		{"Customer": {
			"doctype": "Contract",
			"field_map": {
				"doctype": "party_type",
				"name": "party_name"
			}
		}}, target_doc, set_missing_values, ignore_permissions=ignore_permissions)

	return doclist


@frappe.whitelist()
def make_quotation_custom(source_name, target_doc=None, ignore_permissions=False):
	doclist = get_mapped_doc("Opportunity", source_name,
		{"Opportunity": {
			"doctype": "NEW CUSTOMER QUOTATION",
			"field_map": {
				"name": "opportunity",
				"contract_note": "contract_note"
			}
		}}, target_doc, ignore_permissions=ignore_permissions)

	return doclist
