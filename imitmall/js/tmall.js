(function($){
  /*各模块的图像导入*/
  $.imageInner = function() {
    var $ids = $('div[id]');
    //alert($ids.eq(0).attr("id"));
    for(var i=0;i<=5;i++){
      var $m_lis = $ids.eq(i).find('ul').eq(1).children('li');
      var $r_lis = $ids.eq(i).find('ul').eq(2).children('li');
      for(var j=0;j<$m_lis.length;j++){
        var imgsrc = 'images/' + $ids.eq(i).attr('id') + '/part_m/' + (j+1) + ".jpg"
        $m_lis.eq(j).find('img').attr('src' , imgsrc);
      }
      for(var j=0;j<$r_lis.length;j++){
        var imgsrc = 'images/' + $ids.eq(i).attr('id') + '/part_r/' + (j+1) + ".jpg"
        $r_lis.eq(j).find('img').attr('src' , imgsrc);
      }
    }
  };
  /*“猜你喜欢”模块调用的ajax信息*/
  $.guessMall = function(n){
    $.getJSON('data/guesslist.json', function(data, textStatus) {
        var $g_ul = $('<ul></ul>').addClass('guesslist');
        for(var i=n;i<n+5;i++){
          var $g_li = $('<li></li>');
          var $g_link = $('<a></a>').attr('href' , '#');
          var $g_divtoimg = $('<div></div>').css({
            "width" : "235px",
            "height" : "235px"
          });
          var $g_img = $('<img />').attr('src', data[i].src);
          $g_divtoimg.append($g_img);
          var $g_ctn = $('<p></p>').addClass('guessctn').html(data[i].ctn);
          var $g_price = $('<p></p>').addClass('guessprice').html(data[i].price);
          $g_link.append($g_divtoimg).append($g_ctn).append($g_price).appendTo($g_li);
          $g_li.addClass('guessli').appendTo($g_ul);
        }
        $g_ul.appendTo('.guessctn');
    });
    return true;
  };
  /*图片轮播*/
  $.fn.sliderShow = function() {
    return this.each(function() {
      var $thumb = $('.thumb').children('li');
      var $viewpage = $('.vp_img');
      var $vp_img = $('.vp_img').children('li');
      var $vpcontainer = $('.vpcontainer');
      var $vpcontainer_bg = $('.vpcontainer_bg').find('li');
      var vp_bg = ["#d3e5f1","#e8e8e8","#fea8cf","#e8e8e8","#ff566d","#080740"];
      var current = 6;
      var ipage = 1;
      var $li_div = $('<div></div>').css({
        "width": "16px",
        "height": "16px",
        "background": "white",
        "border-radius": "16px",
        "padding": "2px 0 0 2px"
      });
      $vpcontainer_bg.each(function(index) {
        $(this).css('background-color', vp_bg[index]);
      });
      $thumb.each(function(index) {
        $(this).on("click" , function() {
          if(index != current){
            $vp_img.fadeOut(500);
            $vpcontainer_bg.fadeOut(500);
            $vp_img.eq(index).fadeIn(500);
            $vpcontainer_bg.eq(index).fadeIn(500);
            $thumb.eq(current).find('div').remove();
            $(this).append($li_div);
            current = index;
            ipage = current;
          }
        });
        var choose = null;
        $(this).hover(function() {
          var $this = $(this);
          clearInterval(pageInterval);
          choose = setTimeout(function(){ $this.trigger('click'); } , 300);
        }, function() {
          clearTimeout(choose);
          pageInterval = setInterval(thumbPage , 4000);
        });
      });
      $thumb.eq(0).trigger("click");
      function thumbPage(){
        ipage++;
        if(ipage >= 6){
          ipage = 0;
        }
        $thumb.eq(ipage).trigger("click");
      }
      var pageInterval = setInterval(thumbPage , 4000);
      $viewpage.hover(function() {
        clearInterval(pageInterval);
      }, function() {
        pageInterval = setInterval(thumbPage , 4000);
      });
    });
  };
  /*****热门品牌模块操作*****/
  /*热门品牌显示信息*/
  $.fn.hothover = function (){
    var mli = $(this).find('.hot_m').find('li');
    var rli = $(this).find('.hot_r').find('li');
    mli.each(function(index, el) {
      var $divmask = $('<div></div>').attr('class', 'hot_mask');
      var $i = $('<i></i>').attr('class', 'hot_clt').html('&#xe616;');
      var $div = $('<div></div>').attr('class', 'maskdiv');
      var $p1 = $('<p></p>').attr('class', 'maskp1').html('关注人数50万');
      var $p2 = $('<p></p>').attr('class', 'maskp2').html('点击进入');
      var maskshow = null;
      var maskhide = null;
      $div.append($p1).append($p2);
      $divmask.append($i).append($div);
      var $this = $(this);
      $this.append($divmask);
      $this.hover(function() {
        clearTimeout(maskhide);
        maskshow = setTimeout(function(){
          $divmask.stop().fadeIn(200);
        } , 1);
      }, function() {
        clearTimeout(maskshow);
        maskhide = setTimeout(function(){
          $divmask.stop().fadeOut(200);
        } , 1);
      });
    });
    rli.each(function(index, el) {
      var $this = $(this);
      var rin = null;
      var rout = null;
      $this.hover(function() {
        clearTimeout(rout);
        rin = setTimeout(function (){
          $this.find('img').stop().animate({opacity: 0.7});
        }, 10);
        $this.find('.hrp1').css('color', 'red');
        $this.find('.hrp2').css('color', 'red');
      }, function() {
        clearTimeout(rin);
        rout = setTimeout(function (){
          $this.find('img').stop().animate({opacity: 1});
        }, 10);
        $this.find('.hrp1').css('color', 'black');
        $this.find('.hrp2').css('color', '#9c9c9c');
      });
    });
  };
  /*热门品牌图片放大*/
  $.fn.magnify = function (){
    $(this).find('li').each(function(index, el) {
      var $this = $(this);
      var bigger = null;
      var smaller = null;
      $this.hover(function() {
        clearTimeout(smaller);
        bigger = setTimeout(function(){
          $this.find('img').stop().animate({width: "145px", left: "-2px", top: "-3px"});
        }, 30);
      }, function() {
        clearTimeout(bigger);
        smaller = setTimeout(function(){
          $this.find('img').stop().animate({width: "133px", left: "2px", top: "0px"});
        }, 10);
      });
    });
  };
  /*各个块的专属颜色显示与图像动画*/
  $.fn.colorAndImg = function (){
    var color = ["#f7a945" , "#19c8a9" , "#f25453" , "#64c333" , "#0ba6e8" , "#eb5f8e"];
    for(var i=0;i<color.length;i++){
      $(this).eq(i).find("i").css('color', color[i]);
      $(this).eq(i).find(".imgctn").css('background-color', color[i]);
      $(this).eq(i).find(".part_m_p2").css('color', color[i]);
      $(this).eq(i).find(".part_r_p2").css('color', color[i]);
      $(this).eq(i).find(".part_m").find("li").each(function(index, el) {
        var moveimg = null;
        var backimg = null;
        var $this = null;
        $this = $(this).find('div');
        $(this).hover(function() {
          clearTimeout(backimg);
          moveimg = setTimeout(function (){
          $this.stop().animate({right: "5px"} , 200);
          } , 10);
        }, function() {
          clearTimeout(moveimg);
          backimg = setTimeout(function (){
            $this.stop().animate({right: "0px"} , 200);
          } , 10);
        });
      });
      $(this).eq(i).find(".part_r").find("li").each(function(index, el) {
        var moveimg = null;
        var backimg = null;
        var $this = null;
        $this = $(this).find('div');
        $(this).hover(function() {
          clearTimeout(backimg);
          moveimg = setTimeout(function (){
          $this.stop().animate({right: "8px"} , 200);
          } , 10);
        }, function() {
          clearTimeout(moveimg);
          backimg = setTimeout(function (){
            $this.stop().animate({right: "3px"} , 200);
            } , 10);
        });
      });
    }
  };
  /*网页顶部菜单显示细节*/
  $.fn.showDetail = function (){
    $(this).find('.navwrap').each(function(index, el) {
      if($(this).find('.appear').length != 0){

        var classname = "";
        var findclass = "";
        var leave = true;
        var $this = $(this).find('.span1');
        classname = $this.attr('class');
        classname = $.trim(classname.replace("appear" , "").replace("underline" , "").replace("span1" , ""));
        findclass = "div." + classname;

        $(this).hover(function() {
          if(classname != "phe"){
            $this.css({'background-color': 'white',
                      'border-left': '1px solid #e5e5e5',
                      'border-right': '1px solid #e5e5e5',

            });
          }
          $(this).find(findclass).css('display', 'block');
        }, function() {
          $this.css({'background-color': 'transparent',
                      'border-left': '1px solid transparent',
                      'border-right': '1px solid transparent',

          });
          $('.site-nav').css('border-bottom', '1px solid #e5e5e5;');
          $(this).find(findclass).css('display', 'none');
        });

      }
    });
  };
  /*导航菜单选择时出现猫耳朵*/
  $.fn.chooseNav = function (){
    $(this).each(function(index, el) {
      var $this = null;
      var timeout = null;
      $this = $(this);
      $this.hover(function() {
        timeout = setTimeout(function(){
          $this.find('.hover-pic').animate({top: "-10px", opacity: 1}, 200)
        },50);
      }, function() {
        clearTimeout(timeout);
        $this.find('.hover-pic').animate({top: "-5px", opacity: 0}, 10);
      });
    });
  };
  /*显示菜单导航细节*/
  $.fn.chooseCfy = function (){
    var $cfyctn_li = $(this).children('ul').children('li');
    var color = ["#e54077","#427def","#6347ed","#e54077","#6347ed","#427def","#fa5c5c","#7a831",
                 "#f7a831","#427def","#dd2727","#427def","#f7a831","#3bc7b0","#dd2727","#3bc7b0"];
    $cfyctn_li.find('.cfyctn_con').find('a').css('color', '#666');
    $cfyctn_li.each(function(index, el) {
      var $this = $(this);
      $(this).hover(function() {
        $this.find('.cfyctn_line').css('color', color[index]);
        $this.find('.cfyctn_line')
             .css({'background-color': 'white', 'opacity': 1});
        $this.find('.cfyctn_line').find('a').css({'font-weight': 'bold', 'color': color[index]});
        $this.find('.cfyctn_detail').css('display', 'block');
      }, function() {
        $this.find('.cfyctn_line').css('color', 'black');
        $this.find('.cfyctn_line')
             .css({'background-color': '#f5f5f5', 'opacity': 0.8});
        $this.find('.cfyctn_line').find('a').css({'font-weight': 'normal', 'color': 'black'});
        $this.find('.cfyctn_detail').css('display', 'none');
      });

      var $ctn_a = $this.find('.cfyctn_con').find('a');
      $this.find('.cfyctn_con').find('.getcolor').css('color', color[index]);
      $ctn_a.each(function(i, el) {
        $(this).hover(function() {
          $(this).css('color', color[index]);
        }, function() {
          if(!$(this).hasClass('getcolor')){
            $(this).css('color', '#666');
          }
        });
      });

      var $cfyctn_brand = $this.find('.cfyctn_brand');
      for(var i = 0; i<17; i++){
        var $img = $('<img />');
        var $a = $('<a></a>').attr('href', '#');
        var src = "images/cfyctn/" + (index+1) + "/" + (i+1) + ".jpg";
        if(i==16){
          $img.attr('class', 'last-img');
        }
        $img.attr('src', src).appendTo($a);
        $a.appendTo($cfyctn_brand);
      }
    });
  };
  /*右边个人栏目操作*/
  $.fn.ownOperate = function (){
    $(this).find('.rh-ele').each(function(index, el) {
      var $this = $(this);
      var $changeico = $this.find('.rh-changeico');
      var $part2 = $this.find('.rh-part-2');
      var $qrimg = $this.find('.rh-qrimg');
      var show = null;
      var hide = null;
      $this.hover(function() {
        $this.find('.rh-part-1').css('background-color', '#c40000');
        if($this.find('.rh-bike').length == 1){
          $this.find('.part-ico').css('background-image', 'url(images/right-helper/bike-hov.png)');
        }
        if($changeico.length == 1){
          var imgurl = $changeico.css('background-image').replace('.png' , '-hov.png');
          $changeico.css('background-image', imgurl);
        }
        if($part2.length == 1){
          clearTimeout(hide);
          show = setTimeout(function (){
            $part2.css('display', 'block').animate({opacity: 1, right: "35px"} , 350);
          } , 200);
        }
        if($qrimg.length == 1){
          $qrimg.css('display', 'block');
        }
      }, function() {
        $this.find('.rh-part-1').css('background-color', 'transparent');
        if($this.find('.rh-bike').length == 1){
          $this.find('.part-ico').css('background-image', 'url(images/right-helper/bike.png)');
        }
        if($changeico.length == 1){
          var imgurl = $changeico.css('background-image').replace('-hov.png' , '.png');
          $changeico.css('background-image', imgurl);
        }
        if($part2.length == 1){
          clearTimeout(show);
          hide = setTimeout(function (){
            $part2.animate({opacity: 0, right: "70px"} , 300 , function (){
              $(this).css('display', 'none');
            });
          } , 10);
        }
        if($qrimg.length == 1){
          $qrimg.css('display', 'none');
        }
      });
    });
    $(document).scroll(function(event) {
      if($(window).scrollTop() == 0){
        $('.rh-rt-top').fadeOut(500);
      }
      if($(window).scrollTop() > 0){
        $('.rh-rt-top').fadeIn(500);
      }
    });
  };
  /*左边导航操作*/
  $.fn.naving = function (){
    var color = ["#f7a945" , "#19c8a9" , "#f25453" , "#64c333" , "#0ba6e8" , "#eb5f8e" , "#000"];
    var ids = ["#kids" , "#outdoors" , "#home" , "#grocery" , "#electronics" , "#fashion" , "#guesswhat"];
    var scrolling = null;
    $(this).each(function(index, el) {
      var $this = $(this);
      var $navchild = $('.navchild');
      $this.hover(function() {
        $this.parent('li').css('background-color', color[index]);
      }, function() {
        $this.parent('li').css('background-color', 'rgba(0, 0, 0, 0.6)');
      });
      $this.click(function(event) {
        clearTimeout(scrolling);
        var $pst = $(ids[index]);
        scrolling = setTimeout(function (){
          $('body').stop().animate({scrollTop: $pst.offset().top - 50});
        } , 100);
        $navchild.css('background-color', 'transparent');
        $this.css('background-color', color[index]);
      });
    });
    $(document).scroll(function(event) {
      for(var i=0;i<=ids.length;i++){
        if($(window).scrollTop() >= $(ids[i]).offset().top-150){
          $('.navchild').css('background-color', 'transparent');
          $('.navchild').eq(i).css('background-color', color[i]);
        }
        if($(window).scrollTop() < ($(ids[0]).offset().top - 200)){
          $('.navchild').css('background-color', 'transparent');
        }
      }
    });
  };
})(jQuery);


$(document).ready(function(){
  var guessnum = 0;
  var admin =true;
  var topnavup = null;
  var topnavdown = null;
  var leftnavshow = null;
  var leftnavhide = null;
  $.imageInner();
  $(".vp_img").sliderShow();
  $(document).scroll(function(event) {
    if($(window).scrollTop()+$(window).height() >= $('#guesswhat').offset().top+$('#guesswhat').height()){
      if(admin){
        admin =false;
        if(guessnum < 25){
          admin = $.guessMall(guessnum);
          guessnum = guessnum + 5;
        }
      }
    }
    if($(window).scrollTop() >= $('.hot').offset().top) {
      clearTimeout(topnavdown);
      topnavup = setTimeout(function(){
        $('.top-nav').stop().animate({top: "0px"}, 220);
      } , 50);
    }else {
      clearTimeout(topnavup);
      topnavdown = setTimeout(function(){
        $('.top-nav').stop().animate({top: "-50px"}, 220);
      } , 50);
    }
    if($(window).scrollTop() >= ($('.hot').offset().top-300)){
      clearTimeout(leftnavhide);
      leftnavshow = setTimeout(function(){
        $('.left-nav').stop().fadeIn();
      } , 50);
    }else{
      clearTimeout(leftnavshow);
      leftnavhide = setTimeout(function(){
        $('.left-nav').stop().fadeOut();
      } , 50);
      $('.navchild').css('background-color', 'transparent');
    }
  });
  $('.hot').hothover();
  $('.hottype').magnify();
  $('div[id]').colorAndImg();
  $('.nav2').showDetail();
  $('.vp_senior div').hover(function() {
    $(this).css({"background-color": "rgba(255,255,255,0.9)"});
  }, function() {
    $(this).css({"background-color": "rgba(255,255,255,0.6)"});
  });
  $('.loginmall').hover(function() {
    $(this).css({"background-color": "rgba(0,0,0,0.8)"});
  }, function() {
    $(this).css({"background-color": "rgba(0,0,0,0.5)"});
  });
  $('.connav1 li').chooseNav();
  $('.cfyctn').chooseCfy();
  $('.right-helper').ownOperate();
  $('.navchild').naving();
});
