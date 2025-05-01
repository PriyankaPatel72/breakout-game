#put all classes in here
from pydantic import BaseModel, Field
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
    attendance: Dict[int, bool]

class AdminResponse(BaseModel):
    username: str
    displayName: str
    avatarUrl: str
    isAdmin: bool
    students: List[StudentResponse]
    
class WarmupCreateRequest(BaseModel):
    id: int
    isUnlocked: bool = False  # default to False if not specified

class QuestionCreateRequest(BaseModel):
    id: int
    question: str
    options: List[str] = Field(min_items=4, max_items=4)
    answer: str

class AttendanceRequest(BaseModel):
    warmupId: int

class SubmitRequest(BaseModel):
    answers: Dict[str, str]