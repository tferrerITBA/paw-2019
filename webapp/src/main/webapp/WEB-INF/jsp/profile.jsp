<%@	taglib	prefix="c"	uri="http://java.sun.com/jstl/core_rt"%>
<%@	taglib	prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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
		<c:if test="${haveRelationship}">
			<div class="tbl profile-cont">
				<c:url value="/user/${user.userid}/comment" var="postPath"/>
				<form:form id="commentForm" modelAttribute="commentForm" action="${postPath}">
					<form:label path="comment"><spring:message code="comment"/></form:label>
					<form:input class="form-control" type="text" path="comment" maxlength="500"/>
					<form:errors path="comment" cssClass="form-error" element="span"/>
					<div class="submit-container">
						<button type="submit" class="btn btn-primary submit-btn btn-success"><spring:message code="create"/></button>
					</div>
				</form:form>
				<c:forEach var="cmt" items="${comments}">
                        <div class="comment-row">
                            <div class="home-header">${cmt.commenter.firstname} ${cmt.commenter.lastname}</div>
                            <div class="home-header">${cmt.comment}</div>
                            <div>
    							<fmt:timeZone value="AR">
    								<fmt:parseDate value="${cmt.createdAt}" var="parsedDateTime" type="both" pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" />
    								<fmt:formatDate pattern="dd.MM.yyyy HH:mm" value="${ parsedDateTime }" timeZone="GMT-3" />
    							</fmt:timeZone>
                            </div>
                        </div>
                    </c:forEach>
				<div class="table-navigator">
                    <c:choose>
                        <c:when test="${commentQty > 0}">
                            <c:if test="${currCommentPage != 1}">
                				<div>
                                    <a href="<c:url value='/user/${userid}?cmt=1' />">
                                        <button type="button" class="btn btn-secondary">
                                            <spring:message code="first"/>
                                        </button>
                                    </a>
                                    <a href="<c:url value='/user/${userid}?cmt=${currCommentPage-1}' />">
                                        <button type="button" class="btn btn-secondary">
                                            <spring:message code="back"/>
                                        </button>
                                    </a>
                                </div>
                            </c:if>
                            <span class="flex"><spring:message code="showing_items"/> ${commentsPageInitIndex}-${commentsPageInitIndex + commentQty - 1} <spring:message code="of"/> ${totalCommentQty}</span>
                            <c:if test="${currCommentPage != maxCommentPage}">
                				<div>
                                    <a href="<c:url value='/user/${userid}?cmt=${currCommentPage+1}' />">
                                        <button type="button" class="btn btn-secondary"><spring:message code="next"/></button>
                                    </a>
                                    <a href="<c:url value='/user/${userid}?cmt=${maxCommentPage}' />">
                                        <button type="button" class="btn btn-secondary"><spring:message code="last"/></button>
                                    </a>
                                </div>
                            </c:if>
                        </c:when>
                        <c:otherwise>
                            <div class="notice">
                                <spring:message code="no_comments"/>
                            </div>
                        </c:otherwise>
                    </c:choose>
    			</div>
			</div>
		</c:if>
	</div>
</div>


</body>
</html>
