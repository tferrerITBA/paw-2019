package ar.edu.itba.paw.webapp.exception.handler;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import ar.edu.itba.paw.exception.PictureProcessingException;
import ar.edu.itba.paw.webapp.dto.exception.ExceptionDto;
import ar.edu.itba.paw.webapp.http.CustomStatus;

@Provider
public class PitcureProcessingExceptionHandler implements ExceptionMapper<PictureProcessingException> {

	@Override
	public Response toResponse(PictureProcessingException exception) {
		return Response
				.status(CustomStatus.UNPROCESSABLE_ENTITY)
				.entity(ExceptionDto.ofException(exception))
				.build();
	}

}
