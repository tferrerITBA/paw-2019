'use strict';
define(['frontend', 'jquery', 'services/storageService', 'services/errorService'], function(frontend) {

	frontend.factory('restService', ['$http','$rootScope', '$location', '$q', 'url', 'storageService', 'errorService', function($http, $rootScope, $location, $q, url, storageService, errorService) {

		function httpGet(path, params) {
			var headers = {};
			headers = addAuthHeader(headers);
			
			params = Object.keys(params).length ? '?' + jQuery.param(params) : '';
			return $http.get(url + path + params, {headers: headers})
				.then(function(response) { 
					return response.data; 
				})
				.catch(function(response) {
					errorRedirect(response);
					return $q.reject(response);
				});
		}

		function httpPost(path, data, params) {
			var headers = {'Content-Type': undefined};
			headers = addAuthHeader(headers);

			return $http.post(url + path, data, {transformRequest: angular.identity, headers: headers})
				.then(function(response) { 
					return response.data; 
				})
				.catch(function(response) {
					errorRedirect(response);
					return $q.reject(response);
				});
		}

		function httpDelete(path, params) {
			var headers = {};
			headers = addAuthHeader(headers);

			params = Object.keys(params).length ? '?' + jQuery.param(params) : '';

			return $http.delete(url + path + params, {headers: headers})
				.then(function(response) {
					return response.data;
				})
				.catch(function(response) {
					errorRedirect(response);
					return $q.reject(response);
				});
		}

		function addAuthHeader(headers) {
			var authToken = storageService.getAuthToken();
			if (authToken) {
				headers['X-Auth-Token'] = authToken;
			}
			return headers;
		}

		function errorRedirect(response) {
			if (response.status === 404) {
				var error;
				switch (response.data.error) {
					case 'PitchNotFound':
						error = 'error_pitch_not_found';
						break;
					case 'EventNotFound':
						error = 'error_event_not_found';
						break;
					case 'UserNotFound':
						error = 'error_user_not_found';
						break;
					case 'ClubNotFound':
						error = 'error_club_not_found';
						break;
					case 'TournamentNotFound':
						error = 'error_tournament_not_found';
						break;
					case 'TournamentEventNotFound':
						error = 'error_tournament_event_not_found';
						break;
					default:
						error = 'not_found';
				}
				errorService.setError(error);
				$location.url('/404');
			} else if (response.status === 403) {
				if (response.data.error == null) {
					$location.url('/403');
				}
			} else if (response.status === -1) {
				$location.url('/oops');
			}
		}

		return {
			cancelEvent: function(pitchid, eventid) {
				return httpDelete('/pitches/' + pitchid + '/events/' + eventid, {});
			},
			commentClub: function(id, comment) {
				var formData = new FormData();
				formData.append('commentForm', new Blob([JSON.stringify({comment: comment})], {type: 'application/json'}));
				return httpPost('/clubs/' + id + '/comment', formData, {});
			},
			commentUser: function(id, comment) {
				var formData = new FormData();
				formData.append('commentForm', new Blob([JSON.stringify({comment: comment})], {type: 'application/json'}));
				return httpPost('/users/' + id + '/comment', formData, {});
			},
			createClub: function(data) {
				var clubData = {name: data.name, location: data.location};
				var formData = new FormData();
				formData.append('clubForm', new Blob([JSON.stringify(clubData)], {type: 'application/json'}));

				return httpPost('/admin/clubs', formData, {});
			},
			createEvent: function(pitchid, data) {
				var eventData = {name: data.name, description: data.description, maxParticipants: data.maxParticipants, date: data.date, startsAtHour: data.startsAtHour, endsAtHour: data.endsAtHour, inscriptionEndDate: data.inscriptionEndDate};
				var formData = new FormData();
				formData.append('eventForm', new Blob([JSON.stringify(eventData)], {type: 'application/json'}));
				return httpPost('/pitches/' + pitchid + '/events', formData, {});
			},
			createPitch: function(clubid, data, picture) {
				var pitchData = {name: data.name, sport: data.sport /* PICTURE */};
				var formData = new FormData();
				formData.append('pitchForm', new Blob([JSON.stringify(pitchData)], {type: 'application/json'}));
				if (picture != null) { // eslint-disable-line eqeqeq
					formData.append('picture', picture);
				}
				// formData.append('sport', pitchData.sport);
				/* PICTURE */

				return httpPost('/admin/clubs/' + clubid + '/pitches', formData, {});
			},
			createTournament: function(clubid, data) {
				var tournamentData = {name: data.name, maxTeams: data.maxTeams, teamSize: data.teamSize, firstRoundDate: data.firstRoundDate, startsAtHour: data.startsAtHour, endsAtHour: data.endsAtHour, inscriptionEndDate: data.inscriptionEndDate};
				var formData = new FormData();
				formData.append('tournamentForm', new Blob([JSON.stringify(tournamentData)], {type: 'application/json'}));
				return httpPost('/admin/clubs/' + clubid + '/tournaments', formData, {});
			},
			deleteClub: function(id) {
				return httpDelete('/admin/clubs/' + id, {});
			},
			deleteEvent: function(id) {
				return httpDelete('/admin/events/' + id, {});
			},
			deletePitch: function(clubid, pitchid) {
				return httpDelete('/admin/clubs/' + clubid + '/pitches/' + pitchid, {});
			},
			deleteTournament: function(clubid, tournamentid) {
				return httpDelete('/admin/clubs/' + clubid + '/tournaments/' + tournamentid, {});
			},
			downvote: function(pitchid, eventid) {
				return httpPost('/pitches/' + pitchid + '/events/' + eventid + '/downvote', {}, {});
			},
			getAllEvents: function(params) {
				return httpGet('/events', {pageNum: params.pageNum, name: params.name, club: params.club, sport: params.sport, vacancies: params.vacancies, date: params.date});
			},
			getClub: function(id) {
				return httpGet('/clubs/' + id, {});
			},
			getClubComments: function(id, params) {
				return httpGet('/clubs/' + id + '/comments', {pageNum: params.pageNum});
			},
			getClubPitches: function(id, params) {
				return httpGet('/clubs/' + id + '/pitches', {pageNum: params.pageNum});
			},
			getClubs: function(params) {
				return httpGet('/clubs', {pageNum: params.pageNum, name: params.name, location: params.location});
			},
			getClubWeekEvents: function(id) {
				return httpGet('/admin/clubs/' + id + '/week-events', {});
			},
			getPitch: function(id) {
				return httpGet('/pitches/' + id, {});
			},
			getPitchPicture: function(id) {
				var headers = {};
				headers = addAuthHeader(headers);

				return $http({method: 'GET', url: url + '/pitches/' + id + '/picture',
          responseType: 'arraybuffer', headers: headers})
					.then(function(response) {
				    	return response.data;
				    });
			},
			getPitches: function(params) {
        return httpGet('/pitches', {pageNum: params.pageNum, name: params.name, sport: params.sport, location: params.location, club: params.club});
			},
			getEvent: function(pitchid, eventid) {
				return httpGet('/pitches/' + pitchid + '/events/' + eventid, {});
			},
			getEventInscriptions: function(pitchid, eventid) {
				return httpGet('/pitches/' + pitchid + '/events/' + eventid + '/inscriptions', {});
			},
			getHistory: function(id, params) {
				return httpGet('/users/' + id + '/history', {pageNum: params.pageNum});
			},
			getHourRange: function() {
				return httpGet('/pitches/hour-range', {});
			},
			getMyFutureEvents: function(id, params) {
				return httpGet('/users/' + id + '/future-owned-events', {pageNum: params.pageNum});
			},
			getMyPastEvents: function(id, params) {
				return httpGet('/users/' + id + '/past-owned-events', {pageNum: params.pageNum});
			},
			getPitchWeekEvents: function(id) {
				return httpGet('/pitches/' + id + '/week-events', {});
			},
			getSports: function() {
				return httpGet('/pitches/sports', {});
			},
			getTournament: function(id) {
		        return httpGet('/tournaments/' + id, {});
		    },
		    getTournamentEvent: function(tournamentid, eventid) {
		        return httpGet('/tournaments/' + tournamentid + '/events/' + eventid, {});
		    },
		    getTournamentEventFirstTeam: function(tournamentid, eventid) {
		        return httpGet('/tournaments/' + tournamentid + '/events/' + eventid + '/first-team-members', {});
		    },
		    getTournamentEventSecondTeam: function(tournamentid, eventid) {
		        return httpGet('/tournaments/' + tournamentid + '/events/' + eventid + '/second-team-members', {});
		    },
		    getTournamentRound: function(id, params) {
		        return httpGet('/tournaments/' + id + '/round', {roundPageNum: params.roundPageNum});
		    },
		    getTournamentTeams: function(id) {
		        return httpGet('/tournaments/' + id + '/teams', {});
		    },
		    getTournamentTeamsInscriptions: function(id) {
		    	return httpGet('/tournaments/' + id + '/inscriptions', {});
		    },
			getTournaments: function(params) {
        		return httpGet('/tournaments', {pageNum: params.pageNum});
		    },
			getUpcomingEvents: function(id) {
				return httpGet('/users/' + id + '/future-inscriptions', {});
			},
			getUserComments: function(id, params) {
				return httpGet('/users/' + id + '/comments', {pageNum: params.pageNum});
			},
			getUserProfile: function(id) {
				return httpGet('/users/' + id, {});
			},
			getUserProfilePicture: function(id) {
				var headers = {};
				headers = addAuthHeader(headers);

				return $http({method: 'GET', url: url + '/users/' + id + '/picture',
          responseType: 'arraybuffer', headers: headers})
					.then(function(response) {
				    	return response.data;
				    });
			},
			hasRelationshipWithClub: function(id) {
				return httpGet('/clubs/' + id + '/has-relationship', {});
			},
			hasRelationshipWithUser: function(id) {
				return httpGet('/users/' + id + '/has-relationship', {});
			},
			joinEvent: function(pitchid, eventid) {
				return httpPost('/pitches/' + pitchid + '/events/' + eventid + '/join', {}, {});
			},
			joinTournament: function(tournamentid, teamid) {
				return httpPost('/tournaments/' + tournamentid + '/teams/' + teamid + '/join', {}, {});
			},
			kickUser: function(pitchid, eventid, userid) {
				return httpPost('/pitches/' + pitchid + '/events/' + eventid + '/kick-user/' + userid, {}, {});
			},
			kickUserFromTournament: function(clubid, tournamentid, userid) {
				return httpPost('/admin/clubs/' + clubid + '/tournaments/' + tournamentid + '/kick-user/' + userid, {}, {});
			},
			leaveEvent: function(pitchid, eventid) {
				return httpPost('/pitches/' + pitchid + '/events/' + eventid + '/leave', {}, {});
			},
			leaveTournament: function(id) {
				return httpPost('/tournaments/' + id + '/leave', {}, {});
			},
			register: function(data, picture) {
				var userData = {username: data.username, password: data.password, firstname: data.firstName, lastname: data.lastName/*, picture: data.picture*/};
				var formData = new FormData();
				formData.append('userForm', new Blob([JSON.stringify(userData)], {type: 'application/json'}));
				if (picture != null) { // eslint-disable-line eqeqeq
					formData.append('picture', picture);
				}
				return httpPost('/users', formData, {});
			},
			setTournamentEventResult: function(clubid, tournamentid, eventid, data) {
				var resultData = {firstResult: data.firstTeamScore, secondResult: data.secondTeamScore};
				var formData = new FormData();
				formData.append('tournamentResultForm', new Blob([JSON.stringify(resultData)], {type: 'application/json'}));
				return httpPost('/admin/clubs/' + clubid + '/tournaments/' + tournamentid + '/events/' + eventid + '/result', formData, {});
			},
			upvote: function(pitchid, eventid) {
				return httpPost('/pitches/' + pitchid + '/events/' + eventid + '/upvote', {}, {});
			}
		};

	}]);

});
