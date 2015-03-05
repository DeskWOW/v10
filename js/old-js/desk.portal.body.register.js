$('#form form').validate({
    submitHandler: function(form) {
      $('#registration_submit').attr('disabled',true);
      $('#registration_submit').addClass('disabled');
      form.submit();
    },
    rules:{
      'email':{
        'required':true,
        'email':true
      }
    },
    messages:{
      'email':{
        'required':$("#system-snippets-email_required").html(),
        'email':$("#system-snippets-invalid_email").html()
      }
    },
    highlight: function (element) {
        $(element).closest('div.field').removeClass('has-success').addClass('has-error');
        $('label:empty').remove();
    },
    success: function (element) {
        $(element).closest('div.field').removeClass('has-error').addClass('has-success');
        $('label:empty').remove();
    }
});