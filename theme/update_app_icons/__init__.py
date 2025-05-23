import os
import shutil
from odoo import models, fields, api



def update_menu_icons(env):
    """Update menu icons only if the module is installed."""
    menu_items = [
        {"module": "account"},
        {"module": "stock"},
        {"module": "mrp"},
        {"module": "purchase"},
        {"module": "sale"},
        {"module": "contacts"},
        {"module": "project"},
        {"module": "crm"},
        {"module": "hr"},
        {"module": "survey"},
        {"module": "hr_attendance"},
        {"module": "hr_holidays"},
        {"module": "hr_recruitment"},
        {"module": "utm"},
        {"module": "mail"},
        {"module": "calendar"},
        {"module": "point_of_sale"},
        {"module": "sale_management"},
        {"module": "website"},
        {"module": "hr_timesheet"},
        {"module": "lunch"},
        {"module": "fleet"},
        {"module": "web"},
        {"module": "event"},
        {"module": "settings"},
        {"module": "modules"},
        {"module": "database_logo"},
        {"module": "database_logo2"},
        {"module": "logo_erp"},
        {"module": "hr_expense"},

    ]
    for item in menu_items:
        module_name=item['module']
        icon_name=item['module']
        if module_name in ["settings","modules"]:
            module_name="web"
        if module_name in ["database_logo","database_logo2"]:
            source_file = f"/etc/odoo/theme/update_app_icons/static/src/img/icons/logo.png"
            module_path = f"/usr/lib/python3/dist-packages/odoo/addons/web/static/img/"
            target_file = os.path.join(module_path, "logo.png")
        elif module_name=="logo_erp":
            source_file = f"/etc/odoo/theme/update_app_icons/static/src/img/icons/database_manager.qweb.html"
            module_path = f"/usr/lib/python3/dist-packages/odoo/addons/web/static/src/public"
            target_file = os.path.join(module_path, "database_manager.qweb.html")
        else:
            source_file = f"/etc/odoo/theme/update_app_icons/static/src/img/icons/{icon_name}.png"
            module_path = f"/usr/lib/python3/dist-packages/odoo/addons/{module_name}/static/description"
            target_file = os.path.join(module_path, "icon.png")

        try:
            if not os.path.exists(source_file):
                raise FileNotFoundError(f"Source file not found: {source_file}")

            # Ensure target directory exists
            target_dir = os.path.dirname(target_file)
            if not os.path.exists(target_dir):
                os.makedirs(target_dir)

            # Copy and replace the file
            shutil.copy2(source_file, target_file)



        except Exception as e:
            return {
                "type": "ir.actions.client",
                "tag": "display_notification",
                "params": {
                    "title": "Error",
                    "message": str(e),
                    "sticky": True,
                },
            }

