'use strict';

define([], function() {
	return {
		defaultRoutePath: '/home',
		routes: {
			'/home': {
				templateUrl: 'views/home.html',
				controller: 'HomeCtrl'
			},
			'/events': {
				templateUrl: 'views/events.html',
				controller: 'AllEventsCtrl',
				resolve: {
					events: ['$route', 'restService', function($route, restService) {
						var params = $route.current.params;
						params.pageNum = 1;
						return restService.getAllEvents(params);
					}]
				}
			},
			'/my-events': {
				templateUrl: 'views/myEvents.html',
				controller: 'MyEventsCtrl',
				resolve: {
					validate: ['$q', '$location', 'authService', function($q, $location, authService) {
					  	var defer = $q.defer();
						if (authService.isLoggedIn() && !authService.isAdmin()) {
						  	defer.resolve();
						} else {
						  	defer.reject('Access blocked');
						  	$location.path('/home');
						}

					}],
					pastEvents: ['$route', 'restService', 'authService', function($route, restService, authService) {
						var params = $route.current.params;
						params.pageNum = 1;
						return restService.getMyPastEvents(authService.getLoggedUser().userid, params);
					}],
					futureEvents: ['$route', 'restService', 'authService', function($route, restService, authService) {
						var params = $route.current.params;
						params.pageNum = 1;
						return restService.getMyFutureEvents(authService.getLoggedUser().userid, params);
					}]
				}
			},
			'/history': {
				templateUrl: 'views/history.html',
				controller: 'HistoryCtrl',
				resolve: {
					validate: ['$q', '$location', 'authService', function($q, $location, authService) {
					  	var defer = $q.defer();
						if (authService.isLoggedIn() && !authService.isAdmin()) {
						  	defer.resolve();
						} else {
						  	defer.reject('Access blocked');
						  	$location.path('/home');
						}

					}]
				}
			},
			'/clubs': {
				templateUrl: 'views/clubs.html',
				controller: 'ClubsCtrl'
			},
			'/pitches': {
				templateUrl: 'views/pitches.html',
				controller: 'PitchesCtrl'
			},
			'/pitches/:pitchid/events/:eventid': {
				templateUrl: 'views/event.html',
				controller: 'EventCtrl',
				resolve: {
					event: ['$route', 'restService', function($route, restService) {
						var params = $route.current.params;
						return restService.getEvent(params.pitchid, params.eventid);
					}],
					inscriptions: ['$route', 'restService', function($route, restService) {
						var params = $route.current.params;
						return restService.getEventInscriptions(params.pitchid, params.eventid);
					}]
				}
			},
			'/clubs/:id': {
				templateUrl: 'views/club.html',
				controller: 'ClubCtrl',
				resolve: {
					club: ['$route', 'restService', function($route, restService) {
						var params = $route.current.params;
						return restService.getClub(params.id);
					}]
				}
			},
			'/pitches/:id': {
				templateUrl: 'views/pitch.html',
				controller: 'PitchCtrl',
				resolve: {
					pitch: ['$route', 'restService', function($route, restService) {
						var params = $route.current.params;
						return restService.getPitch(params.id);
					}]
				}
			},
			'/users/:id': {
				templateUrl: 'views/profile.html',
				controller: 'ProfileCtrl',
				resolve: {
					user: ['$route', 'restService', function($route, restService) {
						var params = $route.current.params;
						return restService.getUserProfile(params.id);
					}]
				}
			},
			'/tournaments': {
			  templateUrl: 'views/tournaments.html',
			  controller: 'TournamentsCtrl'
			},
			'/tournaments/:id': {
				templateUrl: 'views/tournament.html',
				controller: 'TournamentCtrl',
				resolve: {
					tournament: ['$route', '$location', '$q', 'restService', function($route, $location, $q, restService) {
						var defer = $q.defer();
						var params = $route.current.params;
						restService.getTournament(params.id).then(function(data) {
							var t = data;
							if (!t.inscriptionSuccess) {
								$location.path('/tournaments/' + t.tournamentid + '/inscription');
							} else {
								defer.resolve(data);
							}
						});
						return defer.promise;
					}],
					teams: ['$route', 'restService', function($route, restService) {
						var params = $route.current.params;
						return restService.getTournamentTeams(params.id);
					}],
					round: ['$route', 'restService', function($route, restService) {
						var params = $route.current.params;
						return restService.getTournamentRound(params.id, {});
					}]
				}
			},
			'/tournaments/:tournamentid/events/:eventid': {
				templateUrl: 'views/tournamentEvent.html',
				controller: 'TournamentEventCtrl',
				resolve: {
					tournament: ['$route', '$q', 'restService', function($route, $q, restService) {
						var defer = $q.defer();
						var params = $route.current.params;
						restService.getTournament(params.tournamentid).then(function(data) {
							var t = data;
							if (!t.inscriptionSuccess) {
								$location.path('/404');
								defer.reject('Access blocked');
								
							} else {
								defer.resolve(data);
							}
						});
						return defer.promise;
					}],
					event: ['$route', 'restService', function($route, restService) {
						var params = $route.current.params;
						return restService.getTournamentEvent(params.tournamentid, params.eventid);
					}]
				}
			},
			'/tournaments/:id/inscription': {
				templateUrl: 'views/tournamentInscription.html',
				controller: 'TournamentInscriptionCtrl',
				resolve: {
					tournament: ['$route', '$location', '$q', 'restService', function($route, $location, $q, restService) {
						var defer = $q.defer();
						var params = $route.current.params;
						restService.getTournament(params.id).then(function(data) {
							var t = data;
							if (t.inscriptionSuccess) {
								$location.path('/tournaments/' + t.tournamentid);
							} else {
								defer.resolve(data);
							}
						});
						return defer.promise;
					}]
				}
			},
			'/admin/clubs/:id/tournaments/new': {
				templateUrl: 'views/tournamentNew.html',
				controller: 'TournamentNewCtrl',
				resolve: {
					validate: ['$q', '$location', 'authService', function($q, $location, authService) {
					  	var defer = $q.defer();
						if (authService.isAdmin()) {
						  	defer.resolve();
						} else {
						  	defer.reject('Access blocked');
						  	$location.path('/403');
						}

					}],
					club: ['$route', 'restService', function($route, restService) {
						var params = $route.current.params;
						return restService.getClub(params.id);
					}]
				}
			},
			'/404': {
				templateUrl: 'views/404.html',
				controller: 'NotFoundCtrl'
			},
			'/403': {
				templateUrl: 'views/403.html',
				controller: 'UnauthorizedCtrl'
			},
			'/oops': {
				templateUrl: 'views/oops.html',
				controller: 'OopsCtrl'
			}
			/* ===== yeoman hook ===== */
			/* Do not remove these commented lines! Needed for auto-generation */
		}
	};
});
