<?php
/**
 * Template header, included in the main and detail files
 */

// must be run from within DokuWiki
if (!defined('DOKU_INC')) die();
?>

<!-- ********** HEADER ********** -->
<div id="dokuwiki__header" style="padding-bottom: 0; padding-top: 0"><div class="pad group">
    <?php tpl_includeFile('header.html') ?>

    <div class="tools group" style="white-space: nowrap; width: 100%; display: flex; margin-bottom: 4px;">
        <?php tpl_searchform(); ?>

        <div id="dokuwiki__usertools" style="position: static;">
            <div style="display: flex; flex-wrap: wrap;">
                <?php
                    tpl_toolsevent('sitetools', array(
                        tpl_action('recent', true, 'li', true),
                        tpl_action('media', true, 'li', true),
                        tpl_action('index', true, 'li', true)
                    ));
                ?>

                <?php if ($conf['useacl']): ?>
                    <?php
                        if (!empty($_SERVER['REMOTE_USER'])) {
                            echo '<li class="user">';
                            tpl_userinfo(); /* 'Logged in as ...' */
                            echo '</li>';
                        }
                        tpl_toolsevent('usertools', array(
                            tpl_action('admin', true, 'li', true),
                            tpl_action('profile', true, 'li', true),
                            tpl_action('register', true, 'li', true),
                            tpl_action('login', true, 'li', true)
                        ));
                    ?>
                <?php endif ?>
            </div>
        </div>

        <div class="mobileTools">
            <?php tpl_actiondropdown($lang['tools']); ?>
        </div>
    </div>

    <!-- BREADCRUMBS -->
    <?php if($conf['breadcrumbs'] || $conf['youarehere']): ?>
        <div class="breadcrumbs">
            <?php if($conf['youarehere']): ?>
                <div class="youarehere"><?php tpl_youarehere() ?></div>
            <?php endif ?>
            <?php if($conf['breadcrumbs']): ?>
                <div class="trace"><?php tpl_breadcrumbs() ?></div>
            <?php endif ?>
        </div>
    <?php endif ?>

    <hr class="a11y" />
</div></div><!-- /header -->
