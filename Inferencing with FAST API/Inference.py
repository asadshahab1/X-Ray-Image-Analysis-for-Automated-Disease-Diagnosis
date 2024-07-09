import joblib
from PIL import Image
import pandas as pd
import cv2
import numpy as np
import io
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
app = FastAPI()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    image = image.convert("L")
    image = np.array(image)
    image = cv2.resize(image, (150, 150))
    image_flattened = image.flatten()
    image_flattened = pd.DataFrame(image_flattened)
    model = joblib.load("svm.joblib")
    result = model.predict(image_flattened.T)[0]
    if result == 1:
        answer = "PNEUMONIA"
    else:
        answer = "NORMAL"
    return JSONResponse(content={
        "result":answer
    })

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app,host='localhost',port=8000)