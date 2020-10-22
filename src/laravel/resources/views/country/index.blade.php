@extends('layouts.master')

@section('content')
	

		<!-- Page Title
		============================================= -->
		<section id="page-title">

			<div class="container clearfix">
				<h1>国名管理</h1>
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

						<h3>国追加</h3>

						<form action="{{ route('country.store') }}" method="POST">
							@csrf
							<div class="form-group row">
								<label for="country_name" class="col-sm-2 col-form-label">国名称</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" id="country_name" name="country_name" placeholder="name" required>
									<small id="" class="form-text text-muted">We'll never share your email with anyone else.</small>
								</div>
							</div>
							<div class="form-group row center">
								<div class="col-sm-10">
									<button type="submit" class="button button-blue">追加</button>
								</div>
							</div>
						</form>

						<div class="line"></div>

						<h3>一覧</h3>

						<table class="table table-striped">
						  <thead>
							<tr>
							  <th>id</th>
							  <th>国名</th>
							  <th></th>
							</tr>
						  </thead>
						  <tbody>
							@foreach ($countries as $country)
							<tr>
							  <td>{{ $country->id }}</td>
							  <td>{{ $country->country_name }}</td>
							  <td>
								<button type="button" class="button button-aqua button-mini country-edit" data-toggle="modal" data-target="#modal-default" data-id="{{ $country->id }}" data-name="{{ $country->country_name }}">変更</button>
								<button type="button" class="button button-red button-mini country-delete" data-toggle="modal" data-target="#modal-danger" data-id="{{ $country->id }}">削除</button>
							  </td>
							</tr>
							@endforeach
						  </tbody>
						</table>

						<ul class="pagination pagination-circle pagination-sm">
							{{ $countries->links() }}
						</ul>

						<!-- Modal -->
						<form action="{{ route('country.update') }}" method="POST">
							@method("PATCH")
							@csrf
						<div class="modal fade" id="modal-default">
							<div class="modal-dialog">
							  <div class="modal-content">
								<div class="modal-header">
								  <h4 class="modal-title">変更</h4>
								  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								  </button>
								</div>
								<div class="modal-body">
									<div class="form-group row">
										<label for="name" class="col-sm-2 col-form-label">国名称</label>
										<div class="col-sm-10">
											<input type="hidden" class="form-control" id="country-id" name="id">
											<input type="text" class="form-control" id="country-name" name="country_name" placeholder="name">
										</div>
									</div>
								</div>
								<div class="modal-footer justify-content-between">
								  <button type="button" class="button button-light" data-dismiss="modal">Close</button>
								  <button type="submit" class="button button-aqua">変更</button>
								</div>
							  </div>
							  <!-- /.modal-content -->
							</div>
							<!-- /.modal-dialog -->
						  </div>
						</form>
						  <!-- /.modal -->


						<!-- Modal -->
						<form action="{{ route('country.destroy') }}" method="POST">
							@method("DELETE")
							@csrf
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
									<input type="hidden" class="form-control" id="delete-id" name="id">
									<p class="">国を削除してよろしいですか？</p>
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
						</form>
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


@section('script')
	<script>
		// edit
		$(function(){
			$('.country-edit').click((event) => {
				const target = $(event.target);
				$('#country-id').val(target.data('id'));
				$('#country-name').val(target.data('name'));
			})
		})
		// delete
		$(function(){
			$('.country-delete').click((event) => {
				const target = $(event.target);
				$('#delete-id').val(target.data('id'));
			})
		})
	
	</script>

@endsection