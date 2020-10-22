<?php

namespace App\Http\Controllers;

use App\Models\Skater;
use Goodby\CSV\Import\Standard\Interpreter;
use Goodby\CSV\Import\Standard\Lexer;
use Goodby\CSV\Import\Standard\LexerConfig;
use Illuminate\Http\Request;

class CsvController extends Controller
{
    public function index()
    {
        return view('csv.index');
    }

    public function import_csv(Request $request)
    {
        // csv ファイル保存
        $tmpname = uniqid('CSVUP_').'.'.$request->file('csv')->guessExtension(); //TMPファイル名
        $request->file('csv')->move(public_path().'/csv/tmp', $tmpname);
        $tmppath = public_path().'/csv/tmp/'.$tmpname;

        // Goodby Csvの設定
        $config_in = new LexerConfig();
        $config_in->setFromCharset("SJIS-win")
                    ->setToCharset("UTF-8") // CharasetをUTF-8に変換
                    ->setIgnoreHeaderLine(true); // CSVのヘッダーを無視

        $lexer_in = new Lexer($config_in);

        $datalist = [];

        $interpreter = new Interpreter();
        $interpreter->unstrict();
        $interpreter->addObserver(function (array $row) use (&$datalist) {
            // 各列のデータを取得
            $datalist[] = $row;
        });

        // csvデータをパス
        $lexer_in->parse($tmppath, $interpreter);

        // TMPファイル削除
        unlink($tmppath);

        // 処理
        foreach ($datalist as $row) {
            // 各データ取り出し
            $csv_skater = $this->get_csv_skater($row);

            // DBへ登録
            $this->regist_skater_csv($csv_skater);
        }

        return redirect()->back()->with('msg_success', 'csvデータを登録しました。');
    }

    public function get_csv_skater($row)
    {
        $skater = [
            'name' => $row[0],
            'country_id' => 1,
            'instagram' => $row[1],
            'twitter' => $row[2],
            'facebook' => $row[3],
            'youtube' => $row[4],
        ];

        return $skater;
    }

    public function regist_skater_csv($skater)
    {
        $new_skater = new Skater();
        foreach ($skater as $key => $value) {
            $new_skater->$key = $value;
        }
        $new_skater->save();
    }
}
