@use('MyListerHub\FormBuilder\FormBuilder')
<!DOCTYPE html>
<html class="h-100">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>Form Builder</title>
    {!! FormBuilder::vite(['resources/js/main.ts']) !!}
    @inertiaHead
</head>
<body class="h-100">
@inertia
</body>
</html>
