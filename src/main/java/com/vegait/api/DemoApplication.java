package com.vegait.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vegait.api.domain.Book;
import com.vegait.api.repo.BookRepository;

@SpringBootApplication
@RestController
public class DemoApplication {
	
	@Component
	class DataSetup implements ApplicationRunner {

		@Autowired
		private BookRepository bookRepo ;
			
		@Override
		public void run(ApplicationArguments args) throws Exception {
			// TODO Auto-generated method stub
			//bookRepo.save(Book.builder().title("Gone with the wind").isbn("12345").build());
			bookRepo.save(Book.builder().title("Gone with the wind").isbn("12345").build());
			bookRepo.save(Book.builder().title("Harry Potter").isbn("45678").build());			
		}
		
	}
	
	@GetMapping("/")
	public String home() {
		return "Welcome to AWS First Deployment...!!";
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
