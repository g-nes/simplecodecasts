$(document).ready(function(){
	Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
	//Watch for a form submission
	$("#form-submit-btn").click(function(event) {
		event.preventDefault();
		$('input[type=submit]').prop('disabled', true);
		var error = false;
		var ccNum = $('#card_number').val(),
		var cvcNum = $('#card_code').val(),
		expMonth = $('#card_month').val(),
		expYear = $('#card_year').val();

	if (!error){
		// Get the Stripe token:
		Stript.createToken({
			number: ccNum,
			cvc: cvcNum,
			exp_month: expMonth,
			exp_year: expYear
		}, stripeResponseHandler);
	}
	return false;
	}); //form submission
	
	function stripeResponseHandler( status, response) {
		// Get a reference to the form:
		var f = $("#new_user");

		// Get the token from the repsonse
		var token = response.id;

		// Add the token to the form:
		f.append ('<input type="hidden" name="user[stripe_card_token]" value="' + token + '"/>');

		//submtin the the form:
		f.get(0).submit();
	}

});