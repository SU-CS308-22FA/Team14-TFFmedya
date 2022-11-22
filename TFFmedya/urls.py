from django.urls import re_path as url
from TFFmedya import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^team$',views.teamApi),
    url(r'^team/([0-9]+)$',views.teamApi),

    url(r'^player$',views.playerApi),
    url(r'^player/([0-9]+)$',views.playerApi),
    url(r'^userlogin$',views.userLoginApi),
    url(r'^userregister$',views.userRegisterApi),
    url(r'^userupdate$',views.userUpdateApi),
    url(r'^userdelete$',views.userDeleteApi),
    url(r'^user/([0-9]+)$',views.userRegisterApi),
    url(r'^userforgotpassword$',views.userForgotPasswordApi)]