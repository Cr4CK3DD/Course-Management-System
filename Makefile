
GREEN=\033[0;32m
YELLOW=\033[1;33m
RED=\033[0;31m
RESET=\033[0m

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
