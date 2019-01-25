<%@	taglib	prefix="c"	uri="http://java.sun.com/jstl/core_rt"%>
<%@	taglib	prefix="spring"	uri="http://www.springframework.org/tags"%>
<html>
	<head>
		<link rel="stylesheet" href="<c:url value="/css/style.css"/>"/>
	</head>
	<body>
		<h2><spring:message	code="user.greeting" arguments="${user.username}"/></h2>
		<h5><spring:message	code="user.id" arguments="${user.userid}"/>
	</body>
</html>