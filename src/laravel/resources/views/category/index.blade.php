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
							  <th>名称</th>
							  <th></th>
							</tr>
						  </thead>
						  <tbody>
							<tr>
							  <td>1</td>
							  <td>デッキ</td>
							  <td>
								<button type="button" class="button button-aqua button-mini" data-toggle="modal" data-target="#modal-default">変更</button>
								<button type="button" class="button button-red button-mini" data-toggle="modal" data-target="#modal-danger">削除</button>
							  </td>
							</tr>
							<tr>
							  <td>2</td>
							  <td>ウィール</td>
							  <td>
								<button type="button" class="button button-aqua button-mini" data-toggle="modal" data-target="#modal-default">変更</button>
								<button type="button" class="button button-red button-mini" data-toggle="modal" data-target="#modal-danger">削除</button>
							  </td>
							</tr>
							<tr>
							  <td>3</td>
							  <td>ボード</td>
							  <td>
								<button type="button" class="button button-aqua button-mini" data-toggle="modal" data-target="#modal-default">変更</button>
								<button type="button" class="button button-red button-mini" data-toggle="modal" data-target="#modal-danger">削除</button>
							  </td>
							</tr>
						  </tbody>
						</table>

						<ul class="pagination pagination-circle pagination-sm">
						  <li class="page-item disabled"><a class="page-link" href="#" aria-label="Previous"> <span aria-hidden="true">&laquo;</span></a></li>
						  <li class="page-item active"><a class="page-link" href="#">1</a></li>
						  <li class="page-item"><a class="page-link" href="#">2</a></li>
						  <li class="page-item"><a class="page-link" href="#">3</a></li>
						  <li class="page-item"><a class="page-link" href="#">4</a></li>
						  <li class="page-item"><a class="page-link" href="#">5</a></li>
						  <li class="page-item"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
						</ul>

						<!-- Modal -->
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
											<input type="text" class="form-control" id="" placeholder="name">
										</div>
									</div>
								</div>
								<div class="modal-footer justify-content-between">
								  <button type="button" class="button button-light" data-dismiss="modal">Close</button>
								  <button type="button" class="button button-aqua">変更</button>
								</div>
							  </div>
							  <!-- /.modal-content -->
							</div>
							<!-- /.modal-dialog -->
						  </div>
						  <!-- /.modal -->


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
									<li><a href="{{ route('category.index') }}"><div>カテゴリー（スケート関連）</div></a></li>
								</ul>

							</div>

						</div>
					</div><!-- .sidebar end -->

				</div>

			</div>

		</section><!-- #content end -->



@endsection