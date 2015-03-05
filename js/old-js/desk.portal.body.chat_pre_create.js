

jQuery(document).ready(function() {
	$('#chat_submit').click(function(){
		$(this).addClass('disabled');
	})
});

if (deskEV('number_search_results') == '0') {
    jQuery('#new_chat').submit();
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
			'required': deskEV('system.snippets.name_required')
		},
		'interaction[email]':{
			'required': deskEV('system.snippets.email_required'),
			'email': deskEV('system.snippets.invalid_email')
		},
		'chat[subject]':{
			'required': deskEV('system.snippets.question_required'),
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
		'chat[subject]':{
			'required':true,
			'maxlength':5000,
			'invalidchars':'<>'
		}
	},
	errorClass:'invalid'
});

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
			'required': deskEV('system.snippets.name_required')
		},
		'interaction[email]':{
			'required': deskEV('system.snippets.email_required'),
			'email': deskEV('system.snippets.invalid_email')
		},
		'chat[subject]':{
			'required': deskEV('system.snippets.question_required'),
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
		'chat[subject]':{
			'required':true,
			'maxlength':5000,
			'invalidchars':'<>'
		}
	},
	errorClass:'invalid'
});