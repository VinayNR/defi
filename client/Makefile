VERSION=v1
ALIAS=latest
DOCKERUSER=nrvinay08

build:
	docker build --progress=plain -t defi-frontend .

push:
	docker tag defi-frontend $(DOCKERUSER)/defi-frontend:$(VERSION)
	docker push $(DOCKERUSER)/defi-frontend:$(VERSION)
	docker tag defi-frontend $(DOCKERUSER)/defi-frontend:latest
	docker push $(DOCKERUSER)/defi-frontend:latest

serve:
	kubectl apply -f deploy/deployment.yaml
	kubectl apply -f deploy/service.yaml
	kubectl apply -f deploy/ingress.yaml