<?php
    include_once '../php/Catalog.php';

    $Catallog = new Catalog();
    $Catallog->ChangeFoodRootID($_GET['ID_SUB'], $_GET['ID_CURRENT']);
?>