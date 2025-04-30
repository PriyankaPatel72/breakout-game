from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
#from bson import ObjectId
from models import SignupRequest, LoginRequest, AdminCreateRequest, WarmupCreateRequest, QuestionCreateRequest, SubmitRequest
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
async def create_warmup(warmup: WarmupCreateRequest, caller: str):
    caller_admin = await db.users.find_one({"username": caller})
    if not caller_admin or not caller_admin.get("isAdmin"):
        raise HTTPException()

    warmup_doc = {
        "id": warmup.id,
        "questions": [],
        "unlocked": warmup.isUnlocked
    }

    result = await db.warmups.insert_one(warmup_doc)
    return {"id": str(result.inserted_id), "message": "Warmup created"}

#add a question to a warmup 
@app.post('/admin/warmups/{id}/questions')
async def add_question(id: int, question_req: QuestionCreateRequest, caller: str):
    caller_admin = await db.users.find_one({"username": caller})
    if not caller_admin or not caller_admin.get("isAdmin"):
        raise HTTPException()

    if question_req.answer not in question_req.options:
        raise HTTPException()

    result = await db.warmups.update_one(
        {"id": id},
        {"$push": {"questions": question_req.model_dump()}}
    )
    
    if result.modified_count == 0:
        raise HTTPException()
    return {"message": "Question added successfully"}

#unlock a warmup 
@app.post('/admin/warmups/{id}/unlock')
async def unlock_warmup(id: int, caller: str):
    caller_admin = await db.users.find_one({"username": caller})
    if not caller_admin or not caller_admin.get("isAdmin"):
        raise HTTPException()
    result = await db.warmups.update_one(
        {"id": id},
        {"$set": {"unlocked": True}}
    )
    if result.modified_count == 0:
        raise HTTPException()
    return {"message": "Warmup unlocked"}

#access unlocked warmups
@app.get('/warmups')
async def view_unlocked_warmups():
    warmups = await db.warmups.find({"unlocked": True}).to_list(length=100)
    return [{"id": w["id"], "questions": w["questions"]} for w in warmups]

#get a specific warmup 
@app.get('/warmups/{id}')
async def get_warmup(id: int):
    warmup = await db.warmups.find_one({"id": id, "unlocked": True})
    
    if not warmup:
        raise HTTPException()

    return {
        "id": warmup["id"],
        "questions": warmup["questions"]
    }

#if user needs to see their stats
@app.get('/users/{username}/warmups/{id}/stats') #me
def get_stats():
    return None

#admin to see all users' stats
@app.get('/admin/stats') #me
def get_all_stats():
    return None

#ATTENDANCE HANDLING
#admin needs to see students' attendance 
def get_attendance():
    return None

#SCORE HANDLING
#everyone sees scores on leaderboard
@app.get('/leaderboard')
async def get_leaderboard():
    users = await db.users.find({"isAdmin" : False}).to_list(length=None)

    leaderboard = sorted(
        [
            {
                "username": user['username'],
                "displayName": user['displayName'],
                "avatarUrl": user["avatarUrl"],
                "score": user.get("score", 0)
            }
            for user in users
        ], 
        key=lambda u: u['score'],
        reverse=True
    )
    return leaderboard


#HANDLING WARMUP QUIZ LOGIC:
#user submits warmup quiz - handle attendance + stats
@app.post('/users/{username}/warmups/{id}/submit') #me
async def submit(username: str, id: int, sub_req: SubmitRequest):
    user = await db.users.find_one({"username" : username})
    if not user: 
        raise HTTPException(); #user not found 
    
    warmup = await db.warmups.find_one({"id" : id})
    if not warmup:
        raise HTTPException(); #warmup not found
    
    correct = 0
    total = len(warmup["questions"])

    for question in warmup["questions"]:
        if sub_req.answers.get(str(question["id"])) == question['answer']:
            correct += 1

    await db.users.update_one(
        {"username" : username},
        {
            "$set": {
                f"stats.{id}": {"correct": correct, "total": total}, 
                f"attendance.{id}": True,
                f"score": user.get("score",0) + correct
            }
        }
    )

    return {"message" : "hooray (submitted warmup)", "correct" : correct, "total" : total}
