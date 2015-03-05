$(document).ready(function() { $("#new_email").focus(); });

$('#new_customer_contact_email').validate({
	submitHandler: function(form) {
		$('#add_email').prop('disabled',true);
		$('#add_email').addClass('disabled');
		$('#new_customer_contact_email_submit_spinner').show();
		form.submit();
	},
	messages:{
		'customer_contact_email[email]':{
			'required':$("#system-snippets-invalid_email").html(),
			'email':$("#system-snippets-invalid_email").html()
		}
	},
	rules:{
		'customer_contact_email[email]':{
			'required':true,
			'email':true
		}
	},
	errorPlacement: function(error, element) {
		error.insertAfter('button');
	},
	errorClass:'invalid'
});