<?php
    include_once '../php/Catalog.php';

    $Catallog = new Catalog();
    $Catallog->ChangeCategoryName($_GET['ID'], $_GET['NAME']);
?>