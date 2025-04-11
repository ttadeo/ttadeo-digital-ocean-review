Below is a step‐by‐step guide on how to run a scaling test on your DigitalOcean Kubernetes (DOKS) cluster. This guide assumes you have already deployed your application along with the Horizontal Pod Autoscaler (HPA), and that you know the external IP (or DNS) of your LoadBalancer service.

---

## 1. Identify the External IP

First, verify that your service is up and running with an external IP:

```bash
kubectl get svc birthday-reminder-service
```

You should see an output similar to:

```
NAME                          TYPE           CLUSTER-IP      EXTERNAL-IP      PORT(S)        AGE
birthday-reminder-service     LoadBalancer   10.245.86.123   192.0.2.123      80:32456/TCP   5m
```

Note the **EXTERNAL-IP** (e.g., `192.0.2.123`)—this is the address you will use to run your load test.

---

## 2. Simulate Load with ApacheBench

You can use ApacheBench (ab) to generate heavy load on your application. If your endpoint is `/birthdays`, run the following command from your local machine:

```bash
ab -n 10000 -c 200 http://192.0.2.123/birthdays
```

- **-n 10000**: Total number of requests.
- **-c 200**: Number of concurrent requests.

This command will bombard your application with 10,000 requests running 200 in parallel. If your application is lightweight, you may not hit the HPA threshold. In that case, consider temporarily modifying the `/birthdays` endpoint to include an artificial CPU-intensive task (like a short busy loop) so that each request uses more CPU. *(Remember to remove or disable this change after testing.)*

---

## 3. Monitor the Horizontal Pod Autoscaler (HPA)

While running the load test, open a separate terminal window and monitor the HPA to see if it picks up the increased CPU usage and scales the deployment accordingly:

```bash
kubectl get hpa birthday-reminder-hpa -w
```

This command will continuously stream updates showing the current CPU utilization and replica count. You should see the HPA metrics update from something like:

```
NAME                    REFERENCE                                 TARGETS               MINPODS   MAXPODS   REPLICAS   AGE
birthday-reminder-hpa   Deployment/birthday-reminder-deployment   cpu: 10%/50%          2         5         2          10m
```

to a higher utilization percentage (e.g., 60% or more) and a corresponding increase in the number of replicas if the utilization exceeds the target threshold.

---

## 4. Monitor Pod CPU Usage

For additional insight, you can check the actual CPU and memory usage of your pods:

```bash
kubectl top pods
```

This command displays the current resource consumption, letting you see if your pods are experiencing high load.

---

## 5. Verify Scaling Events via Events

You can also review events in your cluster to see historical scaling actions:

```bash
kubectl describe hpa birthday-reminder-hpa
```

Look for lines in the **Events** section that indicate scaling actions (such as "ScalingActive" or "AbleToScale"). Note that Kubernetes events have a limited retention period, so it’s good to watch them live with `-w` as shown above.

---

## 6. Summary & Next Steps

- **Identify External IP:** Use `kubectl get svc` to find your LoadBalancer’s external IP.
- **Simulate Load:** Use ApacheBench with an increased number of requests and concurrency.
- **Monitor HPA:** Run `kubectl get hpa birthday-reminder-hpa -w` to watch for scaling changes in real-time.
- **Check Resource Usage:** Use `kubectl top pods` to verify that CPU usage is rising.
- **Review Scaling Events:** Use `kubectl describe hpa` to review any scaling events.

Following these steps should allow you to demonstrate and verify autoscaling behavior in your DigitalOcean Kubernetes cluster. If the load isn’t sufficient to trigger scaling, consider increasing the simulated workload or temporarily modifying your application to perform more CPU-intensive tasks during testing.

