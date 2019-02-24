<?php
    include_once '../php/Catalog.php';

    $Catallog = new Catalog();
    $Catallog->NewCategory($_GET['ID'], $_GET['NAME']);
?>