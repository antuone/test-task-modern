<?php
    include_once '../php/Catalog.php';

    $Catallog = new Catalog();
    $Catallog->RemoveNotFoodProduct($_GET['ID']);
?>