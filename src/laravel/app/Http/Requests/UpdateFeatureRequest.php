<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFeatureRequest extends FormRequest
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
            'id' => 'required|integer|exists:features',
            'category_id' => 'required|integer|exists:categories,id',
            'feature_name' => 'required|string',
        ];
    }

    public function attributes()
    {
        return [
            'id' => 'フィーチャーID',
            'category_id' => 'カテゴリー',
            'feature_name' => 'フィーチャー名',
        ];
    }
}
