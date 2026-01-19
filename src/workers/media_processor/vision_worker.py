import pika
import json
import cv2
import torch
from ultralytics import YOLO

# Load specialized model for subject tracking (Auto-Reframe)
model = YOLO('yolov8n.pt')

def process_visual_saliency(ch, method, properties, body):
    data = json.loads(body)
    video_path = data['file_path']
    job_id = data['job_id']
    
    print(f"[*] Analyzing saliency for Job: {job_id}")
    
    cap = cv2.VideoCapture(video_path)
    saliency_map = []

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret: break
        
        # Detect primary subjects (humans, products) to guide auto-cropping
        results = model(frame, verbose=False)
        boxes = results[0].boxes.xywh.cpu().numpy()
        
        if len(boxes) > 0:
            # Focus on the most prominent subject
            main_subject = boxes[0].tolist() 
            saliency_map.append(main_subject)
            
    cap.release()
    
    # Push results back to the workflow state
    publish_result(job_id, {"saliency_data": saliency_map})
    ch.basic_ack(delivery_tag=method.delivery_tag)

def publish_result(job_id, result):
    # Logic to update Redis or trigger next RabbitMQ exchange
    pass

# RabbitMQ Consumer Setup
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='vision_tasks')
channel.basic_consume(queue='vision_tasks', on_message_callback=process_visual_saliency)
channel.start_consuming()