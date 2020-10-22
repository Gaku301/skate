<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            'category_name' => 'Skate',
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Tops',
        ]);

        DB::table('categories')->insert([
            'category_name' => 'Brands',
        ]);
    }
}
