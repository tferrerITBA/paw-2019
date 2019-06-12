<%@	taglib	prefix="c"	uri="http://java.sun.com/jstl/core_rt"%>
<%@	taglib	prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib  prefix="spring" uri="http://www.springframework.org/tags"%>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/style.css' />" >
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css?family=Barlow+Condensed" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Archivo+Narrow" rel="stylesheet">
	<title>
		<spring:message code="sport_matcher" /> - <spring:message code="profile" />
	</title>
</head>
<body>
<%@include file="header.jsp" %>
<div class="main-container">
	<%@include file="sidebar.jsp" %>
	<div class="content-container">
		<c:choose>
   			<c:when test="${user.userid == loggedUser.userid}">
   				<div class="profile-title">
                    <h2><spring:message code="user.greeting" arguments="${user.firstname} ${user.lastname}"/></h2>
                </div>
			</c:when>
			<c:otherwise>
				<div class="profile-title">
	                <h2>${user.firstname} ${user.lastname}</h2>
	            </div>
			</c:otherwise>
		</c:choose>
		<div class="tbl profile-cont">
			<div class="profile-top">
				<div class="profile-pic-container">
					<img src="<c:url value='/user/${user.userid}/picture'/>"/>
				</div>
				<div class="stats">
					<div class="notice" style="padding: 5px 0">
						<spring:message code="curr_event_participant"/>
						<span class="notice"> ${currEventsParticipant} </span>
						<spring:message code="event_s"/>
					</div>
					<div class="notice" style="padding: 5px 0">
						<spring:message code="curr_events_owned"/>
						<span class="notice"> ${currEventsOwned} </span>
						<spring:message code="event_s"/>
					</div>
					<div class="notice" style="padding: 5px 0">
						<spring:message code="past_events_participant"/>
						<span class="notice"> ${pastEventsParticipant} </span>
						<spring:message code="event_s"/>
					</div>
					<c:if test="${favoriteSport != null}">
						<div class="notice" style="padding: 5px 0">
							<spring:message code="favorite_sport" />
							<span class="notice"><spring:message code="${favoriteSport}"/></span>
						</div>
					</c:if>
					<c:if test="${mainClub != null}">
						<div class="notice" style="padding: 5px 0">
							<spring:message code="main_club" />
							<span class="notice"> ${mainClub.name}</span>
						</div>
					</c:if>
					<div class="notice" style="padding: 5px 0">
						<spring:message code="user_vote_balance"/>
						<span class="notice"> ${votes_received} </span>
					</div>
				</div>
			</div>
		</div>
		<div class="tbl profile-cont">
			<c:if test="${haveRelationship}">
				<c:url value="/user/${user.userid}/comment" var="postPath"/>
				<form:form id="commentForm" modelAttribute="commentForm" action="${postPath}">
					<form:label path="comment"><spring:message code="comment"/></form:label>
					<form:input class="form-control" type="text" path="comment" maxlength="500"/>
					<form:errors path="comment" cssClass="form-error" element="span"/>
					<div class="submit-container">
						<button type="submit" class="btn btn-primary submit-btn btn-success"><spring:message code="create"/></button>
					</div>
				</form:form>
			</c:if>
		</div>
	</div>
</div>


</body>
</html>
