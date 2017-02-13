
(function() {
        "use strict";

        // wait for page to load to execute
        $(document).ready(() => {
                const sonarModule = function() {
                    const $contentContainer = $('.content-container');

                    class Band {
                        constructor(bandDetails, isFeatured) {
                            console.log(bandDetails);
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

                            if (whichTemplate === 'featured-band') {
                                $('.band-list').prepend(html);
                            } else {
                                $('.band-container-list').prepend(html);
                            }
                        }
                    }

            class Genre {
                constructor(genreDetails) {
                  console.log(genreDetails);
                    this.id = genreDetails.id;
                    this.name = genreDetails.name;
                    this.build();
                }

                build() {
                    const source = $('#genre-template').html();
                    const template = Handlebars.compile(source);
                    const context = {
                        id: this.id,
                        name: this.name
                    };
                    const html = template(context);

                    $('.genres-list').prepend(html);
                }
            }

            class Label {
                constructor(labelDetails) {
                    this.id = labelDetails.id;
                    this.image = labelDetails.logo_path;
                    this.hq = labelDetails.headquarters;
                    this.name = labelDetails.name;
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
                    };
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
                    generateTemplate(name);
                    updateHash(name);
                });

                // search submission
                $contentContainer.on('submit', '.search-form', function() {
                    event.preventDefault();
                    const query = document.querySelector('.search').value;
                    console.log(query);
                    getSearchResults(query);
                    this.reset();
                });

                /* Featured Band Widget Listeners */
                $contentContainer.on('click', '.band-list .band-item', function() {
                    let name = $(this).children('.band-name').html();
                    $('.featured-name').html(name);

                    let background = $(this).children('.band-background').html();
                    $('.featured-bio').html(background);
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
                // submitting add genre form
                $contentContainer.on('submit', '.add-genre-form', function() {
                    event.preventDefault();

                    let tempObj = {};
                    tempObj.name = $(this).children('.genre-name').val();
                    console.log(tempObj);

                    addGenre(tempObj);
                    this.reset();
                });
                // editing genre item
                $contentContainer.on('click', '.genre-item .actions .edit', function() {
                    $(this).parents('.actions').siblings('.edit-genre-form').slideToggle();
                });
                // submit edit genre form
                $contentContainer.on('submit', '.edit-genre-form', function() {
                    event.preventDefault();
                    // store user input
                    let genreID = $(this).parents('.genre-details-container').attr('data-id');
                    let tempObj = {};
                    tempObj.name = $(this).children('.genre-name').val();

                    // pass input values to editGenre
                    editGenre(tempObj, genreID);
                    this.reset();
                });
                // deleting genre item
                $contentContainer.on('click', '.genre-item .actions .delete', function() {
                    $(this).parents('li').remove();
                    deleteGenre($(this).parents('.genre-details-container').attr('data-id'));
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
                //submit add Band form
                $contentContainer.on('submit', '.add-band-form', function() {
                    event.preventDefault();
                    let tempObj = {};
                    tempObj.imageLoc = $(this).children('.image-loc').val();
                    tempObj.name = $(this).children('.band-name').val();
                    tempObj.hometown = $(this).children('.hometown').val();
                    tempObj.biography = $(this).children('.biography').val();
                    tempObj.members = $(this).children('.members').val();
                    tempObj.genre1 = $(this).children('.genre1').val();
                    tempObj.genre2 = $(this).children('.genre2').val();
                    tempObj.label = $(this).children('.label-name').val();
                    tempObj.originDate = $(this).children('.origin-date').val();
                    tempObj.active = $(this).children('.active').prop('checked') ? 1 : 0;
                    console.log(tempObj);
                    addBand(tempObj);
                    this.reset();
                });
                // editing arist item
                $contentContainer.on('click', '.artist .actions .edit', function() {
                    $(this).parents('.actions').siblings('.edit-artist-form').slideToggle();
                });
                // submitting edit artist form
                $contentContainer.on('submit', '.edit-artist-form', function() {
                    event.preventDefault();
                    // store user input
                    let artistID = $(this).parents('.artist').attr('data-id');
                    let tempObj = {};
                    tempObj.name = $(this).children('.band-name').val();
                    tempObj.imageLoc = $(this).children('.image-loc').val();
                    tempObj.labelNm = $(this).children('.label-name').val();

                    // pass input values to editArtist
                    editArtist(tempObj, artistID);
                    this.reset();
                });
                // deleting artist item
                $contentContainer.on('click', '.artist .actions .delete', function() {
                    $(this).parents('li').remove();
                    deleteArtist($(this).parents('.artist').attr('data-id'));
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
                let tempObj = {};

                tempObj.headquarters = $(this).children('.headquarters').val();
                tempObj.homepage = $(this).children('.homepage').val();
                tempobj.logo_path = $(this).children('.image-loc').val();
                tempobj.name = $(this).children('.image-loc').val();

                addLabel(tempObj);
                this.reset();
                });
                // editing label item
                $contentContainer.on('click', '.label-item .actions .edit', function() {
                    $(this).parents('.actions').siblings('.edit-label-form').slideToggle();
                });
                // submitting edit label form
                $contentContainer.on('submit', '.edit-label-form', function() {
                    event.preventDefault();
                    // store user input
                    let labelID = $(this).parents('.details').attr('data-id');
                    let tempObj = {};
                    tempObj.hq = $(this).children('.hq-loc').val();
                    tempObj.homepage = $(this).children('.homepage').val();
                    tempObj.imageLoc = $(this).children('.image-loc').val();
                    tempObj.name = $(this).children('.label-name').val();

                    // pass input values to editLabel
                    editLabel(tempObj, labelID);
                    this.reset();
                });
                // deleting label item
                $contentContainer.on('click', '.label-item .actions .delete', function() {
                    $(this).parents('li').remove();
                    deleteLabel($(this).parents('.details').attr('data-id'));
                });
            }

            // add band function
            function addBand(input) {

                const addArtist = {
                    method: 'POST',
                    url: "https://sonar-music-database.herokuapp.com/band/add",
                    headers: {
                        "content-type": "application/json;charset=utf-8"
                    },
                    data: JSON.stringify({
                        "active": input.active,
                        "biography": {
                            "background": input.biography,
                            "image_path": input.imageLoc,
                            "members": input.members,
                            "origin_date": input.originDate
                        },
                        "genres": [input.genre1, input.genre2],
                        "label": input.label,
                        "name": input.name
                    })
                };
                $.ajax(addArtist).then((response) => {
                    // let user know edit was successful
                    $('<p>').text('Arist added successfully').css({
                        position: 'absolute',
                        background: 'rgba(0,200,0,.75)',
                        width: '100%',
                        padding: '1rem',
                        color: '#fff',
                        top: 0,
                        left: 0,
                        textAlign: 'center'
                    }).appendTo('body').fadeOut(3000, function() {
                        this.remove();
                    });
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                });
            }

            // add genre function
            function addGenre(genreObj) {
              const addGenre = {
                  method: 'POST',
                  url: "https://sonar-music-database.herokuapp.com/genre/add",
                  headers: {
                      'content-type': 'application/json;charset=utf-8'
                  },
                  data: JSON.stringify({
                      "name": genreObj.name
                  })
              };
              $.ajax(addLabel).then((response) => {
                  // let user know edit was successful
                  $('<p>').text('Genre added successfully').css({
                      position: 'absolute',
                      background: 'rgba(0,200,0,.75)',
                      width: '100%',
                      padding: '1rem',
                      color: '#fff',
                      top: 0,
                      left: 0,
                      textAlign: 'center'
                  }).appendTo('body').fadeOut(3000, function() {
                      this.remove();
                  });
                  console.log(response);
              }).catch((error) => {
                  console.log(error);
              });
            }

            // add label function
            function addLabel(input) {

                const addLabel = {
                    method: 'POST',
                    url: "https://sonar-music-database.herokuapp.com/label/add",
                    headers: {
                        'content-type': 'application/json;charset=utf-8'
                    },
                    data: JSON.stringify({
                        "headquarters": input.headquarters,
                        "homepage": input.homepage,
                        "logo_path": input.logo_path,
                        "name": input.name
                    })
                };
                $.ajax(addLabel).then((response) => {
                    // let user know edit was successful
                    $('<p>').text('Label added successfully').css({
                        position: 'absolute',
                        background: 'rgba(0,200,0,.75)',
                        width: '100%',
                        padding: '1rem',
                        color: '#fff',
                        top: 0,
                        left: 0,
                        textAlign: 'center'
                    }).appendTo('body').fadeOut(3000, function() {
                        this.remove();
                    });
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                });
            }

            // delete artist function
            function deleteArtist(artistID) {
              const deleteLabel = {
                  method: 'DELETE',
                  url: `https://sonar-music-database.herokuapp.com/band/${bandID}`,
                  headers: {
                      'content-type': 'application/json;charset=utf-8'
                  }
              };
              $.ajax(deleteArtist).then((response) => {
                  // let user know edit was successful
                  $('<p>').text('Artist deleted successfully').css({
                      position: 'absolute',
                      background: 'rgba(0,200,0,.75)',
                      width: '100%',
                      padding: '1rem',
                      color: '#fff',
                      top: 0,
                      left: 0,
                      textAlign: 'center'
                  }).appendTo('body').fadeOut(3000, function() {
                      this.remove();
                  });
                  console.log(response);
              }).catch((error) => {
                  console.log(error);
              });
            }

            // delete genre function
            function deleteGenre(genreID) {
              const deleteGenre = {
                  method: 'DELETE',
                  url: `https://sonar-music-database.herokuapp.com/label/${genreID}`,
                  headers: {
                      'content-type': 'application/json;charset=utf-8'
                  }
              };
              $.ajax(deleteGenre).then((response) => {
                  // let user know edit was successful
                  $('<p>').text('Genre deleted successfully').css({
                      position: 'absolute',
                      background: 'rgba(0,200,0,.75)',
                      width: '100%',
                      padding: '1rem',
                      color: '#fff',
                      top: 0,
                      left: 0,
                      textAlign: 'center'
                  }).appendTo('body').fadeOut(3000, function() {
                      this.remove();
                  });
                  console.log(response);
              }).catch((error) => {
                  console.log(error);
              });
            }

            //delete label function
            function deleteLabel(labelID) {
                const deleteLabel = {
                    method: 'DELETE',
                    url: `https://sonar-music-database.herokuapp.com/label/${labelID}`,
                    headers: {
                        'content-type': 'application/json;charset=utf-8'
                    }
                };
                $.ajax(deleteLabel).then((response) => {
                    // let user know edit was successful
                    $('<p>').text('Label deleted successfully').css({
                        position: 'absolute',
                        background: 'rgba(0,200,0,.75)',
                        width: '100%',
                        padding: '1rem',
                        color: '#fff',
                        top: 0,
                        left: 0,
                        textAlign: 'center'
                    }).appendTo('body').fadeOut(3000, function() {
                        this.remove();
                    });
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                });
            }

            // edit artist data
            function editArtist(dataObj, bandID) {
                const settings = {
                    method: 'PUT',
                    url: `https://sonar-music-database.herokuapp.com/band/${bandID}`,
                    headers: {
                        "content-type": "application/json;charset=utf-8"
                    },
                    data: JSON.stringify({
                        "biography": {
                          "image_path": dataObj.imageLoc
                        },
                        "label": dataObj.labelNm,
                        "name": dataObj.name
                    })
                };

                $.ajax(settings).then((response) => {
                    // let user know edit was successful
                    $('<p>').text('Arist edited successfully').css({
                        position: 'absolute',
                        background: 'rgba(0,200,0,.75)',
                        width: '100%',
                        padding: '1rem',
                        color: '#fff',
                        top: 0,
                        left: 0,
                        textAlign: 'center'
                    }).appendTo('body').fadeOut(3000, function() {
                        this.remove();
                    });
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                });
            }

            // edit genre data
            function editGenre(dataObj, genreID) {
              const settings = {
                  method: 'PUT',
                  url: `https://sonar-music-database.herokuapp.com/genre/${genreID}`,
                  headers: {
                      "content-type": "application/json;charset=utf-8"
                  },
                  data: JSON.stringify({
                      "name": dataObj.name
                  })
              };

              $.ajax(settings).then((response) => {
                  // let user know edit was successful
                  $('<p>').text('Genre edited successfully').css({
                      position: 'absolute',
                      background: 'rgba(0,200,0,.75)',
                      width: '100%',
                      padding: '1rem',
                      color: '#fff',
                      top: 0,
                      left: 0,
                      textAlign: 'center'
                  }).appendTo('body').fadeOut(3000, function() {
                      this.remove();
                  });
                  console.log(response);
              }).catch((error) => {
                  console.log(error);
              });
            }

            // edit label data
            function editLabel(dataObj, labelID) {
                const settings = {
                    method: 'PUT',
                    url: `https://sonar-music-database.herokuapp.com/label/${labelID}`,
                    headers: {
                        "content-type": "application/json;charset=utf-8"
                    },
                    data: JSON.stringify({
                        "headquarters": dataObj.hq,
                        "homepage": dataObj.homepage,
                        "logo_path": dataObj.imageLoc,
                        "name": dataObj.name
                    })
                };

                $.ajax(settings).then((response) => {
                    // let user know edit was successful
                    $('<p>').text('Arist edited successfully').css({
                        position: 'absolute',
                        background: 'rgba(0,200,0,.75)',
                        width: '100%',
                        padding: '1rem',
                        color: '#fff',
                        top: 0,
                        left: 0,
                        textAlign: 'center'
                    }).appendTo('body').fadeOut(3000, function() {
                        this.remove();
                    });
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
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
                        $(this).html(html).fadeIn(function() {
                            if (page === 'home') {
                                getFeaturedBandResults();
                            } else if (page === 'genres') {
                                getGenreResults();
                            } else if (page === 'bands') {
                                getBandResults();
                            } else {
                                getLabelResults();
                            }
                        });
                    });
                }

                // gets top 6 band results data
                function getFeaturedBandResults() {
                    $.get('https://sonar-music-database.herokuapp.com/band')
                        .then((response) => {
                            console.log(JSON.parse(response)[0]);
                            new Band(JSON.parse(response)[0], true);
                            // let featuredBands = response.results.splice(0, 6);
                            //
                            // // creates new Band instance for each featured band
                            // for (let index = 0; index < topRelated.length; index++) {
                            //   new Band(featuredBands[index], true);
                            // }
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

                // gets genre band data * ran out of time *
                function getGenreBandResults(){
                  $.get('https://sonar-music-database.herokuapp.com/')
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
                    $.get('https://sonar-music-database.herokuapp.com/genre')
                        .then((response) => {
                          new Genre(JSON.parse(response)[0]);
                            // let count = response.results.length;
                            // for (let index = 0; index < count; index++) {
                            //     new Genre(response.results);
                            // }
                        }).catch((error) => {
                            console.log(error);
                        });
                }

                // gets all labels data
                function getLabelResults() {
                    $.get('https://sonar-music-database.herokuapp.com/label')
                        .then((response) => {
                          new Label(JSON.parse(response)[0]);
                            // let count = response.results.length;
                            // for (let index = 0; index < count; index++) {
                            //     new Label(response.results);
                            // }
                        }).catch((error) => {
                            console.log(error);
                        });
                }

                // gets search result data
                function getSearchResults(query) {
                    let hashNm = window.location.hash.replace('#', '');
                    hashNm = hashNm.replace('s', '');
                    query = encodeURIComponent(query);
                    $.get(`https://sonar-music-database.herokuapp.com/${hashNm}?name=${query}`)
                        .then((response) => {
                          console.log(JSON.parse(response));
                            if (hashNm === 'genre') {
                              new Genre(JSON.parse(response)[0]);
                            } else if (hashNm === 'band') {
                              new Band(JSON.parse(response)[0], false);
                            } else if (hashNm === 'label') {
                              new Label(JSON.parse(response)[0]);
                            }
                        }).catch((error) => {
                            console.log(error);
                        });
                  }

                // updates window hash
                function updateHash(hash) {
                    window.location.hash = hash;
                }

                // initialize with binding of event listeners
                function init() {
                    bindEvents();

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

            const sonarApp = sonarModule(); sonarApp.init();
        });
})();
