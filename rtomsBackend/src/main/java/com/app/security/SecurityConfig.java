package com.app.security;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.app.enums.Role;



@EnableWebSecurity//to enable spring sec frmwork support
@Configuration //to tell SC , this is config class containing @Bean methods
@EnableGlobalMethodSecurity(prePostEnabled = true)
//To enable method level authorization support : pre n post authorization
public class SecurityConfig {
	//dep : pwd encoder
	@Autowired
	private PasswordEncoder enc;
	//dep : custom jwt auth filter
	@Autowired
	private JwtAuthenticationFilter jwtFilter;
	
	@Bean
	public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception
	{
		http.cors();
		//URL based authorization rules
		http.
		//disable CSRF token generation n verification
		csrf()
		.disable().
		authorizeRequests()
		.antMatchers("/products/view","/user/signUp","/user/signIn","/emailService/send-otp",
				"/emailService/verify-otp",
				"/v*/api-doc*/**","/swagger-ui/**").permitAll()
		
		.antMatchers("/user/**").hasRole("USER")
		.antMatchers("/lernerLicense/application").hasRole("USER")
		.antMatchers("/lernerLicense/updateTestResult").hasRole("USER")
		.antMatchers("/permanentLicense/updateTestResult").hasRole("USER")
		.antMatchers("/admin/getLearnerApplication").hasAnyRole("USER", "ADMIN")
		.antMatchers("/admin/getLearnerApplicationDetails/{learnerAppId}").hasRole("USER")
		.antMatchers("/permanentLicense/application").hasRole("USER")
		.antMatchers("/owner//getMyVehicles").hasRole("USER")
		
		
		.antMatchers("/owner/register").hasRole("DEALER")
		.antMatchers("/owner/addVehicle").hasRole("DEALER")
		.antMatchers("/admin/getVehicleInfo/{regNo}").hasAnyRole("DEALER", "ADMIN")
		
		
		.antMatchers("/admin/**").hasRole("ADMIN")
		.antMatchers("/permanentLicense/updateStatus").hasRole("ADMIN")
		
		
		
		
		
		
		.anyRequest().authenticated()
		.and()
		//to tell spring sec : not to use HttpSession to store user's auth details
		.sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS).
		and()
		//inserting jwt filter before sec filter
		.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	
		return http.build();
	}
	//configure AuthMgr as a spring bean
	@Bean
	public AuthenticationManager authenticationManager
	(AuthenticationConfiguration config) throws Exception
	{
		return config.getAuthenticationManager();
	}
	
	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
}
