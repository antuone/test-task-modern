<?php
    include_once '../php/Catalog.php';

    $Catallog = new Catalog();
    $Catallog->RemoveFoodProduct($_GET['ID']);
?>