<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
         'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();

        Passport::tokensCan([
            'admin'=>'Add/Edit/Delete Users',
            'user' => 'View'
        ]);
        Passport::setDefaultScope([
            'user'
        ]);

        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            $spaUrl =$url;
  
            return (new MailMessage)
                ->markdown('mail',['subject'=>'Verify Email','line'=> 'click the button','action'=>$spaUrl]);
          });
    }
}
