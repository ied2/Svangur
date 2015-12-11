document.addEventListener('DOMContentLoaded', function() {
  main.init();
});

var main = (function() {

    var listOfRestaurants;
    
	
    function init() {
        var searchButton = document.querySelector('#searchButton');
        var checkbox = document.querySelectorAll('.check');
        var distanceInput = document.querySelector('#distanceInput');
        var distance = distanceInput.value;
        var allCheckBox = document.querySelector('#all');

        for(var i = 0; i < checkbox.length; i++) {
            checkbox[i].addEventListener('click', function() {
                filter();
            });
        }

        allCheckBox.addEventListener('click', function() {
            if(allCheckBox.checked == true) {
                for(var i = 0; i < checkbox.length; i++) {
                    checkbox[i].checked = true;
                }
            }
            else {
                for(var i = 0; i < checkbox.length; i++) {
                    checkbox[i].checked = false;
                }
            }
            filter();
        });

        searchButton.addEventListener('click', function() {
            var distance = distanceInput.value;
            create(distance);
        });

        create(distance);
	}

    function create(distance) {
        
        // Remove restaurants
        var myNode = document.querySelector(".res-data");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

        $.ajax({
            type: "GET",
            url: '/getRestaurants',
            crossDomain: true,
            data: {distance: distance},
            success: function (data) {
                console.log(data);
                listOfRestaurants = data;
                filter();
            }
        });
    }

    function filter() {

        var list = listOfRestaurants;

        var x = [];

        for(var i = 0; i < list.length; i++) {
            if(pizza.checked == true) {
                if (1 == list[i].pizza) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(hamburger.checked == true) {
                if (1 == list[i].hamburger) {
                    x.push(list[i]);
                    continue;
                }
            }
             if(sushi.checked == true) {
                if (1 == list[i].sushi) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(seafood.checked == true) {
                if (1 == list[i].seafood) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(steak.checked == true) {
                if (1 == list[i].steik) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(indian.checked == true) {
                if (1 == list[i].indian) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(italian.checked == true) {
                if (1 == list[i].italian) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(asian.checked == true) {
                if (1 == list[i].asian) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(fastfood.checked == true) {
                if (1 == list[i].fastfood) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(fancy.checked == true) {
                if (1 == list[i].fancy) {
                    x.push(list[i]);
                    continue;
                }
            }
            if(healthy.checked == true) {
                if (1 == list[i].healthy) {
                    x.push(list[i]);
                    continue;
                }
            }
        }

        var myNode = document.querySelector(".res-data");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

        for (var i=0; i<x.length; i++) {

            var ni = document.querySelector(".res-data");
            var newdiv = document.createElement("div");
            newdiv.addEventListener("click", function (e) {
                window.location.href = this.id;
            });
            var elem = document.createElement("img");
            if (x[i].logo == 001) elem.setAttribute("a", "hallo");
            else elem.setAttribute("src", x[i].logo);
            newdiv.setAttribute("id", x[i].restaurant_id);
            newdiv.setAttribute("class", "col-md-6 col-xs-6 rContainer");
            // var name = document.createTextNode(restaurants[i].name);
            // newdiv.appendChild(name);
            var dist = document.createElement("a");
            dist.textContent = (x[i].distance + " m");
            ni.appendChild(newdiv);
            newdiv.appendChild(elem);
            newdiv.appendChild(dist);
        }
}

  return {
    init: init,
  };
})();




function sortByDistance() {

        var newList = listOfRestaurants;
        newList.sort(sort_by("distance", false, function(a){return a}));

    }

    var sort_by = function(field, reverse, primer) {

            var key = primer ?
                function(x) {return primer(x[field])} :
                function(x) {return x[field]};

            reverse = !reverse ? 1 : -1;

            return function (a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }