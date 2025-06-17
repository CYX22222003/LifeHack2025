import json
import numpy as np
import os

class DataLoader:
    def __init__(self, path):
        with open(path, 'r') as f:
            self.students = json.load(f)['students']

    def get_distribution(self, exam_name):
        all_scores = []
        for student in self.students:
            exams = student["exams"]
            all_scores.append(exams[exam_name]["score"])
        scores_array = np.array(all_scores)
        low = np.min(scores_array)
        lower_q = np.percentile(scores_array, 25)
        median = np.median(scores_array)
        upper_q = np.percentile(scores_array, 75)
        high = np.max(scores_array)
        #return [low, lower_q, median, upper_q, high]
        np_list = [low, lower_q, median, upper_q, high]
        normal_list = [x.tolist() for x in np_list]
        return normal_list
    
    def get_distribution_all(self):
        all_quartiles = {}
        exam_names = set()
        for student in self.students:
            exam_names.update(student["exams"].keys())
        for exam in exam_names:
            all_quartiles[exam] = self.get_distribution(exam)
        print(all_quartiles)
        return all_quartiles
    
    def get_score(self, name, exam_name):
        for student in self.students:
            if student["name"] == name:
                return student ["exams"][exam_name]["score"]
        else:
            raise Exception (f"Student {name} is not found")
    
    def get_feedback(self, name, exam_name):
        for student in self.students:
            if student["name"] == name:
                return student ["exams"][exam_name]["feedback"]
        raise Exception (f"Student {name} is not found")
    
    def get_gender_addressing(self, name):
        for student in self.students:
            if student["name"] == name:
                if student["gender"] == "male":
                    return "his"
                elif student["gender"] == "female":
                    return "her"
                else:
                    return "its"
                
    def get_exam(self, exam):
        scores = []
        for student in self.students:
            scores.append(student["exams"][exam]["score"])
        data = {"exam": exam, "scores": scores}
        return data
    
    def get_all_exams(self):
        result = []
        exam_names = set()
        for student in self.students:
            exam_names.update(student["exams"].keys())
        for exam in exam_names:
            result.append(self.get_exam(exam))
        return result
        

    def get_distribution_text(self, exam_name):
        distribution = self.get_distribution(exam_name)
        return f"Distribution for {exam_name}: The lowest score is {distribution[0]}, the lower quantile is {distribution[1]}, the median is {distribution[2]}, the upper quantile is {distribution[3]}, the highest score is {distribution[4]}. \n"
    
    def get_distribution_text_all(self):
        result = ''
        exam_names = set()
        for student in self.students:
            exam_names.update(student["exams"].keys())
        for exam in exam_names:
            result += self.get_distribution_text(exam)
        return result
    
    def get_student_text_one_exam(self, name, exam):
        score = self.get_score(name, exam)
        feedback = self.get_feedback(name,exam)
        addressing = self.get_gender_addressing(name)
        return f"{name} score {score} for {exam}, and {addressing} feedback for the exam is {feedback}. \n"
    
    def get_student_text(self, name):
        result = ''
        exam_names = set()
        for student in self.students:
            exam_names.update(student["exams"].keys())

        for exam in exam_names:
            result += self.get_student_text_one_exam(name, exam)
        return result
    
    def get_all_student_text(self):
        result = ''
        for student in self.students:
            result += self.get_student_text(student['name'])
        return result


if __name__ == "__main__":
    ## Test for dataloader
    dl = DataLoader("SampleData.json")
    print(dl.get_distribution_text_all())
    print('-------------------------------------')
    print(dl.get_all_student_text())
    print('-------------------------------------')
    print(dl.get_all_exams())

    

    

    

    

    