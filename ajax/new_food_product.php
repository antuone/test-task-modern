<?php
    include_once '../php/Catalog.php';

    $Catallog = new Catalog();
    $Catallog->NewFoodProduct($_GET['ID'], $_GET['NAME'], $_GET['PRICE']);
?>