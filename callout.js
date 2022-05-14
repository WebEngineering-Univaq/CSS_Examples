function callout(linkattr) {
	let THIS = this;	
	let calloutBox=null;
	
	THIS.init = function() {
		calloutBox = $("<div class='calloutBox' role='dialog'/>");
		calloutBox.css({"display":"none","padding":"10px","width":"40%", "position":"fixed", "left":"20px", "top":"20px", "backgroundColor":"#DDD", "border": "2px solid #AAA", "boxShadow": "5px 5px 5px #555", "minHeight":"30%"});
		$("body").append(calloutBox);
	}
	
	THIS.hideDetail = function() {
		calloutBox.fadeOut("fast");
	}

	THIS.showDetail = function(html) {	
		calloutBox.empty();
		calloutBox.append(html);
		calloutBox.fadeIn("fast");
	}

	THIS.showRenderingDetail = function(id) {	
		if (id!=calloutBox.attr("data-showing")) {
			let t = $("#"+id);
			t.parent().append(calloutBox); //move in place to apply the same CSS rules (more or less)
			calloutBox.attr("data-showing",id);
			THIS.showDetail(t.clone());
		}
	}

	THIS.hideRenderingDetail = function(id) {	
		if (id==calloutBox.attr("data-showing")) {
			calloutBox.attr("data-showing","");
			THIS.hideDetail();	
		}
	}

	THIS.autoLink = function(linkattr="aria-controls") {
		$("["+linkattr+"]").each(function() {
			let target = $(this); 
			let id = target.attr(linkattr);
			target.on("mousedown",function(){
				THIS.showRenderingDetail(id);	
			});
			target.on("mouseup",function(){
				THIS.hideRenderingDetail(id);	
			});
		});
	}
	
	THIS.init();
	if (linkattr !== false) {
		if (typeof(linkattr)!="string" || linkattr=="") {linkattr="aria-controls";}
		if (linkattr) THIS.autoLink(linkattr);
	}
}