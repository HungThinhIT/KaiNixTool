// TOGGLE SECTIONS
// querySelector, jQuery style
var $ = function (selector) {
  return document.querySelectorAll(selector);
};

// Define tabs, write down them classes
var tabs = [
  '.tabbed-section__selector-tab-1',
  '.tabbed-section__selector-tab-2',
  '.tabbed-section__selector-tab-3',
  '.tabbed-section__selector-tab-4',
  '.tabbed-section__selector-tab-5',
  '.tabbed-section__selector-tab-6',
  '.tabbed-section__selector-tab-7',
  '.tabbed-section__selector-tab-8',
  '.tabbed-section__selector-tab-9',
  '.tabbed-section__selector-tab-10',
  '.tabbed-section__selector-tab-11',
  '.tabbed-section__selector-tab-12',
  '.tabbed-section__selector-tab-13',
  '.tabbed-section__selector-tab-14'
];

// Create the toggle function
var toggleTab = function(element) {
  var parent = element.parentNode;
  
  // Do things on click
  $(element)[0].addEventListener('click', function(){
    
    
    // Check if the clicked tab contains the class of the 1 or 2
    if(this.classList.contains('tabbed-section__selector-tab-1')) {
      // and change the classes, show the first content panel
      $('.tabbed-section-1')[0].classList.remove('hidden');
      $('.tabbed-section-1')[0].classList.add('visible');
		  // Remove the active class on all tabs.
			// climbing up the DOM tree with `parentNode` and target 
			// the children ( the tabs ) with childNodes
			this.parentNode.childNodes[1].classList.remove('active');
			this.parentNode.childNodes[3].classList.remove('active');
			this.parentNode.childNodes[5].classList.remove('active');
			this.parentNode.childNodes[7].classList.remove('active');
			this.parentNode.childNodes[9].classList.remove('active');

			// Then, give `this` (the clicked tab), the active class
			this.classList.add('active');
      // Hide the second
      $('.tabbed-section-2')[0].classList.remove('visible');
      $('.tabbed-section-2')[0].classList.add('hidden');
      $('.tabbed-section-3')[0].classList.remove('visible');
      $('.tabbed-section-3')[0].classList.add('hidden');
      $('.tabbed-section-4')[0].classList.remove('visible');
      $('.tabbed-section-4')[0].classList.add('hidden');
	  $('.tabbed-section-5')[0].classList.remove('visible');
      $('.tabbed-section-5')[0].classList.add('hidden');
    }

    if(this.classList.contains('tabbed-section__selector-tab-2')) {
      // and change the classes, show the second content panel
      $('.tabbed-section-2')[0].classList.remove('hidden');
      $('.tabbed-section-2')[0].classList.add('visible');
      
      // Remove the active class on all tabs.
			// climbing up the DOM tree with `parentNode` and target 
			// the children ( the tabs ) with childNodes
			this.parentNode.childNodes[1].classList.remove('active');
			this.parentNode.childNodes[3].classList.remove('active');
			this.parentNode.childNodes[5].classList.remove('active');
			this.parentNode.childNodes[7].classList.remove('active');
			this.parentNode.childNodes[9].classList.remove('active');

			// Then, give `this` (the clicked tab), the active class
			this.classList.add('active');
      // Hide the first
      $('.tabbed-section-1')[0].classList.remove('visible');
      $('.tabbed-section-1')[0].classList.add('hidden');
      $('.tabbed-section-3')[0].classList.remove('visible');
      $('.tabbed-section-3')[0].classList.add('hidden');
      $('.tabbed-section-4')[0].classList.remove('visible');
      $('.tabbed-section-4')[0].classList.add('hidden');
	  $('.tabbed-section-5')[0].classList.remove('visible');
      $('.tabbed-section-5')[0].classList.add('hidden');
    }
    
    if(this.classList.contains('tabbed-section__selector-tab-3')) {
      // and change the classes, show the second content panel
      $('.tabbed-section-3')[0].classList.remove('hidden');
      $('.tabbed-section-3')[0].classList.add('visible');
      
      // Remove the active class on all tabs.
			// climbing up the DOM tree with `parentNode` and target 
			// the children ( the tabs ) with childNodes
			this.parentNode.childNodes[1].classList.remove('active');
			this.parentNode.childNodes[3].classList.remove('active');
			this.parentNode.childNodes[5].classList.remove('active');
			this.parentNode.childNodes[7].classList.remove('active');
			this.parentNode.childNodes[9].classList.remove('active');

			// Then, give `this` (the clicked tab), the active class
			this.classList.add('active');
      // Hide the first
      $('.tabbed-section-1')[0].classList.remove('visible');
      $('.tabbed-section-1')[0].classList.add('hidden');
      $('.tabbed-section-2')[0].classList.remove('visible');
      $('.tabbed-section-2')[0].classList.add('hidden');
      $('.tabbed-section-4')[0].classList.remove('visible');
      $('.tabbed-section-4')[0].classList.add('hidden');
	  $('.tabbed-section-5')[0].classList.remove('visible');
      $('.tabbed-section-5')[0].classList.add('hidden');
    }

    if(this.classList.contains('tabbed-section__selector-tab-4')) {
      // and change the classes, show the second content panel
      $('.tabbed-section-4')[0].classList.remove('hidden');
      $('.tabbed-section-4')[0].classList.add('visible');
      
      // Remove the active class on all tabs.
			// climbing up the DOM tree with `parentNode` and target 
			// the children ( the tabs ) with childNodes
			this.parentNode.childNodes[1].classList.remove('active');
			this.parentNode.childNodes[3].classList.remove('active');
			this.parentNode.childNodes[5].classList.remove('active');
			this.parentNode.childNodes[7].classList.remove('active');
			this.parentNode.childNodes[9].classList.remove('active');

			// Then, give `this` (the clicked tab), the active class
			this.classList.add('active');
      // Hide the first
      $('.tabbed-section-5')[0].classList.remove('visible');
      $('.tabbed-section-5')[0].classList.add('hidden');
      $('.tabbed-section-1')[0].classList.remove('visible');
      $('.tabbed-section-1')[0].classList.add('hidden');
      $('.tabbed-section-2')[0].classList.remove('visible');
      $('.tabbed-section-2')[0].classList.add('hidden');
	  $('.tabbed-section-3')[0].classList.remove('visible');
      $('.tabbed-section-3')[0].classList.add('hidden');
    }
    if(this.classList.contains('tabbed-section__selector-tab-5')) {
      // and change the classes, show the second content panel
      $('.tabbed-section-5')[0].classList.remove('hidden');
      $('.tabbed-section-5')[0].classList.add('visible');
      
      // Remove the active class on all tabs.
			// climbing up the DOM tree with `parentNode` and target 
			// the children ( the tabs ) with childNodes
			this.parentNode.childNodes[1].classList.remove('active');
			this.parentNode.childNodes[3].classList.remove('active');
			this.parentNode.childNodes[5].classList.remove('active');
			this.parentNode.childNodes[7].classList.remove('active');
			this.parentNode.childNodes[9].classList.remove('active');

			// Then, give `this` (the clicked tab), the active class
			this.classList.add('active');
      // Hide the first
      $('.tabbed-section-4')[0].classList.remove('visible');
      $('.tabbed-section-4')[0].classList.add('hidden');
      $('.tabbed-section-1')[0].classList.remove('visible');
      $('.tabbed-section-1')[0].classList.add('hidden');
      $('.tabbed-section-2')[0].classList.remove('visible');
      $('.tabbed-section-2')[0].classList.add('hidden');
	  $('.tabbed-section-3')[0].classList.remove('visible');
      $('.tabbed-section-3')[0].classList.add('hidden');
    }
    if(this.classList.contains('tabbed-section__selector-tab-6')) {
      // and change the classes, show the second content panel
      $('.tabbed-section-6')[0].classList.remove('hidden');
      $('.tabbed-section-6')[0].classList.add('visible');
      
      // Remove the active class on all tabs.
			// climbing up the DOM tree with `parentNode` and target 
			// the children ( the tabs ) with childNodes
			this.parentNode.childNodes[1].classList.remove('active');
			this.parentNode.childNodes[3].classList.remove('active');
      this.parentNode.childNodes[5].classList.remove('active');

			// Then, give `this` (the clicked tab), the active class
			this.classList.add('active');
      // Hide the first
      $('.tabbed-section-7')[0].classList.remove('visible');
      $('.tabbed-section-7')[0].classList.add('hidden');
      $('.tabbed-section-8')[0].classList.remove('visible');
      $('.tabbed-section-8')[0].classList.add('hidden');
    }
    if(this.classList.contains('tabbed-section__selector-tab-7')) {
      // and change the classes, show the second content panel
      $('.tabbed-section-7')[0].classList.remove('hidden');
      $('.tabbed-section-7')[0].classList.add('visible');
      
      // Remove the active class on all tabs.
			// climbing up the DOM tree with `parentNode` and target 
			// the children ( the tabs ) with childNodes
			this.parentNode.childNodes[1].classList.remove('active');
			this.parentNode.childNodes[3].classList.remove('active');
      this.parentNode.childNodes[5].classList.remove('active');

			// Then, give `this` (the clicked tab), the active class
			this.classList.add('active');
      // Hide the first
      $('.tabbed-section-6')[0].classList.remove('visible');
      $('.tabbed-section-6')[0].classList.add('hidden');
      $('.tabbed-section-8')[0].classList.remove('visible');
      $('.tabbed-section-8')[0].classList.add('hidden');
    }
    if(this.classList.contains('tabbed-section__selector-tab-8')) {
      // and change the classes, show the second content panel
      $('.tabbed-section-8')[0].classList.remove('hidden');
      $('.tabbed-section-8')[0].classList.add('visible');
      
      // Remove the active class on all tabs.
      // climbing up the DOM tree with `parentNode` and target 
      // the children ( the tabs ) with childNodes
      this.parentNode.childNodes[1].classList.remove('active');
      this.parentNode.childNodes[3].classList.remove('active');
      this.parentNode.childNodes[5].classList.remove('active');

      // Then, give `this` (the clicked tab), the active class
      this.classList.add('active');
      // Hide the first
      $('.tabbed-section-6')[0].classList.remove('visible');
      $('.tabbed-section-6')[0].classList.add('hidden');
      $('.tabbed-section-7')[0].classList.remove('visible');
      $('.tabbed-section-7')[0].classList.add('hidden');
    }
    if(this.classList.contains('tabbed-section__selector-tab-9')) {
      // and change the classes, show the second content panel
      $('.tabbed-section-9')[0].classList.remove('hidden');
      $('.tabbed-section-9')[0].classList.add('visible');
      
      // Remove the active class on all tabs.
      // climbing up the DOM tree with `parentNode` and target 
      // the children ( the tabs ) with childNodes
      this.parentNode.childNodes[1].classList.remove('active');
      this.parentNode.childNodes[3].classList.remove('active');
      this.parentNode.childNodes[5].classList.remove('active');

      // Then, give `this` (the clicked tab), the active class
      this.classList.add('active');
      // Hide the first
      $('.tabbed-section-10')[0].classList.remove('visible');
      $('.tabbed-section-10')[0].classList.add('hidden');
      $('.tabbed-section-11')[0].classList.remove('visible');
      $('.tabbed-section-11')[0].classList.add('hidden');
    }
    if(this.classList.contains('tabbed-section__selector-tab-10')) {
      // and change the classes, show the second content panel
      $('.tabbed-section-10')[0].classList.remove('hidden');
      $('.tabbed-section-10')[0].classList.add('visible');
      
      // Remove the active class on all tabs.
      // climbing up the DOM tree with `parentNode` and target 
      // the children ( the tabs ) with childNodes
      this.parentNode.childNodes[1].classList.remove('active');
      this.parentNode.childNodes[3].classList.remove('active');
      this.parentNode.childNodes[5].classList.remove('active');

      // Then, give `this` (the clicked tab), the active class
      this.classList.add('active');
      // Hide the first
      $('.tabbed-section-9')[0].classList.remove('visible');
      $('.tabbed-section-9')[0].classList.add('hidden');
      $('.tabbed-section-11')[0].classList.remove('visible');
      $('.tabbed-section-11')[0].classList.add('hidden');
    }
    if(this.classList.contains('tabbed-section__selector-tab-11')) {
      // and change the classes, show the second content panel
      $('.tabbed-section-11')[0].classList.remove('hidden');
      $('.tabbed-section-11')[0].classList.add('visible');
      
      // Remove the active class on all tabs.
      // climbing up the DOM tree with `parentNode` and target 
      // the children ( the tabs ) with childNodes
      this.parentNode.childNodes[1].classList.remove('active');
      this.parentNode.childNodes[3].classList.remove('active');
      this.parentNode.childNodes[5].classList.remove('active');

      // Then, give `this` (the clicked tab), the active class
      this.classList.add('active');
      // Hide the first
      $('.tabbed-section-9')[0].classList.remove('visible');
      $('.tabbed-section-9')[0].classList.add('hidden');
      $('.tabbed-section-10')[0].classList.remove('visible');
      $('.tabbed-section-10')[0].classList.add('hidden');
    }
    if(this.classList.contains('tabbed-section__selector-tab-12')) {
      // and change the classes, show the second content panel
      $('.tabbed-section-12')[0].classList.remove('hidden');
      $('.tabbed-section-12')[0].classList.add('visible');
      var typePretty = document.getElementsByClassName('type-pretty');
      typePretty[0].style.display = "block";
      
      // Remove the active class on all tabs.
      // climbing up the DOM tree with `parentNode` and target 
      // the children ( the tabs ) with childNodes
      this.parentNode.childNodes[1].classList.remove('active');
      this.parentNode.childNodes[3].classList.remove('active');
      this.parentNode.childNodes[5].classList.remove('active');

      // Then, give `this` (the clicked tab), the active class
      this.classList.add('active');
      // Hide the first
      $('.tabbed-section-13')[0].classList.remove('visible');
      $('.tabbed-section-13')[0].classList.add('hidden');
      $('.tabbed-section-14')[0].classList.remove('visible');
      $('.tabbed-section-14')[0].classList.add('hidden');
    }
    if(this.classList.contains('tabbed-section__selector-tab-13')) {
      // and change the classes, show the second content panel
      $('.tabbed-section-13')[0].classList.remove('hidden');
      $('.tabbed-section-13')[0].classList.add('visible');
      var typePretty = document.getElementsByClassName('type-pretty');
      typePretty[0].style.display = "none";
      
      // Remove the active class on all tabs.
      // climbing up the DOM tree with `parentNode` and target 
      // the children ( the tabs ) with childNodes
      this.parentNode.childNodes[1].classList.remove('active');
      this.parentNode.childNodes[3].classList.remove('active');
      this.parentNode.childNodes[5].classList.remove('active');

      // Then, give `this` (the clicked tab), the active class
      this.classList.add('active');
      // Hide the first
      $('.tabbed-section-12')[0].classList.remove('visible');
      $('.tabbed-section-12')[0].classList.add('hidden');
      $('.tabbed-section-14')[0].classList.remove('visible');
      $('.tabbed-section-14')[0].classList.add('hidden');
    }
    if(this.classList.contains('tabbed-section__selector-tab-14')) {
      // and change the classes, show the second content panel
      $('.tabbed-section-14')[0].classList.remove('hidden');
      $('.tabbed-section-14')[0].classList.add('visible');
      var typePretty = document.getElementsByClassName('type-pretty');
      typePretty[0].style.display = "none";
      
      // Remove the active class on all tabs.
      // climbing up the DOM tree with `parentNode` and target 
      // the children ( the tabs ) with childNodes
      this.parentNode.childNodes[1].classList.remove('active');
      this.parentNode.childNodes[3].classList.remove('active');
      this.parentNode.childNodes[5].classList.remove('active');

      // Then, give `this` (the clicked tab), the active class
      this.classList.add('active');
      // Hide the first
      $('.tabbed-section-13')[0].classList.remove('visible');
      $('.tabbed-section-13')[0].classList.add('hidden');
      $('.tabbed-section-12')[0].classList.remove('visible');
      $('.tabbed-section-12')[0].classList.add('hidden');
    }
    if (this.classList.contains('sub-tabbed')) {
      var children = this.childNodes;
      if (!children[1].checked) {
        children[1].checked = true;
      }
    }
  });
};

// Then finally, iterates through all tabs, to activate the 
// tabs system.
for (var i = tabs.length - 1; i >= 0; i--) {
  toggleTab(tabs[i])
};

function setChangeType() {
  var value = document.getElementById("authorize-type").value;
  var authContent = document.getElementById("authorization-content-right");
  if (value != 'none') {
    
    authContent.innerHTML = "";
    var txt = '<div class="col-12 d-flex">' +
                        '<div class="col-3">Bearer Token</div>' +
                        '<div class="col-9 ">' +
                          '<input class="full-width" value="" type="text" name="auth-token"' + 'id="auth-token">' +
                        '</div>' +
                      '</div>';
    authContent.innerHTML = txt;
  }
  else {
    authContent.innerHTML = "";
  }
}