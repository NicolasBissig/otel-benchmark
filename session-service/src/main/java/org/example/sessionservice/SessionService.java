package org.example.sessionservice;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SessionService {

	private final RedisTemplate<String, Session> redisTemplate;

	public static class SessionExistsException extends Exception {
		public SessionExistsException(String message) {
			super(message);
		}
	}

	public void saveSession(Session session) throws SessionExistsException {
		if (getSession(session.getId()).isPresent()) {
			throw new SessionExistsException("Session with id " + session.getId() + " already exists");
		}
		redisTemplate.opsForValue().set(session.getId(), session);
	}

	public Optional<Session> getSession(String id) {
		return Optional.ofNullable(redisTemplate.opsForValue().get(id));
	}

}
