window.onload = function (){
  var h_utility = document.getElementsByClassName("header-utility")[0];
  var list1_ul = document.getElementsByClassName("list1-ul");//导航菜单
  var list1_li = document.getElementsByClassName("list1-li");//导航菜单
  var list2_ul = document.getElementsByClassName("list2-ul");//二联导航
  var oBody = document.getElementsByTagName("body")[0];
  var aList2_li = document.getElementsByClassName("list2-li");
  var aList3_ul = document.getElementsByClassName("list3-ul");//三联导航
  var thisUl, thisLi, menu_flag=false;
  var srh_form = document.getElementsByClassName("header-search")[0];
  var srh_btn = srh_form.getElementsByTagName("button")[0];
  var srh_form2 = document.getElementsByClassName("header-search2")[0];
  var img1 = document.getElementsByClassName("ctn1-img")[0];
  var ctn_pdc = document.getElementsByClassName("ctn-pdc");
  var footer_left = document.getElementsByClassName("footer-left")[0];
  var footer_right = document.getElementsByClassName("footer-right")[0];
  var left_m_title = footer_left.getElementsByClassName("footer-m-title")[0];
  var l_nav_item = footer_left.getElementsByClassName("footer-nav-item");
  var r_nav_item = footer_right.getElementsByClassName("footer-nav-item");
  var back_top = document.getElementsByClassName("back-to-top")[0];
  var m_menu = document.getElementsByClassName("tinymenu")[0];
  var srh_m = document.getElementsByClassName("search_m")[0];
  var header = document.getElementById("header");
  var content = document.getElementById("content");
  var footer = document.getElementById("footer");


  for(var i=0;i<list1_li.length;i++){
    var mList2_li = list1_li[i].getElementsByClassName("list2-li");

    list1_li[i].onclick = function (){
      var oList2_ul = this.getElementsByClassName("list2-ul")[0];
      var oIco = this.getElementsByClassName("li1-ico")[0];

      if(thisUl){
        if(thisUl != oList2_ul){
          thisUl.className = "list2-ul";
        }
      }
      if(thisLi){
        if(thisLi != this){
          thisLi.className = "list1-li";
          if(document.body.clientWidth+17 >1024){
            thisLi.getElementsByClassName("li1-ico")[0].style.borderColor = "white";
          }
        }
      }
      if(oList2_ul){
        if(oList2_ul.className.indexOf("toshow") == -1){
          oList2_ul.className += " toshow";
        }else {
          oList2_ul.className = "list2-ul";
        }
        thisUl = oList2_ul;
        if(document.body.clientWidth+17 >1024){
          if(this.className.indexOf("tochose") != -1){
            this.className = "list1-li";
            oIco.style.borderColor = "white";
          }else {
            this.className += " tochose";
            thisLi = this;
            oIco.style.borderColor = "#343434";
          }
        }
      }
    };

    if(mList2_li){
      for(var j=0;j<mList2_li.length;j++){
        mList2_li[j].onclick = function (ev){
          if(document.body.clientWidth+17 <= 1024){
            ev.stopPropagation();
            var mList3_ul = this.getElementsByClassName("list3-ul")[0];
            if(mList3_ul.className.indexOf("toshow") != -1){
              mList3_ul.className = "list3-ul";
            }else {
              mList3_ul.className += " toshow";
            }
          }
        };
      }
    }

  }
  /*展示三联导航*/
  for(var i=0;i<aList2_li.length;i++){
    aList2_li[i].onmouseover = function (ev){
      if(document.body.clientWidth+17 > 1024){
        var oList3_ul = this.getElementsByClassName("list3-ul")[0];
        if(oList3_ul){
          oList3_ul.className += " toshow";
          this.style.borderRight = "1px solid white";
        }
      }
    };
    aList2_li[i].onmouseout = function (){
      if(document.body.clientWidth+17 > 1024){
        var oList3_ul = this.getElementsByClassName("list3-ul")[0];
        if(oList3_ul){
          oList3_ul.className = "list3-ul";
          this.style.borderRight = "1px solid #e1e1e1";
        }
      }
    };
  }

  changeImg();

  /*oBody.onclick = function (ev){
    //ev.stopPropagation();
    for(var i=0;i<list2_ul.length;i++){
      list2_ul[i].className = "list2-ul";
    }
    for(var i=0;i<aList3_ul.length;i++){
      aList3_ul[i].className = "list3-ul";
    }
  };*/

  srh_m.onclick = function (ev){
    if(document.body.clientWidth <= 1067){
      ev.preventDefault();
      if(srh_form2.style.display == "block"){
        srh_form2.style.display = "none";
      }else {
        srh_form2.style.display = "block";
      }
    }
  };
  /*窗口大小改变时隐藏form2搜索表单、图片的切换、footer菜单格式的改变*/
  window.onresize = function (){
    var oRound = document.getElementsByClassName("round");

    if(document.body.clientWidth+17>1084){
      srh_form2.style.display = "none";
    }
    if(document.body.clientWidth+17 <= 767){
      img1.src = "images/kv_img_mobile.jpg";
      for(var i=0;i<l_nav_item.length;i++){
          l_nav_item[i].style.display = "none";
      }
      for(var i=0;i<l_nav_item.length;i++){
        var l_nav_tit = l_nav_item[i].getElementsByTagName("h4")[0];
        var l_nav_list = l_nav_item[i].getElementsByClassName("footer-nav-list")[0];
        l_nav_list.style.display = "none";
      }
      for(var i=0;i<r_nav_item.length;i++){
        var right_m_title = r_nav_item[i].getElementsByClassName("footer-m-title")[0];
        var r_nav_list = r_nav_item[i].getElementsByClassName("footer-nav-list")[0];
        r_nav_list.style.display = "none";
      }
    }else {
      img1.src = "images/kv_img_pc.jpg";
      for(var i=0;i<l_nav_item.length;i++){
          l_nav_item[i].style.display = "block";
      }
      for(var i=0;i<l_nav_item.length;i++){
        var l_nav_tit = l_nav_item[i].getElementsByTagName("h4")[0];
        var l_nav_list = l_nav_item[i].getElementsByClassName("footer-nav-list")[0];
        l_nav_list.style.display = "block";
      }
      for(var i=0;i<r_nav_item.length;i++){
        var right_m_title = r_nav_item[i].getElementsByClassName("footer-m-title")[0];
        var r_nav_list = r_nav_item[i].getElementsByClassName("footer-nav-list")[0];
        r_nav_list.style.display = "block";
      }

      for(var i=0;i<oRound.length;i++){
        var mRound = oRound[i];
        removeClass(mRound ,"round");
      }
    }
    if(document.body.clientWidth+17 > 1024){
      var oShow = document.getElementsByClassName("toshow");
      
    }
    changeImg();
  };
  /*767px宽的屏幕footer菜单点击事件*/
  left_m_title.onclick = function (){
    if(document.body.clientWidth+17 <= 767){
      if(this.className){
        if(this.className.indexOf("round") != -1){
          this.className = "footer-m-title";
        }else {
          this.className += " round";
        }
      }
      for(var i=0;i<l_nav_item.length;i++){
        if(l_nav_item[i].style.display != "block"){
          l_nav_item[i].style.display = "block";
        }else {
          l_nav_item[i].style.display = "none";
        }
      }
    }
  };
  for(var i=0;i<l_nav_item.length;i++){
    var l_nav_tit = l_nav_item[i].getElementsByTagName("h4")[0];
    l_nav_tit.nth = i;
    l_nav_tit.onclick = function (){
      if(this.className){
        if(this.className.indexOf("round") != -1){
          this.className = "sec-tit";
        }else {
          this.className += " round";
        }
      }
      if(document.body.clientWidth+17 <= 767){
        var nth = this.nth;
        var l_nav_list = l_nav_item[nth].getElementsByClassName("footer-nav-list")[0];
        if(l_nav_list.style.display != "block"){
          l_nav_list.style.display = "block";
        }else {
          l_nav_list.style.display = "none";
        }
      }
    };
  }
  for(var i=0;i<r_nav_item.length;i++){
    var right_m_title = r_nav_item[i].getElementsByClassName("footer-m-title")[0];
    right_m_title.nth = i;
    right_m_title.onclick = function (){
      if(this.className){
        if(this.className.indexOf("round") != -1){
          this.className = "footer-m-title";
        }else {
          this.className += " round";
        }
      }
      if(document.body.clientWidth+17 <= 767){
        var nth = this.nth;
        var r_nav_list = r_nav_item[nth].getElementsByClassName("footer-nav-list")[0];
        if(r_nav_list.style.display != "block"){
          r_nav_list.style.display = "block";
        }else {
          r_nav_list.style.display = "none";
        }
      }
    };
  }
  back_top.onclick = function (ev){
    ev.preventDefault();
    backTop();
  };
  m_menu.onclick = function (){
    showMenu();
  };


  function changeImg(){
    var ctn1 = document.getElementsByClassName("ctn1")[0];
    var c1_img = ctn1.getElementsByTagName("img")[0];
    if(document.body.clientWidth+17 <= 767){
      c1_img.src = c1_img.dataset.srcMobile;
    }else {
      c1_img.src = c1_img.dataset.srcPc;
    }
    for(var i=0;i<ctn_pdc.length;i++){
      var img_cg = ctn_pdc[i].getElementsByTagName("img");
      //alert(img_cg.length);
      for(var j=0;j<img_cg.length;j++){
        var oImg = img_cg[j];
        //alert(oImg.dataset.srcPc);
        if(document.body.clientWidth+17 <= 1024){
          oImg.src = oImg.getAttribute("data-src-mobile");
        }else {
          oImg.src = oImg.getAttribute("data-src-pc");
        }
      }
    }
  }
  function removeClass(obj , nam){
    if(obj.className.indexOf(nam) == -1){
      return;
    }else {
      var c_str = "";
      var cls = obj.className;
      var c_arr = cls.split(" ");
      for(var i=0;i<c_arr.length;i++){
        if(c_arr[i] != nam){
          if(i != c_arr.length-1){
            c_str = c_str + c_arr[i] + " ";
          }else {
            c_str = c_str + c_arr[i];
          }
        }
      }
      obj.className = c_str;
    }
  }
  function backTop(){
    var btt;
    btt = setInterval(function(){
      if(document.body.scrollTop > 0){
        document.body.scrollTop -= 100;
      }else {
        document.body.scrollTop = 0;
        clearInterval(btt);
      }
    } , 10);
  }
  function showMenu(){
    if(document.body.className){
      if(document.body.className == "tomovel"){
        document.body.className = "";
      }else {
        document.body.className = "tomovel";
      }
    }else {
      document.body.className = "tomovel";
    }

    if(h_utility.className.indexOf("tomover") != -1){
      h_utility.className = "header-utility";
      list1_ul[0].className = "list1-ul";
      srh_form.className = "header-search";
    }else {
      h_utility.className += " tomover";
      list1_ul[0].className += " tomover";
      srh_form.className += " tomover";
    }
    if(menu_flag){
      m_menu.style.background = "url(images/ico-menu.svg) no-repeat 13px 19px";
      m_menu.style.backgroundColor = "transparent";
      m_menu.style.borderBottom = "none";
      menu_flag = false;
    }else {
      m_menu.style.background = "url(images/ico-menu-on.svg) no-repeat 13px 19px";
      m_menu.style.backgroundColor = "#f1f1f1";
      m_menu.style.borderBottom = "1px solid #dadee1";
      menu_flag = true;
    }
  }
};
