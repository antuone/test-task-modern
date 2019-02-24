<?php
    include_once '../php/Catalog.php';

    $Catallog = new Catalog();
    $Catallog->ChangeFoodProduct($_GET['NAME'], $_GET['PRICE'], $_GET['ID']);
?>