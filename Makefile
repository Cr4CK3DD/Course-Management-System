all:
	@echo [*] Starting services...
	@docker-compose -f docker-compose.yml up -d
	@echo [+] Services started.

restart:
	@echo [*] Restarting services with build...
	@docker-compose -f docker-compose.yml up --build -d
	@echo [+] Services restarted.

stop:
	@echo [*] Stopping services...
	@docker-compose -f docker-compose.yml stop
	@echo [+] Services stopped.
