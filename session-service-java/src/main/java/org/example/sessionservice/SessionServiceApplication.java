package org.example.sessionservice;

import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootApplication
@Log
public class SessionServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SessionServiceApplication.class, args);
	}

	@Bean
	public RedisStandaloneConfiguration redisConfig(@Value("${spring.data.redis.host:localhost}") String host) {
		log.info("Connecting to Redis at " + host);
		return new RedisStandaloneConfiguration(host);
	}

	@Bean
	public RedisConnectionFactory redisConnectionFactory(RedisStandaloneConfiguration redisConfig) {
		final JedisConnectionFactory connectionFactory = new JedisConnectionFactory(redisConfig);
		connectionFactory.afterPropertiesSet();
		return connectionFactory;
	}

	@Bean
	public RedisTemplate<String, Session> redisTemplate(RedisConnectionFactory connectionFactory) {
		final RedisTemplate<String, Session> redisTemplate = new RedisTemplate<>();
		redisTemplate.setConnectionFactory(connectionFactory);
		redisTemplate.afterPropertiesSet();
		return redisTemplate;
	}


}
