<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'skater_id' => 'required|integer|exists:skaters,id',
            'category_id' => 'required|integer|exists:categories,id',
            'product_name' => 'required|string|max:30',
            'product_introduction' => 'required|string',
            'product_img' => 'nullable',
        ];
    }

    public function attributes()
    {
        return [
            'skater_id' => 'スケーターID',
            'category_id' => 'カテゴリー名',
            'product_name' => '商品名',
            'product_introduction' => '商品説明',
            'product_img' => '画像',
        ];
    }
}
