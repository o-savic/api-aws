FROM openjdk:11
ADD target/spring-boot-aws-exe.jar spring-boot-aws-exe.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-Dspring.profiles.active=dev","-jar", "spring-boot-aws-exe.jar"]
