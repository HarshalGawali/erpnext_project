# Copyright (c) 2013, Tech Innovators and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import flt

def execute(filters=None):
	columns, data = [], []
	columns = get_columns(filters)
	data = get_data(filters)
	return columns, data


def get_columns(filters):
	return [
		_("Customer") + ":Link/Customer:130", _("Mpan/Mprn/Spid/Mop") + ":Data:200", _("Current Contract End Date")+ ":Date:140",
		_("New Contract End Date")+ ":Date:140",_("Commission Amount") + ":Currency:120"
	]

def get_data(filters):
	contract_data = frappe.get_all("Contract Note",filters={},fields=["customer","contract_type","mprn","mpan_core","core_mpan","spid","current_contract_end_date","sold_contract_end_date","commission_amount"])
	data = []
	for d in contract_data:
		u_no = ''
		if d.contract_type == "Gas Contract":
			u_no = d.mprn
		if d.contract_type == "Electricity Contract":
			u_no = d.mpan_core
		if d.contract_type == "Water Contract":
			u_no = d.spid
		if d.contract_type == "MOP Contract":
			u_no = d.core_mpan
		row = [d.customer,u_no,d.current_contract_end_date,d.sold_contract_end_date,d.commission_amount]
		data.append(row)
	return data

