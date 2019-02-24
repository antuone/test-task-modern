<?php
    include_once '../php/Catalog.php';

    $Catallog = new Catalog();
    $Catallog->NewNotFoodProduct($_GET['ID'], $_GET['NAME'], $_GET['PRICE'], $_GET['COLOR'], $_GET['URL']);
?>