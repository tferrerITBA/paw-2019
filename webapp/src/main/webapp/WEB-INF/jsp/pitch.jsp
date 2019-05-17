<%@ taglib  prefix="c"  uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib  prefix="form"   uri="http://www.springframework.org/tags/form" %>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/style.css' />" >
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Barlow+Condensed" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Archivo+Narrow" rel="stylesheet">
    </head>
    <body>
        <%@include file="header.jsp" %>
        <div class="main-container">
            <%@include file="sidebar.jsp" %>
            <div class="content-container">
                <h2>${pitch.name}</h2>
                <div class="tbl profile-cont">
                    <div class="profile-top">
                        <div class="pitch-pic-container">
                            <img class="pitch-pic" src="<c:url value='/pitch/${pitch.pitchid}/picture'/>"/>
                        </div>
                        <div class="stats">
                            <div class="h4 pitch-info-label" style="padding: 5px 0">
                                <spring:message code="pitch_club" />
                                <span class="h4"> ${pitch.club.name}</span>
                            </div>
                            <div class="h4 pitch-info-label" style="padding: 5px 0">
                                <spring:message code="pitch_sport"/>
                                <span class="h4"> <spring:message code="${pitch.sport}" /></span>
                            </div>
                            <div class="h4 pitch-info-label" style="padding: 5px 0">
                                <spring:message code="pitch_location" />
                                <span class="h4"> ${pitch.club.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tbl-no-flex profile-cont profile-second">
                    <div class="create-event">
                        <table class="schedule-table flex">
                            <tr>
                                <th class="schedule-table-cell-size schedule-table-hours"></th>
                                <c:forEach var="dayMessage" items="${scheduleHeaders}">
                                    <th class="schedule-table-cell-size"><spring:message code="${dayMessage}"/></th>
                                </c:forEach>
                            </tr>
                            <c:set var="hours" value="${minHour}"/>
                            <c:forEach var="row" items="${schedule}">
                                <tr>
                                    <td class="schedule-table-hours"><c:out value="${hours}"/>:00</td>
                                    <c:forEach var="column" items="${row}">
                                        <c:choose>
                                            <c:when test="${column == true}">
                                                <td class="schedule-table background-red schedule-table-cell-size"/>
                                            </c:when>
                                            <c:otherwise>
                                                <td class="schedule-table background-green schedule-table-cell-size"/>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>
                                </tr>
                                <c:set var="hours" value="${hours + 1}"/>
                            </c:forEach>
                        </table>
                        <div class="flex flex-column create-event-form">
                            <c:url value="/pitch/${pitch.pitchid}/event/create" var="postPath"/>
                            <h2 class="create-event-title"><spring:message code="create_event"/></h2>
                            <form:form modelAttribute="newEventForm" action="${postPath}" method="post" enctype="multipart/form-data">
                                <div class="form-field">
                                    <form:label path="name"><spring:message code="event_name"/> * </form:label>
                                    <form:input  cssClass="form-control" type="text" path="name"/>
                                    <form:errors path="name" cssClass="form-error" element="span"/>
                                </div>
                                <div class="form-field">
                                    <form:label path="description"><spring:message code="event_description"/></form:label>
                                    <form:input  cssClass="form-control" type="text" path="description"/>
                                    <form:errors path="description" cssClass="form-error" element="span"/>
                                </div>
                                <div class="form-field">
                                    <form:label path="maxParticipants"><spring:message code="event_max_participants"/></form:label>
                                    <form:input  cssClass="form-control input-number" min="0" type="number" path="maxParticipants"/>
                                    <form:errors path="maxParticipants" cssClass="form-error" element="span"/>
                                </div>
                                <div class="form-field flex-space-between">
                                    <div class="form-field-horizontal">
                                        <form:label path="date"><spring:message code="new_event_date"/> *</form:label>
                                        <form:input cssClass="form-control date-input" type="date" path="date"/>
                                        <form:errors path="date" cssClass="form-error" element="span"/>
                                    </div>
                                    <div>
                                        <form:label path="startsAtHour"><spring:message code="event_startsAt"/> *</form:label>
                                        <form:select path="startsAtHour" cssClass="form-control">
                                            <form:option  value=""></form:option>
                                            <c:forEach var="hourEntry" items="${availableHours}">
                                                <form:option value="${hourEntry.key}">${hourEntry.value}</form:option>
                                            </c:forEach>
                                        </form:select>
                                        <form:errors path="startsAtHour" cssClass="form-error" element="span"/>
                                    </div>
                                    <div>
                                        <form:label path="endsAtHour"><spring:message code="event_endsAt"/> *</form:label>
                                        <form:select path="endsAtHour" cssClass="form-control">
                                            <form:option  value=""></form:option>
                                            <c:forEach var="hourEntry" items="${availableHours}">
                                                <form:option value="${hourEntry.key}">${hourEntry.value}</form:option>
                                            </c:forEach>
                                        </form:select>
                                        <form:errors path="endsAtHour" cssClass="form-error" element="span"/>
                                    </div>
                                </div>
                                <div class="submit-container">
                                    <button type="submit" class="btn btn-primary submit-btn"><spring:message code="create"/></button>
                                </div>
                            </form:form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>