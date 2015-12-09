document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded: main');
  ToDos.init();
});

var ToDos = (function() {

	function init() {

        	$.ajax({
		      type: "GET",
		      url: '/getRestaurants',
		      crossDomain: true,
		      data: {},
		      success: function (data) {
		          console.log(data);
		      }
  			});
	}

  return {
    init: init,
  };
})();