function deskEV(v) {
      v = v.replace(/\./g, '-')
      return $('#' + v).html();
  }


$(document).ready(function() {

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
});

$('#qna_body').textarea_maxlength();
$('#new_answer').validate({
  submitHandler: function(form) {
    $('#answer_submit').attr('disabled',true);
    $('#answer_submit').addClass('disabled');
    form.submit();
  },
  messages:{
    'interaction[name]':{
      'required': deskEV('system.snippets.name_required')
    },
    'interaction[email]':{
      'required': deskEV('system.snippets.email_required'),
      'email': deskEV('system.snippets.invalid_email')
    },
    'qna[body]':{
      'required': deskEV('system.snippets.answer_required'),
      'maxlength': deskEV('system.snippets.exceeding_max_chars')
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
    'qna[body]':{
      'required':true,
      'maxlength':5000
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