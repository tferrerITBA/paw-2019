<%@ taglib  prefix="c"  uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib  prefix="spring" uri="http://www.springframework.org/tags"%>
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
  <div class="content-container">
    <h2><spring:message code="login"/></h2>
    <div class="form-container">
    <c:url value="/login" var="loginUrl"/>
    <form action="${loginUrl}" method="post" enctype="application/x-www-form-urlencoded">
      <div>
        <label for="username"><spring:message code="username"/>  </label>
        <input class="form-control" id="username" name="login_username" type="text"/>
      </div>
      <div>
        <label for="password"><spring:message code="password"/></label>
        <input id="password"  class="form-control" name="login_password" type="password"/>
      </div>
      <div class="form-check">
        <input type="checkbox" value="" id="defaultCheck1">
        <label class="form-check-label" for="defaultCheck1"><spring:message code="remember_me"/></label>
      </div>
      <c:if test="${error == true}">
        <span class="formError">Error!</span>
      </c:if>
      <div class="submit-container">
        <button type="submit" class="btn btn-primary submit-btn"><spring:message code="login"/></button>
      </div>
    </form>
  </body>
</html>
