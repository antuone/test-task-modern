var DATA = {};
var CATEGORY = [];
var CATEGORY_CURRENT;
var FOOD_PRODUCT_CURRENT;
var NOT_FOOD_PRODUCT_CURRENT;

function _$(id) {
	return document.getElementById(id);
}
function hide(space) {
	if (typeof (space) == "string") {
		space = _$(space);
	}
	space.classList.add('hide');
	space.classList.remove('show');
}
function show(space) {
	if (typeof (space) == "string") {
		space = _$(space);
	}
	space.classList.add('show');
	space.classList.remove('hide');
}

function inviteCategory(container, element) {
	var newObject = _$('category').cloneNode(true);
	newObject.id = newObject.id + '_' + element.id;
	
	let info = newObject.querySelector('.info p');
	info.innerHTML = element.name;
	info._id = element.id;
	newObject._id = element.id;
	info.addEventListener('click', listenerCategory);
	info.nextElementSibling.addEventListener('click', listenerCalculateSummProduct);
	show(newObject);
	container.appendChild(newObject);
}

function listenerCategory() {
	_e = _$('edit_category');
	hide('container');
	_e.querySelector('input').value = this.innerHTML;
	CATEGORY_CURRENT = this._id;
	show(_e);
}

function listenerFoodProduct() {
	_e = _$('edit_food_product_edit');
	hide('container');
	_$('name_food_product_edit').value = this.innerHTML;
	_$('price_food_product_edit').value = this.nextElementSibling.innerHTML; 
	FOOD_PRODUCT_CURRENT = this._id;
	show(_e);
}

function listenerNotFoodProduct() {
	_e = _$('edit_not_food_product_edit');
	hide('container');
	let product = this.parentElement.querySelectorAll('.info p, .info a');

	_$('name_not_food_product_edit').value = product[0].innerHTML;
	_$('color_not_food_product_edit').value = colors.indexOf(product[1].innerHTML) + 1;
	_$('url_not_food_product_edit').value = product[2].href;
	_$('price_not_food_product_edit').value = product[3].innerHTML;
	
	NOT_FOOD_PRODUCT_CURRENT = this._id;
	show(_e);
}
function inviteFoodProduct(container, element) {
	var newObject = _$('food_product').cloneNode(true);
	newObject.id = newObject.id + '_' + element.id;
	
	let info = newObject.querySelectorAll('.info p');
	info[0].innerHTML = element.name;
	info[0]._id = element.id;
	newObject._id = element.id;
	info[1].innerHTML = element.price;
	
	info[0].addEventListener('click', listenerFoodProduct);

	show(newObject);
	container.appendChild(newObject);
}

var colors = ['green', 'red', 'yellow', 'blue', 'brown'];

function inviteNotFoodProduct(container, element) {
	var newObject = _$('not_food_product').cloneNode(true);
	newObject.id = newObject.id + '_' + element.id;
	
	let info = newObject.querySelectorAll('.info p, .info a');
	
	info[0].innerHTML = element.name;
	info[0].addEventListener('click', listenerNotFoodProduct);
	info[0]._id = element.id;
	newObject._id = element.id;
	let color = colors[element.id_color - 1];
	info[1].innerHTML = color;
	info[1].classList.add(color);
	info[2].innerHTML = element.URL;
	info[2].href = element.URL;
	info[3].innerHTML = element.price;

	show(newObject);
	container.appendChild(newObject);
}
function initialize() {

	var length = Object.keys(DATA.category).length;
	var zero = [];
	for (let i = 0; i < length; i++) {
        let C = DATA.category[i];
		if (C.id_sub_category == 0) {
			inviteCategory(_$('container'), C);
			zero.push(C.id);
			delete DATA.category[i];
        }
	}

	while (Object.keys(DATA.category).length > 0) {
		for (key in DATA.category) {
			let C = DATA.category[key];
			
			let category = _$('category_' + C.id_sub_category);

			if (category) {
				inviteCategory(category.querySelector('.category__container'), C);
				delete DATA.category[key];				
			}
		}		
	}

	for (key in DATA.FoodProduct) {
		PRODUCT = DATA.FoodProduct[key];
		inviteFoodProduct(_$('category_' + PRODUCT.id_category).querySelector('.category__container'), PRODUCT);
	}
	for (key in DATA.NotFoodProduct) {
		PRODUCT = DATA.NotFoodProduct[key];
		inviteNotFoodProduct(_$('category_' + PRODUCT.id_category).querySelector('.category__container'), PRODUCT);
	}

	delete DATA;

	_$('change_category_name').addEventListener('click', function(){
		let name = _$('edit_category').querySelector('input').value;
		var request = new XMLHttpRequest();
		request.open("POST", 'ajax/change_category_name.php', true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.send('NAME=' + _$('edit_category').querySelector('input').value + '&ID=' + CATEGORY_CURRENT);
	
		request.onreadystatechange = function () {
			if (this.status == 200 && this.readyState === XMLHttpRequest.DONE) {
				if ('ok' == request.responseText) {
					_$('category_' + CATEGORY_CURRENT).querySelector('.info p:first-child').innerHTML = name;
					show('container');
					hide('edit_category');
				}
				else {
					console.log(request.responseText);
				}
			}
		}
	});

	_$('back_to_tree').addEventListener('click', function() {
		show('container');
		hide('edit_category');
	});

	_$('change_category_root').addEventListener('click', function() {
		show('category_choice');
		show('container');
		hide('edit_category');

		let products = document.querySelectorAll('.food_product');

		products.forEach(function(product) {
			hide(product);
		});

		let categories = document.querySelectorAll('.category .info p:first-child');
		
		categories.forEach(function(category){
			category.removeEventListener('click', listenerCategory);
			category.addEventListener('click', listenerChangeCategoryRoot);
		});

		hide(_$('category_' + CATEGORY_CURRENT));

	});

	_$('food_change_category_root').addEventListener('click', function(){
		show('category_choice');
		show('container');
		hide('edit_food_product_edit');

		let products = document.querySelectorAll('.food_product');
		products.forEach(function(product) {
			hide(product);
		});

		let categories = document.querySelectorAll('.category .info p:first-child');
		categories.forEach(function(category){
			category.removeEventListener('click', listenerCategory);
			category.addEventListener('click', listenerChangeFoodRoot);
		});
	});

	_$('not_food_change_category_root').addEventListener('click', function(){
		show('category_choice');
		show('container');
		hide('edit_not_food_product_edit');

		let products = document.querySelectorAll('.food_product');
		products.forEach(function(product) {
			hide(product);
		});

		let categories = document.querySelectorAll('.category .info p:first-child');
		categories.forEach(function(category){
			category.removeEventListener('click', listenerCategory);
			category.addEventListener('click', listenerChangeNotFoodRoot);
		});
	});

	_$('new_category').addEventListener('click', function(){
		let name = _$('subcategory_name').value;

		var request = new XMLHttpRequest();
		request.open("POST", 'ajax/new_category.php', true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.send('NAME=' + name + '&ID=' + CATEGORY_CURRENT);
	
		request.onreadystatechange = function () {
			if (this.status == 200 && this.readyState === XMLHttpRequest.DONE) {
				inviteCategory(_$('category_' + CATEGORY_CURRENT).querySelector('.category__container'), {'name': name, 'id':request.responseText});
				show('container');
				hide('edit_category');
			}
		}
	});

	_$('new_food_product').addEventListener('click', function(){
		let product = {'id': CATEGORY_CURRENT, 'name': _$('name_food_product').value, 'price': _$('price_food_product').value};
		var request = new XMLHttpRequest();
		request.open("POST", 'ajax/new_food_product.php', true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.send('NAME=' + product.name + '&ID=' + product.id + '&PRICE=' + product.price );
	
		request.onreadystatechange = function () {
			if (this.status == 200 && this.readyState === XMLHttpRequest.DONE) {
				product.id = request.responseText;
				inviteFoodProduct(_$('category_' + CATEGORY_CURRENT).querySelector('.category__container'), product);
				show('container');
				hide('edit_category');
			}
		}
		
	});

	_$('new_not_food_product').addEventListener('click', function(){
		console.log(CATEGORY_CURRENT);
		
		let product = {'id': CATEGORY_CURRENT,
			'name': _$('name_not_food_product').value,
			'price': _$('price_not_food_product').value,
			'id_color': _$('color_not_food_product').value,
			'URL': _$('url_not_food_product').value};

		var request = new XMLHttpRequest();
		request.open("POST", 'ajax/new_not_food_product.php', true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.send('NAME=' + product.name + '&ID=' + product.id + '&PRICE=' + product.price + '&COLOR=' + product.id_color + '&URL=' + product.URL);
	
		request.onreadystatechange = function () {
			if (this.status == 200 && this.readyState === XMLHttpRequest.DONE) {
				product.id = request.responseText;
				inviteNotFoodProduct(_$('category_' + CATEGORY_CURRENT).querySelector('.category__container'), product);
				show('container');
				hide('edit_category');
			}
		}
		
	});

	_$('remove_category').addEventListener('click', function(){

		var request = new XMLHttpRequest();
		request.open("POST", 'ajax/remove_category.php', true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.send('ID=' + CATEGORY_CURRENT);
	
		request.onreadystatechange = function () {
			if (this.status == 200 && this.readyState === XMLHttpRequest.DONE) {
				if ('ok' == request.responseText) {
					let el = _$('category_' + CATEGORY_CURRENT);
					el.parentElement.removeChild(el);
					show('container');
					hide('edit_category');
				}
				else {
					console.log(request.responseText);
				}
			}
		}
	});

	_$('new_not_food_product_edit').addEventListener('click', function(){
		let name = _$('name_not_food_product_edit').value;
		let id_color = _$('color_not_food_product_edit').value;
		let color = colors[id_color - 1];
		let url = _$('url_not_food_product_edit').value;
		let price = _$('price_not_food_product_edit').value;

		var request = new XMLHttpRequest();
		request.open("POST", 'ajax/change_not_food_product.php', true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.send('ID=' + NOT_FOOD_PRODUCT_CURRENT + '&NAME=' + name + '&ID_COLOR=' + id_color + '&URL=' + url + '&PRICE=' + price);
	
		request.onreadystatechange = function () {
			if (this.status == 200 && this.readyState === XMLHttpRequest.DONE) {
				if ('ok' == request.responseText) {
					let info = _$('not_food_product_' + NOT_FOOD_PRODUCT_CURRENT).querySelectorAll('.info p, .info a');
					info[0].innerHTML = name;
					info[1].innerHTML = color;
					info[1].classList.add(color);
					info[2].innerHTML = url;
					info[2].href = url;
					info[3].innerHTML = price;
			
					show('container');
					hide('edit_not_food_product_edit');
				}
				else {
					console.log(request.responseText);
				}
			}
		}
	});

	_$('new_food_product_edit').addEventListener('click', function(){
		let name = _$('name_food_product_edit').value;
		let price = _$('price_food_product_edit').value;

		var request = new XMLHttpRequest();
		request.open("POST", 'ajax/change_food_product.php', true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.send('ID=' + FOOD_PRODUCT_CURRENT + '&NAME=' + name + '&PRICE=' + price);
	
		request.onreadystatechange = function () {
			if (this.status == 200 && this.readyState === XMLHttpRequest.DONE) {
				if ('ok' == request.responseText) {
					let info = _$('food_product_' + FOOD_PRODUCT_CURRENT).querySelectorAll('.info p');
					info[0].innerHTML = name;
					info[1].innerHTML = price;
					show('container');
					hide('edit_food_product_edit');
				}
				else {
					console.log(request.responseText);
				}
			}
		}
	});

	_$('food_back_to_tree').addEventListener('click', function(){
		show('container');
		hide('edit_food_product_edit');
	});

	_$('not_food_back_to_tree').addEventListener('click', function() {
		show('container');
		hide('edit_not_food_product_edit');		
	});

	_$('not_food_remove').addEventListener('click', function() {

		var request = new XMLHttpRequest();
		request.open("POST", 'ajax/not_food_remove.php', true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.send('ID=' + NOT_FOOD_PRODUCT_CURRENT);
	
		request.onreadystatechange = function () {
			if (this.status == 200 && this.readyState === XMLHttpRequest.DONE) {
				if ('ok' == request.responseText) {
					_$('not_food_product_' + NOT_FOOD_PRODUCT_CURRENT).remove();
					show('container');
					hide('edit_not_food_product_edit');
				}
				else {
					console.log(request.responseText);
				}
			}
		}
	});

	_$('food_remove').addEventListener('click', function() {

		var request = new XMLHttpRequest();
		request.open("POST", 'ajax/food_remove.php', true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.send('ID=' + FOOD_PRODUCT_CURRENT);
	
		request.onreadystatechange = function () {
			if (this.status == 200 && this.readyState === XMLHttpRequest.DONE) {
				if ('ok' == request.responseText) {
					_$('food_product_' + FOOD_PRODUCT_CURRENT).remove();
					show('container');
					hide('edit_food_product_edit');
				}
				else {
					console.log(request.responseText);
				}
			}
		}
	});
}

function listenerCalculateSummProduct() {
	let container = this.parentElement.parentElement.parentElement;
	let products = container.querySelectorAll('.food_product');
	let SUMM = 0;
	products.forEach(function(product){
		SUMM += Number(product.querySelector('.money').innerHTML);
	});
	alert(SUMM);
}

function listenerChangeCategoryRoot() {

	var id_sub = this._id;

	var request = new XMLHttpRequest();
	request.open("POST", 'ajax/change_category_root.php', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	request.send('ID_SUB=' + id_sub + '&ID_CURRENT=' + CATEGORY_CURRENT);

	request.onreadystatechange = function () {
		if (this.status == 200 && this.readyState === XMLHttpRequest.DONE) {
			if ('ok' == request.responseText) {
				_$('category_' + id_sub).querySelector('.category__container').appendChild(_$('category_' + CATEGORY_CURRENT));

				let categories = document.querySelectorAll('.category .info p:first-child');
			
				categories.forEach(function(category){
					category.removeEventListener('click', listenerChangeCategoryRoot);
					category.addEventListener('click', listenerCategory);
				});
			
				let products = document.querySelectorAll('.food_product');
			
				products.forEach(function(product) {
					if (product.id != 'not_food_product' && product.id != 'food_product') {
						show(product);
					}
				});
			
				hide('category_choice');
				show(_$('category_' + CATEGORY_CURRENT));
			}
			else {
				console.log(request.responseText);
			}
		}
	}
}

function listenerChangeFoodRoot() {
	var id_sub = this._id;

	$.ajax({url:'ajax/change_food_root.php', data:{ID_SUB:id_sub, ID_CURRENT:FOOD_PRODUCT_CURRENT}})
		.done(function(){
			_$('category_' + id_sub).querySelector('.category__container')
				.appendChild(_$('food_product_' + FOOD_PRODUCT_CURRENT));
			let categories = document.querySelectorAll('.category .info p:first-child');
		
			categories.forEach(function(category){
				category.removeEventListener('click', listenerChangeFoodRoot);
				category.addEventListener('click', listenerCategory);
			});
		
			let products = document.querySelectorAll('.food_product');
		
			products.forEach(function(product) {
				if (product.id != 'not_food_product' && product.id != 'food_product') {
					show(product);
				}
			});
		
			hide('category_choice');
		});
}

function listenerChangeNotFoodRoot() {
	var id_sub = this._id;

	$.ajax({url: 'ajax/change_not_food_root.php', data: { ID_SUB: id_sub, ID_CURRENT: NOT_FOOD_PRODUCT_CURRENT}})
		.done(function(){
			_$('category_' + id_sub).querySelector('.category__container')
				.appendChild(_$('not_food_product_' + NOT_FOOD_PRODUCT_CURRENT));
			let categories = document.querySelectorAll('.category .info p:first-child');
		
			categories.forEach(function(category){
				category.removeEventListener('click', listenerChangeFoodRoot);
				category.addEventListener('click', listenerCategory);
			});
		
			let products = document.querySelectorAll('.food_product');
		
			products.forEach(function(product) {
				if (product.id != 'not_food_product' && product.id != 'food_product') {
					show(product);
				}
			});
		
			hide('category_choice');
		});
}

window.addEventListener('load', function () {
	$.ajax('ajax/get_catalog.php').done(function(json) {
		DATA = json;
		initialize();
	});
});