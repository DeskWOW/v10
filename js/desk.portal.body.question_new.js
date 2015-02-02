
  $(function() {
    // Skip pre-create
    $('#new_email').attr('action','/customer/portal/emails');
    
    //-- Real-time auto-suggest
    $('#qna_subject, #qna_body').on("keyup paste",function() {
      if ($('#qna_subject').val().length > 2 || $('#qna_body').val().length > 2) {
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
    var search_query = $('#qna_subject').val() + " " + $('#qna_body').val();
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

  $('#qna_body').textarea_maxlength();
  $('#new_question').validate({
    submitHandler: function(form) {
      $('#question_submit').attr('disabled',true);
      $('#question_submit').addClass('disabled');
      $('#question_submit_spinner').show();
      form.submit();
    },
    messages:{
      'interaction[name]':{
        'required':$("#system-snippets-name_required").html()
      },
      'interaction[email]':{
        'required':$("#system-snippets-email_required").html(),
        'email':$("#system-snippets-invalid_email").html()
      },
      'qna[subject]':{
        'required':$("#system-snippets-subject_required").html()
      },
      'qna[body]':{
        'required':$("#system-snippets-question_required").html(),
        'maxlength':$("#system-snippets-exceeding_max_chars").html()
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
      'qna[subject]':{
        'required':true,
        'invalidchars':'<>'
      },
      'qna[body]':{
        'required':true,
        'maxlength':5000,
        'invalidchars':''
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

  if ($("#qna-kb_topic_id").text() != ''){
      $('#qna_kb_topic_id').val($("#qna-kb_topic_id").text());
  }
