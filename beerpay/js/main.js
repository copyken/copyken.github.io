(function ($){
	/*导航滚动网页*/
	$.fn.naver = function (){
		this.each(function (){
			var href = this.href;
			var arr = "#" + href.split("#")[1];
			if(arr != "#"){
				$('body').animate({
					scrollTop: $(arr).position().top
				});
			}else{
				$('body').animate({
					scrollTop: 0
				});
			}
			if($(window).width() <= 780){
				$('#collapse-id').collapse('hide');
			}
		});
	};
	$.fn.turnNav = function (){
		this.each(function (){
			var href = this.href;
			var arr = "#" + href.split("#")[1];
		});
	};	
})(jQuery);

$(document).ready(function (){
	$('.bg-home').eq(0).css("minHeight" , $(window).height()+"px");
	/*窗口改变时间*/
	$(window).resize(function (){
		$('.bg-home').eq(0).css("minHeight" , $(window).height()+"px");
	});
	/*向下箭头点击*/
	$('.next').eq(0).click(function (ev){
		ev.preventDefault();
		$('body').animate({
			scrollTop: $('#navigation').position().top
		});
	});
	/*阻止导航默认操作*/
	$('#navigation').find('.navbar-nav').find('a').click(function (ev){
		ev.preventDefault();
		$(this).naver();
	});
	/*模态框出现时导航的宽度调整*/
	$('#navigation').find('.btn').click(function (){
		if($('#navigation').hasClass('navbar-fixed-top')){
			$('#navigation').css("marginRight" , "17px");
		}
	});
	$('#myModal').on('hidden.bs.modal', function () {
		$('#navigation').css("marginRight" , "0px");
	});
	/*滚动事件影响导航*/
	$(document).scroll(function (){
		if($('body').scrollTop() > 643){
			$('#navigation').addClass("navbar-fixed-top");
			$('.navbar-right').css('marginRight' , '0px');
			$('.whatis-beerpay').css('paddingTop' , '150px');
		}else{
			$('#navigation').removeClass("navbar-fixed-top");
			$('.navbar-right').css('marginRight' , '-15px');
			$('.whatis-beerpay').css('paddingTop' , '90px');
		}

		$('#navigation').find('.navbar-nav').find('a').each(function (){
			var href = this.href;
			var arr = "#" + href.split("#")[1];
			$(this).removeClass('active');
			if(arr != "#"){
				if($(arr).position().top <= ($('body').scrollTop()+60) && ($('body').scrollTop()+60) < ($(arr).position().top + $(arr).height())){
					$(this).addClass('active');
				}
			}else{
				if($(window).height() > $('body').scrollTop())
				$(this).addClass('active');
			}
		});
	});
});