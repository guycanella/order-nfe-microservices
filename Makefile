# Makefile for microservices infrastructure management

.PHONY: help infra-up infra-down infra-logs infra-ps infra-clean order-dev nfe-dev

# Infrastructure commands
infra-up:
	@echo "🚀 Starting infrastructure..."
	@cd infra && docker-compose up -d

infra-down:
	@echo "🛑 Stopping infrastructure..."
	@cd infra && docker-compose down

infra-logs:
	@echo "📋 Infrastructure logs..."
	@cd infra && docker-compose logs -f

infra-ps:
	@echo "📊 Container status..."
	@cd infra && docker-compose ps

infra-restart:
	@echo "🔄 Restarting infrastructure..."
	@cd infra && docker-compose restart

infra-clean:
	@echo "🧹 Cleaning containers and volumes..."
	@cd infra && docker-compose down -v --remove-orphans

# Service commands
order-dev:
	@echo "🏃 Running order-service in dev mode..."
	@(cd order-service && pnpm run dev)

nfe-dev:
	@echo "🏃 Running nfe-service in dev mode..."
	@(cd nfe-service && pnpm run dev)

order-test:
	@echo "🧪 Running order-service tests..."
	@(cd order-service && pnpm test)

nfe-test:
	@echo "🧪 Running nfe-service tests..."
	@(cd nfe-service && pnpm test)

# Combined commands
dev-all: infra-up
	@echo "🚀 Starting everything for development..."
	@echo "⏳ Waiting for infrastructure to be ready..."
	@sleep 5
	@echo "🏃 Starting both services..."
	@(cd ../order-service && pnpm run dev) & \
	(cd ../nfe-service && pnpm run dev) & \
	wait

# Quick access to services
rabbitmq-ui:
	@echo "🐰 Opening RabbitMQ Management..."
	@(command -v open >/dev/null 2>&1 && open http://localhost:15672) || \
	(command -v xdg-open >/dev/null 2>&1 && xdg-open http://localhost:15672) || \
	echo "Please open http://localhost:15672 manually"

pgadmin-ui:
	@echo "🐘 Opening pgAdmin..."
	@(command -v open >/dev/null 2>&1 && open http://localhost:8080) || \
	(command -v xdg-open >/dev/null 2>&1 && xdg-open http://localhost:8080) || \
	echo "Please open http://localhost:8080 manually"
