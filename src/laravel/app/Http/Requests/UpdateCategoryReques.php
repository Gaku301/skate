<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryReques extends FormRequest
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
            'id' => 'required|integer|exists:categories',
            'category_name' => 'required|string',
        ];
    }

    public function attributes()
    {
        return[
            'id' => 'ID',
            'category_name' => 'カテゴリ名',
        ];
    }
}
