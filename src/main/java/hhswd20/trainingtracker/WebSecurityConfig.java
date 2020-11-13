package hhswd20.trainingtracker;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import hhswd20.trainingtracker.web.UserDetailServiceImpl;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
		
	@Autowired
	private UserDetailServiceImpl userDetailsService;
	
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception{
		auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
	}
		
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http
			.cors()
			.and()
			.authorizeRequests().antMatchers("/css/**").permitAll()
			.and()
			.authorizeRequests().anyRequest().permitAll()
			.and()
		.formLogin()
			.defaultSuccessUrl("/prlist",true)
			.permitAll()
			.and()
		.logout()
			.permitAll();			
		}
	
		 @Bean
		 CorsConfigurationSource corsConfigurationSource() {
		 UrlBasedCorsConfigurationSource source =
		 new UrlBasedCorsConfigurationSource();
		 CorsConfiguration config = new CorsConfiguration();
		 config.setAllowedOrigins(Arrays.asList("*"));
		 config.setAllowedMethods(Arrays.asList("*"));
		 config.setAllowedHeaders(Arrays.asList("*"));
		 config.setAllowCredentials(true);
		 config.applyPermitDefaultValues();
		 source.registerCorsConfiguration("/**", config);
		 return source;
		 }

		
}