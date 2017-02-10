(function() {
  "use strict"

  const sonarModule = function() {
    const $contentContainer = $('.content-container');

    class Band {
      constructor() {
        this.active = true;
        this.albums = [{ "id": 1, "name": "Monument"}, { "id": 2, "name": "Carving Desert Canyons" }];
        this.id = 1;
        this.biography = { background: "Scale the Summit is an American instrumental progressive metal band based out of Houston, Texas.", hometown: 'NYC, NY', members: ["Chris Letchford, Charlie Engen"], origin_date: "2004" };
        this.genres = ["Progressive Metal, Instrumental Rock"];
        this.image = "https://upload.wikimedia.org/wikipedia/commons/4/44/ScaleTheSummit121509.jpg";
        this.label = "Prosthetic Records";
        this.name = 'Scale the Summit';
        this.build();
      }

      build() {
        const source = $('#bands-template').html(); // home or band
        const template = Handlebars.compile(source);
        const context = {
          id: this.id,
          image: this.image,
          name: this.name,
          genre: this.genres,
          hometown: this.biography.hometown,
          background: this.biography.background
        };
        // console.log(context);
        const html = template(context);
        $contentContainer.append(html);
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
        $contentContainer.append(html);
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
        $contentContainer.append(html);
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

      /* Genre Tab Listeners */
      // clicking a genre name
      $contentContainer.on('click', '.genre-title', function() {
        $(this).siblings('.genre-details-container').slideToggle('slow');
      });
      // clicking add genre button
      $contentContainer.on('click', '.genres-container .add', function() {
        $(this).toggle();
        $('.genres-list').toggle();
        $('.add-genre-form').toggleClass('is-hidden');
      });
      // clicking cancel add genre button
      $contentContainer.on('click', '.add-genre-form .cancel', function() {
        event.preventDefault();
        $(this).parents('.add-genre-form').toggleClass('is-hidden');
        $('.genres-container .add').toggle();
        $('.genres-list').toggle();
      });
      // editing genre item
      $contentContainer.on('click', '.genre-item .actions .edit', function() {
        $(this).parents('.actions').siblings('.edit-genre-form').slideToggle();
      });
      // deleting genre item
      $contentContainer.on('click', '.genre-item .actions .delete', function() {
        $(this).parents('li').remove();
      });

      /* Band Tab Listeners */
      //clicking a artist
      $contentContainer.on('click', '.band-name', function() {
        $('.dropdown').slideToggle('slow');
        $(this).parents('.band-container').siblings('.band-container').toggleClass('is-hidden');
      });
      // clicking add artist button
      $contentContainer.on('click', '.band-list-container .add', function() {
        $(this).toggle();
        $('.band-container-list').toggle();
        $('.add-band-form').toggleClass('is-hidden');
      });
      // clicking cancel add artist button
      $contentContainer.on('click', '.add-artist-form .cancel', function() {
        event.preventDefault();
        $(this).parents('.add-artist-form').toggleClass('is-hidden');
        $('.band-container-list .add').toggle();
        $('.labels').toggle();
      });
      // editing arist item
      $contentContainer.on('click', '.artist .actions .edit', function() {
        $(this).parents('.actions').siblings('.edit-artist-form').slideToggle();
      });
      // deleting artist item
      $contentContainer.on('click', '.artist .actions .delete', function() {
        $(this).parents('li').remove();
      });

      /* Label Tab Listeners */
      // clicking add label button
      $contentContainer.on('click', '.labels-container .add', function() {
        $(this).toggle();
        $('.labels').toggle();
        $('.add-label-form').toggleClass('is-hidden');
      });
      // clicking cancel add label button
      $contentContainer.on('click', '.add-label-form .cancel', function() {
        event.preventDefault();
        $(this).parents('.add-label-form').toggleClass('is-hidden');
        $('.labels-container .add').toggle();
        $('.labels').toggle();
      });
      // submitting add label form
      $contentContainer.on('submit', '.add-label-form', function() {
        event.preventDefault();
        console.log(event.target[0].value);
        console.log(event.target[1].value);
        console.log(event.target[2].value);
        this.reset();
      });
      // editing label item
      $contentContainer.on('click', '.label-item .actions .edit', function() {
        $(this).parents('.actions').siblings('.edit-label-form').slideToggle();
      });
      // deleting label item
      $contentContainer.on('click', '.label-item .actions .delete', function() {
        $(this).parents('li').remove();
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
      getBandResults();
      // getGenreResults();
    }

    return {
      init: init
    };
  };

  const sonarApp = sonarModule();
  sonarApp.init();
})();
