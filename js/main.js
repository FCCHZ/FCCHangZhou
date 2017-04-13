;(function () {
 /*移动端菜单点击事件*/
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#freeCC-offcanvas, .js-freeCC-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) { //检查被选元素是否包含指定的 class

    			$('body').removeClass('offcanvas');  //移除样式
    			
				$(".js-freeCC-nav-toggle").removeClass("active");
	    	}
	    
	    	
	    }
		});

	};

/* 关闭画布菜单 */
	var offcanvasMenu = function() {

		$('#page').prepend('<div id="freeCC-offcanvas" />');//在被选元素的开头（仍位于内部）插入指定内容
		$('#page').prepend('<a href="#" class="js-freeCC-nav-toggle freeCC-nav-toggle freeCC-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();//生成被选元素的副本，包含子节点、文本和属性
		$('#freeCC-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#freeCC-offcanvas').append(clone2);

		$('#freeCC-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#freeCC-offcanvas')
			.find('li') //获得当前元素集合中每个元素的后代，通过选择器、jQuery 对象或元素来筛选
			.removeClass('has-dropdown');

		//移动端下拉菜单
		$('.offcanvas-has-dropdown').mouseenter(function(){ //当鼠标指针穿过元素时，会发生 mouseenter 事件
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')//获得当前元素集合中每个元素的后代，通过选择器、jQuery 对象或元素来筛选
				.slideDown(500, 'easeOutExpo');		//使用滑动效果，显示隐藏的被选元素		
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){ //当调整浏览器窗口的大小时，发生 resize 事件

			if ( $('body').hasClass('offcanvas') ) { //检查被选元素是否包含指定的 class

    			$('body').removeClass('offcanvas');
    			$('.js-freeCC-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-freeCC-nav-toggle', function(event){ //在被选元素及子元素上添加一个或多个事件处理程序
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');  //对设置或移除被选元素的一个或多个类进行切换
			event.preventDefault();  //取消事件的默认动作

		});
	};


 /* 内容路径 */
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {  //滚动到元素触发事件

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){ //dingshi shua xin 

					$('body .animate-box.item-animate').each(function(k){ //规定为每个匹配元素规定运行的函数
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');  //向被选元素附加数据，或者从被选元素获取数据
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){  ////在被选元素及子元素上添加一个或多个事件处理程序
			
			event.preventDefault();

			$('html, body').animate({  //执行 CSS 属性集的自定义动画
				scrollTop: $('html').offset().top //返回或设置匹配元素相对于文档的偏移（位置）
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){  //当用户滚动指定的元素时，会发生 scroll 事件

			var $win = $(window);
			if ($win.scrollTop() > 200) { //回或设置匹配元素的滚动条的垂直位置
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// 加载动画
	var loaderPage = function() {
		$(".freeCC-loader").fadeOut("slow");  //使用淡出效果来隐藏被选元素，假如该元素是隐藏的
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);  //把数字转换为字符串，结果的小数点后有指定位数的数字
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#freeCC-counter').length > 0 ) {
			$('#freeCC-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	
	$(function(){
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		goToTop();
		loaderPage();
		counterWayPoint();
	});


}());