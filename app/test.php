<?php
// The file test.xml contains an XML document with a root element
// and at least an element /[root]/title.

$xml = simplexml_load_file('http://tuoitre.vn/rss/tin-moi-nhat.rss');
    $xml_a =$xml->channel;
    //var_dump(count($xml_a->item));
    foreach ($xml_a->item as $key => $item) {
        echo '<h4>'.$item->title .'</h4>';
        echo '<small><a href="'.$item->link.'">'.$item->link.'</a></small>';
        echo '<p>'.$item->description.'</p>';
        echo '<hr><br>';
    }
?>