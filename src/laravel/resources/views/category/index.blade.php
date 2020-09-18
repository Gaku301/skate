@extends('layouts.master')

@section('content')


		<!-- Page Title
		============================================= -->
		<section id="page-title">

			<div class="container clearfix">
				<h1>カテゴリー管理</h1>
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

						<h3>カテゴリ追加</h3>

						<form action="{{ route('category.store') }}" method="POST">
							@csrf
							<div class="form-group row">
								<label for="name" class="col-sm-2 col-form-label">名称</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" id="" name="category_name" placeholder="name" required>
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
							  <th>名称</th>
							  <th></th>
							</tr>
						  </thead>
						  <tbody>
							  @foreach ($categories as $category)
							<tr>
							  <td>{{ $category->id }}</td>
							  <td>{{ $category->category_name }}</td>
							  <td>
								<button type="button" class="button button-aqua button-mini category-edit" data-toggle="modal" data-target="#modal-default" data-id="{{ $category->id }}" data-name="{{ $category->category_name }}">変更</button>
								<button type="button" class="button button-red button-mini category-delete" data-toggle="modal" data-target="#modal-danger" data-id="{{ $category->id }}">削除</button>
							  </td>
							</tr>
							  @endforeach
						  </tbody>
						</table>

						<ul class="pagination pagination-circle pagination-sm">
							{{ $categories->links() }}
						</ul>

						<!-- Modal -->
						<form action="{{ route('category.update') }}" method="POST">
							@csrf
							@method("PATCH")
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
										<label for="name" class="col-sm-2 col-form-label">名称</label>
										<div class="col-sm-10">
											<input type="hidden" class="form-control" id="category-id" name="id">
											<input type="text" class="form-control" id="category-name" name="category_name">
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
						  <!-- /.modal -->
						</form>


						<!-- Modal -->
						<form action="{{ route('category.destroy') }}" method="POST">
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
									<input type="hidden" class="form-control" id="delete-id" name="id">
									<p class="">カテゴリーを削除してよろしいですか？</p>
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
			$('.category-edit').click((event) => {
				const target = $(event.target);
				$('#category-id').val(target.data('id'));
				$('#category-name').val(target.data('name'));
			})
		})
		// delete
		$(function(){
			$('.category-delete').click((event) => {
				const target = $(event.target);
				$('#delete-id').val(target.data('id'));
			})
		})
	
	</script>

@endsection