from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from models import SignupRequest, LoginRequest, AdminCreateRequest
from db import db
from auth import get_pw_hash, get_user, format_admin, format_student

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/login')
async def login(login_req: LoginRequest):
   user = await get_user(login_req.username, login_req.password) 
   if not user:
       raise HTTPException() #figure out what exception
   if user["isAdmin"]:
       return await format_admin(user)
   else:
       return format_student(user)
   
@app.post('/signup')
async def signup(signup_req: SignupRequest):
    exists = await db.users.find_one({"username" : signup_req.username})
    if exists:
        raise HTTPException() #user already exists
    
    password = get_pw_hash(signup_req.password)
    user_document = {
        "username": signup_req.username,
        "password": password,
        "displayName": signup_req.displayName,
        "avatarUrl" : signup_req.avatarUrl,
        "isAdmin" : False, # ONLY STUDENTS CAN SIGN UP 
        "score" : 0,
        "stats" : {},
        "attendance" : {}
    }

    await db.users.insert_one(user_document)
    return {"message" : "hooray"} #message to frontend (successful signup)


#add a way for admins to add other admins?
@app.post('/admin/create')
async def create_admin(admin_req: AdminCreateRequest, caller: str):
    caller_admin = await db.users.find_one({"username" : caller})
    if not caller_admin or caller_admin.get('isAdmin') is False:
        raise HTTPException() #verify if the caller is an admin
    
    exists = await db.users.find_one({"username" : admin_req.username})
    if exists:
        raise HTTPException() #user already exists
    
    password = get_pw_hash(admin_req.password)
    user_document = {
        "username": admin_req.username,
        "password": password,
        "displayName": admin_req.displayName,
        "avatarUrl" : admin_req.avatarUrl,
        "isAdmin" : True, 
        "score" : 0,
        "stats" : {},
        "attendance" : {}
    }
    await db.users.insert_one(user_document)
    return {"message" : "hooray(admin)"}

#add a new warmup quiz
@app.post('/admin/warmups')
def create_warmup():
    return None

#add a question to a warmup 
@app.post('/admin/warmups/{id}/questions')
def add_question():
    return None

#unlock a warmup 
@app.post('/admin/warmups/{id}/unlock')
def unlock_warmup():
    return None

#access unlocked warmups
@app.get('/warmups')
def view_unlocked_warmups():
    return None

#get a specific warmup 
@app.get('/warmups/{id}')
def get_warmup():
    return None

#update attendance after warmup completed
@app.patch('/users/{username}/attendance')
def update_attendance():
    return None

#update stats after warmup completed
@app.patch('/users/{username}/stats/{warmupId}')
def update_stats():
    return None

#if user needs to see their stats
@app.get('/users/{username}/stats')
def get_stats():
    return None

#admin to see all users' stats
@app.get('/admin/stats')
def get_all_stats():
    return None



#HANDLING WARMUP QUIZ LOGIC:
#user submits warmup quiz - handle attendance + stats
@app.post('/users/{username}/warmups/{id}/submit')
def submit():
    return None

#handle admin quiz creation --> allow for marking of correct answer(s), make them all short form questions
