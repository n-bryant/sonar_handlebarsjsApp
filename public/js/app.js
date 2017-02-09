(function() {
  "use strict"

  const sonarModule = function() {

    // binding of event listeners
    function bindEvents() {
      // search submission
      $('.search-form').on('submit', function() {
        event.preventDefault();
        console.log(document.querySelector('.search').value);
        this.reset();
      });

      // clicking a genre name
      $('.genre-title').on('click', function() {
        $(this).siblings('.genre-bands').toggleClass('is-hidden');
      });
    }

    // initialize with binding of event listeners
    function init() {
      bindEvents();
    }

    return {
      init: init
    };
  };

  const sonarApp = sonarModule();
  sonarApp.init();
})();
