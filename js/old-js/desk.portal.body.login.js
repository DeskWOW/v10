$(function(){
  $("#auth_key").focus();
      });

      $('#login_form').validate({
      submitHandler: function(form) {
        $('#commit').attr('disabled',true);
        $('#commit').addClass('disabled');
        form.submit();
      },
      messages:{
        'auth_key':{
          'required':$("#system-snippets-email_required").html(),
          'email':$("#system-snippets-invalid_email").html()
        },
        'password':{
          'required':$("#system-snippets-password_required").html()
        }
      },
      rules:{
        'password':{
          'required':true
        },
        'auth_key':{
          'required':true,
          'email':true
        }
      },
      highlight: function (element) {
          $(element).closest('.field').removeClass('has-success').addClass('has-error');
          $('label:empty').remove();
      },
      success: function (element) {
          $(element).closest('.field').removeClass('has-error').addClass('has-success');
          $('label:empty').remove();
    }
});