#put all login stuff in here
from fastapi import HTTPException
from models import SignupRequest, LoginRequest, GameStats, StudentResponse, AdminResponse
from db import db
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#return user or null if incorrect user/pass
async def get_user(username: str, pwd: str):
    user = await db.users.find_one({"username" : username})
    if user and verify_pass(pwd, user['password']):
        return user
    return None

#return True/False 
def verify_pass(password: str, hash_password: str):
    return pwd_context.verify(password, hash_password)

#returns hashed pw
def get_pw_hash(password: str):
    return pwd_context.hash(password)

def format_student(user: dict):
    return StudentResponse(
        username=user['username'],
        displayName=user['displayName'],
        avatarUrl=user['avatarUrl'],
        isAdmin=False,
        score=user.get("score", 0),
        stats=user.get("stats", {}),
        attendance=user.get("attendance", {})
    )

async def format_admin(user: dict):
    student_docs = await db.users.find({"isAdmin" : False}).to_list(length=None)
    students = [format_student(s) for s in student_docs]
    return AdminResponse(
        username=user['username'],
        displayName=user['displayName'],
        avatarUrl=user['avatarUrl'],
        isAdmin=True,
        students=students
    )


#add a way for admins to add other admins?