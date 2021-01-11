FROM openjdk:11
ADD target/spring-boot-aws-exe.jar spring-boot-aws-exe.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar", "spring-boot-aws-exe.jar"]
