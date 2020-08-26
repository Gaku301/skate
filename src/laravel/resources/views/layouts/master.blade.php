<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>

	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="author" content="SemiColonWeb" />

	<!-- Stylesheets
	============================================= -->
	<link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700|Raleway:300,400,500,600,700|Crete+Round:400i" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="{{ asset('css/bootstrap.css') }}" type="text/css" />
	<link rel="stylesheet" href="{{ asset('style.css') }}" type="text/css" />
	<link rel="stylesheet" href="{{ asset('css/dark.css') }}" type="text/css" />
	<link rel="stylesheet" href="{{ asset('css/font-icons.css') }}" type="text/css" />
	<link rel="stylesheet" href="{{ asset('css/animate.css') }}" type="text/css" />
	<link rel="stylesheet" href="{{ asset('css/magnific-popup.css') }}" type="text/css" />

	<link rel="stylesheet" href="{{ asset('css/responsive.css') }}" type="text/css" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
  <!-- toastr -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.css">
 

	<!-- Document Title
	============================================= -->
	<title>Skaters</title>

</head>

<body class="stretched">

	<!-- Document Wrapper
	============================================= -->
	<div id="wrapper" class="clearfix">

		<!-- Header
		============================================= -->
		<header id="header" class="full-header dark transparent-header semi-transparent">

			<div id="header-wrap">

				<div class="container clearfix">

					<div id="primary-menu-trigger"><i class="icon-reorder"></i></div>

					<!-- Logo
					============================================= -->
					<div id="logo">
						<a href="{{ route('front.index') }}" class="standard-logo" data-dark-logo="{{ asset('images/logo-dark.png') }}"><img src="{{ asset('images/logo.png') }}" alt="Canvas Logo"></a>
						<a href="{{ route('front.index') }}" class="retina-logo" data-dark-logo="{{ asset('images/logo-dark@2x.png') }}"><img src="{{ asset('images/logo@2x.png') }}" alt="Canvas Logo"></a>
					</div>
					<!-- #logo end -->

					<!-- Primary Navigation
					============================================= -->
					<nav id="primary-menu">

						<ul>
							<li><a href="{{ route('skater.admin') }}"><div>管理者画面</div></a></li>
							<li><a href="{{ route('front.index') }}"><div>Top</div></a></li>
							<li><a href="#"><div>Skaters</div></a>
								<ul>
									<li><a href=""><div><i class="icon-wpforms"></i>アメリカ</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>ドイツ</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>イギリス</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>ブラジル</div></a></li>
								</ul>
							</li>
	
							<li><a href="#"><div>Skate</div></a>
								<ul>
									<li><a href=""><div><i class="icon-wpforms"></i>デッキ</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>トラック</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>ウィール</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>ベアリング</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>デッキテープ</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>ワックス</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>その他</div></a></li>
								</ul>
							</li>
							<li><a href="#"><div>Tops</div></a>
								<ul>
									<li><a href=""><div><i class="icon-wpforms"></i>トップス</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>アウター</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>パンツ</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>シューズ</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>ソックス</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>バッグ</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>帽子</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>小物 / 財布</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>時計</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>アクセサリー</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>雑貨</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>その他</div></a></li>
								</ul>
							</li>
							<li><a href="#"><div>Brands</div></a>
								<ul>
									<li><a href=""><div><i class="icon-wpforms"></i>NikeSb</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>Santa Cruz</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>Element</div></a></li>
									<li><a href=""><div><i class="icon-wpforms"></i>Almost</div></a></li>
								</ul>
							</li>
						</ul>

						<!-- Top Search
						============================================= -->
						<div id="top-search">
							<a href="#" id="top-search-trigger"><i class="icon-search3"></i><i class="icon-line-cross"></i></a>
							<form action="search.html" method="get">
								<input type="text" name="q" class="form-control" value="" placeholder="Type Skater..">
							</form>
						</div><!-- #top-search end -->

					</nav><!-- #primary-menu end -->

				</div>

			</div>

		</header><!-- #header end -->

@yield('content')



		<!-- Footer
		============================================= -->
		<footer id="footer" class="dark">

			<div class="container">


				<!-- Footer Widgets
				============================================= -->
				<div class="footer-widgets-wrap clearfix">

					<div class="col_one_third">

						<div class="widget widget_links clearfix">

							<h4>カテゴリ</h4>

							<ul>
								<li><a href="https://codex.wordpress.org/">Documentation</a></li>
								<li><a href="https://wordpress.org/support/forum/requests-and-feedback">Feedback</a></li>
								<li><a href="https://wordpress.org/extend/plugins/">Plugins</a></li>
								<li><a href="https://wordpress.org/support/">Support Forums</a></li>
								<li><a href="https://wordpress.org/extend/themes/">Themes</a></li>
								<li><a href="https://wordpress.org/news/">WordPress Blog</a></li>
								<li><a href="https://planet.wordpress.org/">WordPress Planet</a></li>
							</ul>

						</div>

					</div>

					<div class="col_one_third">

						<div class="widget clearfix">

							<h4>About Us</h4>

							<p>We believe in <strong>Simple</strong>, <strong>Creative</strong> &amp; <strong>Flexible</strong> Design Standards.</p>

							<div style="background: url('images/world-map.png') no-repeat center center; background-size: 100%;">
								<address>
									<strong>Headquarters:</strong><br>
									795 Folsom Ave, Suite 600<br>
									San Francisco, CA 94107<br>
								</address>
								<abbr title="Phone Number"><strong>Phone:</strong></abbr> (91) 8547 632521<br>
								<abbr title="Fax"><strong>Fax:</strong></abbr> (91) 11 4752 1433<br>
								<abbr title="Email Address"><strong>Email:</strong></abbr> info@canvas.com
							</div>

						</div>

					</div>

					<div class="col_one_third col_last">


						<div class="widget clearfix">

							<div class="row">

								<div class="col-lg-6 clearfix bottommargin-sm">
									<a href="#" class="social-icon si-dark si-colored si-twitter nobottommargin" style="margin-right: 10px;">
										<i class="icon-twitter"></i>
										<i class="icon-twitter"></i>
									</a>
									<a href="#"><small style="display: block; margin-top: 3px;"><strong>Follow us</strong><br>on Twitter</small></a>
								</div>
								<div class="col-lg-6 clearfix">
									<a href="#" class="social-icon si-dark si-colored si-instagram nobottommargin" style="margin-right: 10px;">
										<i class="icon-instagram"></i>
										<i class="icon-instagram"></i>
									</a>
									<a href="#"><small style="display: block; margin-top: 3px;"><strong>Like us</strong><br>on Instagram</small></a>
								</div>

							</div>

						</div>

						Copyrights &copy; All Rights Reserved by Canvas Inc.<br>
						<div class="copyright-links"><a href="#">Terms of Use</a> / <a href="#">Privacy Policy</a></div>

					</div>

				</div><!-- .footer-widgets-wrap end -->

			</div>

		</footer><!-- #footer end -->

	</div><!-- #wrapper end -->

	<!-- Go To Top
	============================================= -->
	<div id="gotoTop" class="icon-angle-up"></div>

	<!-- External JavaScripts
	============================================= -->
	<script src="{{ asset('js/jquery.js') }}"></script>
	<script src="{{ asset('js/plugins.js') }}"></script>

	<!-- Footer Scripts
	============================================= -->
	<script src="{{ asset('js/functions.js') }}"></script>


@yield('script')


<!-- フラッシュメッセージ -->
@if (session('msg_success'))
  <script>
  // 成功時
    $(function () {
      toastr.success('{{ session('msg_success') }}');
    });
  </script>
@endif
@if (session('msg_danger'))
  <script>
  // 削除時
    $(function () {
      toastr.warnig('{{ session('msg_danger') }}');
    });
  </script>
@endif
{{-- エラー時 --}}
@if(count($errors) > 0)
	@foreach($errors->all() as $error)
	<script>
		toastr.error("{{ $error }}");
	</script>
	@endforeach
@endif



</body>
</html>

