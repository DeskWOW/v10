
  $(function() {
    $('#email_subject, #email_body, #chat_subject, #qna_subject, #qna_body').on("keyup paste",function() {
        if ($('#email_subject, #email_body, #chat_subject, #qna_subject, #qna_body').val().length > 3 && $('#email_subject, #email_body, #chat_subject, #qna_subject, #qna_body').val().length <= 250) {
          clearTimeout(window.timer);
          window.timer=setTimeout(function(){ // setting the delay for each keypress
            articleSuggest();
          }, 500);
        }
      });
  });
  $(function() {
    $('#qna_kb_topic_id').on("change",function() {
          clearTimeout(window.timer);
          window.timer=setTimeout(function(){ // setting the delay for each keypress
            articleSuggest();
          }, 500);
      });
  });
  //-- MULTIBRAND ARTICLE SUGGEST
  articleSuggest = function() {
    $('#site-brands > div').each( function(i,e) {
      systemLanguageDesk = $('#system_language').html();
      resultsFound = $('#results_mobile').html();
      brandID = e.id;
      brandName = e.textContent;
      as_count = 0;
      var current_page = $('#current-page').html();
      if (current_page == 'email_new') {
        search_query = $('#email_subject').val() + ' ' + $('#email_body').val();
      }
      if (current_page == 'question_new') {
        search_query = $('#qna_subject').val() + ' ' + $('#qna_body').val() + ' ' + $("#qna_kb_topic_id option:selected").text();
      }
      if (current_page == 'chat_new') {
        search_query = $('#chat_subject').val();
      }
      $.ajax({
        url: '//' + document.domain.toString() + '/customer/' + systemLanguageDesk + '/portal/articles/autocomplete?b_id=' + brandID + '&term=' + search_query,
        brandID: brandID,
        brandName: brandName,
        dataType: 'json',
        success: function(data) {
          apiSuccess(data, this.brandID, this.brandName);
          function apiSuccess(data, brandID, brandName) {
            if (brandID != 6346 || brandID != 7112) {
              $('.autosuggest div#brand-' + brandID).remove();
              auto_suggest_content = "";
              auto_suggest = "";
              system_snippet_do_these_help = $('#system-snippets-do_these_help').text() || 'Do these help?';
              $('#common h2').html(system_snippet_do_these_help);
              $('#common h4').hide();
              as_count = 0;
              $.each(data, function() {
                var html = $(this.label);
                article_title = html.find(".article-autocomplete-subject").html();
                if(as_count == 3 ) {
                  auto_suggest += '<div class="collapse" id="collapse-' + brandID + '">';
                }
                if (this.id.indexOf("questions") !== -1) {
                    auto_suggest += '<li><a target="_blank" href="' + this.id + '" class="discussion"><i class="fa fa-question"></i><span>' + article_title + '</span></a></li>';
                } else {
                    auto_suggest += '<li><a target="_blank" href="' + this.id + '" class="article"><i class="fa fa-file-text-o"></i><span>' + article_title + '</span></a></li>';
                }
                as_count++;
              });
              if (as_count > 0) {
                if (as_count > 9) {
                  $('.autosuggest').append('<div id="brand-' + brandID + '"><h4 class="muted"><span>' + as_count + ' + </span>' + resultsFound + ' in ' + brandName + '</h4><ul class="unstyled"></ul>');
                } else {
                  $('.autosuggest').append('<div id="brand-' + brandID + '"><h4 class="muted"><span>' + as_count + ' </span>' + resultsFound + ' in ' + brandName + '</h4><ul class="unstyled"></ul>');
                }
                if (as_count > 0) {
                  $('.autosuggest div#brand-' + brandID + ' ul').append(auto_suggest);
                  if (as_count > 9) {
                    $('.autosuggest div#brand-' + brandID + ' ul div').append('<li><a class="btn btn-primary" target="_blank" href="//' + document.domain.toString() + '/customer/' + systemLanguageDesk + '/portal/articles/search?b_id=' + brandID + '&q=' + search_query + '&displayMode=BrandOnly">View All</a></li>');
                  }
                  $('.autosuggest div#brand-' + brandID + ' ul div').append('</div>');
                  if(as_count > 3) {
                    $('.autosuggest div#brand-' + brandID + ' ul').append('<button class="btn btn-primary coltrig">More</button>');
                  }
                } // IF SUGGESTIONS
                as_count = 0;
              }
            };
          } // FUNCTION API SUCCESS
        } // SUCCESS
      }); // AJAX REQUEST
    });// FOR EACH BRAND

  } // ARTICLE SUGGESTION ON KEYUP FUNCTION

$(document).ajaxComplete(function() {
    $('.coltrig').click(function() {
      $(this).prevAll('div.collapse').collapse();
      $(this).hide();
    });
});

//NO RESULTS
  apiFail = function(data) {
}
