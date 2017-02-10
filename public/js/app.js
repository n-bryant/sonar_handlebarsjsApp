(function() {
  "use strict"

  const sonarModule = function() {

    class Band {
      constructor() {
        this.active = true;
        this.albums = [{ "id": 1, "name": "Monument"}, { "id": 2, "name": "Carving Desert Canyons" }];
        this.id = 1;
        this.biography = { background: "Scale the Summit is an American instrumental progressive metal band based out of Houston, Texas.", members: ["Chris Letchford, Charlie Engen"], origin_date: "2004" };
        this.genres = ["Progressive Metal, Instrumental Rock"];
        this.image = "https://upload.wikimedia.org/wikipedia/commons/4/44/ScaleTheSummit121509.jpg";
        this.label = "Prosthetic Records";
        this.name = 'Scale the Summit';
        this.build();
      }

      build() {
        const source = $('#home-template').html();
        const template = Handlebars.compile(source);
        const context = {
          id: this.id,
          image: this.image,
          name: this.name,
          background: this.biography.background
        };
        // console.log(context);
        const html = template(context);
        $('.content-container').append(html);
      }
    }

    class Genre {
      constructor() {
        this.id = 1;
        this.name = 'Progressive Metal';
        this.bands = [{name: 'Band 1', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/ScaleTheSummit121509.jpg'}, {name: 'Band 2', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/ScaleTheSummit121509.jpg'}, {name: 'Band 3', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/ScaleTheSummit121509.jpg'}];
        this.build();
      }

      build() {
        const source = $('#genres-template').html();
        const template = Handlebars.compile(source);
        const context = {
          id: this.id,
          bands: this.bands,
          name: this.name
        };
        console.log(context);
        const html = template(context);
        $('.content-container').append(html);
      }
    }

    class Label {
      constructor() {
        this.id = 1;
        this.image = 'https://upload.wikimedia.org/wikipedia/commons/4/44/ScaleTheSummit121509.jpg';
        this.location = 'New York City, NY';
        this.name = 'Rhapsody Records';
        this.build();
      }

      build() {
        const source = $('#labels-template').html();
        const template = Handlebars.compile(source);
        const context = {
          id: this.id,
          image: this.image,
          location: this.location,
          name: this.name
        }
        const html = template(context);
        $('.content-container').append(html);
      }
    }

    // binding of event listeners
    function bindEvents() {
      // search submission
      $('.search-form').on('submit', function() {
        event.preventDefault();
        console.log(document.querySelector('.search').value);
        this.reset();
      });

      // clicking a genre name
      $('.content-container').on('click', '.genre-title', function() {
        $(this).siblings('.genre-details-container').slideToggle('slow');
      });
      //clicking a band
      $('.content-container').on('click', '.band-container', function() {
        $('.dropdown').toggleClass('is-hidden').slideToggle('slow');
        $(this).siblings('.band-container').toggleClass('is-hidden');
      });
    }

    function getBandResults() {
      new Band();
    }

    function getGenreResults() {
      new Genre();
    }

    function getLabelResults() {
      new Label();
    }

    // initialize with binding of event listeners
    function init() {
      bindEvents();
      // getLabelResults();
      // getBandResults();
      getGenreResults();
    }

    return {
      init: init
    };
  };

  const sonarApp = sonarModule();
  sonarApp.init();
})();
