<?php
    include_once '../php/Catalog.php';

    $Catallog = new Catalog();
    $Catallog->RemoveCategory($_GET['ID']);
?>