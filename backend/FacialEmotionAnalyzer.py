from keras.models import load_model
from keras.preprocessing.image import img_to_array
import cv2
import numpy as np
from collections import Counter
import threading
import os
# Load the face detection cascade and the emotion classification model
face_classifier = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
classifier = load_model("model.h5")

# Define emotion labels
emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']
# Shared state variables
captured_emotions = []
capture_flag=  False

def FacialEmotionAnalyzer():
    global captured_emotions
    global capture_flag
    
    capture_flag = True
    
    captured_emotions = []
    cap = cv2.VideoCapture(0)
    
    while capture_flag :
        ret, frame = cap.read()
        if not ret:
            print("Error: Unable to capture frame")
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_classifier.detectMultiScale(gray)

        # Check if any faces are detected
        if len(faces) > 0:
            # Select only the first detected face
            (x, y, w, h) = faces[0]
            roi_gray = gray[y:y+h, x:x+w]
            roi_gray = cv2.resize(roi_gray, (48, 48), interpolation=cv2.INTER_AREA)

            if np.sum([roi_gray]) != 0:
                roi = roi_gray.astype('float') / 255.0
                roi = img_to_array(roi)
                roi = np.expand_dims(roi, axis=0)

                prediction = classifier.predict(roi)[0]
                label = emotion_labels[prediction.argmax()]
                captured_emotions.append(label)

                # Draw rectangle around the face and label with emotion
                cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
                cv2.putText(frame, label, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        
        # Display the frame
        cv2.imshow('Emotion Recognition', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the video capture and destroy the OpenCV window
    cap.release()
    cv2.destroyAllWindows()

def get_most_frequent_emotion():
    if captured_emotions:
        emotion_counts = Counter(captured_emotions)
        most_frequent_emotion = emotion_counts.most_common(1)[0][0]
    else:
        most_frequent_emotion = "No Faces"
    return most_frequent_emotion
