{
    'name': 'lithws hr menu',
    'version': '17.0',
    'sequence': 1,
    'summary': 'lithws hr menu',
    'description': """
        This is a base module for Addis Systems Modules.
            ========================================
    """,
    'category': 'lithws ERP /Base',
    'website': 'https://www.addissystems.et/',
    'license': 'LGPL-3',
    'depends': ['base', 'hr','chart_sample','provident_fund','hr_resignation'],
    'data': [
        'view/menus.xml'
    ],

    'demo': [],
    'installable': True,
    'application': True,
    'auto_install': False,

}
