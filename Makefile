# Changing these targets might have unintended consequences in the lab environment.
spring-server-build:
	mvn install -Dmaven.test.skip -DskipTests -Dmaven.javadoc.skip=true
.PHONY: spring-server-build

spring-compile:
	mvn compile
.PHONY: spring-compile

spring-server-start:
	mvn spring-boot:start -DtestFailureIgnore=true >> $${LOG_TO:-/dev/stdout} 2>&1 
.PHONY: spring-server-start

spring-server-stop:
	mvn spring-boot:stop -DtestFailureIgnore=true >> $${LOG_TO:-/dev/stdout} 2>&1
.PHONY: spring-server-stop

spring-server-run: spring-compile spring-server-start
.PHONY: spring-server-run

run: spring-compile
.PHONY: run

restart: spring-server-stop spring-compile spring-server-start
.PHONY: restart