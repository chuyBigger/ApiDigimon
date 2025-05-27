# Etapa 1: Build con Maven y Java 17
FROM maven:3.9.4-eclipse-temurin-17 AS build

WORKDIR /app

# Copiar todo el proyecto
COPY . .

# Dar permiso de ejecución al wrapper mvnw (por si acaso)
RUN chmod +x mvnw

# Build del proyecto con skip tests para acelerar
RUN ./mvnw clean package -DskipTests

# Etapa 2: Imagen runtime solo con Java 17 JRE
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copiar el JAR construido desde la etapa build
COPY --from=build /app/target/dataDigimon-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto (por defecto Spring Boot 8080)
EXPOSE 8080

# Comando para correr la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
