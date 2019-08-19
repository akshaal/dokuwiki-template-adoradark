/**
 *  We handle several device classes based on browser width.
 *
 *  - desktop:   > __tablet_width__ (as set in style.ini)
 *  - mobile:
 *    - tablet   <= __tablet_width__
 *    - phone    <= __phone_width__
 */
var device_class = ''; // not yet known
var device_classes = 'desktop mobile tablet phone';

function tpl_dokuwiki_mobile(){

    // the z-index in mobile.css is (mis-)used purely for detecting the screen mode here
    var screen_mode = jQuery('#screen__mode').css('z-index') + '';

    // determine our device pattern
    // TODO: consider moving into dokuwiki core
    switch (screen_mode) {
    case '1':
        if (device_class.match(/tablet/)) return;
        device_class = 'mobile tablet';
        break;
    case '2':
        if (device_class.match(/phone/)) return;
        device_class = 'mobile phone';
        break;
    default:
        if (device_class == 'desktop') return;
        device_class = 'desktop';
    }

    jQuery('html').removeClass(device_classes).addClass(device_class);

    // handle some layout changes based on change in device
    var $handle = jQuery('#dokuwiki__aside h3.toggle');
    var $toc = jQuery('#dw__toc h3');

    if (device_class == 'desktop') {
        // reset for desktop mode
        if($handle.length) {
            $handle[0].setState(1);
            $handle.hide();
        }
        if($toc.length) {
            $toc[0].setState(1);
        }
    }
    if (device_class.match(/mobile/)){
        // toc and sidebar hiding
        if($handle.length) {
            $handle.show();
            $handle[0].setState(-1);
        }
        if($toc.length) {
            $toc[0].setState(-1);
        }
    }
}

jQuery(function(){
    var resizeTimer;
    dw_page.makeToggle('#dokuwiki__aside h3.toggle','#dokuwiki__aside div.content');

    tpl_dokuwiki_mobile();
    jQuery(window).on('resize',
                      function(){
                          if (resizeTimer) clearTimeout(resizeTimer);
                          resizeTimer = setTimeout(tpl_dokuwiki_mobile,200);
                      }
                     );

    // increase sidebar length to match content (desktop mode only)
    var $sidebar = jQuery('.desktop #dokuwiki__aside');
    if($sidebar.length) {
        var $content = jQuery('#dokuwiki__content div.page');
        $content.css('min-height', $sidebar.height());
    }
});

/**
 * Tweaked copypaste from https://github.com/LotarProject/dokuwiki-template-bootstrap3/
 * Replace all OOTB DokuWiki toolbar icon with Material Design Icons
 */
if (typeof window.toolbar !== 'undefined') {
    var original_toolbar = window.toolbar;
    var new_toolbar = new Array();

    var icons = {
        'bold.png'       : 'format-bold.svg',
        'chars.png'      : 'omega.svg',
        'h.png'          : 'format-header-pound.svg',
        'h1.png'         : 'format-header-1.svg',
        'hequal.png'     : 'format-header-equal.svg',
        'hminus.png'     : 'format-header-decrease.svg',
        'hplus.png'      : 'format-header-increase.svg',
        'hr.png'         : 'minus.svg', // ??
        'image.png'      : 'image.svg',
        'italic.png'     : 'format-italic.svg',
        'link.png'       : 'link.svg',
        'linkextern.png' : 'link-variant.svg', // ??
        'mono.png'       : 'format-title.svg',
        'ol.png'         : 'format-list-numbered.svg',
        'sig.png'        : 'signature.svg',
        'smiley.png'     : 'emoticon-outline.svg',
        'strike.png'     : 'format-strikethrough.svg',
        'ul.png'         : 'format-list-bulleted.svg',
        'underline.png'  : 'format-underline.svg',
        '../../plugins/edittable/images/add_table.png' : 'table-plus.svg',
    };

    for (i in window.toolbar) {
        // Replace all icons in "H(eaders)" picker
        if (window.toolbar[i].icon == 'h.png') {
            for (x in window.toolbar[i].list) {
                var hn = parseInt(x) + 1;
                window.toolbar[i].list[x].icon = '../../tpl/adoradark/assets/mdi/svg/format-header-' + hn + '.svg';
            }
        }

        for (icon in icons) {
            if (window.toolbar[i].icon == icon) {
                window.toolbar[i].icon = '../../tpl/adoradark/assets/mdi/svg/' + icons[icon];
            }
        }
    }
}
