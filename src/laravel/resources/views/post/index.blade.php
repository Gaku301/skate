@extends('layouts.master')

@section('content')
	

		<!-- Page Title
		============================================= -->
		<section id="page-title">

			<div class="container clearfix">
				<h1>{{ $skater->name }}</h1>
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

						<h3>記事作成</h3>

						<form action="{{ route('post.store', ['skater' => $skater]) }}" method="POST" enctype='multipart/form-data'>
							@csrf
							<div class="form-group row">
								<label for="name" class="col-sm-2 col-form-label">商品名</label>
								<div class="col-sm-10">
									<input type="hidden" class="form-control" id="" name="skater_id" value="{{ $skater->id }}">
									<input type="text" class="form-control" id="" placeholder="name" name="product_name" required>
								</div>
							</div>
							<div class="form-group row">
								<label for="country" class="col-sm-2 col-form-label">カテゴリー名</label>
								<div class="col-sm-10">
									<select class="form-control" name="category_id" id="" required>
										<option value=""></option>
										@foreach (\App\Models\Category::all() as $category)
										<option value="{{ $category->id }}">{{ $category->category_name }}</option>
										@endforeach
									</select>
								</div>
							</div>
							<div class="form-group row">
								<label for="name" class="col-sm-2 col-form-label">商品説明</label>
								<div class="col-sm-10">
									<textarea class="form-control" id="" rows="5" name="product_introduction" required></textarea>
								</div>
							</div>
							<div class="form-group row">
								<label for="name" class="col-sm-2 col-form-label">画像</label>
								<div class="col-sm-10">
									<input type="file" class="form-control-file" id="file" name="product_img">
								</div>
							</div>
							<div class="form-group row center mt-5">
								<div class="col-sm-10">
									<button type="submit" class="button button-blue">追加</button>
								</div>
							</div>
						</form>

						<div class="line"></div>

					
						<div id="shop" class="shop product-3 grid-container clearfix" data-layout="fitRows">

							@foreach ($posts as $post)
								
							<article class="portfolio-item pf-media pf-icons">
								<div class="portfolio-image">
									<a href="{{ route('post.show', ['skater' => $skater, 'post' => $post ]) }}">
										<img src="/storage/post/{{ $post->product_img }}" alt="画像">
									</a>
									<a href="{{ route('post.show', ['skater' => $skater, 'post' => $post ]) }}">
										<div class="portfolio-overlay"></div>
									</a>
								</div>
								<div class="portfolio-desc">
									<h3><a href="{{ route('post.show', ['skater' => $skater, 'post' => $post ]) }}">{{ $post->product_name }}</a></h3>
									<span><a href="{{ route('post.show', ['skater' => $skater, 'post' => $post ]) }}">説明</a></span>
								</div>
							</article>
							@endforeach

						</div>


						<!-- Modal -->
						<div class="modal fade" id="modal-danger">
							<div class="modal-dialog">
							  <div class="modal-content">
								<div class="modal-header bg-danger">
								  <h4 class="modal-title text-white">削除</h4>
								  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								  </button>
								</div>
								<div class="modal-body">
								  <p class="">「スケーター名」に関する全ての記事が削除されますがよろしいですか？</p>
								</div>
								<div class="modal-footer justify-content-between">
								  <button type="button" class="button button-light" data-dismiss="modal">Close</button>
								  <button type="button" class="button button-red">削除</button>
								</div>
							  </div>
							  <!-- /.modal-content -->
							</div>
							<!-- /.modal-dialog -->
						  </div>
						  <!-- /.modal -->


						<div class="line"></div>


					</div>

					<!-- Sidebar
					============================================= -->
					<div class="sidebar nobottommargin col_last clearfix">
						<div class="sidebar-widgets-wrap">

							<div class="widget widget_links clearfix">

								<h4>メニュー</h4>
								<ul>
									<li><a href="{{ route('skater.admin') }}"><div>スケーター管理</div></a></li>
									<li><a href="{{ route('country.index') }}"><div>国追加</div></a></li>
									<li><a href="{{ route('category.index') }}"><div>カテゴリー</div></a></li>
									<li><a href="{{ route('feature.index') }}"><div>フィーチャー</div></a></li>
								</ul>

							</div>

							<div class="widget clearfix">

								<h4>Dribbble Shots</h4>
								<div id="dribbble-widget" class="dribbble-shots masonry-thumbs" data-user="envato" data-count="16" data-type="user"></div>

							</div>

							<div class="widget widget-twitter-feed clearfix">

								<h4>Twitter Feed</h4>
								<ul class="iconlist twitter-feed" data-username="envato" data-count="2">
									<li></li>
								</ul>

								<a href="#" class="btn btn-secondary btn-sm fright">Follow Us on Twitter</a>

							</div>

						</div>
					</div><!-- .sidebar end -->

				</div>

			</div>

		</section><!-- #content end -->


@endsection