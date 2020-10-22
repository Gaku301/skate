<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateSkaterRequest extends FormRequest
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
            'name' => 'required|string|max:50',
            'country_id' => 'required|integer|exists:countries,id',
            'instagram' => 'nullable|string',
            'twitter' => 'nullable|string',
            'facebook' => 'nullable|string',
            'youtube' => 'nullable|string',
            'thumbnail' => 'nullable|',
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'スケーター名',
            'country_id' => '国名',
            'instagram' => 'Instagram',
            'twitter' => 'Twitter',
            'facebook' => 'Facebook',
            'youtube' => 'Youtube',
            'thumbnail' => '画像',
        ];
    }
}
