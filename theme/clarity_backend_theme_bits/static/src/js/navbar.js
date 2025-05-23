/** @odoo-module **/

import { NavBar } from '@web/webclient/navbar/navbar';
import { useService } from '@web/core/utils/hooks';
import { patch } from "@web/core/utils/patch";
import { useEnvDebugContext } from "@web/core/debug/debug_context";

patch(NavBar.prototype, {
    setup() {
        super.setup();

        this.debugContext = useEnvDebugContext();
        this.rpc = useService('rpc');
        this.companyService = useService("company");
        this.currentCompany = this.companyService.currentCompany;
        this.menuService = useService("menu");
        this.router = useService("router");

        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    },

    toggleSidebar(ev) {
        ev.stopPropagation(); // Prevent event bubbling

        const sidebar = $('.nav-wrapper-bits');
        const button = $(ev.currentTarget);

        button.toggleClass('visible');
        sidebar.toggleClass('toggle-show');

        if (sidebar.hasClass('toggle-show')) {
            $(document).on('click', this.handleClickOutside);
        } else {
            $(document).off('click', this.handleClickOutside);
        }
    },

    handleClickOutside(ev) {
        const sidebar = $('.nav-wrapper-bits');
        const button = $('.toggle-button');
         const screenWidth = window.innerWidth;

            // Define breakpoints (adjust based on your design)
            if (screenWidth <= 768) {
                 if (!sidebar.is(ev.target) && sidebar.has(ev.target).length === 0 &&
                        !button.is(ev.target) && button.has(ev.target).length === 0) {
                        sidebar.removeClass('toggle-show');
                        button.removeClass('visible');
                        $(document).off('click', this.handleClickOutside);
        }
            } else if (screenWidth <= 1024) {
                 if (!sidebar.is(ev.target) && sidebar.has(ev.target).length === 0 &&
                    !button.is(ev.target) && button.has(ev.target).length === 0) {
                    sidebar.removeClass('toggle-show');
                    button.removeClass('visible');
                    $(document).off('click', this.handleClickOutside);
        }
            } else {
                console.log("PC/Desktop view");
                // Add specific logic for desktop
            }


    },
});
