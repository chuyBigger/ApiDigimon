FROM maven:3.9.6-eclipse-temurin-17 AS build

COPY . /app
WORKDIR /app

RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jdk

COPY --from=build /app/target/*.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
