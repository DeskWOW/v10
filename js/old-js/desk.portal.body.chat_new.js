 $(function() {
  //-- Real-time auto-suggest
    $('#chat_subject').on("keyup paste",function() {
      if ($('#chat_subject').val().length > 3 && $('#chat_subject').val().length <= 250) {
        clearTimeout(window.timer);
        window.timer=setTimeout(function(){ // setting the delay for each keypress
          articleSuggest();
        }, 500);
      }
    }); 
});

//-- UPDATED AUTO SUGGEST
  articleSuggest = function() {
      as_count = 0;
      var search_query = $('#chat_subject').val();
      var systemLanguageDesk = $('#system_language').html();
      var brandID = $('#brand_id').html();
      if (brandID == "/" || brandID == "") {
        $.ajax({
          url: '//' + document.domain.toString() + '/customer/' + systemLanguageDesk + '/portal/articles/autocomplete?term=' + search_query,
          dataType: 'json'
        }).done(apiSuccess).fail(apiFail);
      } else {
        $.ajax({
          url: '//' + document.domain.toString() + '/customer/' + systemLanguageDesk + '/portal/articles/autocomplete?term=' + search_query + '&b_id=' + brandID,
          dataType: 'json'
        }).done(apiSuccess).fail(apiFail);
      }
  };
  
  apiSuccess = function(data) {
      auto_suggest_content = "";
      auto_suggest_articles = "";
      auto_suggest_questions = "";
      var system_snippet_do_these_help = $('#system-snippets-do_these_help').text() || 'Do these help?';
      $('.autosuggest').html('<h2 class="muted">' + system_snippet_do_these_help + '</h4><ul class="unstyled"></ul>');
      $.each(data, function() {
        var html = $(this.label);
        article_title = html.find(".article-autocomplete-subject").html();
        if (this.id.indexOf("questions") !== -1) {
            auto_suggest_questions += '<li><a target="_blank" href="' + this.id + '" class="discussion"><span>' + article_title + '</span><i class="fa fa-angle-right"></i></a></li>';
        } else {
            auto_suggest_articles += '<li><a target="_blank" href="' + this.id + '" class="article"><span>' + article_title + '</span><i class="fa fa-angle-right"></i></a></li>';
        }
        as_count++;
      });
      if (as_count > 0) {
        $('.autosuggest ul').append(auto_suggest_articles + auto_suggest_questions);
        $("#common").hide();
        $(".autosuggest").removeClass('hide');
      } else {
        $(".autosuggest").addClass('hide');
        $("#common").show();
      }
  };
  
  apiFail = function(data) {
      
  };

//-- NEW CHAT VALIDATION
$(document).ready(function () {
  // Usage: deskEV('system.snippets.loading')
    function deskEV(v) {
        v = v.replace(/\./g, '-')
        return $('#' + v).html();
    }
    $('#chat_subject').textarea_maxlength();
    $('#new_chat').validate({
      submitHandler: function(form) {
        $('#chat_submit').attr('disabled',true);
        $('#chat_submit').addClass('disabled');
        $('#chat_submit_spinner').show();
        form.submit();
      },
      messages:{
        'interaction[name]':{
          'required':deskEV('system-snippets-name_required')
        },
        'interaction[email]':{
          'required':deskEV('system-snippets-email_required'),
          'email':deskEV('system-snippets-invalid_email')
        },
        'chat[subject]':{
          'required':deskEV('system-snippets-question_required'),
          'maxlength':deskEV('system-snippets-exceeding_max_chars')
        }
      },
      rules:{
        'interaction[name]':{
          'required':true
        },
        'interaction[email]':{
          'required':true,
          'email':true
        },
        'chat[subject]':{
          'required':true,
          'maxlength':5000,
          'invalidchars':'<>'
        }
      },
      highlight: function (element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            $('label:empty').remove();
        },
        success: function (element) {
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
            $('label:empty').remove();
        }
    });
});