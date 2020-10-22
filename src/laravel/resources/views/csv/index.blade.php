@extends('layouts.master')

@section('content')

		<!-- Page Title
		============================================= -->
		<section id="page-title">

			<div class="container clearfix">
				<h1>スケーター管理</h1>
				<span>Ways to enhance your Forms</span>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="#">Home</a></li>
					<li class="breadcrumb-item"><a href="#">Shortcodes</a></li>
					<li class="breadcrumb-item active" aria-current="page">Form Elements</li>
				</ol>
			</div>

		</section><!-- #page-title end -->

		<!-- Content
		============================================= -->
		<section id="content">

			<div class="content-wrap">

				<div class="container clearfix">

					<div class="postcontent">

						<h3>スケーター追加</h3>

						{{-- csv追加 --}}
						<form action="{{ route('csv.import') }}" method="POST" enctype="multipart/form-data">
							@csrf
							<div class="form-group row">
								<label for="name" class="col-sm-2 col-form-label">csv</label>
								<div class="col-sm-10">
									<input type="file" class="form-control-file" id="" name="csv">
								</div>
							</div>
							<div class="form-group row center">
								<div class="col-sm-10">
									<button type="submit" class="button button-green">追加</button>
								</div>
							</div>
						</form>

						<div class="line"></div>

					</div>

					<!-- Sidebar
					============================================= -->
					<div class="sidebar nobottommargin col_last clearfix">
						<div class="sidebar-widgets-wrap">

							<div class="widget widget_links clearfix">

								<h4>メニュー</h4>
								<ul>
									<li><a href="{{ route('csv.index') }}"><div>csv取り込み</div></a></li>
									<li><a href="{{ route('skater.admin') }}"><div>スケーター管理</div></a></li>
									<li><a href="{{ route('country.index') }}"><div>国追加</div></a></li>
									<li><a href="{{ route('category.index') }}"><div>カテゴリー</div></a></li>
									<li><a href="{{ route('feature.index') }}"><div>フィーチャー</div></a></li>
								</ul>

							</div>

						</div>
					</div><!-- .sidebar end -->

				</div>

			</div>

		</section><!-- #content end -->


@endsection