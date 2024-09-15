package org.example.sessionservice;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.time.Instant;

@Data
@RedisHash
@AllArgsConstructor
public class Session implements Serializable {
	private final String id;
	private final String userId;
	private final Instant createdAt;

	public Session(String userId) {
		this.id = userId; // UUID.randomUUID().toString();
		this.userId = userId;
		this.createdAt = Instant.now();
	}
}
