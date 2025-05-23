/** @odoo-module **/
import { useService, useState} from "@web/core/utils/hooks";
import { WebClient } from "@web/webclient/webclient";
import { patch } from "@web/core/utils/patch";
import { useRef } from "@odoo/owl";
import { SidebarBottom } from "./SidebarBottom";
import { useEnvDebugContext } from "@web/core/debug/debug_context";

patch(WebClient.prototype, {
    setup() {
        super.setup(); 
        this.root = useRef("root");
        this.rpc = useService('rpc');
        this.companyService = useService("company");
        this.menuService = useService("menu");

        this.currentCompany = this.companyService.currentCompany;  
        this.fetch_menu_data(); 
    },
    toggleSidebar(ev){
        $(ev.currentTarget).toggleClass('visible');
        $('.nav-wrapper-bits').toggleClass('toggle-show');
        },

    onMenuClick(ev) {
//            ev.preventDefault();
            const target = ev.currentTarget;
            const menuId = target.getAttribute("data-menu");
            const actionId = target.getAttribute("data-action-id");
            const childMenu = target.nextElementSibling;

            // Handle submenu collapse/expand
            if (childMenu && childMenu.classList.contains("collapse")) {
                $(".header-sub-menus.collapse").not(childMenu).collapse("hide"); // Close other menus
                $(childMenu).collapse("toggle");
            }
        },

        onChildMenuClick(ev) {
            const screenWidth = window.innerWidth;

            // Define breakpoints (adjust based on your design)
            if (screenWidth <= 768) {
                 $(ev.currentTarget).toggleClass('visible');
                $('.nav-wrapper-bits').toggleClass('toggle-show');
                // Add specific logic for mobile
            } else if (screenWidth <= 1024) {
                 $(ev.currentTarget).toggleClass('visible');
                 $('.nav-wrapper-bits').toggleClass('toggle-show');
            } else {
                console.log("PC/Desktop view");
                // Add specific logic for desktop
            }
        },

    fetch_menu_data(){
      var menu_data = this.menuService.getApps()
      var self = this;
      var rec_ids = []
      menu_data.map(app => rec_ids.push(app.id))
      this.rpc('/get/menu_data',{'menu_ids':rec_ids,
      }).then(function(rec) {
          $.each(menu_data, function( key, menu ) {
            var target_elem = '.primary-nav a.main_link[data-menu='+ menu.id+']'
            var elem = $(self.root.el).find(target_elem)

            elem.find('.app_icon').empty()
            var pr_record = rec[menu.id][0]
            menu.id = pr_record.id
            menu.use_icon = pr_record.use_icon
            menu.icon_class_name = pr_record.icon_class_name
            menu.icon_img = pr_record.icon_img

            if (pr_record.use_icon) {
                if (pr_record.icon_class_name) {
                    var icon_image = "<span class='ri "+pr_record.icon_class_name+"'/>"
                } else if (pr_record.icon_img) {
                    var icon_image = "<img class='img img-fluid' src='/web/image/ir.ui.menu/"+pr_record.id+"/icon_img' />"
                } else if (pr_record.web_icon != false) {
                    var icon_data = pr_record.web_icon.split('/icon.')
                    if (icon_data[1] == 'svg'){
                        var web_svg_icon = pr_record.web_icon.replace(',', '/')
                        var icon_image = "<img class='img img-fluid' src='"+web_svg_icon+"' />"
                    } else {
                        var icon_image = "<img class='img img-fluid' src='data:image/"+icon_data[1]+";base64,"+pr_record.web_icon_data+"' />"
                    }
                } else{
                    var icon_image = "<img class='img img-fluid' src='/clarity_backend_theme_bits/static/img/logo.png' />"
                    }
                elem.find('.app_icon').append($(icon_image))
            } else {
                if (pr_record.icon_img) {
                    var icon_image = "<img class='img img-fluid' src='/web/image/ir.ui.menu/"+pr_record.id+"/icon_img' />"
                } else if (pr_record.web_icon != false){
                    var icon_data = pr_record.web_icon.split('/icon.')
                    if (icon_data[1] == 'svg'){
                        var web_svg_icon = pr_record.web_icon.replace(',', '/')
                        var icon_image = "<img class='img img-fluid' src='"+web_svg_icon+"' />"
                    } else {
                        var icon_image = "<img class='img img-fluid' src='data:image/"+icon_data[1]+";base64,"+pr_record.web_icon_data+"' />"
                    }
                } else{
                    var icon_image = "<img class='img img-fluid' src='/clarity_backend_theme_bits/static/img/logo.png' />"
                }
                elem.find('.app_icon').append($(icon_image))
            }
          });
      })
    },
    BackMenuToggle(ev){  
        $(ev.currentTarget).parent().removeClass('show');
    },
    get currentMenuId() {
        var actionParams = window.location.hash;
        var menu_id = new URLSearchParams(actionParams.substring(1)).get('menu_id');
        return menu_id;
    }
}); 
patch(WebClient, {
    components: { ...WebClient.components, SidebarBottom },
});

