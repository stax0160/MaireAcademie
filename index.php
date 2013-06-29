<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
	<link href='http://fonts.googleapis.com/css?family=Fauna+One' rel='stylesheet' type='text/css'>
	
	<link rel="stylesheet" type="text/css" href="/static/master-main.css">



</head>
<body>
	<section class="container">
		<header>
			<h1>Maire Académie</h1>
			<p class="lead">
				Puisque aucun maire ne peut le faire, sauvez votre ville favorite.
				<br>
				4 villes en péril, 1 numéro facile. 1-866-MAIRE29 (1-866-624-7329)
				<br>
				Pas de téléphone sous la main? Donnez un peu d'amour à votre ville en cliquant « J'aime »</p>
		</header>





		<h2>Résultats</h2>
		<ul class="clearfix resultats">
		<?php 
		for ($i=0; $i < 4; $i++) { 
		?>
			<li class="col col-lg-3 ">
				<article>
					<b>Vote pour Montreal</b>
					<span>44</span>

					<aside>
						Stuff pour FB LIKE
						<a href="">Like ta ville</a>
					</aside>
				</article>
			</li>
		<?php
		}
		?>
		</ul>
		<hr>
		
		<h2>En direct</h2>
		<ul class="livefeed">
			<li>514-xxx-xx06 <span>vient tout juste de voter pour</span> Laval</li>
			<li>514-xxx-xx06 <span>vient tout juste de voter pour</span> Montreal</li>
			<li>514-xxx-xx06 <span>vient tout juste de voter pour</span> Longueuil</li>
			<li>514-xxx-xx06 <span>vient tout juste de voter pour</span> Quebec</li>
			<li>Régis Labeaume <span>like</span> Quebec. <span>Un vote de plus!</span></li>
			<li>514-xxx-xx06 <span>vient tout juste de voter pour</span> Montreal</li>
			<li>Madame Pailleur <span>vient tout juste de voter via Facebook pour</span> Laval</li>
		</ul>
	</section>
	
</body>
</html>