// Usage: deskEV('system.snippets.loading')
function deskEV(v) {
    v = v.replace(/\./g, '-');
    return $('#' + v).html();
}

/*! jQuery Placeholder Plugin - v0.7.0 - 2012-12-03
* http://andrew-jones.com/jquery-placeholder-plugin
* Copyright (c) 2012 Andrew Jones; Licensed MIT */
(function(a){"use strict",a.extend({placeholder:{settings:{focusClass:"placeholderFocus",activeClass:"placeholder",overrideSupport:!1,preventRefreshIssues:!0}}}),a.support.placeholder="placeholder"in document.createElement("input"),a.fn.plVal=a.fn.val,a.fn.val=function(b){if(typeof b=="undefined")return a.fn.plVal.call(this);var c=a(this[0]),d=c.plVal(),e=a(this).plVal(b);return c.hasClass(a.placeholder.settings.activeClass)&&d===c.attr("placeholder")?(c.removeClass(a.placeholder.settings.activeClass),e):c.hasClass(a.placeholder.settings.activeClass)&&c.plVal()===c.attr("placeholder")?"":a.fn.plVal.call(this,b)},a(window).bind("beforeunload.placeholder",function(){var b=a("input."+a.placeholder.settings.activeClass);b.length>0&&b.val("").attr("autocomplete","off")}),a.fn.placeholder=function(b){return b=a.extend({},a.placeholder.settings,b),!b.overrideSupport&&a.support.placeholder?this:this.each(function(){var c=a(this);if(!c.is("[placeholder]"))return;if(c.is(":password"))return;b.preventRefreshIssues&&c.attr("autocomplete","off"),c.bind("focus.placeholder",function(){var c=a(this);this.value===c.attr("placeholder")&&c.hasClass(b.activeClass)&&c.val("").removeClass(b.activeClass).addClass(b.focusClass)}),c.bind("blur.placeholder",function(){var c=a(this);c.removeClass(b.focusClass),this.value===""&&c.val(c.attr("placeholder")).addClass(b.activeClass)}),c.triggerHandler("blur"),c.parents("form").submit(function(){c.triggerHandler("focus.placeholder")})})}})(jQuery);


jQuery(document).ready(function() {














  //FORM PLACEHOLDERS

  //MOVE CAPTCHA ABOVE SUBMIT BUTTON

  //PAGINATION > BOOTSTRAP SUPPORT













  // FOR BACK BUTTON LINKS (previously <a href="/" onclick="history.back(); return false;"> )
  // found in the question_pre_create, email_pre_create, chat_pre_create





  //MOBILE RELEATED --------------------- >










}); //END JQUERY ONLOAD




//SNIPPETS LOADING
if (deskEV('enable_gs') == 'true') { // XXX Ask Kevin if 'true' is correct string
  gsStringTable['generic_error'] = deskEV('system.snippets.get_satisfaction_error');
  gsStringTable['view_all'] = deskEV('system.snippets.view_all');
  gsStringTable['search_header_no_results'] = deskEV('system.snippets.no_related_discussions');
  gsStringTable['search_header_with_results'] = deskEV('system.snippets.related_discussions')+" {0} "+deskEV('system.snippets.discussions');
  gsStringTable['generic_results_subheader'] = "{0} "+deskEV('system.snippets.discussions');
  gsStringTable['generic_replies'] = "{0} "+deskEV('system.snippets.replies');
  gsStringTable['questions_header'] = deskEV('system.snippets.questions');
  gsStringTable['ideas_header'] = deskEV('system.snippets.ideas');
  gsStringTable['problems_header'] = deskEV('system.snippets.problems');
  gsStringTable['praises_header'] = deskEV('system.snippets.praise');
  getCompanyId(); //Get Satisfaction Company ID
}

//TWITTER... Isn't this broken due to their new API?
jQuery(document).ready(function() {
  if (deskEV('twitter_enabled') == 'true') {
    jQuery('#tweets').tweet({
      join_text: 'auto',
      auto_join_text_default: '',
      auto_join_text_reply: '',
      username: deskEV('twitter_username'),
      avatar_size: 24,
      count: 3,
      loading_text: deskEV('system.snippets.loading')+'...',
      time_text_seconds_ago: $("#system-snippets-seconds_ago").html(),
      time_text_a_minute_ago: $('#system-snippets-a_minute_ago').html(),
      time_text_minutes_ago: $('#system-snippets-minutes_ago').html(),
      time_text_an_hour_ago: $('#system-snippets-an_hour_ago').html(),
      time_text_hours_ago: $('#system-snippets-hours_ago').html(),
      time_text_a_day_ago: $('#system-snippets-a_day_ago').html(),
      time_text_days_ago: $('#system-snippets-days_ago').html(),
      time_text_about: $('#system-snippets-about').html()
    });
  }
});
