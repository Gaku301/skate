@extends('layouts.master')

@section('content')
	

		<!-- Page Title
		============================================= -->
		<section id="page-title">

			<div class="container clearfix">
				<h1>スケーター情報</h1>
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

						<h3>{{ $skater->name }}</h3>

						<form action="{{ route('skater.update', ['skater' => $skater ]) }}" method="POST">
							@csrf
							@method("PATCH")
							<div class="form-group row">
								<input type="hidden" class="form-control" id="" placeholder="id" name="id" value="{{ $skater->id }}">
								<label for="name" class="col-sm-2 col-form-label">名前</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" id="" placeholder="name" name="name" value="{{ $skater->name }}">
								</div>
							</div>
							<div class="form-group row">
								<label for="country" class="col-sm-2 col-form-label">国名</label>
								<div class="col-sm-10">
									<select class="form-control" name="country_id" id="">
										<option value="{{ $skater->country_id }}">{{ $skater->country->country_name }}</option>
										@foreach (\App\Models\Country::where('id', '!=', $skater->country_id)->get() as $country)
										<option value="{{ $country->id }}">{{ $country->country_name }}</option>
										@endforeach
									</select>
								</div>
							</div>
							<div class="form-group row">
								<label for="name" class="col-sm-2 col-form-label">インスタURL</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" id="" placeholder="" name="instagram" value="{{ $skater->instagram }}">
								</div>
							</div>
							<div class="form-group row">
								<label for="name" class="col-sm-2 col-form-label">ツイッターURL</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" id="" placeholder="" name="twitter" value="{{ $skater->twitter }}">
								</div>
							</div>
							<div class="form-group row">
								<label for="name" class="col-sm-2 col-form-label">フェイスブックURL</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" id="" placeholder="" name="facebook" value="{{ $skater->facebook }}">
								</div>
							</div>
							<div class="form-group row">
								<label for="name" class="col-sm-2 col-form-label">YouTube</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" id="" placeholder="" name="youtube" value="{{ $skater->youtube }}">
								</div>
							</div>
							<div class="form-group row">
								<label for="name" class="col-sm-2 col-form-label">画像</label>
								<div class="col-sm-10">
									<input type="file" class="form-control-file" id="file">
								</div>
							</div>
							<div class="form-group row center mt-5">
								<div class="col-sm-10">
									<button type="submit" class="button button-aqua">変更</button>
									<button type="button" class="button button-red" data-toggle="modal" data-target="#modal-danger">削除</button>
								</div>
							</div>
						</form>

						<div class="line"></div>

						<!-- Modal -->
						<form action="{{ route('skater.destroy',['skater' => $skater ]) }}" method="POST">
							@csrf
							@method("DELETE")
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
								{{-- <input type="hidden" class="form-control" id="" placeholder="id" name="id" value="{{ $skater->id }}"> --}}
								  <p class="">「スケーター名」に関する全ての記事が削除されますがよろしいですか？</p>
								</div>
								<div class="modal-footer justify-content-between">
								  <button type="button" class="button button-light" data-dismiss="modal">Close</button>
								  <button type="submit" class="button button-red">削除</button>
								</div>
							  </div>
							  <!-- /.modal-content -->
							</div>
							<!-- /.modal-dialog -->
						  </div>
						  <!-- /.modal -->
						</form>

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
									<li><a href="{{ route('category.index') }}"><div>カテゴリー（スケート関連）</div></a></li>
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