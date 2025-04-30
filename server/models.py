#put all classes in here
from pydantic import BaseModel
from typing import List, Dict

class SignupRequest(BaseModel):
    username: str
    password: str
    displayName: str
    avatarUrl: str

class LoginRequest(BaseModel):
    username: str
    password: str

class AdminCreateRequest(BaseModel):
    username: str
    password: str
    displayName: str
    avatarUrl: str

class GameStats(BaseModel):
    correct: int
    total: int

class StudentResponse(BaseModel):
    username: str
    displayName: str
    avatarUrl: str
    isAdmin: bool
    score: int
    stats: Dict[str, GameStats]
    attendance: Dict[str, bool]

class AdminResponse(BaseModel):
    username: str
    displayName: str
    avatarUrl: str
    isAdmin: bool
    students: List[StudentResponse]