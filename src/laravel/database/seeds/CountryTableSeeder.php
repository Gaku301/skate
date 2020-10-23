<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $cantry_names = ['Japan', 'UK', 'USA', 'Brasil', 'Puerto Rico', 'Australia', 'Korea & Germany', 'France', 'Netherland', 'Canada', 'Portugal', 'Italia', 'Morocco', 'Peru', 'Jamaica'];

        foreach ($cantry_names as $cantry_name) {
            DB::table('countries')->insert([
                'country_name' => $cantry_name,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
