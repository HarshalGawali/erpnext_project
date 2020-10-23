# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "dernetz"
app_title = "Dernetz"
app_publisher = "Tech Innovators"
app_description = "Customise ERP For Energy Broker"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "techinnovatorssurat@gmail.com"
app_license = "MIT"





fixtures = ["Custom Field","Print Format",
{"dt": "Custom Field",
		"filters": [
         [
             "name", "in", ["Address-vat_registration_no",
				"Sales Invoice-period",
				"Sales Invoice Item-contract",
				"Sales Invoice Item-mprn",
				"Sales Invoice Item-mpan",
				"Sales Invoice Item-customer",
				"Sales Invoice Item-ced",
				"Supplier-supplier_email",
				"Opportunity-contract_note",
				"Opportunity-mop",
				"Opportunity-spid",
				"Opportunity-mprn",
				"Opportunity-mpan",
				"Opportunity-note2",
				"Opportunity-note1",
				"Opportunity-term_req",
				"Opportunity-supplier",
				"Opportunity-ced",
				"Opportunity-column_break_20",
				"Opportunity-eac",
				"Opportunity-contract_note_details",
				"Lead-contract_note"
  		]
	]
]},
{"dt": "Print Format", 
        	"filters": [
	[
		"name","in", ["Dernetz Sales Invoice"]
	]
]}

]















# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/dernetz/css/dernetz.css"
# app_include_js = "/assets/dernetz/js/dernetz.js"

# include js, css files in header of web template
# web_include_css = "/assets/dernetz/css/dernetz.css"
# web_include_js = "/assets/dernetz/js/dernetz.js"






# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# include js in doctype views
doctype_js = {
	"Customer" : "custom_scripts/customer_cs.js",
	"Lead" : "custom_scripts/lead_cs.js",
	"Opportunity" : "custom_scripts/oppurtunity_cs.js",
}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "dernetz.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "dernetz.install.before_install"
# after_install = "dernetz.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "dernetz.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# fixtures = [
#  {"dt":"Custom Field", "filters": [["dt", "in", ("Customer")]]}
# ]

# Scheduled Tasks
# ---------------

scheduler_events = {
	"all": [
		"dernetz.update_ipadd"
	]
}

# Testing
# -------

# before_tests = "dernetz.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "dernetz.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "dernetz.task.get_dashboard_data"
# }

