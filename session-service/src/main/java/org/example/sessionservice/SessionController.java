package org.example.sessionservice;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sessions")
@RequiredArgsConstructor
public class SessionController {

	private final SessionService sessionService;

	@PostMapping("/users/{userId}")
	public ResponseEntity<Session> createSession(@PathVariable String userId) {
		final Session session = new Session(userId);

		try {
			sessionService.saveSession(session);
		} catch (SessionService.SessionExistsException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
		return ResponseEntity.ok(session);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Session> getSession(@PathVariable String id) {
		return sessionService.getSession(id)
				.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}
}
