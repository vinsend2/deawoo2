(function($) {
    $(document).ready(function(){
        if (window.location.hash==='#cont_area'){
            ftop=$("#cont_area_block").offset().top;
            $('html, body').animate({scrollTop: ftop-100}, 500);
        }
    });
    function proverka_conf() {
        if ($("input[name=conf_name]").val() === "") {
            alert("Введите свое имя");
            $("input[name=conf_name]").focus();
            return false;
        }
        if ($("input[name=conf_tel]").val() === "") {
            alert("Введите номер телефона");
            $("input[name=conf_tel]").focus();
            return false;
        }
        /*if ($("input[name=conf_email]").val()===""){
            alert("Введите свой E-mail");
            $("input[name=conf_email]").focus();
            return false;
        }*/
        if ($("input[name=type_auto]").val() === "") {
            alert('Не выбрали тип грузовика');
            che_tab(1);
            return false;
        }
        if ($("input[name=baza_auto]").val() === "") {
            alert('Не выбрали шасси');
            che_tab(2);
            return false;
        }
        //yaCounter55682014.reachGoal('otpravka-conf');
        return true;
    }
    $(document).ready(function() {
        $(".tabset span").click(function() {
            tt = $(this).attr("res");
            if ($("input[name=type_auto]").val() === "" && tt != "tab1") {
                alert('Не выбрали тип грузовика');
                tt = "tab1";
            }
            if ($("input[name=baza_auto]").val() === "" && tt === "tab3") {
                alert('Не выбрали шасси');
                tt = "tab2";
            }
            $(".tabset span").removeClass("active");
            $(".tab-content .tab_tab").removeClass("active");
            $(".tabset span[res=" + tt + "]").addClass("active");
            $("#" + tt).addClass("active");
        });
        $("ul.products li").click(function() {
            $("ul.products li div").removeClass("select");
            $(this).find('div').addClass("select");
            $("#class").attr("src", $(this).find('img').attr("src"));
            $("#class_text").text($(this).find(".title").text());
            $("input[name=type_auto]").val($(this).find(".title").text());
            $("#baza_auto_img").attr("src", "");
            $("#baza_auto").html("&nbsp;");
            $("input[name=baza_auto]").val("");
            li_id = $(this).attr("res");
            $.getJSON('https://daewoo-komdorauto.ru/conf.php', {
                id: li_id
            }, function(data, status) {
                if (status == 'success') {
                    $("#tab2").html(data.f_aja);
                    if (data.f_ja) eval(data.f_ja);
                    che_tab(2);
                } else {
                    alert('В процессе отправки произошла ошибка :(');
                }
            });
        });
    });


    /*$(document).ready(function() {
        $('#sel_tab select').select2();
    });*/

    $('body').on('DOMNodeInserted', 'select', function () {
        $('#sel_tab select').select2();
    });

})(jQuery);


function sbros_conf() {
    jQuery("input[name=type_auto]").val("");
    jQuery("#class").attr("src", "");
    jQuery("#class_text").html("&nbsp;");
    jQuery("#baza_auto_img").attr("src", "");
    jQuery("#baza_auto").html("&nbsp;");
    jQuery("input[name=baza_auto]").val("");
    jQuery("#tab2").empty();
    jQuery("ul.products li div").removeClass("select");
    jQuery(".tabset span").removeClass("active");
    jQuery(".tab-content .tab_tab").removeClass("active");
    jQuery(".tabset span[res=tab1]").addClass("active");
    jQuery("#tab1").addClass("active");
    //jQuery.scrollTo('.tab-area', 200);
}

function show_sel(th) {
    if (th.hasClass('active')) return;
    jQuery('#for_shassi_form').empty();
    jQuery('.inform_new_one.active').removeClass('active');
    th.addClass('active');
    jQuery("#baza_auto_img").attr("src", th.data('img'));
    jQuery("#baza_auto").html(th.data('name'));
    jQuery("input[name=baza_auto]").val(th.data('name'));
    th_sec = th.data('sec');
    th_id = th.data('id');
    $.ajax({
        url: 'https://daewoo-komdorauto.ru/conf.php',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "POST", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {
            id: th_id,
            sec_id: th_sec
        },
        success: function (data, status) {
            if (data.f_aja) {
                jQuery("#for_shassi_form").html(data.f_aja);
                ftop = jQuery("#for_shassi_form").offset().top;
                jQuery(".th_fo").show();
                //jQuery('html, body').animate({scrollTop: ftop-100}, 200);
                jQuery('#sel_tab select').select2();
            }
            if (data.f_ja) eval(data.f_ja);
        },
        error: function () {
            alert('В процессе отправки произошла ошибка :(');
        }
    });
    jQuery.getJSON('https://daewoo-komdorauto.ru/conf.php', {
        id: th_id,
        sec_id: th_sec
    }, function(data, status) {
        if (status == 'success') {
            if (data.f_aja) {
                jQuery("#for_shassi_form").html(data.f_aja);
                ftop = jQuery("#for_shassi_form").offset().top;
                jQuery(".th_fo").show();
                //jQuery('html, body').animate({scrollTop: ftop-100}, 200);
                jQuery('#sel_tab select').select2();
            }
            if (data.f_ja) eval(data.f_ja);
        } else {
            alert('В процессе отправки произошла ошибка :(');
        }
    });
}

function show_sel_th(num_n) {
    if (!num_n) num_n = 1;
    tt = jQuery('select[name=sel' + num_n + ']').val();
    tt = tt.split(": ");
    tt = tt[1];
    aa = "";
    sel = sel1;
    if (num_n == 2) sel = sel2;
    aa = sel[tt];
    jQuery(".sel" + num_n + "_text").html(aa);
}

function che_tab(num) {
    if (!num) num = 1;
    num = "tab" + num;
    jQuery(".tabset span").removeClass("active");
    jQuery(".tab-content .tab_tab").removeClass("active");
    jQuery(".tabset span[res=" + num + "]").addClass("active");
    jQuery("#" + num).addClass("active");
}