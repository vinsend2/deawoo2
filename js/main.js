$(function() {
/*	$(document).click(function(event) {
		if (!$(event.target).closest(".logistics-container").length) {
			$("body").find(".logistics-container").slideDown();
		}
	});*/
		$("button.toggler").on("click", function (event) {
			event.preventDefault();
			var searchbar = $(this).closest(".searchbar");
			console.log(searchbar);
			if (searchbar.hasClass("active") == true) {
				searchbar.find("form").submit();
			}
			searchbar.toggleClass("active");
		});
		$('.search_input').keypress(function (e) {
			if (e.which == 13) {
				$('.searchbar form').submit();
			}
		});
		$("button.close").on("click", function (event) {
			event.preventDefault();
			$(this).closest(".searchbar").removeClass("active");
		});

	$('input[name^="product_id"]').on('change', function (){
		rowParent = $(this).parent().parent();
		rowParent.toggleClass('active', $(this).prop("checked"));
		//checkBox.prop("checked", !checkBox.prop("checked"));

		var allCheckBoxes = $('input[name^="product_id"]:checked').length;

		var submitButton = $('.add-reserve');
		submitButton.prop("disabled", !allCheckBoxes);
	});

	$('.add-reserve').click(function() {
		event.preventDefault();
		$('#reservation-confirm').modal({show: true});
		// if (confirm("Подтвердить запрос на резервирование?")) {
			// $('#send-reserve').submit();
		// }
	});
	$('.add-response').click(function(event) {
		event.preventDefault();
		if (confirm("Подтвердить отправку запроса?")) {
			$('#send-reserve').submit();
		}
	});
	$(document).on('submit', '#send-modal-form', function(event) {
		event.preventDefault();
		var inn = $('#send-modal-form').find('#modal_inn');
		var error = validate(inn);
		if (error != 1) {
			var send_reserve = $('#send-reserve');
			send_reserve.find('input[name="inn"]').val(inn.val());
			send_reserve.submit();
		}
	});
/*	$(document).on('submit', '#send-customer', function(event) {
		event.preventDefault();
		var $inputs = $('.required', this);
		var error = validate($inputs, $(this));
		if (error != 1) {
			var send_customer = $('#send-customer');
			send_customer.submit();
		}
	});*/
	$('#flink').click(function(event) {
		if ($(window).width() < 520) {
			event.preventDefault();
		}
	});

	$('.next-item').click(function(){
		var $next = $('.additional-images .active').next();
		if ($next.length) {
			var $csrc = $next.find('.add_prd_img').data('image');
			$next.addClass('active').siblings().removeClass('active');
			$('.flink>img').attr('src', '/thumb/mid/' + $csrc + '.jpg');
			$('.flink').attr('href', '/thumb/big/' + $csrc + '.jpg');
		}
	});
/*	$('.with-childs').click(function(){
		$(this).toggleClass('opened');
		$(this).next().slideToggle();
	});*/

	$('.filter-toggle-button').click(function(){
		$(this).parent().toggleClass('opened');
		$(this).next().slideToggle();
	});

	$('.service_order').click(function(){
		var service_id = $(this).data('service');
		$('.work_detail_' + service_id).toggle();
		console.log(service_id);
	});

	if ( $( ".carousel-items" ).length ) {
		$('.carousel-items').slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			responsive: [
				{
				  breakpoint: 1024,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
				  }
				},
				{
				  breakpoint: 600,
				  settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				  }
				},
				{
				  breakpoint: 480,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				}
			]
		});
	}




	


	$('.prev-item').click(function(){
		var $prev = $('.additional-images .active').prev();
		if ($prev.length) {
			var $csrc = $prev.find('.add_prd_img').data('image');
			$prev.addClass('active').siblings().removeClass('active');
			$('.flink>img').attr('src', '/thumb/mid/' + $csrc + '.jpg');
			$('.flink').attr('href', '/thumb/big/' + $csrc + '.jpg');
		}
	});

	if ( $( ".scroll-to" ).length ) {
		$(".scroll-to").click(function (){
			$('html, body').animate({
				scrollTop: $("." + $(this).data("target")).offset().top - 50
			}, 100);
		});
	}

	$('.small-image').click(function() {
		var $csrc = $(this).find('.add_prd_img').data('image');
		$('.flink>img').attr('src', '/thumb/mid/' + $csrc + '.jpg');
		$('.flink').attr('href', '/thumb/big/' + $csrc + '.jpg');
	});

	$('.navbar-header .src-btn').click(function(){
		$(".search-container").slideToggle( "fast", function() {
			// Animation complete.
		});
	});

	$('.show-hidden-items').click(function(event){
		event.preventDefault();
		$('.hidden-item').slideToggle("fast");
		console.log();
	});

	$(".change-active").on("click", function (event) {
		$(this).addClass('active').siblings().removeClass('active')	;
	});

	$('input.color-input').on('change', function() {
		$(this).closest('label').toggleClass('active');
	});

//	if ( $( ".product-container" ).length ) {
//		$('.product-container').matchHeight();
//	}

	$('.flink').click(function(event){
		event.preventDefault();
		if ($(window).width() > 520) {
			$('.modal-body').empty();
			$('<img id="big_f" class="img-fluid" src="' + $(this).attr("href") + '">').appendTo('.modal-body');
			$('#fotoModal').modal({show: true});
		}
	});

	if ( $('.phone-mask').length ) {
		$('.phone-mask').mask('+0 (000) 000-00-00', {placeholder: "+_ (___) ___-__-__"});
	}
	$('.call-back').click(function(event){
		event.preventDefault();
		$('#call-back-modal').modal({show: true});
	});

	$('a.logistics-open').click(function(event){
		$(this).next().fadeToggle().focus();
		event.stopPropagation();
	});

	$('.logistics-container').on('focusout', function () {
		$(this).fadeOut();
	});

	$('.property').click(function(){
		$('p.price .amount').html($(this).data('price'));
		var	$button = $('#order');
		if ($button.length) {
			$button.removeClass('go-cart');
			$button.html('Добавить в корзину');
		}
	});
	
	$('.send-message').click(function(event){
		event.preventDefault();
		$('#send-message-modal').modal({show: true});
	});

	$(document).on('click', '.go-cart', function(event) {
		event.preventDefault();
		window.location.href = "/catalog/cart";
	});

	 $('[data-toggle="popover"]').popover();

/*	$(document).on('click', '.add-to-cart', function(event) {
		event.preventDefault();
		addButton = $('#order');
		$.ajax({
			type: "POST",
			url: "/parts/add_to_cart" + "?product=" + $(this).data('productId'),
			dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				//console.log(data);
				addButton.addClass('go-cart');
				addButton.html('Перейти в корзину');
				addButton.removeClass("add-to-cart");
				$(".cart-count").addClass("not-empty");
				$('.cart-count').html(data.count);
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				console.log(jqXHR);console.log(textStatus);console.log(errorThrown);
			}
		});
	});*/

	$('.add-to-cart').click(function(event ) {
		event.preventDefault();
		if($(this).hasClass("added") == false)
		{
			$(this).addClass("added");
			$(this).attr("title", "Товар добавлен в корзину");
			$.ajax({
				type: "POST",
				url: "/parts/add_to_cart/" + $(this).val(),
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					console.log(data);
					$(".cart-count").addClass("not-empty");
					$('.cart-count').html(data.count);
				},
				error: function(jqXHR, textStatus, errorThrown)
				{
					console.log(jqXHR);console.log(textStatus);console.log(errorThrown);
				}
			});
		}
		if ($('.delete-item-favorite').length) {
			$(this).parent().parent().parent().find('.delete-item-favorite').click();
		}
	});

	$( 'form[name="login"]' ).bind( "submit", handler_recaptcha );
	$( 'form[name="send-customer"]' ).bind( "submit", handler_recaptcha );

	$(document).on('submit', 'form[name="order"]', function(event) {
		var $inputs = $('.required', this);
		var error = validate($inputs, $(this));
		event.preventDefault();
		f_data = $(this).serialize();
		if (error != 1) {
			// $('fieldset', this).attr("disabled", true);
			$('button', this).html('Отправка...');
			$(this).addClass('loading');
			$.ajax({
				type: "POST",
				url: "/catalog/send_order/",
				data:  f_data,
				contentType: false,
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					$('#order-modal .modal-body').html(data);
				}
			});
			// grecaptcha.execute();
		}
	});
	
	$(document).on('change', '.required', function() {
		$(this).removeClass('is-invalid');
		$(this).next().html('');
	});
});

function validate(inputs) {
	var error = 0;
	var	message = 0;
	inputs.each(function() {
		message = 0;
		if ($(this).data('inputGroup')) {
			if( !$('input[name=' + $(this).data('inputGroup') + ']:checked', this).val() ) {
				$(this).addClass('is-invalid');
				$(this).next('.form-text').addClass('error-message').html($(this).data('errorMsg'));
				error = 1;
			}
		} else {
			console.log($(this).attr("id") + ' = ' + $(this).val() + ';len = ' + $(this).val().length);
			if (!$(this).val()) {
				error = 1;
				message = 1;
			} else {
				if ($(this).data('inputType') == 'inn') {
					if ((($(this).val().length != 10) && ($(this).val().length != 12))
						|| !$.isNumeric($(this).val())) {
						error = 1;
						message = 1;
					}
				}
				if ($(this).data('inputType') == 'phone') {
					if ($(this).val().length != 18) {
						error = 1;
						message = 1;
					}
				}
				if ($(this).data('inputType') == 'vehicle-types') {
					if ($(this).val() == 0) {
						error = 1;
						message = 1;
					}
				}
			}

			if (message) {
				$(this).addClass('is-invalid');
				$(this).next().addClass('error-message').html($(this).data('errorMsg'));
			}
		}
	});
	return error;
}

function validate_int(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]/;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

if ( $( "#go-top" ).length ) {
	window.onscroll = function() {scrollFunction()};
}
function scrollFunction() {
	if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
		document.getElementById("go-top").style.display = "block";
	} else {
		document.getElementById("go-top").style.display = "none";
	}
}

var handler_recaptcha = function(event) {
	var $inputs = $('.required:not(:disabled)', this);
	var error = validate($inputs, $(this));
	event.preventDefault();
	if (error != 1) {
		grecaptcha.execute('6LcpNbYUAAAAAFVFa88hHJjpCn9_y9V_CeFnaN0o', {action: 'homepage'}).then(function(token) {
			$('.r_token').val(token);
			$('form.recaptcha-form').unbind( "submit", handler_recaptcha ).submit();
		});
	}
};

var YourOnSubmitFn = function(token) {
	$('form.recaptcha-form').unbind( "submit", handler_recaptcha ).submit();
};

var __slice = [].slice;

			(function($, window) {
				var Starrr;

				Starrr = (function() {
					Starrr.prototype.defaults = {
						rating: void 0,
						numStars: 5,
						change: function(e, value) {}
					};

					function Starrr($el, options) {
						var i, _, _ref,
							_this = this;

						this.options = $.extend({}, this.defaults, options);
						this.$el = $el;
						_ref = this.defaults;
						for (i in _ref) {
							_ = _ref[i];
							if (this.$el.data(i) != null) {
								this.options[i] = this.$el.data(i);
							}
						}
						this.createStars();
						this.syncRating();
						this.$el.on('mouseover.starrr', 'span', function(e) {
							if($('#star-rating').val()=='') {
								switch ($(this).attr('id')) {
									case 'star1':
										$('.text-rating').html('Ужасно');
										break;
									case 'star2':
										$('.text-rating').html('Плохо');
										break;
									case 'star3':
										$('.text-rating').html('Приемлемо');
										break;
									case 'star4':
										$('.text-rating').html('Хорошо');
										break;
									case 'star5':
										$('.text-rating').html('Отлично');
										break;
								}
							}

							return _this.syncRating(_this.$el.find('span').index(e.currentTarget) + 1);
						});
						this.$el.on('mouseout.starrr', function() {
							if($('#star-rating').val()=='') $('.text-rating').html('');
							return _this.syncRating();
						});
						this.$el.on('click.starrr', 'span', function(e) {
							switch ($(this).attr('id')){
								case 'star1':
									$('.text-rating').html('Ужасно');
									break;
								case 'star2':
									$('.text-rating').html('Плохо');
									break;
								case 'star3':
									$('.text-rating').html('Приемлемо');
									break;
								case 'star4':
									$('.text-rating').html('Хорошо');
									break;
								case 'star5':
									$('.text-rating').html('Отлично');
									break;
							}
							$(this).parent().removeClass("error");
							$(this).parent().next().next().html("");
							return _this.setRating(_this.$el.find('span').index(e.currentTarget) + 1);
						});
						this.$el.on('starrr:change', this.options.change);
					}

					Starrr.prototype.createStars = function() {
						var _i, _ref, _results;

						_results = [];
						for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
							_results.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty' id='star"+_i+"'></span>"));
						}
						return _results;
					};

					Starrr.prototype.setRating = function(rating) {
						if (this.options.rating === rating) {
							rating = void 0;
						}
						this.options.rating = rating;
						this.syncRating();
						return this.$el.trigger('starrr:change', rating);
					};

					Starrr.prototype.syncRating = function(rating) {
						var i, _i, _j, _ref;

						rating || (rating = this.options.rating);
						if (rating) {
							for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
								this.$el.find('span').eq(i).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
							}
						}
						if (rating && rating < 5) {
							for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
								this.$el.find('span').eq(i).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
							}
						}
						if (!rating) {
							return this.$el.find('span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
						}
					};

					return Starrr;

				})();
				return $.fn.extend({
					starrr: function() {
						var args, option;

						option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
						return this.each(function() {
							var data;

							data = $(this).data('star-rating');
							if (!data) {
								$(this).data('star-rating', (data = new Starrr($(this), option)));
							}
							if (typeof option === 'string') {
								return data[option].apply(data, args);
							}
						});
					}
				});
			})(window.jQuery, window);

			$(function() {
				return $(".starrr").starrr();
			});

			$( document ).ready(function() {

				$('#stars').on('starrr:change', function(e, value){
					$('#count').html(value);
					$('#star-rating').val(value);
				});

				$('#stars-existing').on('starrr:change', function(e, value){
					$('#count-existing').html(value);
				});

			});
			// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()