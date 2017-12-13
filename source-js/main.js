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
	return $('main').append('<div class="card-panel card-image" id="preview_'+id+'">'+ '<img style="width: 100%;" src="'+img+'" alt="'+title+'">'+ '<h4 class="card-title">'+title+'</h4>'+ '<div class="card-content">'+ '<p class="desciption flow-text">'+text.split(' ').slice(0,41).join(' ')+'...</p>'+ '<div class="card-action">'+ '<button class="btn-flat modal-trigger" data-target="fullArticle_'+id+'" onclick="fullTextCard('+id+')">Read All</button>'+ '<button id="'+id+'" class="btn-flat" onclick="deleteCard('+id+')">Delete</button>'+ '</div>'+ '</div>'+ '</div> <div id="fullArticle_'+id+'" class="modal modal-fixed-footer modal-content"><p class="flow-text">'+text+'</p><div class="modal-footer"><button onclick="editCard('+id+')" class="modal-action btn-flat btn-large waves-effect">Edit</button><button class="modal-action btn-flat btn-large waves-effect waves-green">Save</button></div></div>')
}

function deleteCard(id) {
	window.posts.splice(id,1);
	render()
}

function addCard(title,text,img) {
	window.posts.push(
		{
			id: window.lastCardID++,
			title: title,
			text: text,
			img: img
		}
	)
	render()
}

$('.btn-flat.addNewArticle').click(function() {	
	addCard($('input[name="newArticleTitle"]').val(),$('textarea[name="newArticleText"]').val(),$('input[name="newArticleImage"]').val())
	$('input[name="newArticleTitle"]').val(''),$('textarea[name="newArticleText"]').val(''),$('input[name="newArticleImage"]').val('')
})
	
function fullTextCard(id) {
	$('#fullArticle_'+id).modal()
}

// function fullTextCard(id,e) {
// 	$('.modal').modal()	
// }

// $('.btn-flat.fullTextCard').click(function() {

// })

function editCard(id) {
	fullTextCard(id)
	$('#fullArticle_'+id+' p').hide()
	$('#fullArticle_'+id).append('<textarea id="textInput_'+id+'">'+$('#fullArticle_'+id+' p').text+'</textarea>')
	$('#fullArticle_'+id+' btn.save').show()
	
	// .after($('<input type="text" id="" />'))
}


/*$('.btn-flat.editCard').click(function() {
	console.log(var card = $(this).parent().parent().parent(),
	var id = card.attr('id'),
	card.find($('.description').val()),
	card.find($('h4').attr('contenteditable','true')),
	card.find($('img').after($('input').val($('input[name="newArticleImage"]').prop('src'))))
})*/
