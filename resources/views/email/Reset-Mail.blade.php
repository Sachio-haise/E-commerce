<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width= , initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>

</head>
<body>
        <div style="max-width:400px;margin:auto;">
              <div style="border-radius:10px;background-color:whitesmoke;padding:2rem;">
                 <h1 style="text-align: center;">
                        Sh<span style="color:rgb(231,56,98)">o</span>p
                    </h1>
                  <h5>Hi {{ $data['name'] }},</h5>
                  <p  style="">We received a request to reset your account password.</p>
                  <p  style="">Enter the following password reset code.</p>
                   <p  style="background-color:#E7F3FF ;border:1px solid #2374E1 ;font-weight:bold;padding:.5rem 1rem;border-radius:5px;width:6rem;text-align:center;color:black;margin:auto">
                    {{ $data['random'] }}
                   </p>
                   <p  style="">Alternatively, you can directly change your password.</p>
                   @component('mail::button', ['url' => 'https://laravelvue-ecommerce.herokuapp.com/recover-password?em=' . $data['encrypt'] . '&rac=' . $data['random'] ])
                    Reset Password
                   @endcomponent
              </div>
        </div>

</body>
</html>