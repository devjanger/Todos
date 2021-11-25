var todos = class{
	constructor(content, checked){
		this.content = content;
		this.checked = checked;
	}


	getContent(){
		return this.content;
	}
	getCheck(){
		return this.checked;
	}

}


var todosList = new Array();



// 설정 초기화
function initialize(){
	$('.delete').on('click', (item)=>{
		var idx = $(item.target).attr('idx');
		deleteTodosByIdx( idx );

		printTodos();

	})




	$('.checkbox:checked').each( (i)=>{
			$( $('.checkbox:checked')[i] ).parent('.item').css('background', 'rgba(0, 0, 0, 0.105)');
			$( $('.checkbox:checked')[i] ).siblings('.content').css('text-decoration-line', 'line-through');	
	} )

	



	$('.checkbox').change((item)=>{
		if( $(item.target).is(':checked') ){


			var idx = $(item.target).parent('.item').attr('idx');
			checkingTodosByIdx( idx, true );
			printTodos();

			isCheckedAll()

		} else {


			var idx = $(item.target).parent('.item').attr('idx');
			checkingTodosByIdx( idx, false );
			printTodos();

			isCheckedAll()

		}

	})


	// 데이터 세이브

	localStorage.setItem('Todos', JSON.stringify(todosList));

}

// 입력 이벤트
$(".insert").keydown(function(key) {
	if( $('.insert').val() == null || $('.insert').val() == undefined || $('.insert').val() == '' )
	{} else {	
	    if (key.keyCode == 13) {
	    	todosList.push( new todos( $('.insert').val().replace('<', '&lt').replace('>', '&gt') , false) );
			$('.insert').val('');
			printTodos();
	    }
    }
});

$('.submit').on('click', ()=>{
	if( $('.insert').val() == null || $('.insert').val() == undefined || $('.insert').val() == '' )
	{} else {
		todosList.push( new todos( $('.insert').val().replace('<', '&lt').replace('>', '&gt') , false) );
		$('.insert').val('');
		printTodos();
	}

})




var AllCheckToggle = false;


$(".All .AllCheck").on('click', ()=>{
	if( AllCheckToggle ){

		for(let i=0; i<todosList.length; i++){
			todosList[i].checked = false;
		}

		$('.All .AllCheck').val('✔');
		AllCheckToggle = false;

	} else {

		for(let i=0; i<todosList.length; i++){
			todosList[i].checked = true;
		}

		$('.All .AllCheck').val('❌');
		AllCheckToggle = true;

	}

	printTodos();

})

$('.All .AllDelete').on('click', ()=>{

	if( confirm('정말 모든 Todo를 지우시겠습니까?') ){
		todosList = [];
		printTodos();
	}
})



function printTodos(){

	$('.todos-list').empty();

	var checked = 0;

	for(let i=0; i<todosList.length; i++){

		if( todosList[i].checked ){	
			checked += 1;
			$('.todos-list').append('<div class="item" idx='+i+'>\
								<input class="checkbox" type="checkbox" name="">\
								<span class="content">'+todosList[i].content+'</span>\
								<span class="delete" idx='+i+' >🗑️</span>\
							</div>');
			$( $('.checkbox')[i] ).prop('checked', true);
		} else{
		$('.todos-list').append('<div class="item" idx='+i+'>\
							<input class="checkbox" type="checkbox" name="">\
							<span class="content">'+todosList[i].content+'</span>\
							<span class="delete" idx='+i+' >🗑️</span>\
						</div>');
			$( $('.checkbox')[i] ).prop('checked', false);
		}
	}

	$('.top h5').text( checked + "/" + todosList.length );

	initialize();

}


function checkingTodosByIdx(idx, checked){
	todosList[idx].checked = checked;
}

function deleteTodosByIdx(idx){
	todosList.splice(idx, 1);
}

function isCheckedAll(){
	var checkedCount = 0;
	for(let i=0; i<todosList.length; i++){
		if( todosList[i].checked )
			checkedCount += 1;
	}

	if( checkedCount == todosList.length && todosList.length != 0 ){
		AllCheckToggle = true;
	} else { AllCheckToggle = false; }


	if( AllCheckToggle ){
		$('.All .AllCheck').val('❌');
	} else {
		$('.All .AllCheck').val('✔');
		
	}
}


$(document).ready(function(){

	// 로컬 스토리지 불러오기
	if( localStorage.getItem('Todos') != null && localStorage.getItem('Todos') != undefined  && localStorage.getItem('Todos') != '' && localStorage.getItem('Todos') != '[]' ){
		todosList = JSON.parse( localStorage.getItem('Todos') );
	}



	isCheckedAll();

	printTodos();


})	