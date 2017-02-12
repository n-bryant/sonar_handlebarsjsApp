// handling navigation event handler conditional
// loading screens
// fill in spots for api urls
// adjust constructors to receive api data
// handle adds/edits, ratings, and deletes

(function() {
  "use strict"

  // wait for page to load to execute
  $(document).ready(() => {
    const sonarModule = function() {
      const $contentContainer = $('.content-container');

      class Band {
        constructor(bandDetails, isFeatured) {
          this.albums = bandDetails.albums;
          this.id = bandDetails.id;
          this.biography = bandDetails.biography;
          this.featured = isFeatured;
          this.genres = bandDetails.genres;
          this.image = bandDetails.biography.image_path;
          this.label = bandDetails.label.name;
          this.name = bandDetails.name;
          this.build(this.featured);
        }

        build(featured) {
          let whichTemplate = '';
          if (this.featured) {
            whichTemplate = 'featured-band';
          } else {
            whichTemplate = 'band';
          }

          const source = $(`#${whichTemplate}-template`).html(); // home or band
          const template = Handlebars.compile(source);
          const context = {
            id: this.id,
            albums: this.albums,
            image: this.image,
            name: this.name,
            genre: this.genres,
            members: this.biography.members,
            background: this.biography.background
          };
          const html = template(context);

          $('.band-container-list').prepend(html);
        }
      }

      class Genre {
        constructor(genreDetails) {
          this.id = 1;
          this.name = 'Progressive Metal';
          this.bands = [{name: 'Band 1', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/ScaleTheSummit121509.jpg'}, {name: 'Band 2', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/ScaleTheSummit121509.jpg'}, {name: 'Band 3', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/ScaleTheSummit121509.jpg'}];
          this.build();
        }

        build() {
          const source = $('#genre-template').html();
          const template = Handlebars.compile(source);
          const context = {
            id: this.id,
            bands: this.bands,
            name: this.name
          };
          console.log(context);
          const html = template(context);

          $('.genres-list').prepend(html);
        }
      }

      class Label {
        constructor(labelDetails) {
          this.id = 1;
          this.image = 'https://upload.wikimedia.org/wikipedia/commons/4/44/ScaleTheSummit121509.jpg';
          this.location = 'New York City, NY';
          this.name = 'Rhapsody Records';
          this.build();
        }

        build() {
          const source = $('#label-template').html();
          const template = Handlebars.compile(source);
          const context = {
            id: this.id,
            image: this.image,
            location: this.location,
            name: this.name
          }
          const html = template(context);

          $('.labels').prepend(html);
        }
      }

      // binding of event listeners
      function bindEvents() {
        // generating templates on nav item click
        $('nav li').on('click', function() {
          // not using fat arrow so we can refer back to the element triggering the event
          const name = $(this).attr('data-name');

          // add active class to clicked li and remove the active class from its siblings
          $(this).addClass('active').siblings().removeClass('active');
          // $contentContainer.html('');
          // generateTemplate(name);
          updateHash(name);

          if (name === 'home') {
            getFeaturedBandResults();
          } else if (name === 'genres') {
            getGenreResults();
          } else if (name === 'bands') {
            getBandResults();
          } else {
            getLabelResults();
          }
        });
        $('.home-btn img').on('click', function() {
          generateTemplate('home');
          updateHash('home');
        })

        // search submission
        $('.search-form').on('submit', function() {
          event.preventDefault();
          console.log(document.querySelector('.search').value);
          this.reset();
        });

        /* Featured Band Widget Listeners */
        $contentContainer.on('click', '.band-list .band-item', function() {
          let name = $(this).children('.band-name').html();
          $('.featured-name').html(name);

          let background = $(this).children('.band-background').html();
          $('.featured-name').html(background);
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
        $contentContainer.on('click', '.add-band-form .cancel', function() {
          event.preventDefault();
          $(this).parents('.add-band-form').toggleClass('is-hidden');
          $('.band-list-container .add').toggle();
          $('.band-container-list').toggle();
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

      // gnerate a page template
      function generateTemplate(page) {
        const whichTemplate = page;
        const source = $(`#${whichTemplate}-template`).html();
        const template = Handlebars.compile(source);
        let context = {};

        const html = template(context);

        $contentContainer.fadeOut('medium', function() {
          $(this).html(html).fadeIn();
        });
      }

      // gets top 6 band results data
      function getFeaturedBandResults() {
        $.get(`interpolated api url`)
          .then((response) => {
            let featuredBands = response.results.splice(0, 6);

            // creates new Band instance for each featured band
            for (let index = 0; index < topRelated.length; index++) {
              new Band(featuredBands[index], true);
            }
          }).catch((error) => {
            console.log(error);
          });
      }

      // gets all band data
      function getBandResults() {
        $.get('https://sonar-music-database.herokuapp.com/band')
          .then((response) => {
            console.log(JSON.parse(response)[0]);
            new Band(JSON.parse(response)[0], false);
            // let count = response.results.length;
            // for (let index = 0; index < count; index++) {
            //   new Band(response.results, false);
            // }
          }).catch((error) => {
            console.log(error);
          });
      }

      // gets all genres data
      function getGenreResults() {
        $.get()
          .then((response) => {
            let count = response.results.length;
            for (let index = 0; index < count; index++) {
              new Genre(response.results);
            }
          }).catch((error) => {
            console.log(error);
          });
      }

      // gets all labels data
      function getLabelResults() {
        $.get(`interpolated api url`)
          .then((response) => {
            let count = response.results.length;
            for (let index = 0; index < count; index++) {
              new Label(response.results);
            }
          }).catch((error) => {
            console.log(error);
          });
      }

      // gets search result data
      function getSearchResults(query) {
        query = encodeURICompontent(query);
        $.get(`interpolated api url`)
          .then((response) => {
            console.log(response.results[0]);
            new Whatever(response.results[0]);
          }).catch((error) => {
            console.log(error);
          });
      }

      function rateAdd(rating, bandID) {
        //
      }

      function rateDelete(bandID) {
        $.ajax({

        }).then((response) => {

        });
      }

      // updates window hash
      function updateHash(hash) {
        window.location.hash = hash;
      }

      // initialize with binding of event listeners
      function init() {
        bindEvents();
        generateTemplate('home');

        // setting template to be tab on refresh
        if (window.location.hash.length > 0) {
          const hashName = window.location.hash.replace('#', '');
          generateTemplate(hashName);
          $(`li[data-name=${hashName}]`).addClass('active');
        } else {
          generateTemplate('home');
        }
      }

      return {
        init: init
      };
    };

    const sonarApp = sonarModule();
    sonarApp.init();
  });
})();
