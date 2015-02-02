$(function(){
	$("#new_email").focus();
	$('#new_customer_contact_email').validate({
		submitHandler: function(form) {

			if(!check_duplicate())
			{
				$("label.invalid").remove();
				$("<label class=\"invalid\" for=\"new_email\" generated=\"true\">" + $("#system-snippets-duplicate_email").html() + "</label>").insertAfter("#add_email");
				return false
			} 

			$('button').attr('disabled',true);
			$('button').addClass('disabled');
			form.submit();
		},
		rules:{
			'customer_contact_email[email]':{
				'required':true,
				'email':true
			}
		},
		messages:{
			'customer_contact_email[email]':{
				'required':$("#system-snippets-email_required").html(),
				'email':$("#system-snippets-invalid_email").html()
			}
		},
		errorPlacement: function(error, element) {
			error.insertAfter('button');
		},
		errorClass:'invalid'
	});
});

function check_duplicate() {
	var return_val = true;
	$(".email_address").each(function(index) {
		if($(this).text() == $("#new_email").val()) {
			return_val = false;
		}
	});
	return return_val;
}

jQuery(document).ready(function() {
  	//MY ACCOUNT PAGE TWEAKS
    $(".myaccount-form input#new_email").addClass('form-control');
    $(".myportal #add_facebook input").addClass('btn');
    $(".myportal #add_twitter input").addClass('btn');
    $(".myportal #add_facebook").appendTo('#facebookAdd');
    $(".myportal #add_twitter").appendTo('#twitterAdd');
    $('.myportal .email_delete [type^="submit"]').val("x");
    $('.myportal [id^="email_"] [alt^="Verified"]').parent().parent().addClass('confirmed');
    $('<i class="fa fa-twitter"></i>').prependTo('.myportal [id^="twitter_"]');
    $('<i class="fa fa-facebook"></i>').prependTo('.myportal [id^="facebook_"]');
    $('<i class="fa fa-envelope"></i>').prependTo('.myportal [id^="email_"]');
});