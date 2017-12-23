<?php
require 'facebook.php';
$facebook = new Facebook(array(
	'appId' => '133596263931641',
	'secret' => '41805b50d3c003cc8db9f57f4e9a9eec'
));
if($facebook->getUser() == 0){
	$loginUrl = $facebook->getLoginUrl(array(
		scope => 'manage_pages, publish_stream'
	));	
	echo "<a href = '$loginUrl'>Login with facebook</a>";
}
else{	
	// posting to profile
	$api = $facebook->api('me/feed', 'POST', array(
		link => 'http://cubj94.blogspot.com',
		message => 'Welcome to my page !'
	)); 
	echo "<br/>Post status success !";
	// posting to group 
	$groups = $facebook->api('me/groups');
	$id = $groups[data][0][id];
	$api = $facebook->api($id. '/feed', 'POST', array(
		link => 'cyberfreax.com',
		message => 'Check This Out !'
	));
	echo "<br/>Post to group success !";
	// posting to pages
	try{	
		$pages = $facebook->api('me/accounts');
		$id = $pages[data][0][id];
		$token = $pages[data][0][access_token];
		$api = $facebook->api($id .'/feed', 'POST', array(
			access_token => $token,
			link => 'http://cubj94.blogspot.com/',
			message => 'Check This Out !'
		));
		echo "Post status in Page Tôi có một ước mơ !";
	}catch(FacebookApiException $e){
		$result = $e->getResult();
		echo $result;
	}
	
	//displaying logout link
	echo "<br><a href = 'logout.php'>Logout</a>";
}
?>