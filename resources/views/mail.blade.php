

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
                  <h2 style="text-align: center;">Welcome,Please verify it is you.</h2>

                   @component('mail::button', ['url' => $action ])
                    Verify
                   @endcomponent
              </div>
        </div>

</body>
</html>