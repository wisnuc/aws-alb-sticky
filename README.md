# aws-alb-sticky
tests for aws application load balancer sticy session

aws alb is a layer 7 load balancer. It supports sticky session via http cookie.

In wisnuc cloud service, the cloud provides a `rendezvous` service for two clients. One is the client app running on mobile deivce or PC. The other is the NAS device. When 
