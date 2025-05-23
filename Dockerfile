FROM odoo:17

USER root

RUN mkdir -p /etc/odoo/custom

COPY ./etc /etc/odoo

EXPOSE 8069

ENTRYPOINT ["odoo", "-c", "/etc/odoo/odoo.conf"]
