# -*- coding: utf-8 -*-
# Copyright (c) 2020, Tech Innovators and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class NEWCUSTOMERQUOTATION(Document):
	def after_insert(self):
		if self.opportunity:
			frappe.db.set_value('Opportunity',self.opportunity,"status","Quotation")

	def after_delete(self):
		if self.opportunity:
			frappe.db.set_value('Opportunity',self.opportunity,"status","Open")