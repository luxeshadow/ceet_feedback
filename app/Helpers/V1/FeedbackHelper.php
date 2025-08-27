<?php
namespace App\Helpers\V1;

use App\Models\Feedback;
use Carbon\Carbon;

class FeedbackHelper
{
    
    public static function generateRefCode(): string
    {
        return 'FB-' . strtoupper(uniqid()) . '-' . Carbon::now()->format('Ymd');
    }

}