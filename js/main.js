$(document).ready(function () {

	var pc = $('.page-content');
	page('/', function (ctx, next) {
		pc.load('/dist/pages/home.html', function (response, status, jqXHR) {
			if (status == 'error') {
				pc.load('/dist/pages/404.html');
			}
			$("html, body").scrollTop(0);
		});
	});

	page('/home', function (ctx, next) {
		pc.load('/dist/pages/home.html', function (response, status, jqXHR) {
			if (status == 'error') {
				pc.load('/dist/pages/404.html');
			}
			$("html, body").scrollTop(0);
		});
	});

	page('/:level1', function (ctx, next) {
		pc.load('/dist/pages/' + ctx.params.level1 + '.html', function (response, status, jqXHR) {
			if (status == "error") {
				pc.load('/dist/pages/404.html');
			}

			$("html, body").scrollTop(0);
		});
	});

	page('/:level1/:level2', function (ctx, next) {
		pc.load('/dist/pages/' + ctx.params.level1 + '/' + ctx.params.level2 + '.html', function (responseText, textStatus, jqXHR) {
			if (textStatus == "error") {
				pc.load('/dist/pages/404.html');
			}

			$("html, body").scrollTop(0);
		});
	});

	page('*', function () {
		pc.load('/dist/pages/404.html', function (responseText, textStatus, jqXHR) {
			if (textStatus == "error") {
				pc.load('/dist/pages/404.html');
			}
			$("html, body").scrollTop(0);
			$(".footer").hide();

		});
	});

	page({
		hashbang: true
	});

	/*
	 *   Closes the Responsive Menu on Menu Item Click
	 */
	$('.navbar-collapse ul .single-menu a').click(function () {
		$('.navbar-toggle:visible').click();
	});

	$('.navbar-collapse .dropdown-menu li a').click(function () {
		$('.navbar-toggle:visible').click();
	});

	$(".navbar-toggle").on("click", function () {
		$(this).toggleClass("active");
	});

	/* Scroll up button */
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.scroll-up').fadeIn();
		} else {
			$('.scroll-up').fadeOut();
		}
	});
	$('.scroll-up').on("click", function () {
		$("html, body").animate({
			scrollTop: 0
		}, 1000);
		return false;
	});

	/*
	 *   Active link
	 */

	$('.nav li').on('click', function (e) {
		$('.nav li').removeClass('active');

		var $this = $(this);
		if (!$this.hasClass('active')) {
			$this.addClass('active');
		}
		//e.preventDefault();
	});

});