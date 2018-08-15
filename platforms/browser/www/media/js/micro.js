/* JQUERY based */
$().ready(function(){
	checkHeight();
	/* init main funct */
	CC();
	
	externalLinks();
	
	$(window).resize(function(){
		checkHeight();
	});
	
	var goTop=$(".gotop");
	$(window).scroll(function(){
		if($(this).scrollTop()>$(".container").height()/3){
			goTop.addClass('visible');
		}else {
			goTop.removeClass('visible');
		}
	});
	
	goTop.click(function(e){
		$("html, body").stop().animate({scrollTop:0}, '500', 'swing');
		e.preventDefault();
		return false;
	})
	
	$(".mobilemenu .button").click(function(e){
		var t=$(this).attr("data-target");
		if($(this).hasClass("opened")) {
			$(this).removeClass("opened")
			$("#"+t).removeClass("open");
			return;
		}
		$(this).parent().find(".button").removeClass("opened");
		$(this).addClass("opened");
		$(".sidebar .open").removeClass("open");
		$("#"+t).addClass("open");
		e.preventDefault();
	})
	
	$(".insertvalue").each(function(k,o){
		if($(o).hasClass('showmore')){
			$(o).one("click",function(){
				$(this).html($(this).attr('data-insert'));
			})
		} else {
			$(o).html($(o).attr('data-insert'));
		}
	});
});


function externalLinks(){
	$("a").each(function(i,a){
		if($(a).attr('href').indexOf('#/get/')>=0){
			$(a).click(function(e){
				var href=$(a).attr('href');
				location.href=href.replace(/^.*\#/g,'');
				return false;
			});
		};
	})
}

function checkHeight(){
	if($(window).width()<800){
			$("body").addClass("mobile");
		} else {
			$("body").removeClass("mobile");
		}
		
	
	/*if($("body").hasClass("mobile")) {
		$(".wr-gray").css("min-height","0");
		return;
	}
	var h1=$(".wr-green").height();
	var h2=$(".wr-gray").height();
	var hs=$(".sidebar").height();
	if(h1+h2==hs) return;
	if(h1+h2<hs){
		$(".wr-gray").css("min-height",(hs-h1)+"px");
	} else {
		$(".wr-gray").css("min-height","0");
	}*/
}

$(".content").attr('unselectable','on').css({'-moz-user-select':'-moz-none','-moz-user-select':'none','-o-user-select':'none','-khtml-user-select':'none','-webkit-user-select':'none','-ms-user-select':'none','user-select':'none'}).bind('selectstart', function(){ return false; });

function CC(){
	$("#form").submit(function(e){
		e.preventDefault();
		var	parent=$(this).attr("data-parent"),
			text=$(this).find(".c-t").val(),
			name=$(this).find(".name").val(),
			email=$(this).find(".email").val();
			
		$.post("/do.php",{action:"comm",parent:parent,text:text,name:name,email:email},function(data){
			if(data.error){
				$(".warnings").show().text(data.error);
				return;
			}
			if(data.added){
				$("#form, .cc .title").hide(200);
				$(".cc").prepend('<div class="title">Комментарий отправлен</div> (после подтверждения он появится на странице)');
			} else {
				$(".warnings").show().text('Неизвестная ошибка при добавлении');
			}
		},"json");
		return false;
	});
}