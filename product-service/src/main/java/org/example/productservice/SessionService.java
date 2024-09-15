package org.example.productservice;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class SessionService {

	private final RestTemplate restTemplate = new RestTemplate();

	@Value("${session.service.host:localhost}")
	private String sessionServiceHost;

	public void validateSession(String sessionToken) {
		final String url = String.format("http://%s:8081/sessions/%s", sessionServiceHost, sessionToken);
		final ResponseEntity<Object> entity = restTemplate.getForEntity(url, Object.class);
		if (!entity.getStatusCode().is2xxSuccessful() || entity.getBody() == null) {
			throw new RuntimeException("Invalid session");
		}
	}
}
