$(document).ready(function() {
	$(window).on( 'resize', function () {
		$('.Row').height( $(window).width() / 5 + 10 );
	}).resize();

	$('body').layout({ applyDemoStyles: true });
		
	$("#model").jstree({
		"core" : {
			"check_callback" : function (operation) {
				return operation === "move_node" ? false : true;
			},
			'data' : [{ "id" : "j1_0", "parent" : "#", "text" : "Entity", "icon" : "jstree-folder" }]
		},	
		'types' : {
			"default" : {
				"icon" : "jstree-file"
			}			
		},
		"plugins" : [ 'dnd', 'types' ]
	});
	
	$('#view').jstree({
		'core' : {
			"check_callback" : true,
			'data' : [{ "id" : "j1_0", "parent" : "#", "text" : "Entity", "icon" : "jstree-folder" }]
		},	
		'types' : {
			"default" : {
				"icon" : "jstree-file"
			}	
		},
		"plugins" : ['types' ]
	});
	
	$('#model').on('loaded.jstree', function(){
		loadNodes('');		
	});
	
	$(document).on('dnd_move.vakata', function(e, data){
		var t = $(data.event.target);			
		if(t.closest('.drop').length) 
			data.helper.find('.jstree-icon').removeClass('jstree-er').addClass('jstree-ok');		
		else
			data.helper.find('.jstree-icon').removeClass('jstree-ok').addClass('jstree-er');		
	}).on('dnd_stop.vakata', function(e, data){
		var t = $(data.event.target);
		
		if(t.closest('.drop').length) {
			var $view = $('#view');
			var $root = $view.jstree(true).get_node('j1_0');
			$view.jstree(true).create_node($root, data.element.text);
			$view.jstree(true).open_all();
		}
	});
	
	$('#search').keyup(function(e){
		var txt = $(this).val();

		if(e.which == 13 || txt == '')		//13 is enter in all browsers
			loadNodes(txt);
	})
	
	function loadNodes(str){
		var nodes = new Array();
		var regex = "^" + str;
		
		$.ajax({ url: 'db/database.txt', async: false, success: function(data){
			var all_nodes = data.split(';');
				
			for(i = 0; i < all_nodes.length; i++)
				if(all_nodes[i].match(regex))
					nodes.push(all_nodes[i]);			
		}});
		
		var $model = $('#model');
		var $root = $model.jstree(true).get_node('j1_0');
		
		$model.jstree(true).get_children_dom($root).each(function(){
			$model.jstree(true).delete_node(this.id);
		});
		
		for(i = 0; i < nodes.length; i++)
			$model.jstree(true).create_node($root, nodes[i]);	
		
		$model.jstree(true).open_all();
	}
	
  });