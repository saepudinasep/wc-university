<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->user),
            'name' => $this->name,
            'phone_number' => $this->phone_number,
            'date_of_birth' => (new Carbon($this->date_of_birth))->format('Y-m-d'),
            'gender' => $this->gender,
            'address' => $this->address,
            'photo' => $this->photo,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
        ];
    }
}
