<?php
    include_once '../php/Catalog.php';

    $Catallog = new Catalog();
    $Catallog->ChangeCategoryRootID($_GET['ID_SUB'], $_GET['ID_CURRENT']);
?>