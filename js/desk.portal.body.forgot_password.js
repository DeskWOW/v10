$(function(){
	$("#email").focus();
	$("#identity_password").focus();
	$('#form > form').validate({
		submitHandler: function(form) {
			$('#password_reset_submit').attr('disabled',true);
			$('#password_reset_submit').addClass('disabled');
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
		errorClass:'invalid'
	});
});