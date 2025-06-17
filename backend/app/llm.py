import getpass
import os
from dotenv import load_dotenv

load_dotenv()

if not os.environ.get("GOOGLE_API_KEY"):
  os.environ["GOOGLE_API_KEY"] = getpass.getpass("Enter API key for Google Gemini: ")

from langchain.chat_models import init_chat_model
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser

teacher_start_prompt = "I am a teacher. "
student_start_prompt = "This is a student. "
teacher_end_prompt = "Provide a concise feedback to my teaching, including pace and difficulty, in one short paragraph. "
student_end_prompt = "Provide a concise feedback to this student\'s performance in one short paragraph. "

model = init_chat_model("gemini-2.0-flash", model_provider="google_genai")

def get_all_dist_feedback(results_str):
  template = ChatPromptTemplate.from_template(teacher_start_prompt + 
          "Here are the distributions for all my exams: {results_str}." + teacher_end_prompt)
  chain = template | model | StrOutputParser()
  return chain.invoke({"results_str" : results_str})

def get_dist_feedback(result_str):
  template = ChatPromptTemplate.from_template(teacher_start_prompt + 
          "Here is the distribution for my exam: {result_str}." + teacher_end_prompt)
  chain = template | model | StrOutputParser()
  return chain.invoke({"result_str" : result_str})

def get_student_feedback(results_str):
  template = ChatPromptTemplate.from_template(teacher_start_prompt + 
          "Here are the results for all their exams: {results_str}." + teacher_end_prompt)
  chain = template | model | StrOutputParser()
  return chain.invoke({"results_str" : results_str})

def get_student_exam_feedback(result_str):
  template = ChatPromptTemplate.from_template(teacher_start_prompt + 
          "Here is the result for their exam: {result_str}." + teacher_end_prompt)
  chain = template | model | StrOutputParser()
  return chain.invoke({"result_str" : result_str})

if __name__ == "__main__":
  print(get_student_exam_feedback("Leo score B for final, and his feedback for the exam is be more careful. \n"))