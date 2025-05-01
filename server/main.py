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
async def get_stats(username: str, id: int):
    user = await db.users.find_one({"username" : username})
    if not user:
        raise HTTPException() #couldn't find user
    
    warmup = await db.warmups.find_one({"id" : id})
    if not warmup:
        raise HTTPException() #couldn't find warmup
    
    if str(id) not in user.get("attendance", {}):
        raise HTTPException() #warmup not yet completed
    
    stats = user.get("stats", {}).get(str(id))
    if not stats:
        raise HTTPException() #idk some issue w stats here then
    
    return stats


#admin to see all users' stats
@app.get('/admin/stats') #me
async def get_all_stats(caller: str):
    admin = await db.users.find_one({"username": caller})
    if not admin or not admin.get("isAdmin"):
        raise HTTPException() #ur not an admin bruh chill
    
    students = await db.users.find({"isAdmin" : False}).to_list(length=None)

    student_stats = [
        {
            "displayName": student["displayName"],
            "stats": student.get("stats", {})
        }
        for student in students
    ]
    
    return student_stats

#ATTENDANCE HANDLING
#admin needs to see students' attendance 
async def get_attendance(caller: str):
    caller_admin = await db.users.find_one({"username": caller})
    if not caller_admin or not caller_admin.get("isAdmin"):
        raise HTTPException()
    
    users = await db.users.find({}, {"_id": 0, "username": 1, "attendance": 1}).to_list(length=100)

    return users

 

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
