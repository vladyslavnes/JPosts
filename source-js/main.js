localStorage.posts = localStorage.posts || '[]'
window.lastCardID = 0
window.posts = JSON.parse(localStorage.posts)

$('#addNewArticle').modal()

function render() {
	$('.noArticles').show()

	$('main').html('')

	localStorage.posts = JSON.stringify(window.posts)

	window.posts.forEach(function(post,i) {
		makeCard(i,post.title,post.text,post.img)
	})
	$('.noArticles').hide()
}
render()

function makeCard(id,title,text,img) {
	return $('main').append('<div class="card-panel card-image" id="preview_'+id+'">'+ '<img style="width: 100%;" src="'+img+'" alt="'+title+'">'+ '<h4 class="card-title">'+title+'</h4>'+ '<div class="card-content">'+ '<p class="desciption flow-text">'+text.split(' ').slice(0,41).join(' ')+'...</p>'+ '<div class="card-action">'+ '<button class="btn-flat modal-trigger" data-target="fullArticle_'+id+'" onclick="fullTextCard('+id+')">Read All</button>'+ '<button id="'+id+'" class="btn-flat" onclick="deleteCard('+id+')">Delete</button>'+ '</div>'+ '</div>'+ '</div> <div id="fullArticle_'+id+'" class="modal modal-fixed-footer modal-content"><h2>'+title+'</h2><p class="flow-text">'+text+'</p><div class="modal-footer"><button onclick="editCard('+id+')" class="modal-action btn-flat btn-large waves-effect">Edit</button><button onclick="saveCard('+id+')" class="modal-action btn-flat btn-large waves-effect waves-green">Save</button></div></div>')
}

function deleteCard(id) {
	window.posts.splice(id,1);
	render()
}

function addImage(e) {
	console.log($('#imageInput')[0].files[0],e)
	var file = document.querySelector('#imageInput').files[0]
	var reader = new FileReader()

	reader.onloadend = function () {
		window.img = reader.result
	}

	reader.readAsDataURL(file)
}

function addCard(title,text) {
	window.posts.push({
		id: window.lastCardID++,
		title: title,
		text: text,
		img: window.img
	})
	render()
}

$('.btn.addNewArticle').click(function() {	
	addCard($('input#newArticleTitle').val(),$('textarea#newArticleText').val())
	$('input#newArticleTitle').val(''),$('textarea#newArticleText').val(''),$('input#newArticleImage').val('')
})
	
function fullTextCard(id) {
	$('#fullArticle_'+id).modal()
}

function editCard(id) {
	$('#fullArticle_'+id).find('h2, .flow-text').attr('contenteditable','true')
}

function saveCard(id) {
	window.posts[id].text = $('#fullArticle_'+id+' p').text()
	localStorage.posts = JSON.stringify(window.posts)
	render()
}