@extends('layouts.master')

@section('content')
	
		<section id="slider" class="slider-element slider-parallax swiper_wrapper full-screen clearfix">
			<div class="slider-parallax-inner">

				<div class="swiper-container swiper-parent">
					<div class="swiper-wrapper">
						<div class="swiper-slide dark" style="background-image: url('images/slider/swiper/1.jpg');">
							<div class="container clearfix">
								<div class="slider-caption slider-caption-center">
									<h2 data-animate="fadeInUp">Skaters</h2>
									<p class="d-none d-sm-block" data-animate="fadeInUp" data-delay="200">Create just what you need for your Perfect Website. Choose from a wide range of Elements &amp; simply put them on your own Canvas.</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<a href="#" data-scrollto="#page-title" data-offset="100" class="dark one-page-arrow"><i class="icon-angle-down infinite animated fadeInDown"></i></a>

			</div>
		</section>

		<!-- Page Title
		============================================= -->
		<section id="page-title">

			<div class="container clearfix">
				<h1>Skaters</h1>
				<span>What are you looking for ?</span>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="portfolio.html">All</a></li>
					<li class="breadcrumb-item"><a href="country.html">Country</a></li>
					<li class="breadcrumb-item"><a href="#">Brands</a></li>
					<!-- <li class="breadcrumb-item active" aria-current="page">Portfolio</li> -->
				</ol>
			</div>

		</section><!-- #page-title end -->

		<!-- Content
		============================================= -->
		<section id="content">

			<div class="content-wrap">

				<div class="container clearfix">


					<div class="clear"></div>

					<!-- Portfolio Items
					============================================= -->

				    <h2>All</h2>

					<div id="portfolio" class="portfolio grid-container clearfix">
						@foreach ($skaters as $skater)
						<article class="portfolio-item pf-media pf-icons">
							<div class="portfolio-image">
								<a href="shop-3-left-sidebar.html">
									<img src="storage/thumbnail/{{ $skater->thumbnail }}" alt="画像">
								</a>
								<a href="shop-3-left-sidebar.html">
									<div class="portfolio-overlay"></div>
								</a>
							</div>
							<div class="portfolio-desc">
								<h3><a href="shop-3-left-sidebar.html">{{ $skater->name }}</a></h3>
								<span><a href="#">{{ $skater->country->country_name }}</a></span>
							</div>
						</article>

						@endforeach

						<ul class="pagination pagination-circle mt-4">
							{{ $skaters->links() }}
						</ul>

					</div><!-- #portfolio end -->

				</div>

			</div>

		</section><!-- #content end -->

@endsection