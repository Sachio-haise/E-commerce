<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="https://laravelvue-ecommerce.herokuapp.com/images/logo.svg">
    <link rel="stylesheet" href="{{ mix("css/app.css") }}">
    <title>Shop</title>
    <style>
        .loader-container{
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            background-color: #ffffff;
            width: 100%;
            height: 100%;
            z-index: 10000000;
        }
        .loader-container .loader img{
            width: 100px;
        }
    </style>
</head>
<body>

    <div class="loader-container">
        <div class="loader">
            <img src="{{ asset('images/loading.gif') }}" alt="">
        </div>
    </div>

<div id="app">
    <router-view></router-view>
    <vue-progress-bar></vue-progress-bar>
</div>


<script src="{{ mix("js/app.js") }}"></script>
</body>
</html>

