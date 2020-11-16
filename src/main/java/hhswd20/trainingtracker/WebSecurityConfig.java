package hhswd20.trainingtracker;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


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
	
	//.cors().and().csrf().disable() temporary
	//added for testing frontend without authorization
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http
			.cors()
			.and()
			.csrf()
			.disable()
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

}