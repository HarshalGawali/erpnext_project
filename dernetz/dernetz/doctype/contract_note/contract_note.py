# -*- coding: utf-8 -*-
# Copyright (c) 2020, Tech Innovators and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils import (cstr,cint)
from dernetz import update_ipadd

class ContractNote(Document):
	def validate(self):
		update_ipadd()
		if self.lead:
			frappe.db.set_value('Lead',self.lead,'contract_note',self.name)
		if cint(self.get("__islocal")):
			if self.contract_type == "Gas Contract":
				mprn_exist = frappe.db.exists({
					'doctype': 'Contract Note',
					'contract_type': 'Gas Contract',
					'mprn': self.mprn
				})
				if mprn_exist:
					frappe.throw("MPRN Is Already Exist For Other Gas Contract.")


			if self.contract_type == "Electricity Contract":
				mpan_exist = frappe.db.exists({
					'doctype': 'Contract Note',
					'contract_type': 'Electricity Contract',
					'mprn': self.mpan_core
				})
				if mpan_exist:
					frappe.throw("MPAN Core Is Already Exist For Other Electricity Contract.")

