
function deskEV(v) {
    v = v.replace(/\./g, '-')
    return $('#' + v).html();
}

jQuery(document).ready(function() {
	$('#email_submit').click(function(){
		$(this).addClass('disabled');
	})
});

if (deskEV('number_search_results') == '0') {
    jQuery('#new_email').submit();
}

$("#modal-screen").css({
	"opacity":"0.7"
});
if($.browser.msie && $.browser.version < 7) {
	$("#modal-screen").css({
		"width": $(window).width() + "px",
		"height": $(window).height() + "px"
	});
}
$('#email_body').textarea_maxlength();
$('#new_email').validate({
	submitHandler: function(form) {
		$('#email_submit').prop('disabled',true);
		$('#email_submit').addClass('disabled');
		$('#email_submit_spinner').show();
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
		'email[subject]':{
			'required':$("#system-snippets-subject_required").html()
		},
		'email[body]':{
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
		'email[subject]':{
			'required':true,
			'invalidchars':'<>'
		},
		'email[body]':{
			'required':true,
			'maxlength':5000,
			'invalidchars':'<>'
		}
	},
	errorClass:'invalid'
});


