# URL設計

| 権限 | 処理               | メソッド | アクション                | URL | name |
|-----|--------|---------|-----------|-----|------|
| 共通 | TOPページを表示させる  | GET | FrontController@index | / | front.index |
| 共通 | スケーターの検索を行う | GET | FrontController@search | / | front.search |
| 共通 | スケーターページを表示する | GET | FrontController@show | /{skater_name} |front.show |
| 共通 | 記事のカテゴリーページを表示する（デッキ、トラック、ウィールなど） | GET | FrontController@showCategory | /{skater_name}/{category_name} | front.showCategory |
| 共通 | 記事の詳細ページを表示する | GET | FrontController@showPost | /{skater_name}/{category_name}/{post_id} | front.showPost |
| 共通 | Country,Brandページを表示する | GET | FrontController@showCountry | /coutnry | front.showCountry
| 共通 | 各国詳細,各Brand詳細ページを表示する | GET | FrontController@showCountryPage | /country/{country_name} | front.showCountryPage
| 共通 | 各カテゴリーページを表示する | GET | FrontController@showCategory
| 共通 | 各カテゴリー詳細ページを表示する
| 管理者 | 管理者画面を表示する | GET | SkaterController@index | /admin | skater.index |
| 管理者 | スケーターを追加する | POST | SkaterController@store | /admin | skater.store |
| 管理者 | スケーター詳細情報を表示する | GET | SkaterController@show | /admin/show/ | skater.show |
| 管理者 | スケーター情報を変更する | PATCH | SkaterController@update | /admin/show/ | skater.update |
| 管理者 | スケーター情報を削除する | DELETE | SkaterController@destroy | /admin/show/ | skater.destroy |
| 管理者 | 記事作成、一覧ページを表示する | GET | PostController@index | /admin/show/post | post.index |
| 管理者 | 記事を追加する | POST | PostController@store | /admin/show/post | post.store |
| 管理者 | 記事を削除する | DELETE | PostController@destroy | /admin/show/post | post.delete |
| 管理者 | 記事詳細情報ページを表示する | GET | PostController@show | /admin/show/post/{post_id} | post.show |
| 管理者 | 記事を変更する | PATCH | PostController@update | /admin/show/post/{post_id} | post.update |
| 管理者 | 国一覧ページを表示する | GET | CountryController@index | /admin/country | country.index |
| 管理者 | 国を追加する | POST | CountryController@store | /admin/country | country.store |
| 管理者 | 国を変更する | PATCH | CountryController@update | /admin/country | country.update |
| 管理者 | カテゴリー一覧ページを表示する | GET | CategoryController | /admin/category | category.index |
| 管理者 | カテゴリを追加する | POST | CategoryController@store | /admin/category | category.store
| 管理者 | カテゴリーを変更する | PATCH | CategoryController@update | /admin/category | category.update |
| 管理者 | カテゴリーを削除する | DELETE | CategoryController@destroy | /admin/category | category.delete |


