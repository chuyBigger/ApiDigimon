# Etapa 1: Build con Maven y Java 17
FROM maven:3.9.4-eclipse-temurin-17 AS build

WORKDIR /app

# Copiar todo el proyecto
COPY . .

# Compilar el proyecto sin pruebas
RUN mvn clean package -DskipTests

# Etapa 2: Runtime con JRE 17
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copiar el JAR desde el build
COPY --from=build /app/target/dataDigimon-0.0.1-SNAPSHOT.jar app.jar

# Puerto requerido por Render
ENV PORT 8080
EXPOSE 8080

# Comando para ejecutar la app
ENTRYPOINT ["sh", "-c", "java -Dserver.port=$PORT $JAVA_OPTS -jar app.jar"]
