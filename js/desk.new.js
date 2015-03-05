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
    $('.onclick-go-back').click(function() {
        history.back();
    });

  //HIGHLIGHT SEARCH TERMS
  setTimeout(function(){
    function highlightSearchTerms(search_terms){
      $.each(search_terms.split(' '), function(index, value) {
        if(value.length > 3) {
          $('#content a, #content p, #PreCreate p, #PreCreate a').highlight($.trim(value), '<span class=\"highlight\">$1</span>');
          $('.container.search a, .container.search p').highlight($.trim(value), '<span class=\"highlight\">$1</span>');
        }
      });
    }
    highlightSearchTerms($('#search-term').html());
  }, 500);









    //CUSTOMER SATASTICATION HIGHLIGHT VALUE/SELECTED
    var VoteValue = $('#customer-feedback-checked-rating').val();
    $('.btn.value-' + VoteValue ).addClass('active');


  //FORM PLACEHOLDERS

  //MOVE CAPTCHA ABOVE SUBMIT BUTTON

  //PAGINATION > BOOTSTRAP SUPPORT
    $( ".pagination" ).addClass("pagination-lg");
    $( ".pagination .previous_page" ).html('<i class="fa fa-angle-double-left"></i>');
    $( ".pagination .next_page" ).html('<i class="fa fa-angle-double-right"></i>');
    $( ".pagination > a" ).wrap( "<li></li>" );
    $( ".pagination > span.disabled" ).wrap( "<li class='disabled'><a></a></li>" );
    $( ".pagination > em" ).wrap( "<li class='active'><a></a></li>" );

  //LOGIN PAGE SOCIAL BUTTON TWEAKS
    $(".alternatelogins a[href*='facebook']").prepend('<i class="fa fa-facebook fa-lg"></i> ').addClass('btn').after('<br />');
    $(".alternatelogins a[href*='twitter']").prepend('<i class="fa fa-twitter fa-lg"></i> ').addClass('btn');
    $("div.newaccount").prependTo("li.create").html();
    $("div.forgotpw").prependTo("li.reset").html();



  //FEEDBACK BUTTONS
    $(function () {
      $('.btn-radio').click(function(e) {
        $('.btn-radio').not(this).removeClass('active')
          .siblings('input').prop('checked',false)
        $(this).addClass('active')
          .siblings('input').prop('checked',true)
      });
    });






  //SOCIAL SHARE BUTTONS
    // Tweet Button
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
    // Facebook Like Button
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=190751927613851";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    // Google Plus Button
    (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();

  // FOR BACK BUTTON LINKS (previously <a href="/" onclick="history.back(); return false;"> )
  // found in the question_pre_create, email_pre_create, chat_pre_create





  //MOBILE RELEATED --------------------- >
  //MOBILE MENU TOGGLE
    $('#MobileToggle').click(function() {
        toggleNav();
    });

    //TOGGLE FUNCTION
    function toggleNav() {
      if ($('#site-wrapper').hasClass('show-nav')) {
          // CLOSE NAV
          $('#site-wrapper').removeClass('show-nav');
          $('#mobileHeader').removeClass('show-nav');
          $('#MobileToggle').removeClass('open');
      } else {
          // OPEN NAV
          $('#site-wrapper').addClass('show-nav');
          $('#mobileHeader').addClass('show-nav');
          $('#MobileToggle').addClass('open');
      }
    }

  // MOBILE MENU SEARCH SUGGESTION
    //MOBILE SEARCH SUGGEST QUE
    $('#q2').keyup(function() {
      count = 0;
      if ($('#q2').val().length > 2 ){
        query = $('#q2').val();
        $.ajax({
        url: '//' + document.domain.toString() + '/customer/portal/articles/autocomplete?term=' + query,
        dataType: 'json'
        }).done(MOBapiSuccess).fail(MOBapiFail);
      } else {
        $(".mobile-suggest").addClass('hide');
      }
    });
    //MOBILE SUGGEST RESULTS
    MOBapiSuccess = function(data) {
      auto_suggest_content = "";
      auto_suggest_articles = "";
      auto_suggest_questions = "";
      var resultsMobile = $('#results_mobile').html();
      $('.mobile-suggest').html('<ul class="results"><li class="title">' + resultsMobile + '</li></ul>');
      $.each(data, function() {
        var html = $(this.label);
        article_title = html.find(".article-autocomplete-subject").html();

        if (this.id.indexOf("questions") !== -1) {
          auto_suggest_questions += '<li><a href="' + this.id + '" class="discussion">' + article_title + '<i class="fa fa-angle-right"></i></a></li>';
        } else {
          auto_suggest_articles += '<li><a href="' + this.id + '" class="article">' + article_title + '<i class="fa fa-angle-right"></i></a></li>';
        }
        count++;
      });
      if (count > 0) {
        $('.mobile-suggest ul').append(auto_suggest_articles + auto_suggest_questions);
        $(".mobile-suggest").removeClass('hide');
      } else {
        $(".mobile-suggest").addClass('hide');
      }
    };
    //API FAILURE
    MOBapiFail = function(data) {};


  //MAIN SEARCH AUTOCOMPLETE/FORMS/VALIDATION
    //DEFAULT SEARCH / AUTOCOMPLETE
    var searchWidth = 0;
    var searchWidth = $('#search #q').outerWidth();
    if($('#q').length) {
      if ($("#q").val().length > 0) $("#question-mask").hide();
      // Default FOCUS
      $("#q").bind("autocompleteopen", function(event, ui) {
        $('.ui-autocomplete').css({'margin':'0px', 'width': searchWidth });
      });
    }


  //Do not load autocomplete if the search pacth is null - this happens if the search path is empty or
  //the containing div cannot be found (may have been removed by the client)
    if($("#site-search_autocomplete_articles_url").length>0) {
      var autocomplete_source = deskEV('site-search_autocomplete_articles_url');
      var brandID = deskEV('brand_id');
      autocomplete_source += '?';
      $("#q").autocomplete({
        delay: 200,
        minLength: 2,
        search: function(event, ui) { $("#q").autocomplete("option", "source", autocomplete_source);},
        select: function(event, ui) { $(location).attr('href', ui.item.id); },
        focus: function(event, ui) { return false; }
      });
    }
  //IF TEXT ENTERED
    if($('#q').length) {
      if ($('#q').length !== 0) {
          //Hide #question-mask if search has content
          if($('#q').val().length > 0) {
            $('#question-mask').hide();
          }
          $('#q').focus(function(){
            $('#question-mask').hide();
          });
          $('#q').blur(function(){
            if($(this).val().length === 0) $('#question-mask').show();
          });
      }
    }
    $('#question-mask').click(function() {
      $('#q').focus();
    });

    $('form').submit(function(){
        $('input[type=text]').each(function(){
          $(this).val($.trim($(this).val()))
        });
    });

  // Extra validator added to handle invalid characters
    $.validator.addMethod('invalidchars', function(value, element, param) {
      param = param.split("").join("|");
      if(param.length > 0){
        return this.optional(element) || ! new RegExp(param).test(value);
      }
      return true;
    }, deskEV('system.snippets.invalid_characters_found'));

    $("#a-content-select").change(function(event){
      var r = location.pathname.match(/\/customer(.*)\/portal(.*)/i);
      if(r && r.length>1)
        location.href = "/customer/" + $(this).val() + "/portal" + r[2] + location.search;
      else
        location.href = "/customer/" + $(this).val() + "/portal/articles" + location.search;
    });





  // READ ONLY PORTAL UI ADJUSTMENTS
    if (deskEV('read_only') == 'true') {
      $(".input-button input[type='submit']").hide();
      $("#support-side a").each(function(){
        if( $(this).attr("href").match(/emails/) ){
            if (deskEV('site.default_mailbox').length > 0) {
                var default_mailbox = "mailto:" + deskEV('site.default_mailbox');
                $(this).attr("href", default_mailbox);
            } else {
                $(this).hide();
            }
        } else {
          $(this).hide();
        }
      });
      $(".answer-rating").hide();
      $(".question #form").html("{{system.snippets.answers_unavailable}}");
      $("#rate_article").hide();
    }

  //MODERATED FUNCTIONALITY
    if ($('#system-snippets-just_moderated').text() == 'true') {
      $('h5 a').css('display', 'none');

      $("#moderation_okay_button").click(function() {
        $('h5 a').css('display', 'inline');
        $('#modal-screen').hide();
        $('#modal').hide();
      });
      $("#modal-screen").css({
        "opacity":"0.7"
      });
      if($.browser.msie && $.browser.version < 7) {
        $("#qna_kb_topic_id").css("display","none");
        $("#modal-screen").css({
          "width": $(window).width() + "px",
          "height": $(window).height() + "px"
        });
      }
    }
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
