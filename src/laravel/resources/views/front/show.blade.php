@extends('layouts.master')

@section('content')
	

		<!-- Page Title
		============================================= -->
		<section id="page-title">

			<div class="container clearfix">
				<div class="testi-image">
					<a href="#"><img src="/storage/thumbnail/{{ $skater->thumbnail }}" alt="画像"></a>
				</div>
				<h1>{{ $skater->name }}</h1>
				<span>Start Buying your Favourite Theme</span>
				<ol class="breadcrumb">
					<a href="#" class="social-icon si-facebook">
						<i class="icon-facebook"></i>
						<i class="icon-facebook"></i>
					</a>
					<a href="#" class="social-icon si-youtube">
						<i class="icon-youtube"></i>
						<i class="icon-youtube"></i>
					</a>
					<a href="#" class="social-icon si-twitter">
						<i class="icon-twitter"></i>
						<i class="icon-twitter"></i>
					</a>
	
					<a href="#" class="social-icon si-instagram">
						<i class="icon-instagram"></i>
						<i class="icon-instagram"></i>
					</a>
	
				</ol>
			</div>

		</section><!-- #page-title end -->

		<!-- Content
		============================================= -->
		<section id="content">

			<div class="content-wrap">

				<div class="container clearfix">


					<!-- Post Content
					============================================= -->
					<div class="postcontent nobottommargin col_last">

						<div class="row">
							<h2>ALL</h2>
							<h3 class="ml-4"><span>{{ $skater->posts->count() }}</span></h3>
						</div>

						<!-- Shop
						============================================= -->
						<div id="shop" class="shop product-3 grid-container clearfix" data-layout="fitRows">

						@foreach ($posts as $post)
						<article class="portfolio-item pf-media pf-icons">
							<div class="portfolio-image">
								<a href="shop-3-left-sidebar.html">
									<img src="/storage/post/{{ $post->product_img }}" alt="画像">
								</a>
								<a href="shop-3-left-sidebar.html">
									<div class="portfolio-overlay"></div>
								</a>
							</div>
							<div class="portfolio-desc">
								<h3><a href="shop-3-left-sidebar.html">{{ $post->product_name }}</a></h3>
							</div>
						</article>
						@endforeach


						<ul class="pagination pagination-circle mt-4">
							{{ $posts->links() }}
						</ul>


						</div><!-- #shop end -->


					</div><!-- .postcontent end -->

					<!-- Sidebar
					============================================= -->
					<div class="sidebar nobottommargin">
						<div class="sidebar-widgets-wrap">

							<div class="widget widget_links clearfix">

								<h4>スケート関連</h4>
								<ul>
									<li><a href="#">デッキ （2）</a></li>
									<li><a href="#">トラック （3）</a></li>
									<li><a href="#">ウィール</a></li>
									<li><a href="#">ベアリング</a></li>
									<li><a href="#">デッキテープ</a></li>
									<li><a href="#">ワックス</a></li>
									<li><a href="#">その他</a></li>
								</ul>

							</div>

							<div class="widget widget_links clearfix">

								<h4>トップス関連</h4>
								<ul>
									<li><a href="#">トップス （3）</a></li>
									<li><a href="#">アウター （1）</a></li>
									<li><a href="#">パンツ</a></li>
									<li><a href="#">シューズ</a></li>
									<li><a href="#">ソックス</a></li>
									<li><a href="#">バッグ</a></li>
									<li><a href="#">帽子</a></li>
									<li><a href="#">小物/財布</a></li>
									<li><a href="#">時計</a></li>
									<li><a href="#">アクセサリー</a></li>
									<li><a href="#">雑貨</a></li>
									<li><a href="#">その他</a></li>
								</ul>

							</div>


						</div>
					</div><!-- .sidebar end -->

				</div>

			</div>

		</section><!-- #content end -->


@endsection	