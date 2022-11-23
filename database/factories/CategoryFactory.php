<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $categories = ['shirt','pant','sweater','jacket','hoodie','shoes'];
        $name = $this->faker->name;
        return [
            'name' => $name,
            'slug' => Str::slug($name)
        ];
    }
}
