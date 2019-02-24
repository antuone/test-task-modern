<?php
    include_once '../php/Catalog.php';

    $Catallog = new Catalog();
    $Catallog->ChangeNotFoodProduct($_GET['NAME'], $_GET['URL'], $_GET['ID_COLOR'], $_GET['PRICE'], $_GET['ID']);
?>