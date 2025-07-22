from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router
from translation import router as translation_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)
app.include_router(translation_router)

@app.get("/")
async def root():
    return {"message": "API is working!"}
