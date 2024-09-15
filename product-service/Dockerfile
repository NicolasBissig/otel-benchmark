# java build step
FROM maven:3-eclipse-temurin-21 AS build
WORKDIR /app
# Get the dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

COPY .. .
RUN mvn clean install -DskipTests

FROM openjdk:21-slim AS runtime
WORKDIR /app
COPY --from=build /app/target/service.jar /app/service.jar

CMD ["java", "-jar", "service.jar"]