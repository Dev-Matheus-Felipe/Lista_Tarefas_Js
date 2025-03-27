package com.ToDoListBackEnd.ToDoList;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permitir CORS globalmente para o frontend no localhost:5173
        registry.addMapping("/**")  // Aplica a todos os endpoints
                .allowedOrigins("http://localhost:5173")  // Origem permitida (frontend)
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Métodos permitidos
                .allowedHeaders("*")  // Cabeçalhos permitidos
                .allowCredentials(true)  // Permitir credenciais (cookies, headers)
                .maxAge(3600);  // Tempo de cache de preflight requests
    }
}

