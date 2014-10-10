$(document).ready(function() {

	$(window).on( 'resize', function () {
		$('.Row').height( $(window).width() / 5 + 10 );
	}).resize();

	$('body').layout({ applyDemoStyles: true });
	
	loadData('');
	
	$("#jstree").jstree({
	"core" : {
	  "check_callback" : true,
	  'data' : [{ "id" : "1", "parent" : "#", "text" : "Entity" }]
	},
	"plugins" : [ "dnd" ]
	});
	
	$('#myModel').jstree({
	'core' : {
		"check_callback" : true,
		'data' : [{ "id" : "1", "parent" : "#", "text" : "Entity" }]
	}
	});
	
	$(document)
		.on('dnd_move.vakata', function(e, data){
			var t = $(data.event.target);
			if(t.closest('.drop').length) {
				data.helper.find('.jstree-icon').removeClass('jstree-er').addClass('jstree-ok');
			}
			else{
				data.helper.find('.jstree-icon').removeClass('jstree-ok').addClass('jstree-er');
			}
		}).on('dnd_stop.vakata', function(e, data){
			var t = $(data.event.target);
			if(t.closest('.drop').length) {
				var $my_view = $('#myModel');
				var $root = $my_view.jstree(true).get_node('1');
				$my_view.jstree(true).create_node($root, data.element.text);
				$my_view.jstree(true).open_all();
			}
		});
	
	$('#search').keyup(function(e){
		if(e.which == 13){ 			//13 is enter in all browsers
			loadData('a');
		}
	})

	function loadData(str){
		alert("READ")
		$.get('db/database.txt', function(data) {
			alert('reading file');
		});
	};
	
  });