# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	config = [
		{
			"label": _("Dernetz Management"),
			"items": [
				{
					"type": "doctype",
					"name": "Customer",
					"description": _("Customer database."),
					"onboard": 1,
				},
				{
					"type": "doctype",
					"name": "Contract Note",
					"description": _("Contract Note."),
					"onboard": 1,
				}
			]
		}
	]

	return config

