import json
import numpy as np
import os

class DataLoader:
    def __init__(self, path):
        with open(path, 'r') as f:
            
            self.data = json.loads(f.read())

    def get_distribution(self, exam_name):
        all_scores = []
        for student in self.data:
            exams = student["exams"]
            all_scores.append(exams[exam_name]["score"])
        scores_array = np.array(all_scores)
        low = np.min(scores_array)
        lower_q = np.percentile(scores_array, 25)
        median = np.median(scores_array)
        upper_q = np.percentile(scores_array, 75)
        high = np.max(scores_array)
        return [low, lower_q, median, upper_q, high]
    
    def get_score(self, name, exam_name):
        return self.data[name]["exams"][exam_name]["score"]
    
    def get_feedback(self, name, exam_name):
        return self.data[name]["exams"][exam_name]["feedback"]
    
    def get_distribution_text(self, exam_name):
        distribution = self.get_distribution(exam_name)
        return f"Distribution for {exam_name}. The lowest score is {distribution[0]}, the lower quantile is {distribution[1]}, the median is {distribution[2]}, the upper quantile is {distribution[3]}, the highest score is {distribution[4]}. \n"
    
    def get_distribution_text_all(self):
        result = ''
        exam_names = set()
        for student in self.data:
            exam_names.update(student["exams"].keys())
        for exam in exam_names:
            result += self.get_distribution_text(exam)
        return result


dl = DataLoader("SampleData.json")
print(dl.get_distribution_text_all())
    

    

    

    

    

    