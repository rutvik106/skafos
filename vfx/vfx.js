
function vfxAnimJellyDrop(){

	
		
		$('#login-box')
		.velocity({			
			
			properties: { width: 330 },
			options: { delay:100, duration: 500 }			
			
		})
		
		.velocity({			
			
			properties: { height: 195 },
			options: { duration: 500,easing:[100,10] }			
			
		});
		
}


	function vfxAnimInitial(){

			$('#title')
			.velocity('transition.swoopIn',{

				options: { duration: 500}


			});


		vfxAnimJellyDrop();


	}


	function vfxAnimConnected(){
		(function($){

			$('#main-content')
			.velocity('transition.bounceOut',{

				options: { duration: 500}

			})

		})(jQuery);

	}


	function vfxAnimMissingCredentials()
	{
		(function($){
			
			$('#missing-credentials')
			.velocity({
				
				
				properties: { opacity: 1 },
				options: { delay:100, duration: 500 }
				
				
			}).velocity('reverse',{delay:1500,});
			
		})(jQuery);
	}


	function vfxAnimHideLoginPage(){	

		(function($){	

			$('#main-content')
			.velocity({		

				properties: { opacity: 0 },
				options: { delay:100, duration: 1000 }		

			});			
			
		})(jQuery);
		
	}


	function vfxAnimTopBar(){	

		(function($){	

			$('#top-bar')
			.velocity({		

				properties: { translateY: [0,500], opacity:1 },
				options: { delay:500, duration: 1000, easing:[100,10] }		

			});		
			
		})(jQuery);

		vfxAnimSideBar();
		
	}

	function vfxAnimSideBar(){	

		(function($){	

			$('#side-bar')
			.velocity({		

				properties: { translateX: [0,500], opacity:1 },
				options: { delay:500, duration: 1000, easing:[100,10] }		

			});		
			
		})(jQuery);

		vfxAnimMapContainer();
		
	}

	function vfxAnimMapContainer(){	

		(function($){	

			$('#my-map-container')
			.velocity({		

				properties: { translateX: [0,500], translateY: [0,500], opacity:1 },
				options: { delay:500, duration: 1000, easing:[100,10] }		

			});		
			
		})(jQuery);

		vfxAnimSingleFriend();
		
	}

	function vfxAnimShowAboutBox(){	

		(function($){	

			$('#login-box')
			.velocity('transition.flipXOut',{
				
				duration: 500,
				opacity: 0

			});	

		})(jQuery);

		vfxAnimAboutBox();
		
	}


	function vfxAnimAboutBox()
	{
		(function($){	

			$('#about-box')
			.velocity('transition.flipXIn',{

				delay:200,
				duration: 500,
				opacity: 1,

			});

		})(jQuery);
	}

	function vfxAnimHideAboutBox(){	

		(function($){	

			$('#about-box')
			.velocity('transition.flipXOut',{

				duration: 500,
				opacity: 0,

			});

		})(jQuery);

		vfxAnimLoginBox();
		
	}


	function vfxAnimLoginBox()
	{
		(function($){	

			$('#login-box')
			.velocity('transition.flipXIn',{
				
				delay:200,
				duration: 500,
				opacity: 1

			});	

		})(jQuery);
		
	}


	function vfxAnimSingleFriend()
	{
		(function($){	

			$('.single-friend')
			.velocity('transition.perspectiveDownIn',{
				
				delay: 600,
				stagger: 200,
				opacity: 1

			});	

		})(jQuery);
		
	}

	function vfxAnimShowOptionsMenu()
	{
		(function($){	

			$('#options-menu-dropdown')
			.velocity('transition.slideDownIn',{

				opacity: 1,
				duration:200

			});	

		})(jQuery);
		
	}

	function vfxAnimHideOptionsMenu()
	{
		(function($){	

			$('#options-menu-dropdown')
			.velocity('transition.slideUpOut',{

				opacity: 0,
				duration:200

			});	

		})(jQuery);
		
	}


	function vfxAnimLogout()
	{
		(function($){

			$('#my-map-wrapper')
			.velocity('transition.bounceOut',{

				options: { duration: 500}


			})


		})(jQuery);
	}


	function vfxAnimShowNotification()
	{
		$('#friend-list-view-wrapper').velocity('transition.bounceUpOut',{

			duration: 500,
			opacity: 0,
			display: 'none'

		});

		$('#request-list-view-wrapper').velocity('transition.bounceUpIn',{

			delay: 500,
			duration: 500,
			opacity: 1,
			display: 'block'

		});
	}


	function vfxAnimHideNotification()
	{
		$('#request-list-view-wrapper').velocity('transition.bounceUpOut',{

			duration: 500,
			opacity: 0,
			display: 'none'

		});

		$('#friend-list-view-wrapper').velocity('transition.bounceUpIn',{

			delay: 500,
			duration: 500,
			opacity: 1,
			display: 'block'

		});
	}


		// (function($){

		// 	$divs=$('#friend-profile-pic-ic, #lbl-friend-name');

		// 	$(document).on('click', '.single-friend', function(e){


		// 		//console.log("i was clicked from in");
		// 		e.preventDefault();
		// 		e.stopPropagation();

		// 		$divs
		// 		.velocity('transition.slideRightIn',{

		// 			duration: 200


		// 		})


		// 	})




		// })(jQuery);


