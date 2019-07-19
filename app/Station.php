<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
    protected $table = 'station';
    protected $fillable = ['passenger1', 'passenger2', 'passenger3', 'destination', 'comment'];
    public $timestamps = true;
}
